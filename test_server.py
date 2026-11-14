#!/usr/bin/env python3
"""Unit tests for server.py (API endpoints, validation, static allowlist, and security headers)."""

import io
import json
import unittest
from unittest.mock import MagicMock, patch

import server


class _FakeSocket:
    """Minimal socket-like wrapper backed by BytesIO for testing BaseHTTPRequestHandler."""

    def __init__(self, raw_request: bytes):
        self._rfile = io.BytesIO(raw_request)
        self.wfile = io.BytesIO()

    def makefile(self, mode, *args, **kwargs):
        if "r" in mode:
            return self._rfile
        return self.wfile

    def sendall(self, data: bytes):
        self.wfile.write(data)


def _dispatch(method: str, path: str, body: bytes = b"", headers: dict | None = None):
    """Invoke MissionGameHandler in-process and return (status_code, headers_dict, body_bytes)."""
    hdrs = dict(headers or {})
    if body and "Content-Length" not in hdrs:
        hdrs["Content-Length"] = str(len(body))
    if "Host" not in hdrs:
        hdrs["Host"] = f"127.0.0.1:{server.PORT}"

    request_lines = [f"{method} {path} HTTP/1.1"]
    for k, v in hdrs.items():
        request_lines.append(f"{k}: {v}")
    raw = ("\r\n".join(request_lines) + "\r\n\r\n").encode("utf-8") + body

    sock = _FakeSocket(raw)
    handler = server.MissionGameHandler(sock, ("127.0.0.1", 54321), MagicMock())
    # Suppress BaseHTTPRequestHandler stderr logging during tests
    raw_resp = sock.wfile.getvalue()
    head, _, resp_body = raw_resp.partition(b"\r\n\r\n")
    head_lines = head.decode("utf-8", errors="replace").split("\r\n")
    status_code = int(head_lines[0].split(" ")[1])
    resp_headers = {}
    for line in head_lines[1:]:
        if ":" in line:
            k, v = line.split(":", 1)
            resp_headers[k.strip()] = v.strip()
    return status_code, resp_headers, resp_body


# Silence HTTP request log noise during test runs
server.MissionGameHandler.log_message = lambda self, format, *args: None


class TestFallbackEvaluator(unittest.TestCase):
    def test_event_returns_expected_structure_and_truncates_target(self):
        long_name = "X" * 100
        res = server.fallback_ai_evaluator({"mission": {"name": long_name}, "health": 80}, "event")
        self.assertIsInstance(res, dict)
        self.assertIn("title", res)
        self.assertIn("choices", res)
        self.assertNotIn(long_name, res["description"])

    def test_debrief_grades(self):
        for score, expected in [(90, "A"), (75, "B"), (55, "C"), (30, "D"), ("bad", "B")]:
            res = server.fallback_ai_evaluator({"mission": {"name": "ARTEMIS"}, "score": score}, "debrief")
            self.assertEqual(res["grade"], expected)

    def test_unknown_prompt_type_returns_none(self):
        self.assertIsNone(server.fallback_ai_evaluator({}, "unknown"))

    def test_non_dict_mission_handled_safely(self):
        res = server.fallback_ai_evaluator({"mission": "invalid"}, "event")
        self.assertIsInstance(res, dict)


class TestLMStudioClient(unittest.TestCase):
    @patch("server.urllib.request.urlopen")
    def test_check_lm_studio_online(self, mock_urlopen):
        mock_resp = MagicMock()
        mock_resp.status = 200
        mock_resp.read.return_value = json.dumps({"data": [{"id": "llama-3"}]}).encode("utf-8")
        mock_resp.__enter__.return_value = mock_resp
        mock_urlopen.return_value = mock_resp

        res = server.check_lm_studio()
        self.assertEqual(res, {"online": True, "models": ["llama-3"]})
        self.assertNotIn("url", res)

    @patch("server.urllib.request.urlopen", side_effect=OSError("connection refused"))
    def test_check_lm_studio_offline_sanitized(self, _mock_urlopen):
        res = server.check_lm_studio()
        self.assertEqual(res, {"online": False, "models": []})
        self.assertNotIn("error", res)
        self.assertNotIn("url", res)

    @patch("server.urllib.request.urlopen", side_effect=OSError("timeout"))
    def test_call_lm_studio_failure_sanitized(self, _mock_urlopen):
        res = server.call_lm_studio([{"role": "user", "content": "hi"}])
        self.assertEqual(res, {"success": False})


