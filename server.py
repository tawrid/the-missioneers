#!/usr/bin/env python3
"""
Astraea: NASA Space Mission Design Game - Backend Server
Provides:
- Static file serving for the game frontend
- Proxy / bridge to LM Studio (http://localhost:1234/v1) or other local LLMs
- Intelligent built-in procedural physics & event evaluator fallback when LM Studio is offline
"""

import os
import sys
import json
import urllib.request
import urllib.error
import urllib.parse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

HOST = os.environ.get("HOST", "127.0.0.1")
PORT = int(os.environ.get("PORT", 8080))
if not (1 <= PORT <= 65535):
    raise ValueError("PORT must be between 1 and 65535")

LM_STUDIO_URL = os.environ.get("LM_STUDIO_URL", "http://localhost:1234/v1").rstrip("/")
_parsed_lm_url = urllib.parse.urlparse(LM_STUDIO_URL)
if _parsed_lm_url.scheme not in ("http", "https") or not _parsed_lm_url.netloc:
    raise ValueError("LM_STUDIO_URL must be a valid http:// or https:// URL")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = BASE_DIR if os.path.exists(os.path.join(BASE_DIR, "index.html")) else os.path.join(BASE_DIR, "public")

MAX_BODY_BYTES = 262144  # 256 KB
MAX_PROMPT_CHARS = 4000
ALLOWED_PROMPT_TYPES = {"event", "debrief"}
ALLOWED_STATIC_FILES = {
    "/": "index.html",
    "/index.html": "index.html",
    "/app.js": "app.js",
    "/style.css": "style.css",
    "/nasa_logo.svg": "nasa_logo.svg",
}

CSP_POLICY = (
    "default-src 'self'; "
    "script-src 'self' https://cdnjs.cloudflare.com; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
    "font-src 'self' https://fonts.gstatic.com; "
    "img-src 'self' data:; "
    "connect-src 'self' http://localhost:1234 http://127.0.0.1:1234; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "frame-ancestors 'none'"
)


def check_lm_studio():
    """Check if LM Studio local server is online and list models."""
    try:
        url = f"{LM_STUDIO_URL}/models"
        req = urllib.request.Request(url, headers={"User-Agent": "NASA-SpaceApps-MissionGame/1.0"})
        with urllib.request.urlopen(req, timeout=2.0) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                models = [m.get("id", "unknown") for m in data.get("data", []) if isinstance(m, dict)]
                return {"online": True, "models": models}
    except Exception as e:
        print(f"[LM Studio check] offline or unreachable: {e}", file=sys.stderr)
    return {"online": False, "models": []}


def call_lm_studio(messages, temperature=0.7, max_tokens=600):
    """Proxy request to LM Studio /v1/chat/completions."""
    try:
        url = f"{LM_STUDIO_URL}/chat/completions"
        payload = {
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "stream": False
        }
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json", "User-Agent": "NASA-SpaceApps-MissionGame/1.0"}
        )
        with urllib.request.urlopen(req, timeout=30.0) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            content = res_data["choices"][0]["message"]["content"]
            return {"success": True, "source": "lm-studio", "content": content}
    except Exception as e:
        print(f"[LM Studio call] failed: {e}", file=sys.stderr)
        return {"success": False}


def fallback_ai_evaluator(mission_data, prompt_type="event"):
    """
    Intelligent NASA physics and event evaluator fallback
    Used when LM Studio is not currently running.
    """
    import random
    mission = mission_data.get("mission", {})
    if not isinstance(mission, dict):
        mission = {}
    health = mission_data.get("health", 100)
    target = str(mission.get("name", "Deep Space"))[:64]

    if prompt_type == "event":
        events_pool = [
            {
                "title": "Solar Particle Influx Detected",
                "severity": "medium",
                "description": f"En route to {target}, a solar flare was detected by STEREO probes. Ionizing flux is surging across the spacecraft hull.",
                "choices": [
                    {"text": "Slew main bus to orient shield toward the Sun (consumes 8% propellant)", "delta_health": 0, "delta_propellant": -8, "delta_science": 0, "feedback": "Shielding blocked ionizing dose. Trajectory remains nominal."},
                    {"text": "Power down scientific sensors & enter safe mode", "delta_health": -4, "delta_propellant": 0, "delta_science": -5, "feedback": "Minor sensor degradation, but systems recovered successfully."},
                    {"text": "Maintain current attitude and gather solar flare telemetry", "delta_health": -15, "delta_propellant": 0, "delta_science": +20, "feedback": "High risk rewarded with groundbreaking high-energy physics data! Subsystem degradation reported."}
                ]
            },
            {
                "title": "Deep Space Optical Comm Alignment Drift",
                "severity": "low",
                "description": f"Ground station at Goldstone reports fine-pointing gimbal telemetry jitter. Telemetry bandwidth degraded by 45%.",
                "choices": [
                    {"text": "Run automated star-tracker calibration cycle", "delta_health": 0, "delta_propellant": -2, "delta_science": +5, "feedback": "Calibration locked onto guide stars. Optical laser link restored to 100%."},
                    {"text": "Switch to omni-directional S-band backup antenna", "delta_health": 0, "delta_propellant": 0, "delta_science": -10, "feedback": "Bandwidth significantly reduced, but telemetry is stable and power drain is lowered."},
                    {"text": "Reboot primary telemetry flight computer", "delta_health": -5, "delta_propellant": 0, "delta_science": 0, "feedback": "Telemetry computer rebooted. Glitch cleared after 2 hours of communication blackout."}
                ]
            },
            {
                "title": "Micrometeoroid Velocity Anomaly",
                "severity": "high",
                "description": f"Hypervelocity particle detected impacting primary radiator panel. Coolant pressure fluctuating.",
                "choices": [
                    {"text": "Isolate damaged radiator loop & redistribute thermal load", "delta_health": -5, "delta_propellant": 0, "delta_science": 0, "feedback": "Loop isolated before catastrophic leak. Thermal margins tight but manageable."},
                    {"text": "Perform emergency RCS burst to sweep particle field", "delta_health": -10, "delta_propellant": -12, "delta_science": 0, "feedback": "Avoided secondary debris, but propellant reserves took a heavy penalty."},
                    {"text": "Patch leak autonomously using smart sealant membrane", "delta_health": -2, "delta_propellant": -3, "delta_science": +10, "feedback": "Self-healing composite performed within parameters. NASA engineering logged breakthrough."}
                ]
            }
        ]
        return random.choice(events_pool)

    elif prompt_type == "debrief":
        score = mission_data.get("score", 75)
        if not isinstance(score, (int, float)):
            score = 75
        grade = "A" if score >= 85 else ("B" if score >= 70 else ("C" if score >= 50 else "D"))
        return {
            "grade": grade,
            "overall_status": "Mission Accomplished - Primary Objectives Met" if score >= 60 else "Mission Terminated Early",
            "executive_summary": f"Spacecraft '{target}' completed flight operations. The engineering trade-offs between mass, power, and scientific return demonstrated real-world NASA systems engineering principles. Total science score attained: {score}.",
            "highlights": [
                f"Trajectory efficiency: {random.randint(88, 98)}%",
                f"Subsystem thermal stability: {health}% integrity maintained",
                "Data return payload efficiency: nominal"
            ]
        }

    return None


class MissionGameHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        self.send_header("Content-Security-Policy", CSP_POLICY)

        origin = self.headers.get("Origin")
        allowed_origins = {f"http://localhost:{PORT}", f"http://127.0.0.1:{PORT}"}
        if origin in allowed_origins:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        req_path = parsed.path

        if req_path == "/api/status":
            status = check_lm_studio()
            self.send_json(200, status)
            return

        if req_path in ALLOWED_STATIC_FILES:
            self.path = "/" + ALLOWED_STATIC_FILES[req_path]
            super().do_GET()
            return

        self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != "/api/chat":
            self.send_json(404, {"error": "Not Found"})
            return

        raw_length = self.headers.get("Content-Length", "0")
        try:
            content_length = int(raw_length)
        except ValueError:
            self.send_json(400, {"error": "Invalid Content-Length"})
            return

        if content_length < 0:
            self.send_json(400, {"error": "Invalid Content-Length"})
            return
        if content_length > MAX_BODY_BYTES:
            self.send_json(413, {"error": "Payload Too Large"})
            return

        body = self.rfile.read(content_length).decode("utf-8", errors="replace")
        try:
            req_data = json.loads(body) if body else {}
        except json.JSONDecodeError:
            self.send_json(400, {"error": "Invalid JSON"})
            return

        if not isinstance(req_data, dict):
            self.send_json(400, {"error": "JSON body must be an object"})
            return

        prompt_type = req_data.get("type", "event")
        if prompt_type not in ALLOWED_PROMPT_TYPES:
            self.send_json(400, {"error": "Invalid prompt type"})
            return

        mission_data = req_data.get("mission_data", {})
        if not isinstance(mission_data, dict):
            self.send_json(400, {"error": "mission_data must be an object"})
            return

        user_prompt = req_data.get("prompt", "")
        if not isinstance(user_prompt, str):
            self.send_json(400, {"error": "prompt must be a string"})
            return
        user_prompt = user_prompt[:MAX_PROMPT_CHARS]

        # Try LM Studio first if available
        lm_status = check_lm_studio()
        if lm_status["online"] and lm_status["models"]:
            system_instruction = (
                "You are the Flight Director for a NASA Space Mission Simulation Game. "
                "Analyze player decisions, resource constraints, and generate realistic space events or debriefs. "
                "Return ONLY valid JSON format."
            )
            messages = [
                {"role": "system", "content": system_instruction},
                {"role": "user", "content": user_prompt}
            ]
            lm_result = call_lm_studio(messages)
            if lm_result["success"]:
                try:
                    raw = lm_result["content"].strip()
                    if "```json" in raw:
                        raw = raw.split("```json")[1].split("```")[0].strip()
                    elif "```" in raw:
                        raw = raw.split("```")[1].split("```")[0].strip()
                    parsed_json = json.loads(raw)
                    self.send_json(200, {"source": "lm-studio", "data": parsed_json})
                    return
                except Exception:
                    self.send_json(200, {"source": "lm-studio-raw", "data": lm_result["content"]})
                    return

        # Fallback to smart local simulation engine
        fallback_res = fallback_ai_evaluator(mission_data, prompt_type)
        self.send_json(200, {"source": "heuristic-engine", "data": fallback_res})


def main():
    server = ThreadingHTTPServer((HOST, PORT), MissionGameHandler)
    print("================================================================")
    print("🚀 NASA Space Mission Design Game Server Started!")
    print(f"📡 Web Application: http://{HOST}:{PORT}")
    print(f"🤖 LM Studio Target: {LM_STUDIO_URL}")
    print("================================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
        server.server_close()


if __name__ == "__main__":
    main()
