#!/usr/bin/env python3
"""
The Missioneers: Space Mission Design Game - Backend Server
Provides:
- Static file serving for the game frontend
- Proxy / bridge to LM Studio (http://localhost:1234/v1) or other local LLMs
- Intelligent built-in procedural physics & event evaluator fallback when LM Studio is offline
- 4-player cooperative & sabotage multiplayer lobby and shared-state sync API

SI Disclosure (Metadata): Backend server code and fallback mission evaluation
data were developed with Super Intelligence (SI / LLM) assistance.
"""

import os
import sys
import json
import random
import string
import threading
import urllib.request
import urllib.error
import urllib.parse
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

LEADERBOARD_LOCK = threading.Lock()
LEADERBOARD_ENTRIES = [
    {"name": "CDR. VANCE (JPL)", "money": 1840, "missions": 7, "reputation": 96, "mode": "4P CO-OP"},
    {"name": "DR. ELENA ROSTOVA", "money": 1520, "missions": 6, "reputation": 92, "mode": "SABOTAGE"},
    {"name": "KSC FLIGHT OPS", "money": 1290, "missions": 5, "reputation": 88, "mode": "4P CO-OP"},
    {"name": "DIRECTOR CHEN", "money": 1110, "missions": 4, "reputation": 84, "mode": "SINGLEPLAYER"},
    {"name": "ORBITAL PIONEERS", "money": 945, "missions": 3, "reputation": 79, "mode": "SABOTAGE"},
]

LOBBIES_LOCK = threading.Lock()
LOBBIES = {}
ROLES_LIST = ["launch", "space", "ground", "user"]


def _make_room_code():
    chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    for _ in range(50):
        code = "".join(random.choice(chars) for _ in range(6))
        if code not in LOBBIES:
            return code
    return "MSN" + str(random.randint(100, 999))


DOMAIN_IDS = ["earth", "planetary", "helio", "astro", "life"]

DEFAULT_DOMAIN_INSTRUMENTS = {
    "earth": [
        {"instId": "thermal_energy", "category": "Thermal Energy & Radiation Budget", "tier": 1, "name": "CERES", "fullName": "Clouds and the Earth's Radiant Energy System", "mass": 45, "power": 45, "cost": 95000, "link": "https://ceres.larc.nasa.gov/", "desc": "Measures solar-reflected and Earth-emitted thermal radiation."},
        {"instId": "atmosphere", "category": "Atmospheric Chemistry & Aerosols", "tier": 1, "name": "MOPITT", "fullName": "Measurements of Pollution in the Troposphere", "mass": 182, "power": 250, "cost": 140000, "link": "https://terra.nasa.gov/about/terra-instruments/mopitt", "desc": "Gas correlation radiometry measuring carbon monoxide and methane."},
    ],
    "planetary": [
        {"instId": "topography", "category": "Surface Topography & Altimetry", "tier": 1, "name": "MOLA", "fullName": "Mars Orbiter Laser Altimeter", "mass": 25.9, "power": 34.2, "cost": 110000, "link": "https://attic.gsfc.nasa.gov/mola/", "desc": "Infrared laser pulses mapping planetary elevation."},
        {"instId": "minerals", "category": "Mineralogy & Surface Composition", "tier": 1, "name": "TES", "fullName": "Thermal Emission Spectrometer", "mass": 14.4, "power": 14.5, "cost": 95000, "link": "https://mars.nasa.gov/mgs/sci/tes/", "desc": "Measures thermal infrared energy emitted by surface minerals."},
    ],
    "helio": [
        {"instId": "irradiance", "category": "Total Solar Irradiance", "tier": 1, "name": "TIM", "fullName": "Total Irradiance Monitor", "mass": 10, "power": 12, "cost": 80000, "link": "https://lasp.colorado.edu/sorce/instruments/tim/", "desc": "Electrical substitution radiometers measuring solar energy."},
        {"instId": "plasma", "category": "Solar Wind Plasma Analyzer", "tier": 1, "name": "SWEPAM", "fullName": "Solar Wind Electron, Proton, and Alpha Monitor", "mass": 6.8, "power": 5.9, "cost": 85000, "link": "https://izw1.caltech.edu/ACE/ASC/DATA/level2/swepam_l2desc.html", "desc": "Electrostatic analyzers measuring solar wind ions and electrons."},
    ],
    "astro": [
        {"instId": "light", "category": "Deep-Space Optical & IR Imaging", "tier": 1, "name": "WFC3", "fullName": "Wide Field Camera 3", "mass": 395, "power": 380, "cost": 185000, "link": "https://www.nasa.gov/content/hubble-space-telescope-wide-field-camera-3", "desc": "UV, visible, and near-infrared deep-field imaging."},
        {"instId": "chemical_comp", "category": "Exoplanet Spectroscopy", "tier": 1, "name": "STIS", "fullName": "Space Telescope Imaging Spectrograph", "mass": 377, "power": 247, "cost": 175000, "link": "https://www.nasa.gov/content/hubble-space-telescope-space-telescope-imaging-spectrograph", "desc": "Separates starlight into component wavelengths to identify chemical elements."},
    ],
    "life": [
        {"instId": "dna", "category": "Genomic & Biomarker Sequencing", "tier": 1, "name": "WetLab-2", "fullName": "Quantitative PCR Microgravity System", "mass": 18, "power": 65, "cost": 95000, "link": "https://www.nasa.gov/ames/research/space-biosciences/wetlab-2", "desc": "Real-time gene expression analysis of biological samples in microgravity."},
        {"instId": "spaceflight_env", "category": "Spaceflight Environmental Telemetry", "tier": 1, "name": "TLD Badges", "fullName": "Passive Thermoluminescent Badges", "mass": 0.05, "power": 0, "cost": 12000, "link": "https://srag.jsc.nasa.gov/", "desc": "Lithium fluoride crystals trapping cosmic radiation energy."},
    ],
}


