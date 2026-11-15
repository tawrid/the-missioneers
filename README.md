# The Missioneers // NASA Space Mission Design & Economy Simulator
### 🚀 Official NASA Space Apps Challenge Submission — Space Mission Design Game

[![Play Online on GitHub Pages](https://img.shields.io/badge/Play_Online-GitHub_Pages-blue?style=for-the-badge&logo=github)](https://tawrid.github.io/the-missioneers/)
[![NASA Space Apps](https://img.shields.io/badge/NASA-Space_Apps_Challenge-red?style=for-the-badge)](https://www.spaceappschallenge.org/2026/challenges/space-mission-design-game/?tab=resources)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> An interactive, multi-role web-based space mission design game. Players engineer rockets, configure sensors, manage permanent and temporary resources, survive interactive minigame anomalies, refine scientific data through NASA's **L0–L4** pipeline, and sell to competing market buyers.

---

## 🎮 Play Online

Play the game immediately in your browser without any installation:
👉 **[https://tawrid.github.io/the-missioneers/](https://tawrid.github.io/the-missioneers/)**

---

## 🎬 Presentation

Watch the NASA Space Apps Challenge project presentation:

<video src="spaceapps_challenge_app.mp4" controls width="100%">
  <a href="spaceapps_challenge_app.mp4">Watch Presentation Video (spaceapps_challenge_app.mp4)</a>
</video>

> 📽️ **[Download / Watch Presentation (`spaceapps_challenge_app.mp4`)](spaceapps_challenge_app.mp4)**

---

## 🛰️ Game Architecture & Lifecycle

The game implements the complete NASA Systems Engineering Lifecycle across 7 progressive stages:

1. **Stage 1: Set Goal** — Select from 5 official NASA science directorates.
2. **Stage 2: Define Concept** — Choose specific scientific phenomena targets (Tier 1 vs. Tier 2).
3. **Stage 3: Define Requirements** — Review mass, power, velocity ($\Delta v$), and volume constraints.
4. **Stage 4: Design & Procurement** — Configure the Launch, Space, and Ground hardware segments.
5. **Stage 5: Build & Verify** — Run automated diagnostic stress tests on the test bench.
6. **Stage 6: Implement (Flight Ops)** — Launch to orbit, collect telemetry, and solve emergency minigames.
7. **Stage 7: User Segment** — Refine raw observations ($\text{L0} \rightarrow \text{L4}$) and sell to competing buyers.

---

## ⚙️ The 4 Core Segments & Failure Outcomes

| Segment | Hardware Focus | Failure Consequence |
| :--- | :--- | :--- |
| **Launch Segment** | The Rocket (Mass, Fuel, Velocity $\Delta v$) | **Catastrophic Failure**: Immediate structural explosion, salvage penalties, and mission loss! |
| **Space Segment** | Spacecraft Bus & Sensors (Power, Instruments, Volume) | **Scientific Failure**: Instruments burn out. Zero data collected (complete waste). |
| **Ground Segment** | Comms & Receiving Network (Bandwidth, Buffers, Dishes) | **Telemetry Loss**: Signal lock lost. Zero data received on Earth. |
| **User Segment** | Data Processing & Market Exchange (L0–L4 Refinery) | **Market Failure**: Corrupted or rejected data results in zero profit. |

---

## 💎 Permanent vs. Temporary Resources

### Permanent Resources (Persistent Across Missions)
* **Budget ($)**: Carries over between missions to buy instruments, buses, rockets, and lab refinement.
* **Reputation (0–100)**: Low reputation ($<35$) reduces selling prices and locks Tier 2 advanced sensors. High reputation unlocks cutting-edge instruments and gives selling bonuses.

### Temporary Resources (Per Mission Constraints)
* **Mass (kg)**: Spacecraft bus + propellant + instruments. Must not exceed rocket payload capacity.
* **Power Consumption (W)**: Total sensor and avionics draw. Must be balanced by solar arrays or RTGs.
* **Fuel Capacity (kg)**: Dictates mission duration and burn capability.
* **Velocity ($\Delta v$ in km/s)**: Must meet the destination's orbital insertion requirement.
* **Volume ($m^3$)**: Spacecraft bus fairing volume limit.

---

## 🔬 5 Mission Domains & Exact NASA Data Types

### 1. Earth Science
Thermal energy, Atmosphere, Water, Ice, Ocean, Topography, Biosphere.

### 2. Planetary Science
Topography, Temperature, Minerals, Atmosphere, Gravity, Magnetic fields.

### 3. Heliophysics
Irradiance, Magnetic/electric fields, Plasma, Cosmic rays.

### 4. Astrophysics
Light, Positioning, Redshift, Chemical composition, Time and ray bursts.

### 5. Biological & Physical Sciences (Life Sciences)
DNA, Microbiomes, Body, Spaceflight environment.

> **Tier 1 vs. Tier 2 Instruments**:
> - **Tier 1 (Standard)**: Economical, lower mass/power $\rightarrow$ outputs **L0 Raw Data**.
> - **Tier 2 (Advanced)**: Higher cost, mass, and power consumption (requires $35+$ Reputation) $\rightarrow$ outputs pre-calibrated **L1 Data** immediately!

---

## 🧪 NASA Data Processing Refinery ($\text{L0} \rightarrow \text{L4}$)

Before selling data in the User Segment, you can refine it in the NASA Data Processing Workbench:

```
L0 (Raw Telemetry)
 └── L1A (Annotated Raw Data)
      └── L1B (Radiometrically Calibrated Raw Data)
           └── L1C (Calibrated Data + Inferred Geometric Variables)
                └── L2 (Derived Geophysical Simulation)
                     └── L2A (Specified L2 Subset)
                          └── L2B (Calibrated L2A)
                               └── L3 (Stitched Uniform Map)
                                    └── L3A (Temporal Multi-Mission Stack)
                                         └── L4 (Integrated Multi-Sensor Synthesis - $$$ Max Value!)
```

---

## 💼 User Segment Market Buyers

1. **Scientific Institute (National Science Foundation)**:
   - *Sell Price*: Standard (1.0x)
   - *Reputation*: **+8 Rep**
2. **Open Source (Global Public Domain)**:
   - *Sell Price*: Free ($0)
   - *Reputation*: **+20 Rep** (Fastest way to rebuild lost reputation)
3. **Shady Classified Agency (Black-Budget Contractor)**:
   - *Sell Price*: **Extravagant (2.5x Payout)**
   - *Reputation*: **-15 Rep** (Risks losing access to high-tier science)

---

## 🛠️ The 4 Crew Roles & Saboteur Mode

- **Launch Player**: Rocket design, stage separation, mechanical valve pressure minigames.
- **Space Player**: Instrument configuration, optical alignment, frequency tuning minigames.
- **Ground Player**: Dish network selection, tracking angle minigames, approves launch and selling.
- **User Player**: Data refinery operations, buyer negotiations, emergency bank loans.

### 🕵️ Saboteur Gamemode
Toggle **Saboteur Mode** from the top header! One crew member is secretly an impostor intentionally causing anomalies to bankrupt the agency. Players must succeed at high-stakes minigames to prevent catastrophe.

---

## 🤖 LM Studio Integration (Optional Local AI)

When playing locally, you can connect **LM Studio** as your live Flight Director:
1. Open **LM Studio** and load a model like **`Qwen 2.5 7B Instruct`** or **`Llama 3.1 8B`**.
2. Click the **Local Server** icon (`<->`) on the left sidebar.
3. Click **Start Server** (listening on `http://localhost:1234`).
4. Run the local backend with `./start.sh` or `/opt/homebrew/bin/python3 server.py`.

---

## ⚙️ Enabling GitHub Pages

To make the site live on GitHub:
1. Go to your repository on GitHub: `https://github.com/tawrid/the-missioneers`
2. Navigate to **Settings** &rarr; **Pages** (on the left menu).
3. Under **Build and deployment** &rarr; **Branch**:
   - Select **`main`** branch
   - Select folder **`/(root)`**
   - Click **Save**.
4. In ~1 minute, your game will be published at:
   **`https://tawrid.github.io/the-missioneers/`**