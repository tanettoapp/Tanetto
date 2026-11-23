# Posts the day's Tanetto update to the Discord #announcements webhook (run by GitHub Actions).
# Rules:
# 1) the day is always the Italian date (Europe/Rome), never the UTC date;
# 2) a day is never posted twice. Before posting, the script reads the earlier runs of this
#    workflow on GitHub. The day counts as already posted if a step "Post <day>" ended with
#    success, or (runs made before this change) a step "Post" of a scheduled or push run
#    that started on that Italian day ended with success;
# 3) if the earlier runs cannot be read, nothing is posted (better a missed post than a double one).
import datetime
import json
import os
import re
import subprocess
import sys
import time
import zoneinfo

ROME = zoneinfo.ZoneInfo("Europe/Rome")
HERE = os.path.dirname(os.path.abspath(__file__))
WORKFLOW = "discord.yml"
LOOKBACK_DAYS = 3          # runs active (created, started or updated) from 3 days before the day
MAX_BACK_DAYS = 30         # a date given by hand: today or up to 30 days back, never in the future
WRITE_OUT = "\n__curl__ %{size_upload} %{http_code}\n"


def rome_day(ts):
    """'2026-11-23T23:18:58Z' -> Italian date '2026-11-24'."""
    t = datetime.datetime.fromisoformat(ts.replace("Z", "+00:00"))
    return t.astimezone(ROME).date().isoformat()


def target_date(value, now=None, check_range=True):
    """The day to post: the given YYYY-MM-DD, or today in Italy.
    The "Date" step checks the range (never a future date); the "Post" step only re-reads it."""
    value = (value or "").strip()
    if value:
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
            raise ValueError("date must be YYYY-MM-DD")
        day = datetime.date.fromisoformat(value)
        if not check_range:
            return day.isoformat()
        today = (now or datetime.datetime.now(datetime.timezone.utc)).astimezone(ROME).date()
        if day > today:
            raise ValueError("a future date cannot be posted by hand")
        if day < today - datetime.timedelta(days=MAX_BACK_DAYS):
            raise ValueError("date older than %d days" % MAX_BACK_DAYS)
        return day.isoformat()
    now = now or datetime.datetime.now(datetime.timezone.utc)
    return now.astimezone(ROME).date().isoformat()


def bytes_sent(stdout):
    """Bytes curl uploaded, from the -w line; None if the line is missing."""
    m = re.search(r"__curl__ (\d+)", stdout or "")
    return int(m.group(1)) if m else None


def posted_days(attempts):
    """Days already posted, from earlier run attempts.
    attempts: [{"event": str, "steps": [{"name": str, "conclusion": str, "started_at": str}]}]
    A successful step "Post <day>" means <day>. A successful step named exactly "Post" (runs
    made before this change) or with an unfilled name ("${{") means the Italian day the step
    started, for scheduled and push runs; for other runs it cannot be known, so it stops.
    Other steps, such as GitHub's own cleanup "Post Run actions/checkout@v5", are ignored."""
    days = set()
    for a in attempts:
        for s in a.get("steps", []):
            name = s.get("name", "")
            if s.get("conclusion") != "success":
                continue
            m = re.fullmatch(r"Post (\d{4}-\d{2}-\d{2})", name)
            if m:
                days.add(m.group(1))
            elif name == "Post" or (name.startswith("Post") and "${{" in name):
                if a.get("event") in ("schedule", "push") and s.get("started_at"):
                    days.add(rome_day(s["started_at"]))
                else:
                    raise RuntimeError("cannot tell which day an earlier run posted (step '" + name[:60] + "')")
    return days


def gh(path):
    """GitHub API read with 3 tries, also after a timeout (reads only: trying again is always safe)."""
    err = ""
    for i in range(3):
        try:
            r = subprocess.run(["gh", "api", path], capture_output=True, text=True, timeout=60)
        except subprocess.TimeoutExpired:
            err = "timeout"
        else:
            if r.returncode == 0:
                return json.loads(r.stdout)
            err = r.stderr[:200]
        if i < 2:  # no useless wait after the last try
            time.sleep(10 * (i + 1))
    raise RuntimeError("GitHub API error on " + path + ": " + err)