class TestStaticAllowlistAndHeaders(unittest.TestCase):
    def test_allowed_static_files_return_200_with_security_headers(self):
        for path in ["/", "/index.html", "/app.js", "/style.css", "/nasa_logo.svg"]:
            with self.subTest(path=path):
                code, hdrs, body = _dispatch("GET", path)
                self.assertEqual(code, 200)
                self.assertGreater(len(body), 0)
                self.assertEqual(hdrs.get("X-Content-Type-Options"), "nosniff")
                self.assertEqual(hdrs.get("X-Frame-Options"), "DENY")
                self.assertEqual(hdrs.get("Referrer-Policy"), "no-referrer")
                self.assertEqual(hdrs.get("Cross-Origin-Resource-Policy"), "same-origin")
                self.assertIn("default-src 'self'", hdrs.get("Content-Security-Policy", ""))

    def test_sensitive_and_traversal_paths_blocked(self):
        for path in ["/.git/config", "/server.py", "/start.sh", "/README.md", "/../server.py", "/nonexistent.txt"]:
            with self.subTest(path=path):
                code, _, _ = _dispatch("GET", path)
                self.assertEqual(code, 404)

    def test_cors_restricted_to_local_origin(self):
        code, hdrs, _ = _dispatch("GET", "/api/status", headers={"Origin": "https://evil.example"})
        self.assertEqual(code, 200)
        self.assertNotIn("Access-Control-Allow-Origin", hdrs)

        local_origin = f"http://127.0.0.1:{server.PORT}"
        code, hdrs, _ = _dispatch("GET", "/api/status", headers={"Origin": local_origin})
        self.assertEqual(code, 200)
        self.assertEqual(hdrs.get("Access-Control-Allow-Origin"), local_origin)

    def test_options_returns_204(self):
        code, _, _ = _dispatch("OPTIONS", "/api/chat")
        self.assertEqual(code, 204)


class TestApiEndpoints(unittest.TestCase):
    @patch("server.check_lm_studio", return_value={"online": False, "models": []})
    def test_get_api_status(self, _mock_status):
        code, hdrs, body = _dispatch("GET", "/api/status")
        self.assertEqual(code, 200)
        self.assertEqual(hdrs.get("Content-Type"), "application/json")
        self.assertEqual(json.loads(body), {"online": False, "models": []})

    @patch("server.check_lm_studio", return_value={"online": False, "models": []})
    def test_post_chat_heuristic_fallback(self, _mock_status):
        payload = json.dumps({"type": "debrief", "mission_data": {"mission": {"name": "ARTEMIS-1"}, "score": 92}}).encode()
        code, _, body = _dispatch("POST", "/api/chat", body=payload)
        self.assertEqual(code, 200)
        data = json.loads(body)
        self.assertEqual(data["source"], "heuristic-engine")
        self.assertEqual(data["data"]["grade"], "A")

    @patch("server.call_lm_studio", return_value={"success": True, "source": "lm-studio", "content": "```json\n{\"title\": \"Test Event\"}\n```"})
    @patch("server.check_lm_studio", return_value={"online": True, "models": ["test-model"]})
    def test_post_chat_lm_studio_fenced_json(self, _mock_status, _mock_call):
        payload = json.dumps({"type": "event", "prompt": "generate event", "mission_data": {}}).encode()
        code, _, body = _dispatch("POST", "/api/chat", body=payload)
        self.assertEqual(code, 200)
        data = json.loads(body)
        self.assertEqual(data["source"], "lm-studio")
        self.assertEqual(data["data"], {"title": "Test Event"})

    def test_post_chat_validation_errors(self):
        cases = [
            ("/unknown", b"{}", {}, 404),
            ("/api/chat", b"", {"Content-Length": "abc"}, 400),
            ("/api/chat", b"", {"Content-Length": "-5"}, 400),
            ("/api/chat", b"", {"Content-Length": str(server.MAX_BODY_BYTES + 1)}, 413),
            ("/api/chat", b"{not-json", {}, 400),
            ("/api/chat", b"[]", {}, 400),
            ("/api/chat", json.dumps({"type": "invalid"}).encode(), {}, 400),
            ("/api/chat", json.dumps({"type": "event", "mission_data": "bad"}).encode(), {}, 400),
            ("/api/chat", json.dumps({"type": "event", "prompt": 123}).encode(), {}, 400),
        ]
        for path, body, hdrs, expected_code in cases:
            with self.subTest(path=path, body=body, hdrs=hdrs):
                code, _, _ = _dispatch("POST", path, body=body, headers=hdrs)
                self.assertEqual(code, expected_code)


if __name__ == "__main__":
    unittest.main()