def _make_default_shared_state():
    return {
        "version": 1,
        "stage": 1,
        "missionCycle": 1,
        "missionName": "AETHER-1",
        "domainId": None,
        "conceptVotes": {},
        "conceptVoteWinner": None,
        "conceptVoteTiebroken": False,
        "selectedInstruments": [],
        "instrumentTiers": {},
        "budget": 1200000,
        "reputation": 50,
        "activeDebt": 0,
        "budgetAllocations": {
            "launch": 450000,
            "space": 500000,
            "ground": 250000,
        },
        "selections": {
            "launchRocket": None,
            "selectedFuel": "kerosene",
            "spaceBus": None,
            "busSizing": "standard",
            "heatShieldInstalled": False,
            "groundStation": None,
        },
        "customSlidersEnabled": False,
        "customDesign": {
            "launchPayloadMax": 3000,
            "launchDeltaV": 8.5,
            "launchReliability": 88,
            "spaceVolumeMax": 6.0,
            "spacePowerGen": 1000,
            "spaceFuelCap": 500,
            "spaceReliability": 88,
            "groundBandwidth": 100,
            "groundReliability": 88,
        },
        "designApprovals": {
            "launch": False,
            "space": False,
            "ground": False,
        },
        "groundApproved": False,
        "diagnosticsBonus": 0,
        "flight": {
            "segment": "launch",
            "launchIntegrity": 100,
            "spaceIntegrity": 100,
            "groundIntegrity": 100,
            "dataAccumulatedMB": 0,
            "anomaliesEncountered": 0,
            "anomaliesResolved": 0,
            "flightOutcome": "IN_FLIGHT",
        },
        "dataInventory": [],
        "sabotageForensicLogs": [],
    }


