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
from http.server import HTTPServer, SimpleHTTPRequestHandler
import mimetypes

PORT = int(os.environ.get("PORT", 8080))
LM_STUDIO_URL = os.environ.get("LM_STUDIO_URL", "http://1234.0.0.1:1234/v1" if False else "http://localhost:1234/v1")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = BASE_DIR if os.path.exists(os.path.join(BASE_DIR, "index.html")) else os.path.join(BASE_DIR, "public")

def check_lm_studio():
    """Check if LM Studio local server is online and list models."""
    try:
        url = f"{LM_STUDIO_URL}/models"
        req = urllib.request.Request(url, headers={"User-Agent": "NASA-SpaceApps-MissionGame/1.0"})
        with urllib.request.urlopen(req, timeout=2.0) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                models = [m.get("id", "unknown") for m in data.get("data", [])]
                return {"online": True, "models": models, "url": LM_STUDIO_URL}
    except Exception as e:
        return {"online": False, "models": [], "error": str(e), "url": LM_STUDIO_URL}

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
        return {"success": False, "error": str(e)}

def fallback_ai_evaluator(mission_data, prompt_type="event"):
    """
    Intelligent NASA physics and event evaluator fallback
    Used when LM Studio is not currently running.
    """
    import random
    mission = mission_data.get("mission", {})
    subsystems = mission_data.get("subsystems", {})
    health = mission_data.get("health", 100)
    target = mission.get("name", "Deep Space")
    
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
        grade = "A" if score >= 85 else ("B" if score >= 70 else ("C" if score >= 50 else "D"))
        return {
            "grade": grade,
            "overall_status": "Mission Accomplished - Primary Objectives Met" if score >= 60 else "Mission Terminated Early",
            "executive_summary": f"Spacecraft '{mission.get('name')}' completed flight operations. The engineering trade-offs between mass, power, and scientific return demonstrated real-world NASA systems engineering principles. Total science score attained: {score}.",
            "highlights": [
                f"Trajectory trajectory efficiency: {random.randint(88, 98)}%",
                f"Subsystem thermal stability: {health}% integrity maintained",
                f"Data return payload efficiency: nominal"
            ]
        }

class MissionGameHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS for local development and testing
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/status":
            status = check_lm_studio()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(status).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        try:
            req_data = json.loads(body) if body else {}
        except Exception:
            req_data = {}

        if self.path == "/api/chat":
            prompt_type = req_data.get("type", "event")
            mission_data = req_data.get("mission_data", {})
            user_prompt = req_data.get("prompt", "")

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
                        # Attempt to parse json from model
                        raw = lm_result["content"].strip()
                        if "```json" in raw:
                            raw = raw.split("```json")[1].split("```")[0].strip()
                        elif "```" in raw:
                            raw = raw.split("```")[1].split("```")[0].strip()
                        parsed = json.loads(raw)
                        self.send_response(200)
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(json.dumps({"source": "lm-studio", "data": parsed}).encode("utf-8"))
                        return
                    except Exception:
                        # If model didn't return perfect JSON, wrap content
                        self.send_response(200)
                        self.send_header("Content-Type", "application/json")
                        self.end_headers()
                        self.wfile.write(json.dumps({"source": "lm-studio-raw", "data": lm_result["content"]}).encode("utf-8"))
                        return

            # Fallback to smart local simulation engine
            fallback_res = fallback_ai_evaluator(mission_data, prompt_type)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"source": "heuristic-engine", "data": fallback_res}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def main():
    server = HTTPServer(("0.0.0.0", PORT), MissionGameHandler)
    print(f"================================================================")
    print(f"🚀 NASA Space Mission Design Game Server Started!")
    print(f"📡 Web Application: http://localhost:{PORT}")
    print(f"🤖 LM Studio Target: {LM_STUDIO_URL}")
    print(f"================================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
        server.server_close()

if __name__ == "__main__":
    main()