def history(day):
    """All finished attempts of this workflow from LOOKBACK_DAYS before `day`, except this one."""
    repo = os.environ["GITHUB_REPOSITORY"]
    me = os.environ.get("GITHUB_RUN_ID", "")
    my_attempt = int(os.environ.get("GITHUB_RUN_ATTEMPT", "1"))
    since = (datetime.date.fromisoformat(day) - datetime.timedelta(days=LOOKBACK_DAYS)).isoformat()
    runs = gh(f"repos/{repo}/actions/workflows/{WORKFLOW}/runs?per_page=100")["workflow_runs"]
    out = []
    for run in runs:
        # a "Re-run" keeps the old created_at: use the latest of the three dates, so a Re-run
        # of an old run made in the window is always seen (otherwise a day could go out twice)
        last_activity = max(run["created_at"], run.get("updated_at") or "", run.get("run_started_at") or "")
        if last_activity[:10] < since:
            continue
        last = int(run.get("run_attempt", 1))
        if str(run["id"]) == me:
            last = my_attempt - 1
        for att in range(1, last + 1):
            jobs = gh(f"repos/{repo}/actions/runs/{run['id']}/attempts/{att}/jobs?per_page=100")["jobs"]
            for j in jobs:
                out.append({"event": run["event"], "steps": j.get("steps", [])})
    return out


def main():
    if "--date-only" in sys.argv:
        print("date=" + target_date(os.environ.get("INPUT_DATE")))
        return 0
    day = target_date(os.environ.get("POST_DATE"), check_range=False)
    item = json.load(open(os.path.join(HERE, "schedule.json"), encoding="utf-8")).get(day)
    hook = os.environ.get("DISCORD_WEBHOOK", "")
    if not hook:
        print("DISCORD_WEBHOOK secret missing")
        return 1
    if not item:
        # nothing to post that day: just check that the webhook still works (GET does not post anything)
        r = subprocess.run(["curl", "-sS", "--fail", "--max-time", "60", "-o", "/dev/null", "-w", "%{http_code}", hook],
                           capture_output=True, text=True)
        print("nothing scheduled for", day, "- webhook check:", r.stdout or r.stderr[:200])
        return 0 if r.returncode == 0 else 1
    try:
        done = posted_days(history(day))
    except Exception as e:  # never post when we cannot prove it was not posted yet
        print("cannot read earlier runs, not posting", day, "(a later run will try again):", str(e)[:300])
        return 1
    if day in done:
        print("already posted", day, "- nothing to do")
        return 0
    payload = json.dumps({"content": item["text"], "username": "Tanetto", "allowed_mentions": {"parse": []}})
    args = ["curl", "-sS", "--fail-with-body", "--connect-timeout", "20", "--max-time", "90",
            "-w", WRITE_OUT, "-X", "POST", hook + "?wait=true",
            "--form-string", "payload_json=" + payload]  # text taken literally (no @file, no ;type=)
    if item.get("image"):
        args += ["-F", "files[0]=@" + os.path.join(HERE, item["image"])]
    r = subprocess.run(args, capture_output=True, text=True)
    # The decision looks at the bytes sent, not at the curl exit code:
    # 0 = posted; 22 = Discord answered with an error = not posted, a later run tries again;
    # any other error with 0 bytes sent = nothing was sent = not posted, a later run tries again;
    # any other error with bytes sent (or the bytes line missing) = Discord may have posted it.
    sent = bytes_sent(r.stdout)
    m = re.search(r"__curl__ \d+ (\d{3})", r.stdout or "")
    if r.returncode == 22 and m and m.group(1) in ("500", "502", "504"):
        # HTTP 500, 502, 504: Discord or its gateway failed after the request, the message may exist
        print("::warning::Discord answered HTTP " + m.group(1) + ": " + day + " counted as posted, check the channel")
        return 0
    if r.returncode not in (0, 22) and sent == 0:
        # nothing was sent (0 bytes, for example a connection timeout): surely not posted,
        # so the step fails and a later run tries again
        print("post not sent", day, "(curl " + str(r.returncode) + ", 0 bytes sent): a later run will try again")
        return 1
    if r.returncode not in (0, 22):
        # the request left (or we cannot tell) and the answer was lost: Discord may have posted
        # it. Count it as posted (step success), so no later run sends it again; check the channel.
        print("::warning::answer from Discord lost (curl " + str(r.returncode) + "): " + day
              + " counted as posted, check the channel")
        return 0
    print("posted" if r.returncode == 0 else "post failed", day, r.returncode, r.stdout[:300], r.stderr[:300])
    return r.returncode


if __name__ == "__main__":
    sys.exit(main())