def _resolve_concept_vote(lob, force=False):
    shared = lob.setdefault("shared_state", _make_default_shared_state())
    votes = shared.setdefault("conceptVotes", {})
    # Auto-vote for any AI crew bots that have not voted yet
    for p in lob.get("players", []):
        if p.get("is_bot") and p.get("role") not in votes:
            votes[p["role"]] = random.choice(DOMAIN_IDS)

    if len(votes) >= 4 or force:
        counts = {}
        for d in votes.values():
            if d in DOMAIN_IDS:
                counts[d] = counts.get(d, 0) + 1
        if counts:
            max_votes = max(counts.values())
            top_domains = [d for d, c in counts.items() if c == max_votes]
            # Majority wins; if no majority is won (tie or 1-1-1-1), random
            if len(top_domains) == 1 and max_votes >= 2:
                winner = top_domains[0]
                tiebroken = False
                lob.setdefault("logs", []).append({
                    "role": "ground",
                    "text": f"CONCEPT VOTE RESOLVED: {winner.upper()} won by majority ({max_votes}/4 votes)!"
                })
            else:
                winner = random.choice(DOMAIN_IDS)
                tiebroken = True
                lob.setdefault("logs", []).append({
                    "role": "ground",
                    "text": f"CONCEPT VOTE TIEBREAK: No majority won — random selection picked {winner.upper()}!"
                })
        else:
            winner = random.choice(DOMAIN_IDS)
            tiebroken = True
        shared["conceptVoteWinner"] = winner
        shared["conceptVoteTiebroken"] = tiebroken
        shared["domainId"] = winner
        shared["version"] = shared.get("version", 1) + 1


def _run_bot_ai_assist(lob):
    shared = lob.setdefault("shared_state", _make_default_shared_state())
    bot_roles = {p.get("role") for p in lob.get("players", []) if p.get("is_bot")}
    changed = False

    if "user" in bot_roles:
        alloc = shared.setdefault("budgetAllocations", {"launch": 450000, "space": 500000, "ground": 250000})
        if alloc.get("launch", 0) < 400000 or alloc.get("space", 0) < 400000 or alloc.get("ground", 0) < 200000:
            shared["budgetAllocations"] = {"launch": 480000, "space": 520000, "ground": 250000}
            changed = True

    dom_id = shared.get("domainId")
    if "space" in bot_roles and dom_id:
        if not shared.get("selectedInstruments"):
            shared["selectedInstruments"] = list(DEFAULT_DOMAIN_INSTRUMENTS.get(dom_id, DEFAULT_DOMAIN_INSTRUMENTS["earth"]))
            changed = True
        if shared.get("stage", 1) >= 4:
            sel = shared.setdefault("selections", {})
            if not sel.get("spaceBus"):
                sel["spaceBus"] = "standard_bus"
                sel["busSizing"] = "standard"
                sel["heatShieldInstalled"] = dom_id in ("planetary", "life")
                changed = True

    if "launch" in bot_roles and shared.get("stage", 1) >= 4:
        sel = shared.setdefault("selections", {})
        if not sel.get("launchRocket"):
            sel["launchRocket"] = "medium_rocket"
            sel["selectedFuel"] = "hydrolox" if dom_id in ("planetary", "helio", "astro") else "methalox"
            changed = True

    if "ground" in bot_roles:
        sel = shared.setdefault("selections", {})
        if shared.get("stage", 1) >= 4 and not sel.get("groundStation"):
            sel["groundStation"] = "commercial_sat"
            changed = True
        approvals = shared.setdefault("designApprovals", {"launch": False, "space": False, "ground": False})
        if sel.get("launchRocket") and not approvals.get("launch"):
            approvals["launch"] = True
            changed = True
        if sel.get("spaceBus") and shared.get("selectedInstruments") and not approvals.get("space"):
            approvals["space"] = True
            changed = True
        if sel.get("groundStation") and not approvals.get("ground"):
            approvals["ground"] = True
            changed = True
        if approvals.get("launch") and approvals.get("space") and approvals.get("ground") and not shared.get("groundApproved"):
            shared["groundApproved"] = True
            changed = True

    if changed:
        shared["version"] = shared.get("version", 1) + 1


