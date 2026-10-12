package com.tanettoapp.tanetto;

import com.android.billingclient.api.AcknowledgePurchaseParams;
import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONException;

/**
 * Pagamenti di Google Play: abbonamento Tanetto Plus e pacchetti di Tani.
 * L'app (JavaScript) decide cosa sbloccare; qui si parla solo con Google Play.
 */
@CapacitorPlugin(name = "Billing")
public class BillingPlugin extends Plugin implements PurchasesUpdatedListener {

    private BillingClient client;
    private final Map<String, ProductDetails> details = new HashMap<>();
    private PluginCall buyCall = null;
    private final List<Object[]> waiting = new ArrayList<>();
    private boolean connecting = false;

    @Override
    public void load() {
        client = BillingClient.newBuilder(getContext())
            .setListener(this)
            .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
            .enableAutoServiceReconnection()
            .build();
    }

    /** Esegue r quando il collegamento con Google Play e' pronto; altrimenti chiama fail. */
    private void ready(final Runnable r, final PluginCall call) {
        if (client.isReady()) { r.run(); return; }
        synchronized (waiting) {
            waiting.add(new Object[] { r, call });
            if (connecting) return;
            connecting = true;
        }
        client.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult result) {
                List<Object[]> todo;
                synchronized (waiting) { connecting = false; todo = new ArrayList<>(waiting); waiting.clear(); }
                boolean ok = result.getResponseCode() == BillingClient.BillingResponseCode.OK;
                for (Object[] x : todo) {
                    if (ok) ((Runnable) x[0]).run();
                    else if (x[1] != null) ((PluginCall) x[1]).reject("billing unavailable", code(result));
                }
            }

