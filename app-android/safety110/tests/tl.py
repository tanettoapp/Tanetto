# libreria dei test della 1.0.10 sicurezza: server proprio (porta PORT, cartella SITE), pagina con i mock di common.py
import os, sys, json, threading, functools, http.server, socketserver
D = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, D)
PORT = int(os.environ.get("PORT", "9310")); SITE = os.environ.get("SITE", "/home/claude/tanetto-safety110")
import common
common.URL = f"http://127.0.0.1:{PORT}/index.html"
class _Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def handle(self):
        try: super().handle()
        except Exception: pass
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), functools.partial(_Q, directory=SITE))
threading.Thread(target=srv.serve_forever, daemon=True).start()
from common import *
LANGS = ["it", "en", "de", "es", "fr", "pt", "ja", "ko", "zh", "zht", "ru", "pl", "nl", "tr"]