def _ensure_default_lobbies():
    if LOBBIES:
        return
    LOBBIES["ORBIT4"] = {
        "code": "ORBIT4",
        "name": "Goddard Deep Space Co-op",
        "host": "CDR. KOWALSKI",
        "gamemode": "coop",
        "visibility": "public",
        "status": "open",
        "saboteur_role": None,
        "players": [
            {"name": "CDR. KOWALSKI", "role": "ground", "is_bot": False, "ready": True},
            {"name": "DR. LIN", "role": "space", "is_bot": True, "ready": True},
        ],
        "logs": [
            {"role": "ground", "text": "Lobby opened by CDR. KOWALSKI (Ground Station)."}
        ],
        "votes": {},
        "shared_state": _make_default_shared_state(),
    }
    LOBBIES["SAB99X"] = {
        "code": "SAB99X",
        "name": "Orbital Anomaly (Find the Saboteur)",
        "host": "FLT. DIR. MERCER",
        "gamemode": "sabotage",
        "visibility": "public",
        "status": "open",
        "saboteur_role": "space",
        "players": [
            {"name": "FLT. DIR. MERCER", "role": "launch", "is_bot": False, "ready": True},
            {"name": "ENG. PATEL", "role": "space", "is_bot": True, "ready": True},
            {"name": "OPS. REYES", "role": "ground", "is_bot": True, "ready": True},
        ],
        "logs": [
            {"role": "launch", "text": "Sabotage mode active: 1 undercover Saboteur among the 4 stations."}
        ],
        "votes": {},
        "shared_state": _make_default_shared_state(),
    }


def _public_lobby_view(lob, include_secret=False):
    out = {
        "code": lob["code"],
        "name": lob["name"],
        "host": lob["host"],
        "gamemode": lob["gamemode"],
        "visibility": lob["visibility"],
        "status": lob["status"],
        "players": list(lob["players"]),
        "player_count": len(lob["players"]),
        "max_players": 4,
        "logs": list(lob.get("logs", []))[-20:],
        "votes": dict(lob.get("votes", {})),
        "shared_state": dict(lob.get("shared_state") or _make_default_shared_state()),
    }
    if include_secret:
        out["saboteur_role"] = lob.get("saboteur_role")
    return out