            @Override
            public void onBillingServiceDisconnected() {
                List<Object[]> todo;
                synchronized (waiting) { connecting = false; todo = new ArrayList<>(waiting); waiting.clear(); }
                for (Object[] x : todo) if (x[1] != null) ((PluginCall) x[1]).reject("disconnected", "network");
            }
        });
    }

    private static String code(BillingResult r) {
        switch (r.getResponseCode()) {
            case BillingClient.BillingResponseCode.USER_CANCELED: return "cancelled";
            case BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED: return "owned";
            case BillingClient.BillingResponseCode.SERVICE_UNAVAILABLE:
            case BillingClient.BillingResponseCode.SERVICE_DISCONNECTED:
            case BillingClient.BillingResponseCode.NETWORK_ERROR: return "network";
            case BillingClient.BillingResponseCode.BILLING_UNAVAILABLE: return "unavailable";
            case BillingClient.BillingResponseCode.ITEM_UNAVAILABLE: return "item-unavailable";
            default: return "error";
        }
    }

    private static JSObject purchaseJson(Purchase p) {
        JSObject o = new JSObject();
        JSArray prods = new JSArray();
        for (String s : p.getProducts()) prods.put(s);
        o.put("products", prods);
        o.put("token", p.getPurchaseToken());
        o.put("orderId", p.getOrderId());
        o.put("state", p.getPurchaseState() == Purchase.PurchaseState.PURCHASED ? "purchased" : p.getPurchaseState() == Purchase.PurchaseState.PENDING ? "pending" : "unknown");
        o.put("acknowledged", p.isAcknowledged());
        o.put("autoRenewing", p.isAutoRenewing());
        o.put("time", p.getPurchaseTime());
        o.put("quantity", p.getQuantity());
        return o;
    }

    /** Prezzi e offerte da Google, nella valuta di chi usa l'app. */
    @PluginMethod
    public void products(final PluginCall call) {
        final JSArray subs = call.getArray("subs", new JSArray());
        final JSArray inapp = call.getArray("inapp", new JSArray());
        ready(() -> {
            final JSObject out = new JSObject();
            final JSArray list = new JSArray();
            final int[] left = { 0 };
            final List<QueryProductDetailsParams> qs = new ArrayList<>();
            try {
                for (String type : new String[] { BillingClient.ProductType.SUBS, BillingClient.ProductType.INAPP }) {
                    JSArray ids = type.equals(BillingClient.ProductType.SUBS) ? subs : inapp;
                    if (ids.length() == 0) continue;
                    List<QueryProductDetailsParams.Product> ps = new ArrayList<>();
                    for (int i = 0; i < ids.length(); i++) ps.add(QueryProductDetailsParams.Product.newBuilder().setProductId(ids.getString(i)).setProductType(type).build());
                    qs.add(QueryProductDetailsParams.newBuilder().setProductList(ps).build());
                }
            } catch (JSONException e) { call.reject("bad ids", "error"); return; }
            if (qs.isEmpty()) { out.put("products", list); call.resolve(out); return; }
            left[0] = qs.size();
            for (QueryProductDetailsParams q : qs) {
                client.queryProductDetailsAsync(q, (result, res) -> {
                    synchronized (left) {
                        if (result.getResponseCode() == BillingClient.BillingResponseCode.OK && res != null) {
                            for (ProductDetails d : res.getProductDetailsList()) {
                                details.put(d.getProductId(), d);
                                JSObject o = new JSObject();
                                o.put("id", d.getProductId());
                                o.put("type", d.getProductType());
                                if (d.getOneTimePurchaseOfferDetails() != null) {
                                    o.put("price", d.getOneTimePurchaseOfferDetails().getFormattedPrice());
                                    o.put("micros", d.getOneTimePurchaseOfferDetails().getPriceAmountMicros());
                                    o.put("currency", d.getOneTimePurchaseOfferDetails().getPriceCurrencyCode());
                                }
                                if (d.getSubscriptionOfferDetails() != null) {
                                    JSArray offers = new JSArray();
                                    for (ProductDetails.SubscriptionOfferDetails s : d.getSubscriptionOfferDetails()) {
                                        JSObject so = new JSObject();
                                        so.put("basePlanId", s.getBasePlanId());
                                        so.put("offerId", s.getOfferId());
                                        so.put("token", s.getOfferToken());
                                        JSArray phases = new JSArray();
                                        for (ProductDetails.PricingPhase ph : s.getPricingPhases().getPricingPhaseList()) {
                                            JSObject po = new JSObject();
                                            po.put("price", ph.getFormattedPrice());
                                            po.put("micros", ph.getPriceAmountMicros());
                                            po.put("currency", ph.getPriceCurrencyCode());
                                            po.put("period", ph.getBillingPeriod());
                                            po.put("cycles", ph.getBillingCycleCount());
                                            po.put("recurrence", ph.getRecurrenceMode());
                                            phases.put(po);
                                        }
                                        so.put("phases", phases);
                                        offers.put(so);
                                    }
                                    o.put("offers", offers);
                                }
                                list.put(o);
                            }
                        }
                        left[0]--;
                        if (left[0] == 0) { out.put("products", list); call.resolve(out); }
                    }
                });
            }
        }, call);
    }

    /** Apre la finestra di pagamento di Google. Il risultato arriva in onPurchasesUpdated. */
    @PluginMethod
    public void buy(final PluginCall call) {
        final String id = call.getString("id");
        final String offer = call.getString("offerToken");
        ready(() -> {
            ProductDetails d = details.get(id);
            if (d == null) { call.reject("product not loaded", "item-unavailable"); return; }
            BillingFlowParams.ProductDetailsParams.Builder pb = BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(d);
            if (offer != null && !offer.isEmpty()) pb.setOfferToken(offer);
            List<BillingFlowParams.ProductDetailsParams> l = new ArrayList<>();
            l.add(pb.build());
            BillingFlowParams params = BillingFlowParams.newBuilder().setProductDetailsParamsList(l).build();
            if (buyCall != null) { buyCall.reject("superseded", "cancelled"); }
            buyCall = call;
            call.setKeepAlive(true);
            final BillingResult r = client.launchBillingFlow(getActivity(), params);
            if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) {
                buyCall = null; call.setKeepAlive(false); call.reject(r.getDebugMessage(), code(r));
            }
        }, call);
    }

    @Override
    public void onPurchasesUpdated(BillingResult result, List<Purchase> purchases) {
        JSObject o = new JSObject();
        JSArray arr = new JSArray();
        if (purchases != null) for (Purchase p : purchases) arr.put(purchaseJson(p));
        o.put("purchases", arr);
        o.put("code", result.getResponseCode() == BillingClient.BillingResponseCode.OK ? "ok" : code(result));
        final PluginCall c = buyCall;
        buyCall = null;
        if (c != null) {
            c.setKeepAlive(false);
            if (result.getResponseCode() == BillingClient.BillingResponseCode.OK) c.resolve(o); else c.reject(result.getDebugMessage(), code(result));
        } else {
            /* acquisti completati piu' tardi (es. pagamento in contanti in negozio) */
            notifyListeners("purchases", o);
        }
    }

    /** Acquisti ancora validi (abbonamenti attivi, Tani non ancora consegnati). */
    @PluginMethod
    public void owned(final PluginCall call) {
        final String type = "subs".equals(call.getString("type")) ? BillingClient.ProductType.SUBS : BillingClient.ProductType.INAPP;
        ready(() -> client.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(type).build(), (result, list) -> {
            if (result.getResponseCode() != BillingClient.BillingResponseCode.OK) { call.reject(result.getDebugMessage(), code(result)); return; }
            JSObject o = new JSObject();
            JSArray arr = new JSArray();
            if (list != null) for (Purchase p : list) arr.put(purchaseJson(p));
            o.put("purchases", arr);
            call.resolve(o);
        }), call);
    }

    /** Conferma a Google un abbonamento (va fatto entro 3 giorni, altrimenti Google lo rimborsa). */
    @PluginMethod
    public void acknowledge(final PluginCall call) {
        final String token = call.getString("token");
        ready(() -> client.acknowledgePurchase(AcknowledgePurchaseParams.newBuilder().setPurchaseToken(token).build(), (r) -> {
            if (r.getResponseCode() == BillingClient.BillingResponseCode.OK) call.resolve(); else call.reject(r.getDebugMessage(), code(r));
        }), call);
    }

    /** Segna come consegnato un pacchetto di Tani, cosi' si puo' comprare di nuovo. */
    @PluginMethod
    public void consume(final PluginCall call) {
        final String token = call.getString("token");
        ready(() -> client.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(token).build(), (r, t) -> {
            if (r.getResponseCode() == BillingClient.BillingResponseCode.OK) call.resolve(); else call.reject(r.getDebugMessage(), code(r));
        }), call);
    }
}