def handle_lobby_action(req_data):
    action = str(req_data.get("action", "")).strip().lower()
    player_name = str(req_data.get("player_name", "MISSIONEER")).strip()[:24] or "MISSIONEER"
    preferred_role = str(req_data.get("role", "")).strip().lower()
    if preferred_role not in ROLES_LIST:
        preferred_role = ""

    with LOBBIES_LOCK:
        _ensure_default_lobbies()

        if action == "create":
            code = _make_room_code()
            lobby_name = str(req_data.get("name", f"{player_name}'s Mission Room")).strip()[:40] or f"{player_name}'s Mission Room"
            gamemode = str(req_data.get("gamemode", "coop")).strip().lower()
            if gamemode not in ("coop", "sabotage"):
                gamemode = "coop"
            visibility = str(req_data.get("visibility", "public")).strip().lower()
            if visibility not in ("public", "private"):
                visibility = "public"
            role = preferred_role or "launch"
            saboteur_role = random.choice(ROLES_LIST) if gamemode == "sabotage" else None
            lob = {
                "code": code,
                "name": lobby_name,
                "host": player_name,
                "gamemode": gamemode,
                "visibility": visibility,
                "status": "open",
                "saboteur_role": saboteur_role,
                "players": [
                    {"name": player_name, "role": role, "is_bot": False, "ready": True}
                ],
                "logs": [
                    {"role": role, "text": f"{player_name} created {visibility.upper()} {gamemode.upper()} lobby ({code})."}
                ],
                "votes": {},
                "shared_state": _make_default_shared_state(),
            }
            LOBBIES[code] = lob
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "quickplay":
            gamemode_pref = str(req_data.get("gamemode", "any")).strip().lower()
            candidate = None
            for lob in LOBBIES.values():
                if lob.get("visibility") == "public" and lob.get("status") == "open" and len(lob.get("players", [])) < 4:
                    if gamemode_pref in ("any", "", lob.get("gamemode")):
                        candidate = lob
                        break
            if not candidate:
                code = _make_room_code()
                gm = gamemode_pref if gamemode_pref in ("coop", "sabotage") else "sabotage"
                role = preferred_role or "launch"
                candidate = {
                    "code": code,
                    "name": f"Quickplay {gm.upper()} Sector {code[:3]}",
                    "host": player_name,
                    "gamemode": gm,
                    "visibility": "public",
                    "status": "open",
                    "saboteur_role": random.choice(ROLES_LIST) if gm == "sabotage" else None,
                    "players": [
                        {"name": player_name, "role": role, "is_bot": False, "ready": True}
                    ],
                    "logs": [
                        {"role": role, "text": f"Quickplay matchmaking initialized by {player_name}."}
                    ],
                    "votes": {},
                    "shared_state": _make_default_shared_state(),
                }
                LOBBIES[code] = candidate
            else:
                existing = next((p for p in candidate["players"] if p["name"].upper() == player_name.upper()), None)
                if not existing:
                    taken = {p["role"] for p in candidate["players"]}
                    avail = [r for r in ROLES_LIST if r not in taken]
                    assigned = preferred_role if (preferred_role and preferred_role in avail) else (avail[0] if avail else "user")
                    candidate["players"].append({"name": player_name, "role": assigned, "is_bot": False, "ready": True})
                    candidate["logs"].append({"role": assigned, "text": f"{player_name} matched via Quickplay into {assigned.upper()} station."})

            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(candidate, include_secret=True), "lobbies": pub}

        code = str(req_data.get("code", "")).strip().upper()
        if not code or code not in LOBBIES:
            return 404, {"error": "Lobby room code not found"}
        lob = LOBBIES[code]

        if action == "join":
            existing = next((p for p in lob["players"] if p["name"].upper() == player_name.upper()), None)
            if not existing:
                if len(lob["players"]) >= 4:
                    bot_idx = next((i for i, p in enumerate(lob["players"]) if p.get("is_bot")), -1)
                    if bot_idx >= 0:
                        replaced_role = lob["players"][bot_idx]["role"]
                        lob["players"][bot_idx] = {"name": player_name, "role": replaced_role, "is_bot": False, "ready": True}
                    else:
                        return 400, {"error": "Lobby is full (4/4 Missioneers)"}
                else:
                    taken = {p["role"] for p in lob["players"]}
                    avail = [r for r in ROLES_LIST if r not in taken]
                    assigned = preferred_role if (preferred_role and preferred_role in avail) else (avail[0] if avail else "user")
                    lob["players"].append({"name": player_name, "role": assigned, "is_bot": False, "ready": True})
                    lob["logs"].append({"role": assigned, "text": f"{player_name} joined as {assigned.upper()} Player."})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "select_role":
            if lob.get("status") == "in_progress":
                return 403, {"error": "Roles are locked and cannot be switched once the game has started."}
            if preferred_role:
                me = next((p for p in lob["players"] if p["name"].upper() == player_name.upper()), None)
                if me:
                    old_role = me["role"]
                    other = next((p for p in lob["players"] if p is not me and p["role"] == preferred_role), None)
                    if other:
                        other["role"] = old_role
                    me["role"] = preferred_role
                    lob["logs"].append({"role": preferred_role, "text": f"{player_name} assigned to {preferred_role.upper()} station."})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "fill_bots":
            bot_names = {
                "launch": "AI-VON BRAUN",
                "space": "AI-SAGAN",
                "ground": "AI-KRANZ",
                "user": "AI-JOHNSON",
            }
            taken = {p["role"] for p in lob["players"]}
            for r in ROLES_LIST:
                if r not in taken and len(lob["players"]) < 4:
                    lob["players"].append({"name": bot_names[r], "role": r, "is_bot": True, "ready": True})
            lob["logs"].append({"role": "ground", "text": "All 4 stations staffed and ready for flight."})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "remove_bots":
            before_count = len(lob["players"])
            lob["players"] = [p for p in lob["players"] if not p.get("is_bot")]
            removed_count = before_count - len(lob["players"])
            lob["logs"].append({"role": "ground", "text": f"Removed {removed_count} AI crewmate(s) from the team."})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "delete":
            if lob["host"].upper() != player_name.upper():
                return 403, {"error": "Only the lobby creator can delete this room"}
            del LOBBIES[code]
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"deleted": True, "code": code, "lobby": None, "lobbies": pub}

        if action == "vote_concept":
            domain_id = str(req_data.get("domain_id") or req_data.get("domainId") or "").strip().lower()
            if domain_id not in DOMAIN_IDS:
                return 400, {"error": "Invalid mission concept domain"}
            shared = lob.setdefault("shared_state", _make_default_shared_state())
            me = next((p for p in lob["players"] if p["name"].upper() == player_name.upper()), None)
            voter_role = me["role"] if me else (preferred_role or "launch")
            shared.setdefault("conceptVotes", {})[voter_role] = domain_id
            shared["version"] = shared.get("version", 1) + 1
            lob["logs"].append({"role": voter_role, "text": f"{player_name} ({voter_role.upper()}) voted for {domain_id.upper()} concept."})
            _resolve_concept_vote(lob, force=bool(req_data.get("force_resolve")))
            _run_bot_ai_assist(lob)
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "sync_state":
            patch = req_data.get("shared_state") if isinstance(req_data.get("shared_state"), dict) else req_data.get("state", {})
            if isinstance(patch, dict):
                shared = lob.setdefault("shared_state", _make_default_shared_state())
                allowed_keys = (
                    "stage", "missionCycle", "missionName", "domainId",
                    "conceptVotes", "conceptVoteWinner", "conceptVoteTiebroken",
                    "selectedInstruments", "instrumentTiers",
                    "budget", "reputation", "activeDebt", "budgetAllocations",
                    "selections", "customSlidersEnabled", "customDesign",
                    "designApprovals", "groundApproved", "diagnosticsBonus",
                    "flight", "dataInventory", "sabotageForensicLogs",
                )
                for k in allowed_keys:
                    if k in patch:
                        if isinstance(patch[k], dict) and isinstance(shared.get(k), dict) and k in ("selections", "budgetAllocations", "designApprovals", "customDesign", "flight", "conceptVotes", "instrumentTiers"):
                            shared[k].update(patch[k])
                        else:
                            shared[k] = patch[k]
                shared["version"] = shared.get("version", 1) + 1
                _run_bot_ai_assist(lob)
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "start":
            if lob["host"].upper() != player_name.upper():
                return 403, {"error": "Only the lobby creator can launch everyone into Mission Control"}
            if len(lob.get("players", [])) < 4:
                return 400, {"error": f"There must be 4 players to start a game (currently {len(lob.get('players', []))}/4). Invite players or click + FILL AI CREW."}
            # Ensure all 4 roles are uniquely assigned across the 4 players
            used_roles = set()
            unassigned_players = []
            for p in lob["players"]:
                r = p.get("role")
                if r in ROLES_LIST and r not in used_roles:
                    used_roles.add(r)
                else:
                    unassigned_players.append(p)
            remaining_roles = [r for r in ROLES_LIST if r not in used_roles]
            for p, r in zip(unassigned_players, remaining_roles):
                p["role"] = r
            lob["status"] = "in_progress"
            lob.setdefault("shared_state", _make_default_shared_state())
            if lob["gamemode"] == "sabotage" and not lob.get("saboteur_role"):
                lob["saboteur_role"] = random.choice(ROLES_LIST)
            lob["logs"].append({"role": "ground", "text": f"Mission launched by {player_name}! All 4 stations locked and entering Mission Control."})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "log_event":
            text = str(req_data.get("text", "")).strip()[:160]
            role = preferred_role or "ground"
            if text:
                lob["logs"].append({"role": role, "text": text})
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {"lobby": _public_lobby_view(lob, include_secret=True), "lobbies": pub}

        if action == "vote_saboteur":
            suspect_role = str(req_data.get("suspect_role", "")).strip().lower()
            if suspect_role not in ROLES_LIST:
                return 400, {"error": "Invalid suspect role"}
            lob.setdefault("votes", {})[player_name] = suspect_role
            actual_saboteur = lob.get("saboteur_role") or "space"
            caught = suspect_role == actual_saboteur
            lob["logs"].append({
                "role": "ground",
                "text": f"EMERGENCY TRIBUNAL: {player_name} accused {suspect_role.upper()}! Actual Saboteur: {actual_saboteur.upper()} ({'CAUGHT' if caught else 'ESCAPED'})."
            })
            pub = [_public_lobby_view(x) for x in LOBBIES.values() if x.get("visibility") == "public"]
            return 200, {
                "caught": caught,
                "suspect_role": suspect_role,
                "saboteur_role": actual_saboteur,
                "lobby": _public_lobby_view(lob, include_secret=True),
                "lobbies": pub,
            }

        return 400, {"error": "Unsupported lobby action"}


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
    "/equatorial-complex.mp3": "Equatorial Complex.mp3",
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

        if req_path == "/api/leaderboard":
            with LEADERBOARD_LOCK:
                entries = sorted(LEADERBOARD_ENTRIES, key=lambda x: x["money"], reverse=True)[:25]
            self.send_json(200, {"entries": entries})
            return

        if req_path == "/api/lobbies":
            qs = urllib.parse.parse_qs(parsed.query)
            code = (qs.get("code", [""])[0] or "").strip().upper()
            with LOBBIES_LOCK:
                _ensure_default_lobbies()
                pub = [
                    _public_lobby_view(lob)
                    for lob in LOBBIES.values()
                    if lob.get("visibility") == "public"
                ]
                detail = _public_lobby_view(LOBBIES[code], include_secret=True) if code in LOBBIES else None
            self.send_json(200, {"lobbies": pub, "lobby": detail})
            return

        if req_path in ALLOWED_STATIC_FILES:
            self.path = "/" + ALLOWED_STATIC_FILES[req_path]
            super().do_GET()
            return

        self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path not in ("/api/chat", "/api/leaderboard", "/api/lobbies"):
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

        if parsed.path == "/api/leaderboard":
            name = str(req_data.get("name", "MISSIONEER")).strip()[:28] or "MISSIONEER"
            try:
                money = int(float(req_data.get("money", 0)))
                missions = int(req_data.get("missions", 1))
                reputation = int(req_data.get("reputation", 50))
            except (ValueError, TypeError):
                self.send_json(400, {"error": "Invalid numeric fields"})
                return
            mode = str(req_data.get("mode", "SINGLEPLAYER")).strip()[:24]
            with LEADERBOARD_LOCK:
                existing = next((e for e in LEADERBOARD_ENTRIES if e["name"].upper() == name.upper()), None)
                if existing:
                    existing["money"] = max(existing["money"], money)
                    existing["missions"] = max(existing["missions"], missions)
                    existing["reputation"] = max(existing["reputation"], reputation)
                    existing["mode"] = mode
                else:
                    LEADERBOARD_ENTRIES.append({
                        "name": name,
                        "money": money,
                        "missions": missions,
                        "reputation": reputation,
                        "mode": mode,
                    })
                entries = sorted(LEADERBOARD_ENTRIES, key=lambda x: x["money"], reverse=True)[:25]
            self.send_json(200, {"entries": entries})
            return

        if parsed.path == "/api/lobbies":
            res_code, payload = handle_lobby_action(req_data)
            self.send_json(res_code, payload)
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
