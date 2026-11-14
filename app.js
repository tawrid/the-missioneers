/* ==========================================================================
   ASTRAEA // NASA SPACE MISSION DESIGN & ECONOMY ENGINE
   Complete 4-Segment Lifecycle, L0-L4 Data Refinery & Minigame Engine
   ========================================================================== */

(function() {
  'use strict';

  // ========================================================================
  // 1. DATASETS: 5 MISSION TYPES & EXACT NASA DATA TYPES (2 TIERS EACH)
  // ========================================================================

  const MISSION_DOMAINS = [
    {
      id: 'earth',
      name: 'Earth Science',
      icon: '🌍',
      desc: 'Investigate Earth’s interconnected systems: atmosphere, oceans, biosphere, and climate energy balance.',
      dataTypes: [
        { id: 'thermal_energy', name: 'Thermal Energy', desc: 'Earth radiation budget and infrared surface heat emissions.' },
        { id: 'atmosphere', name: 'Atmosphere', desc: 'Atmospheric trace gases, greenhouse concentrations, and aerosols.' },
        { id: 'water', name: 'Water', desc: 'Hydrological cycle, soil moisture, and freshwater reserves.' },
        { id: 'ice', name: 'Ice', desc: 'Polar ice sheet thickness and cryospheric glacial retreat.' },
        { id: 'ocean', name: 'Ocean', desc: 'Sea surface salinity, ocean temperature, and current dynamics.' },
        { id: 'topography', name: 'Topography', desc: 'Digital elevation models, coastal erosion, and fault lines.' },
        { id: 'biosphere', name: 'Biosphere', desc: 'Vegetation canopy indices and planetary biomass productivity.' }
      ]
    },
    {
      id: 'planetary',
      name: 'Planetary Science',
      icon: '🪐',
      desc: 'Explore moons, terrestrial planets, and asteroids to understand the formation of the Solar System.',
      dataTypes: [
        { id: 'topography', name: 'Topography', desc: 'Impact crater morphology, tectonic rifts, and planetary relief.' },
        { id: 'temperature', name: 'Temperature', desc: 'Diurnal surface temperature gradients and thermal inertia.' },
        { id: 'minerals', name: 'Minerals', desc: 'Surface mineralogy, basaltic composition, and hydrous silicates.' },
        { id: 'atmosphere', name: 'Atmosphere', desc: 'Planetary atmospheric pressure, haze, and isotopic ratios.' },
        { id: 'gravity', name: 'Gravity', desc: 'Subsurface density anomalies and planetary core mass distribution.' },
        { id: 'magnetic_fields', name: 'Magnetic Fields', desc: 'Remnant crustal magnetism and induced magnetospheric shielding.' }
      ]
    },
    {
      id: 'helio',
      name: 'Heliophysics',
      icon: '☀️',
      desc: 'Examine the Sun, solar corona, space weather, and electromagnetic dynamics of the heliosphere.',
      dataTypes: [
        { id: 'irradiance', name: 'Irradiance', desc: 'Total solar irradiance (TSI) and extreme ultraviolet photon flux.' },
        { id: 'mag_elec_fields', name: 'Magnetic/Electric Fields', desc: 'Interplanetary magnetic field (IMF) polarity and Alfvén waves.' },
        { id: 'plasma', name: 'Plasma', desc: 'Solar wind density, velocity vectors, and coronal mass ejection shocks.' },
        { id: 'cosmic_rays', name: 'Cosmic Rays', desc: 'Galactic cosmic radiation flux and solar proton event intensities.' }
      ]
    },
    {
      id: 'astro',
      name: 'Astrophysics',
      icon: '🔭',
      desc: 'Discover distant galaxies, stellar evolution, black holes, and the fundamental physics of the cosmos.',
      dataTypes: [
        { id: 'light', name: 'Light', desc: 'High-precision optical, infrared, and ultraviolet photometric flux.' },
        { id: 'positioning', name: 'Positioning', desc: 'Astrometric parallax, stellar coordinates, and exoplanet wobbles.' },
        { id: 'redshift', name: 'Redshift', desc: 'Spectroscopic cosmological expansion and galactic velocity receding.' },
        { id: 'chemical_comp', name: 'Chemical Composition', desc: 'Stellar absorption line spectra, metallicity, and interstellar dust.' },
        { id: 'ray_bursts', name: 'Time & Ray Bursts', desc: 'Transient gamma-ray bursts (GRB), pulsars, and fast radio bursts.' }
      ]
    },
    {
      id: 'life',
      name: 'Biological & Physical Sciences',
      icon: '🧬',
      desc: 'Study biological organisms, microgravity effects, genetics, and physics in the spaceflight environment.',
      dataTypes: [
        { id: 'dna', name: 'DNA', desc: 'Genomic radiation damage, DNA repair enzymes, and mutation rates.' },
        { id: 'microbiomes', name: 'Microbiomes', desc: 'Microbial population shifts inside closed spacecraft environments.' },
        { id: 'body', name: 'Body', desc: 'Cardiovascular deconditioning, muscle atrophy, and bone density loss.' },
        { id: 'spaceflight_env', name: 'Spaceflight Environment', desc: 'Microgravity fluid dynamics, crystal growth, and cabin radiation.' }
      ]
    }
  ];

  // Tier 1 vs Tier 2 specs
  // Tier 1: Baseline cost, low mass/power, produces L0 raw data
  // Tier 2: High cost, high mass/power, produces L1 immediately! Requires Reputation >= 35.
  const TIER_SPECS = {
    1: {
      label: 'TIER 1 (STANDARD)',
      costMultiplier: 1.0,
      massBase: 50,
      powerBase: 70,
      yieldLevel: 'L0',
      dataDesc: 'Outputs Raw L0 Telemetry'
    },
    2: {
      label: 'TIER 2 (ADVANCED)',
      costMultiplier: 2.8,
      massBase: 140,
      powerBase: 190,
      yieldLevel: 'L1',
      dataDesc: 'Outputs Pre-Calibrated L1 Data'
    }
  };

  // Hardware Segments Catalog (Launch, Space, Ground)
  const CATALOG = {
    launch: [
      { id: 'light_rocket', name: 'AeroScout Light Rocket', cost: 120000, payloadMass: 1200, fairingVol: 4.5, velocityDV: 7.2, reliability: 89, desc: 'Cost-effective light launcher. Good for small LEO science payloads.' },
      { id: 'medium_rocket', name: 'Atlas Explorer Medium Lift', cost: 340000, payloadMass: 8500, fairingVol: 14.0, velocityDV: 9.8, reliability: 95, desc: 'Reliable multi-stage workhorse. Can boost heavy probes to deep Earth orbit or Moon.' },
      { id: 'heavy_rocket', name: 'Titan-V Heavy Lift Vehicle', cost: 750000, payloadMass: 25000, fairingVol: 32.0, velocityDV: 12.5, reliability: 98, desc: 'Massive cryogenic booster capable of carrying multi-sensor suites to deep space.' }
    ],

    space_bus: [
      { id: 'micro_bus', name: 'CubeSat Extended Bus', cost: 40000, dryMass: 80, volume: 1.5, basePower: 180, fuelCapacity: 200, reliability: 92, desc: 'Compact spacecraft bus with deployable solar panels.' },
      { id: 'standard_bus', name: 'Discovery Class Spacecraft Bus', cost: 150000, dryMass: 350, volume: 6.0, basePower: 650, fuelCapacity: 900, reliability: 96, desc: 'Full-featured planetary bus with dual-axis solar tracking arrays.' },
      { id: 'flagship_bus', name: 'Flagship Deep-Space Bus (RTG)', cost: 380000, dryMass: 850, volume: 15.0, basePower: 1200, fuelCapacity: 2400, reliability: 99, desc: 'Heavy nuclear-powered bus designed for extreme mission durations.' }
    ],

    ground: [
      { id: 'university_dish', name: 'Regional University Ground Station', cost: 30000, bandwidthMbps: 15, bufferMB: 1000, reliability: 90, desc: 'Low-cost dish network. Prone to weather downtime and packet drop.' },
      { id: 'commercial_sat', name: 'Commercial Satellite Network Relay', cost: 110000, bandwidthMbps: 85, bufferMB: 5000, reliability: 96, desc: 'Dedicated orbital tracking network with automated packet retries.' },
      { id: 'deep_space_net', name: 'NASA Deep Space Network (DSN) Allocation', cost: 240000, bandwidthMbps: 250, bufferMB: 20000, reliability: 99, desc: 'Goldstone, Madrid, and Canberra 70-meter dish array. Flawless telemetry lock.' }
    ]
  };

  // NASA Data Processing Levels (L0 -> L4)
  const DATA_LEVELS = {
    'L0': { name: 'Level 0 (Raw Data)', baseVal: 85000, next: 'L1A', refineCost: 15000, desc: 'Unprocessed instrument telemetry at full resolution.' },
    'L1A': { name: 'Level 1A (Annotated Raw)', baseVal: 125000, next: 'L1B', refineCost: 20000, desc: 'Time-referenced raw data annotated with ancillary parameters.' },
    'L1B': { name: 'Level 1B (Calibrated Raw)', baseVal: 175000, next: 'L1C', refineCost: 25000, desc: 'Radiometrically calibrated data in physical units.' },
    'L1C': { name: 'Level 1C (Calibrated + Inferred)', baseVal: 240000, next: 'L2', refineCost: 35000, desc: 'Calibrated data with inferred geometric and coordinate variables.' },
    'L2': { name: 'Level 2 (Derived Simulation)', baseVal: 340000, next: 'L2A', refineCost: 45000, desc: 'Geophysical variables derived with environmental simulation algorithms.' },
    'L2A': { name: 'Level 2A (Specified L2)', baseVal: 450000, next: 'L2B', refineCost: 55000, desc: 'High-precision domain-specific spatial subset.' },
    'L2B': { name: 'Level 2B (Calibrated L2A)', baseVal: 590000, next: 'L3', refineCost: 75000, desc: 'Cross-validated calibrated L2A dataset.' },
    'L3': { name: 'Level 3 (Stitched Map)', baseVal: 820000, next: 'L3A', refineCost: 110000, desc: 'Multi-observation spatial map projected on a uniform Earth/planetary grid.' },
    'L3A': { name: 'Level 3A (Temporal Stacking)', baseVal: 1150000, next: 'L4', refineCost: 160000, desc: 'Time-series stacked multi-mission interval dataset.' },
    'L4': { name: 'Level 4 (Integrated Multi-Sensor)', baseVal: 1850000, next: null, refineCost: 0, desc: 'Endgame comprehensive multi-sensor synthesis. Maximum commercial value.' }
  };

  // ========================================================================
  // 2. AUDIO SYNTHESIZER
  // ========================================================================

  let audioCtx = null;
  let sfxEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playQuindarTone() {
    if (!sfxEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2525, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch (e) {}
  }

  function playBeep(freq = 880, dur = 0.08) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }

  function playAlarm() {
    if (!sfxEnabled) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(880, now + 0.12);
      osc.frequency.setValueAtTime(520, now + 0.24);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(now + 0.38);
    } catch (e) {}
  }

  // ========================================================================
  // 3. PERSISTENT & TEMPORARY STATE
  // ========================================================================

  const state = {
    // Permanent Resources
    budget: 1200000,
    reputation: 50, // 0 - 100
    loansTaken: 0,
    dataInventory: [], // stored datasets for refinery & selling

    // Mission Process (Current Mission)
    stage: 1, // 1 to 7
    selectedDomain: null,
    selectedDataTargets: [], // array of { id, name, tier }
    activeRole: 'launch', // launch | space | ground | user
    saboteurMode: false,
    saboteurRole: null,

    // Design selections
    selections: {
      launchRocket: null,
      spaceBus: null,
      groundStation: null,
      customFuelAdd: 0
    },

    // Temporary Mission Resources
    tempResources: {
      mass: 0,
      maxMass: 0,
      power: 0,
      maxPower: 0,
      fuel: 0,
      volume: 0,
      maxVolume: 0,
      velocity: 0,
      reqVelocity: 7.8,
      totalCost: 0,
      reliabilityLaunch: 90,
      reliabilitySpace: 90,
      reliabilityGround: 90
    },

    // Flight Ops
    flight: {
      segment: 'launch', // launch -> space -> ground -> done
      progress: 0,
      running: false,
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null
    },

    // Refinery Selection
    selectedInventoryIdx: null
  };

  // ========================================================================
  // 4. DOM REFS
  // ========================================================================

  const DOM = {
    // Permanent HUD
    hudBudget: document.getElementById('hud-budget'),
    hudRep: document.getElementById('hud-rep'),
    gamemodeBadge: document.getElementById('gamemode-badge'),
    gamemodeText: document.getElementById('gamemode-text'),
    aiStatusDot: document.getElementById('ai-status-dot'),
    aiStatusText: document.getElementById('ai-status-text'),
    aiStatusPill: document.getElementById('ai-status-pill'),
    sfxToggle: document.getElementById('sfx-toggle'),
    sfxIcon: document.getElementById('sfx-icon'),
    sfxLabel: document.getElementById('sfx-label'),
    rulesBtn: document.getElementById('rules-btn'),

    // Roles
    roleTabs: {
      launch: document.getElementById('tab-role-launch'),
      space: document.getElementById('tab-role-space'),
      ground: document.getElementById('tab-role-ground'),
      user: document.getElementById('tab-role-user')
    },

    // Steppers
    steppers: [
      document.getElementById('step-nav-1'),
      document.getElementById('step-nav-2'),
      document.getElementById('step-nav-3'),
      document.getElementById('step-nav-4'),
      document.getElementById('step-nav-5'),
      document.getElementById('step-nav-6'),
      document.getElementById('step-nav-7')
    ],
    stages: [
      document.getElementById('stage-1'),
      document.getElementById('stage-2'),
      document.getElementById('stage-3'),
      document.getElementById('stage-4'),
      document.getElementById('stage-5'),
      document.getElementById('stage-6'),
      document.getElementById('stage-7')
    ],

    // Stage 1
    domainGrid: document.getElementById('domain-grid'),
    btnNextStage1: document.getElementById('btn-next-stage1'),

    // Stage 2
    stage2DomainTitle: document.getElementById('stage2-domain-title'),
    dataTypesContainer: document.getElementById('data-types-container'),
    btnBackStage2: document.getElementById('btn-back-stage2'),
    btnNextStage2: document.getElementById('btn-next-stage2'),

    // Stage 3
    reqDomainName: document.getElementById('req-domain-name'),
    reqDataTargets: document.getElementById('req-data-targets'),
    reqDeltaV: document.getElementById('req-deltav'),
    reqDuration: document.getElementById('req-duration'),
    reqGroundPass: document.getElementById('req-ground-pass'),
    reqMaxMass: document.getElementById('req-max-mass'),
    reqMinPower: document.getElementById('req-min-power'),
    reqMaxVol: document.getElementById('req-max-vol'),
    btnBackStage3: document.getElementById('btn-back-stage3'),
    btnNextStage3: document.getElementById('btn-next-stage3'),

    // Stage 4
    segTabs: document.querySelectorAll('.seg-tab'),
    segmentOptionsContainer: document.getElementById('segment-options-container'),
    valCost: document.getElementById('val-cost'),
    barCost: document.getElementById('bar-cost'),
    hintCost: document.getElementById('hint-cost'),
    valMass: document.getElementById('val-mass'),
    barMass: document.getElementById('bar-mass'),
    hintMass: document.getElementById('hint-mass'),
    valPower: document.getElementById('val-power'),
    barPower: document.getElementById('bar-power'),
    hintPower: document.getElementById('hint-power'),
    valVol: document.getElementById('val-vol'),
    barVol: document.getElementById('bar-vol'),
    hintVol: document.getElementById('hint-vol'),
    valVel: document.getElementById('val-vel'),
    barVel: document.getElementById('bar-vel'),
    hintVel: document.getElementById('hint-vel'),
    relLaunch: document.getElementById('rel-launch'),
    relSpace: document.getElementById('rel-space'),
    relGround: document.getElementById('rel-ground'),
    btnBackStage4: document.getElementById('btn-back-stage4'),
    btnNextStage4: document.getElementById('btn-next-stage4'),

    // Stage 5
    testList: document.getElementById('test-list'),
    btnRunTests: document.getElementById('btn-run-tests'),
    invCurrentBudget: document.getElementById('inv-current-budget'),
    invCost: document.getElementById('inv-cost'),
    invRemaining: document.getElementById('inv-remaining'),
    btnBackStage5: document.getElementById('btn-back-stage5'),
    btnNextStage5: document.getElementById('btn-next-stage5'),

    // Stage 6
    flightPhaseName: document.getElementById('flight-phase-name'),
    flightSegmentName: document.getElementById('flight-segment-name'),
    flightDataCounter: document.getElementById('flight-data-counter'),
    flightCanvas: document.getElementById('flight-canvas'),
    fgBarLaunch: document.getElementById('fg-bar-launch'),
    fgValLaunch: document.getElementById('fg-val-launch'),
    fgBarSpace: document.getElementById('fg-bar-space'),
    fgValSpace: document.getElementById('fg-val-space'),
    fgBarGround: document.getElementById('fg-bar-ground'),
    fgValGround: document.getElementById('fg-val-ground'),
    flightTerminal: document.getElementById('flight-terminal'),
    anomalyAlertBox: document.getElementById('anomaly-alert-box'),
    anomalySegmentBadge: document.getElementById('anomaly-segment-badge'),
    anomalySummary: document.getElementById('anomaly-summary'),
    btnStartMinigame: document.getElementById('btn-start-minigame'),
    btnCompleteFlight: document.getElementById('btn-complete-flight'),

    // Stage 7 (Refinery & Market)
    dataInventoryList: document.getElementById('data-inventory-list'),
    processingRecipe: document.getElementById('processing-recipe'),
    processingControls: document.getElementById('processing-controls'),
    btnRefineData: document.getElementById('btn-refine-data'),
    btnTakeLoan: document.getElementById('btn-take-loan'),
    btnNextMissionLoop: document.getElementById('btn-next-mission-loop'),

    // Minigame Modal
    minigameModal: document.getElementById('minigame-modal'),
    minigameTitle: document.getElementById('minigame-title'),
    minigameRoleTag: document.getElementById('minigame-role-tag'),
    minigameInstruction: document.getElementById('minigame-instruction'),
    minigameCanvas: document.getElementById('minigame-canvas'),
    minigameControls: document.getElementById('minigame-controls'),
    minigameTimerFill: document.getElementById('minigame-timer-fill'),
    btnSubmitMinigame: document.getElementById('btn-submit-minigame'),

    // Other Modals
    aiModal: document.getElementById('ai-modal'),
    aiModalClose: document.getElementById('ai-modal-close'),
    btnSaveAi: document.getElementById('btn-save-ai'),
    btnTestAi: document.getElementById('btn-test-ai'),
    rulesModal: document.getElementById('rules-modal'),
    rulesModalClose: document.getElementById('rules-modal-close'),
    btnCloseRules: document.getElementById('btn-close-rules')
  };

  // ========================================================================
  // 5. HUD UPDATES & PERMANENT ECONOMY
  // ========================================================================

  function updatePermanentHud() {
    DOM.hudBudget.textContent = `$${state.budget.toLocaleString()}`;
    DOM.hudRep.textContent = `${state.reputation} / 100`;

    if (state.reputation < 35) {
      DOM.hudRep.className = 'res-val text-amber';
    } else {
      DOM.hudRep.className = 'res-val text-emerald';
    }
  }

  function goToStage(stageNum) {
    playQuindarTone();
    state.stage = stageNum;

    DOM.stages.forEach((s, idx) => {
      s.classList.toggle('active', idx === stageNum - 1);
    });

    DOM.steppers.forEach((s, idx) => {
      s.classList.toggle('active', idx === stageNum - 1);
      s.classList.toggle('completed', idx < stageNum - 1);
    });

    if (stageNum === 2) renderStage2DataTypes();
    if (stageNum === 3) renderStage3Requirements();
    if (stageNum === 4) { renderStage4Design(); calculateTempResources(); }
    if (stageNum === 5) renderStage5Verification();
    if (stageNum === 6) startStage6Flight();
    if (stageNum === 7) renderStage7RefineryAndMarket();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================================
  // 6. STAGE 1: SET GOAL (CHOOSE MISSION TYPE)
  // ========================================================================

  function renderStage1Domains() {
    DOM.domainGrid.innerHTML = '';
    MISSION_DOMAINS.forEach(dom => {
      const card = document.createElement('div');
      card.className = `domain-card ${state.selectedDomain?.id === dom.id ? 'selected' : ''}`;
      
      const typeNames = dom.dataTypes.map(d => d.name).slice(0, 4).join(', ') + '...';

      card.innerHTML = `
        <div class="domain-icon">${dom.icon}</div>
        <h3>${dom.name}</h3>
        <p class="domain-desc">${dom.desc}</p>
        <div class="domain-types-preview">Targets: ${typeNames}</div>
      `;

      card.addEventListener('click', () => {
        playBeep(700);
        state.selectedDomain = dom;
        state.selectedDataTargets = []; // reset targets on domain change
        document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        DOM.btnNextStage1.disabled = false;
      });

      DOM.domainGrid.appendChild(card);
    });
  }

  // ========================================================================
  // 7. STAGE 2: DEFINE CONCEPT (CHOOSE SPECIFIC DATA TARGETS)
  // ========================================================================

  function renderStage2DataTypes() {
    DOM.stage2DomainTitle.textContent = `STAGE 2: DEFINE CONCEPT // ${state.selectedDomain.name.toUpperCase()} DATA TARGETS`;
    DOM.dataTypesContainer.innerHTML = '';

    state.selectedDomain.dataTypes.forEach(dt => {
      // Find if already selected
      const existing = state.selectedDataTargets.find(t => t.id === dt.id);
      const isSelected = !!existing;
      const currentTier = existing ? existing.tier : 1;

      const card = document.createElement('div');
      card.className = `datatype-card ${isSelected ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="datatype-header">
          <h4>${dt.name}</h4>
          <div class="tier-toggle-group">
            <button class="tier-btn ${currentTier === 1 ? 'active' : ''}" data-tier="1">T1</button>
            <button class="tier-btn ${currentTier === 2 ? 'active' : ''}" data-tier="2" ${state.reputation < 35 ? 'title="Requires 35+ Reputation"' : ''}>
              T2 ${state.reputation < 35 ? '🔒' : ''}
            </button>
          </div>
        </div>
        <p class="datatype-desc">${dt.desc}</p>
        <div class="tier-specs-row">
          <span>Yield: <strong class="text-cyan">${currentTier === 1 ? 'L0 Raw' : 'L1 Calibrated'}</strong></span>
          <span>Mass: <strong>${TIER_SPECS[currentTier].massBase} kg</strong></span>
          <span>Power: <strong>${TIER_SPECS[currentTier].powerBase} W</strong></span>
        </div>
        <button class="btn-select-target ${isSelected ? 'active' : ''}">
          ${isSelected ? '✅ TARGET SELECTED' : '+ ADD TO MISSION CONCEPT'}
        </button>
      `;

      // Tier buttons
      const btnT1 = card.querySelector('[data-tier="1"]');
      const btnT2 = card.querySelector('[data-tier="2"]');
      const btnSelect = card.querySelector('.btn-select-target');

      btnT1.addEventListener('click', (e) => {
        e.stopPropagation();
        if (existing) existing.tier = 1;
        renderStage2DataTypes();
      });

      btnT2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.reputation < 35) {
          playAlarm();
          alert('Tier 2 advanced data collection requires at least 35 Reputation!');
          return;
        }
        if (existing) existing.tier = 2;
        renderStage2DataTypes();
      });

      btnSelect.addEventListener('click', () => {
        playBeep(isSelected ? 500 : 880);
        if (isSelected) {
          state.selectedDataTargets = state.selectedDataTargets.filter(t => t.id !== dt.id);
        } else {
          if (state.selectedDataTargets.length >= 3) {
            playAlarm();
            alert('A single spacecraft can target a maximum of 3 scientific phenomena simultaneously.');
            return;
          }
          state.selectedDataTargets.push({ id: dt.id, name: dt.name, tier: currentTier, desc: dt.desc });
        }
        renderStage2DataTypes();
        DOM.btnNextStage2.disabled = state.selectedDataTargets.length === 0;
      });

      DOM.dataTypesContainer.appendChild(card);
    });

    DOM.btnNextStage2.disabled = state.selectedDataTargets.length === 0;
  }

  // ========================================================================
  // 8. STAGE 3: DEFINE REQUIREMENTS OUTLINE
  // ========================================================================

  function renderStage3Requirements() {
    DOM.reqDomainName.textContent = state.selectedDomain.name;
    DOM.reqDataTargets.textContent = state.selectedDataTargets.map(t => `${t.name} (T${t.tier})`).join(', ');

    // Calculate baseline requirement thresholds based on selected targets
    let estMinMass = 600;
    let estMinPower = 350;
    let estMinVol = 4.0;
    let reqDeltaV = 8.2;

    state.selectedDataTargets.forEach(t => {
      estMinMass += TIER_SPECS[t.tier].massBase * 2.2;
      estMinPower += TIER_SPECS[t.tier].powerBase;
      estMinVol += 2.0;
    });

    DOM.reqMaxMass.textContent = `~${Math.round(estMinMass).toLocaleString()} kg minimum`;
    DOM.reqMinPower.textContent = `≥ ${estMinPower} W continuous`;
    DOM.reqMaxVol.textContent = `≥ ${estMinVol.toFixed(1)} m³ fairing space`;
    DOM.reqDeltaV.textContent = `${reqDeltaV.toFixed(1)} km/s`;

    state.tempResources.reqVelocity = reqDeltaV;
  }

  // ========================================================================
  // 9. STAGE 4: DESIGN & PROCUREMENT (4 SEGMENTS)
  // ========================================================================

  let activeDesignSegment = 'launch';

  function renderStage4Design() {
    DOM.segmentOptionsContainer.innerHTML = '';

    let items = [];
    if (activeDesignSegment === 'launch') items = CATALOG.launch;
    else if (activeDesignSegment === 'space') items = CATALOG.space_bus;
    else if (activeDesignSegment === 'ground') items = CATALOG.ground;

    items.forEach(item => {
      let isSelected = false;
      if (activeDesignSegment === 'launch') isSelected = state.selections.launchRocket === item.id;
      if (activeDesignSegment === 'space') isSelected = state.selections.spaceBus === item.id;
      if (activeDesignSegment === 'ground') isSelected = state.selections.groundStation === item.id;

      const card = document.createElement('div');
      card.className = `opt-card ${isSelected ? 'selected' : ''}`;

      let metricsHtml = `<div class="metric-tag"><span class="label">COST</span><span class="val text-cyan">$${item.cost.toLocaleString()}</span></div>`;
      if (item.payloadMass) metricsHtml += `<div class="metric-tag"><span class="label">MAX PAYLOAD</span><span class="val text-emerald">${item.payloadMass.toLocaleString()} kg</span></div>`;
      if (item.velocityDV) metricsHtml += `<div class="metric-tag"><span class="label">DELTA-V</span><span class="val text-amber">${item.velocityDV} km/s</span></div>`;
      if (item.basePower) metricsHtml += `<div class="metric-tag"><span class="label">POWER BUS</span><span class="val text-amber">${item.basePower} W</span></div>`;
      if (item.volume) metricsHtml += `<div class="metric-tag"><span class="label">VOLUME</span><span class="val">${item.volume} m³</span></div>`;
      if (item.bandwidthMbps) metricsHtml += `<div class="metric-tag"><span class="label">BANDWIDTH</span><span class="val text-emerald">${item.bandwidthMbps} Mbps</span></div>`;
      if (item.reliability) metricsHtml += `<div class="metric-tag"><span class="label">RELIABILITY</span><span class="val">${item.reliability}%</span></div>`;

      card.innerHTML = `
        <div class="opt-info">
          <div class="opt-title">${item.name}</div>
          <div class="opt-desc">${item.desc}</div>
        </div>
        <div class="opt-metrics">
          ${metricsHtml}
        </div>
      `;

      card.addEventListener('click', () => {
        playBeep(750);
        if (activeDesignSegment === 'launch') state.selections.launchRocket = item.id;
        if (activeDesignSegment === 'space') state.selections.spaceBus = item.id;
        if (activeDesignSegment === 'ground') state.selections.groundStation = item.id;
        renderStage4Design();
        calculateTempResources();
      });

      DOM.segmentOptionsContainer.appendChild(card);
    });
  }

  function calculateTempResources() {
    const sel = state.selections;

    const rocket = CATALOG.launch.find(i => i.id === sel.launchRocket);
    const bus = CATALOG.space_bus.find(i => i.id === sel.spaceBus);
    const ground = CATALOG.ground.find(i => i.id === sel.groundStation);

    let totalCost = 0;
    let totalMass = 0;
    let maxMass = rocket ? rocket.payloadMass : 0;
    let powerGen = bus ? bus.basePower : 0;
    let powerConsumed = 90; // base avionics
    let volumeUsed = 0;
    let maxVolume = bus ? bus.volume : 0;
    let velocityDV = rocket ? rocket.velocityDV : 0;
    let relLaunch = rocket ? rocket.reliability : 90;
    let relSpace = bus ? bus.reliability : 90;
    let relGround = ground ? ground.reliability : 90;

    if (rocket) totalCost += rocket.cost;
    if (bus) {
      totalCost += bus.cost;
      totalMass += bus.dryMass + bus.fuelCapacity;
    }
    if (ground) totalCost += ground.cost;

    // Instruments from Stage 2
    state.selectedDataTargets.forEach(t => {
      const spec = TIER_SPECS[t.tier];
      const instCost = Math.round(55000 * spec.costMultiplier);
      totalCost += instCost;
      totalMass += spec.massBase;
      powerConsumed += spec.powerBase;
      volumeUsed += 1.2;
    });

    state.tempResources = {
      mass: totalMass,
      maxMass,
      power: powerConsumed,
      maxPower: powerGen,
      fuel: bus ? bus.fuelCapacity : 0,
      volume: volumeUsed,
      maxVolume,
      velocity: velocityDV,
      reqVelocity: state.tempResources.reqVelocity,
      totalCost,
      reliabilityLaunch: relLaunch,
      reliabilitySpace: relSpace,
      reliabilityGround: relGround
    };

    // Update HUD
    DOM.valCost.textContent = `$${totalCost.toLocaleString()} / $${state.budget.toLocaleString()}`;
    const costPct = state.budget > 0 ? Math.min(100, Math.round((totalCost / state.budget) * 100)) : 0;
    DOM.barCost.style.width = `${costPct}%`;
    DOM.barCost.className = `progress-bar ${totalCost > state.budget ? 'danger' : ''}`;
    DOM.hintCost.textContent = totalCost > state.budget ? '⚠️ INSUFFICIENT PERMANENT FUNDS!' : `Balance remaining: $${(state.budget - totalCost).toLocaleString()}`;

    // Mass
    DOM.valMass.textContent = `${totalMass.toLocaleString()} / ${maxMass.toLocaleString()} kg`;
    const massPct = maxMass > 0 ? Math.min(100, Math.round((totalMass / maxMass) * 100)) : 0;
    DOM.barMass.style.width = `${massPct}%`;
    DOM.barMass.style.background = totalMass > maxMass ? 'var(--color-crimson)' : 'var(--color-cyan)';

    // Power
    DOM.valPower.textContent = `${powerConsumed} W req / ${powerGen} W bus`;
    const powerPct = powerGen > 0 ? Math.min(100, Math.round((powerConsumed / powerGen) * 100)) : 0;
    DOM.barPower.style.width = `${powerPct}%`;
    DOM.barPower.style.background = powerConsumed > powerGen ? 'var(--color-crimson)' : 'var(--color-amber)';

    // Volume
    DOM.valVol.textContent = `${volumeUsed.toFixed(1)} / ${maxVolume.toFixed(1)} m³`;
    const volPct = maxVolume > 0 ? Math.min(100, Math.round((volumeUsed / maxVolume) * 100)) : 0;
    DOM.barVol.style.width = `${volPct}%`;
    DOM.barVol.style.background = volumeUsed > maxVolume ? 'var(--color-crimson)' : 'var(--color-purple)';

    // Velocity
    DOM.valVel.textContent = `${velocityDV.toFixed(1)} / ${state.tempResources.reqVelocity.toFixed(1)} km/s`;
    const velPct = state.tempResources.reqVelocity > 0 ? Math.min(100, Math.round((velocityDV / state.tempResources.reqVelocity) * 100)) : 0;
    DOM.barVel.style.width = `${velPct}%`;
    DOM.barVel.style.background = velocityDV < state.tempResources.reqVelocity ? 'var(--color-crimson)' : 'var(--color-emerald)';

    // Reliabilities
    DOM.relLaunch.textContent = `${relLaunch}%`;
    DOM.relSpace.textContent = `${relSpace}%`;
    DOM.relGround.textContent = `${relGround}%`;

    const isValid = (
      rocket && bus && ground &&
      totalMass <= maxMass &&
      powerConsumed <= powerGen &&
      volumeUsed <= maxVolume &&
      velocityDV >= state.tempResources.reqVelocity &&
      totalCost <= state.budget
    );

    DOM.btnNextStage4.disabled = !isValid;
  }

  // ========================================================================
  // 10. STAGE 5: BUILD & VERIFY
  // ========================================================================

  let testsPassed = false;

  function renderStage5Verification() {
    testsPassed = false;
    DOM.btnNextStage5.disabled = true;

    DOM.invCurrentBudget.textContent = `$${state.budget.toLocaleString()}`;
    DOM.invCost.textContent = `-$${state.tempResources.totalCost.toLocaleString()}`;
    DOM.invRemaining.textContent = `$${(state.budget - state.tempResources.totalCost).toLocaleString()}`;

    // Reset test list
    DOM.testList.innerHTML = `
      <li id="test-launch">⏳ Launch Segment: Structural load &amp; fairing clearance...</li>
      <li id="test-prop">⏳ Propulsion System: Specific impulse &amp; delta-v margin...</li>
      <li id="test-power">⏳ Electrical Bus: Solar &amp; battery discharge test...</li>
      <li id="test-sensors">⏳ Scientific Instruments: Sensor calibration &amp; optics...</li>
      <li id="test-ground">⏳ Ground Receiver: Telemetry link &amp; packet synchronizer...</li>
    `;
  }

  function runSystemDiagnostics() {
    playBeep(900);
    const tests = [
      { id: 'test-launch', name: 'Launch Segment: Fairing & Payload Integration', pass: state.tempResources.mass <= state.tempResources.maxMass },
      { id: 'test-prop', name: 'Propulsion: Velocity Delta-V Check', pass: state.tempResources.velocity >= state.tempResources.reqVelocity },
      { id: 'test-power', name: 'Power Bus: Load vs Generation Equilibrium', pass: state.tempResources.power <= state.tempResources.maxPower },
      { id: 'test-sensors', name: 'Scientific Sensors: Internal Optical Diagnostic', pass: true },
      { id: 'test-ground', name: 'Ground Link: Handshake Protocol', pass: true }
    ];

    tests.forEach((t, i) => {
      setTimeout(() => {
        const el = document.getElementById(t.id);
        if (el) {
          el.className = t.pass ? 'passed' : 'failed';
          el.textContent = `${t.pass ? '✅' : '❌'} ${t.name}: ${t.pass ? 'VERIFIED PASSED' : 'OUT OF TOLERANCE'}`;
        }
        playBeep(t.pass ? 880 : 350);
        if (i === tests.length - 1) {
          testsPassed = true;
          DOM.btnNextStage5.disabled = false;
        }
      }, (i + 1) * 350);
    });
  }

  // ========================================================================
  // 11. STAGE 6: IMPLEMENT (FLIGHT OPS & EVENT MINIGAMES)
  // ========================================================================

  let flightAnimId = null;
  let flightProgress = 0;
  let canvasFlightCtx = null;

  function startStage6Flight() {
    // Deduct permanent cost
    state.budget -= state.tempResources.totalCost;
    updatePermanentHud();

    state.flight = {
      segment: 'launch',
      progress: 0,
      running: true,
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null
    };

    DOM.anomalyAlertBox.style.display = 'none';
    DOM.btnCompleteFlight.style.display = 'none';
    DOM.flightTerminal.innerHTML = '';
    logFlightMessage('🚀 IGNITION: Booster thrust verified. Clearing launch pad tower.');

    const canvas = DOM.flightCanvas;
    canvasFlightCtx = canvas.getContext('2d');

    flightProgress = 0;
    if (flightAnimId) cancelAnimationFrame(flightAnimId);
    runFlightLoop();

    // Trigger scheduled segment transitions and random anomalies
    scheduleFlightMilestones();
  }

  function logFlightMessage(msg, isAlert = false) {
    const el = document.createElement('div');
    el.className = 'event-message';
    el.innerHTML = `<span class="timestamp">[T+${Math.round(flightProgress * 100)}s ${isAlert ? 'ALERT' : 'INFO'}]</span> ${msg}`;
    DOM.flightTerminal.appendChild(el);
    DOM.flightTerminal.scrollTop = DOM.flightTerminal.scrollHeight;
  }

  function scheduleFlightMilestones() {
    // Launch Segment milestone (T+25%)
    setTimeout(() => {
      if (!state.flight.running) return;
      state.flight.segment = 'space';
      DOM.flightSegmentName.textContent = 'SPACE SEGMENT';
      DOM.flightPhaseName.textContent = 'STAGE SEPARATION & FAIRING JETTISON';
      logFlightMessage('🛰️ First stage separation confirmed. Spacecraft bus deployed solar arrays.');
      triggerSegmentAnomaly('launch');
    }, 4500);

    // Space Segment milestone (T+55%)
    setTimeout(() => {
      if (!state.flight.running) return;
      DOM.flightPhaseName.textContent = 'SCIENCE INSTRUMENT CALIBRATION';
      logFlightMessage('🔬 Space Segment: Instruments online. Commencing data collection across chosen targets.');
      state.flight.dataAccumulatedMB += 450;
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;
      triggerSegmentAnomaly('space');
    }, 11000);

    // Ground Segment milestone (T+80%)
    setTimeout(() => {
      if (!state.flight.running) return;
      state.flight.segment = 'ground';
      DOM.flightSegmentName.textContent = 'GROUND SEGMENT';
      DOM.flightPhaseName.textContent = 'DOWNLINKING TELEMETRY PACKETS';
      logFlightMessage('📡 Ground Segment: Earth tracking dish locked onto Ku/Ka-band signal carrier.');
      state.flight.dataAccumulatedMB += 950;
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;
      triggerSegmentAnomaly('ground');
    }, 18000);

    // Flight Completion
    setTimeout(() => {
      if (!state.flight.running) return;
      state.flight.segment = 'done';
      DOM.flightPhaseName.textContent = 'MISSION FLIGHT OPERATIONS COMPLETE';
      logFlightMessage('🎉 MISSION COMPLETED: All telemetry buffers downlinked successfully to Earth.');
      DOM.btnCompleteFlight.style.display = 'block';
    }, 25000);
  }

  function triggerSegmentAnomaly(seg) {
    if (state.flight.anomalyActive) return;

    // Saboteur mode check: Saboteur creates higher risk!
    const isSabotaged = state.saboteurMode && (state.saboteurRole === seg);

    let anomaly = null;
    if (seg === 'launch') {
      anomaly = {
        title: isSabotaged ? '🚨 CRITICAL VALVE PRESSURE SURGE (SABOTAGE DETECTED!)' : '⚠️ MECHANICAL VALVE PRESSURE SURGE',
        seg: 'launch',
        desc: 'Rocket propellant chamber pressure oscillating rapidly. Launch Player must stabilize the regulator valve!',
        minigameType: 'pressure'
      };
    } else if (seg === 'space') {
      anomaly = {
        title: isSabotaged ? '🚨 SENSOR SENSITIVITY SPIKE (SABOTAGE DETECTED!)' : '⚠️ SENSOR OPTICAL MISALIGNMENT',
        seg: 'space',
        desc: 'Spacecraft star-tracker drift causing sensor optical detune. Space Player must tune the frequency slider!',
        minigameType: 'frequency'
      };
    } else if (seg === 'ground') {
      anomaly = {
        title: isSabotaged ? '🚨 GROUND BUFFER OVERFLOW (SABOTAGE DETECTED!)' : '⚠️ GROUND STATION AZIMUTH DRIFT',
        seg: 'ground',
        desc: 'Tracking dish slewing off-axis. Packet loss detected! Ground Player must lock the tracking angle!',
        minigameType: 'dish'
      };
    }

    state.flight.anomalyActive = true;
    state.flight.activeAnomalyData = anomaly;

    DOM.anomalySegmentBadge.textContent = anomaly.title;
    DOM.anomalySummary.textContent = anomaly.desc;
    DOM.anomalyAlertBox.style.display = 'block';
    playAlarm();
  }

  function runFlightLoop() {
    if (state.stage !== 6) return;

    const ctx = canvasFlightCtx;
    const w = DOM.flightCanvas.width;
    const h = DOM.flightCanvas.height;

    ctx.clearRect(0, 0, w, h);

    if (state.flight.running && flightProgress < 1.0) {
      flightProgress += 0.001;
    }

    // Draw Space / Earth Background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, w, h);

    // Trajectory Curve
    ctx.beginPath();
    ctx.moveTo(60, h - 40);
    ctx.quadraticCurveTo(w * 0.4, 60, w - 80, 100);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Compute probe position along quadratic curve
    const t = flightProgress;
    const p0x = 60, p0y = h - 40;
    const p1x = w * 0.4, p1y = 60;
    const p2x = w - 80, p2y = 100;

    const curX = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
    const curY = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;

    // Rocket / Spacecraft Probe
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Thrust flame
    ctx.beginPath();
    ctx.arc(curX - 8, curY + 6, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    // Update Telemetry bars
    DOM.fgBarLaunch.style.width = `${state.flight.launchIntegrity}%`;
    DOM.fgValLaunch.textContent = `${state.flight.launchIntegrity}%`;
    DOM.fgBarSpace.style.width = `${state.flight.spaceIntegrity}%`;
    DOM.fgValSpace.textContent = `${state.flight.spaceIntegrity}%`;
    DOM.fgBarGround.style.width = `${state.flight.groundIntegrity}%`;
    DOM.fgValGround.textContent = `${state.flight.groundIntegrity}%`;

    flightAnimId = requestAnimationFrame(runFlightLoop);
  }

  // ========================================================================
  // 12. EVENT MINIGAME ENGINE (Pressure / Frequency / Dish)
  // ========================================================================

  let minigameTimer = null;
  let minigameCurrentVal = 50;
  let minigameTargetVal = 50;
  let minigameTimeLeft = 100;

  function launchMinigame() {
    const anomaly = state.flight.activeAnomalyData;
    if (!anomaly) return;

    DOM.minigameTitle.textContent = anomaly.title;
    DOM.minigameRoleTag.textContent = `${anomaly.seg.toUpperCase()} PLAYER STATION`;
    DOM.minigameModal.classList.add('active');

    minigameTimeLeft = 100;
    DOM.minigameTimerFill.style.width = '100%';

    const controlsDiv = DOM.minigameControls;
    controlsDiv.innerHTML = '';

    minigameTargetVal = Math.floor(Math.random() * 60) + 20;
    minigameCurrentVal = 10;

    if (anomaly.minigameType === 'pressure') {
      DOM.minigameInstruction.textContent = 'Keep the pressure needle centered inside the green target zone by tapping the pressure relief valve!';
      const btnPump = document.createElement('button');
      btnPump.className = 'action-btn primary';
      btnPump.textContent = 'PUMP VALVE (+15 PSI)';
      btnPump.onclick = () => {
        playBeep(700);
        minigameCurrentVal = Math.min(100, minigameCurrentVal + 15);
      };
      controlsDiv.appendChild(btnPump);
    } else {
      DOM.minigameInstruction.textContent = 'Slide the tuner to align the frequency wave directly with the carrier baseline!';
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '0';
      slider.max = '100';
      slider.value = '10';
      slider.style.width = '240px';
      slider.oninput = (e) => {
        minigameCurrentVal = parseInt(e.target.value);
      };
      controlsDiv.appendChild(slider);
    }

    if (minigameTimer) clearInterval(minigameTimer);
    minigameTimer = setInterval(() => {
      minigameTimeLeft -= 2;
      DOM.minigameTimerFill.style.width = `${minigameTimeLeft}%`;

      if (anomaly.minigameType === 'pressure') {
        minigameCurrentVal = Math.max(0, minigameCurrentVal - 1.5);
      }

      drawMinigameCanvas();

      if (minigameTimeLeft <= 0) {
        clearInterval(minigameTimer);
        evaluateMinigameOutcome(false); // timed out = failure!
      }
    }, 100);
  }

  function drawMinigameCanvas() {
    const canvas = DOM.minigameCanvas;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Target zone
    const targetX = (minigameTargetVal / 100) * (w - 60) + 30;
    ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
    ctx.fillRect(targetX - 25, 20, 50, h - 40);
    ctx.strokeStyle = 'var(--color-emerald)';
    ctx.strokeRect(targetX - 25, 20, 50, h - 40);

    // Current needle
    const curX = (minigameCurrentVal / 100) * (w - 60) + 30;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(curX, 15);
    ctx.lineTo(curX, h - 15);
    ctx.stroke();
    ctx.lineWidth = 1;

    // Text readouts
    ctx.fillStyle = '#fff';
    ctx.font = '12px "JetBrains Mono"';
    ctx.fillText(`Target: ${minigameTargetVal}`, 20, 30);
    ctx.fillText(`Current: ${Math.round(minigameCurrentVal)}`, 20, 50);
  }

  function evaluateMinigameOutcome(forceWin = false) {
    if (minigameTimer) clearInterval(minigameTimer);
    DOM.minigameModal.classList.remove('active');

    const diff = Math.abs(minigameCurrentVal - minigameTargetVal);
    const success = forceWin || (diff < 20);
    const anomaly = state.flight.activeAnomalyData;

    if (success) {
      playBeep(1200);
      logFlightMessage(`✅ ANOMALY RESOLVED: ${anomaly.seg.toUpperCase()} player stabilized the issue!`);
      DOM.anomalyAlertBox.style.display = 'none';
      state.flight.anomalyActive = false;
    } else {
      playAlarm();
      logFlightMessage(`❌ ANOMALY FAILED: System suffered damage in ${anomaly.seg.toUpperCase()} segment!`, true);

      // Apply segment failure outcomes from prompt specifications!
      if (anomaly.seg === 'launch') {
        state.flight.launchIntegrity = 0;
        state.flight.running = false;
        // Failed launch segment = lots of budget loss and damage, mission immediate failure
        const penalty = 250000;
        state.budget = Math.max(0, state.budget - penalty);
        updatePermanentHud();
        alert(`🚨 LAUNCH SEGMENT FAILURE! The rocket suffered structural breakup. You lost an additional $${penalty.toLocaleString()} in salvage fees and the mission immediately failed.`);
        goToStage(7);
      } else if (anomaly.seg === 'space') {
        state.flight.spaceIntegrity = 0;
        // Failed space segment = no data collected, complete waste
        state.flight.dataAccumulatedMB = 0;
        alert(`⚠️ SPACE SEGMENT FAILURE! Scientific instruments burned out. Zero scientific data collected on this mission.`);
      } else if (anomaly.seg === 'ground') {
        state.flight.groundIntegrity = 0;
        // Failed ground segment = no data received, complete waste
        state.flight.dataAccumulatedMB = 0;
        alert(`⚠️ GROUND SEGMENT FAILURE! Antenna tracking lost carrier lock. Zero data received on Earth.`);
      }

      DOM.anomalyAlertBox.style.display = 'none';
      state.flight.anomalyActive = false;
    }
  }

  // ========================================================================
  // 13. STAGE 7: DATA REFINERY (L0 -> L4) & USER SEGMENT MARKET
  // ========================================================================

  function renderStage7RefineryAndMarket() {
    // Generate data cards from successful mission
    if (state.flight.dataAccumulatedMB > 0) {
      state.selectedDataTargets.forEach(t => {
        const initialLevel = t.tier === 2 ? 'L1' : 'L0';
        state.dataInventory.push({
          id: `data_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          targetName: t.name,
          domain: state.selectedDomain.name,
          level: initialLevel,
          estValue: DATA_LEVELS[initialLevel].baseVal
        });
      });
      state.flight.dataAccumulatedMB = 0; // consumed
    }

    renderInventoryList();
    updatePermanentHud();
  }

  function renderInventoryList() {
    DOM.dataInventoryList.innerHTML = '';

    if (state.dataInventory.length === 0) {
      DOM.dataInventoryList.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.8rem;">No datasets in inventory. Complete a flight to gather L0/L1 data!</p>`;
      DOM.processingControls.style.display = 'none';
      DOM.processingRecipe.innerHTML = `<p>Select a data package from your inventory above to view available refinement recipes.</p>`;
      return;
    }

    state.dataInventory.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `data-card ${state.selectedInventoryIdx === idx ? 'selected' : ''}`;

      card.innerHTML = `
        <span class="data-level-badge">${item.level}</span>
        <strong class="data-type-name">${item.targetName}</strong>
        <span style="font-size: 0.7rem; color: var(--text-muted);">${item.domain}</span>
        <span class="data-est-val">$${item.estValue.toLocaleString()}</span>
      `;

      card.addEventListener('click', () => {
        playBeep(700);
        state.selectedInventoryIdx = idx;
        renderInventoryList();
        renderRefineryWorkbench(item);
      });

      DOM.dataInventoryList.appendChild(card);
    });

    if (state.selectedInventoryIdx !== null && state.dataInventory[state.selectedInventoryIdx]) {
      renderRefineryWorkbench(state.dataInventory[state.selectedInventoryIdx]);
    }
  }

  function renderRefineryWorkbench(item) {
    const curLevelInfo = DATA_LEVELS[item.level];
    if (!curLevelInfo || !curLevelInfo.next) {
      DOM.processingRecipe.innerHTML = `
        <h4>${item.level} // MAX REFINEMENT REACHED</h4>
        <p>${curLevelInfo.desc}</p>
        <p class="text-emerald">This is an endgame refined dataset. Ready for maximum market sale!</p>
      `;
      DOM.processingControls.style.display = 'none';
      return;
    }

    const nextLevelKey = curLevelInfo.next;
    const nextLevelInfo = DATA_LEVELS[nextLevelKey];

    DOM.processingRecipe.innerHTML = `
      <h4>REFINEMENT PIPELINE: ${item.level} &rarr; ${nextLevelKey}</h4>
      <p><strong>Current:</strong> ${curLevelInfo.name} ($${curLevelInfo.baseVal.toLocaleString()})</p>
      <p><strong>Target:</strong> ${nextLevelInfo.name} ($${nextLevelInfo.baseVal.toLocaleString()})</p>
      <p style="font-size: 0.75rem; color: var(--color-cyan); margin-top: 0.4rem;">${nextLevelInfo.desc}</p>
      <p style="margin-top: 0.5rem;">Refinement Cost: <strong class="text-amber">$${curLevelInfo.refineCost.toLocaleString()}</strong></p>
    `;

    DOM.processingControls.style.display = 'block';
    DOM.btnRefineData.textContent = `REFINE TO ${nextLevelKey} (-$${curLevelInfo.refineCost.toLocaleString()})`;
    DOM.btnRefineData.disabled = state.budget < curLevelInfo.refineCost;
  }

  function refineSelectedData() {
    if (state.selectedInventoryIdx === null) return;
    const item = state.dataInventory[state.selectedInventoryIdx];
    if (!item) return;

    const curLevelInfo = DATA_LEVELS[item.level];
    if (!curLevelInfo.next || state.budget < curLevelInfo.refineCost) {
      playAlarm();
      return;
    }

    playBeep(1100);
    state.budget -= curLevelInfo.refineCost;
    const nextKey = curLevelInfo.next;
    item.level = nextKey;
    item.estValue = DATA_LEVELS[nextKey].baseVal;

    updatePermanentHud();
    renderInventoryList();
    renderRefineryWorkbench(item);
  }

  function sellDataToBuyer(buyerType) {
    if (state.selectedInventoryIdx === null) {
      playAlarm();
      alert('Select a dataset from your inventory to sell!');
      return;
    }

    const item = state.dataInventory[state.selectedInventoryIdx];
    if (!item) return;

    let payoutMultiplier = 1.0;
    let repDelta = 0;

    // Reputation multiplier
    const repBonus = (state.reputation - 50) * 0.005; // -25% to +25%

    if (buyerType === 'institute') {
      payoutMultiplier = 1.0 + repBonus;
      repDelta = +8;
    } else if (buyerType === 'opensource') {
      payoutMultiplier = 0.0;
      repDelta = +20;
    } else if (buyerType === 'shady') {
      payoutMultiplier = 2.5 + repBonus;
      repDelta = -15;
    }

    const payout = Math.round(item.estValue * payoutMultiplier);
    state.budget += payout;
    state.reputation = Math.max(0, Math.min(100, state.reputation + repDelta));

    playBeep(payout > 0 ? 1200 : 800);
    alert(`Data sold to ${buyerType.toUpperCase()}!\n💰 Cash Earned: $${payout.toLocaleString()}\n⭐ Reputation Change: ${repDelta >= 0 ? '+' : ''}${repDelta}`);

    // Remove sold item
    state.dataInventory.splice(state.selectedInventoryIdx, 1);
    state.selectedInventoryIdx = null;

    updatePermanentHud();
    renderInventoryList();
  }

  // ========================================================================
  // 14. LISTENERS & SETUP
  // ========================================================================

  function setupEventListeners() {
    // Stage Transitions
    DOM.btnNextStage1.addEventListener('click', () => goToStage(2));
    DOM.btnBackStage2.addEventListener('click', () => goToStage(1));
    DOM.btnNextStage2.addEventListener('click', () => goToStage(3));
    DOM.btnBackStage3.addEventListener('click', () => goToStage(2));
    DOM.btnNextStage3.addEventListener('click', () => goToStage(4));
    DOM.btnBackStage4.addEventListener('click', () => goToStage(3));
    DOM.btnNextStage4.addEventListener('click', () => goToStage(5));
    DOM.btnBackStage5.addEventListener('click', () => goToStage(4));
    DOM.btnNextStage5.addEventListener('click', () => goToStage(6));

    DOM.btnRunTests.addEventListener('click', runSystemDiagnostics);
    DOM.btnStartMinigame.addEventListener('click', launchMinigame);
    DOM.btnSubmitMinigame.addEventListener('click', () => evaluateMinigameOutcome(false));
    DOM.btnCompleteFlight.addEventListener('click', () => goToStage(7));

    // Refinery & Market
    DOM.btnRefineData.addEventListener('click', refineSelectedData);
    document.querySelectorAll('.btn-sell-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const buyer = e.currentTarget.getAttribute('data-buyer');
        sellDataToBuyer(buyer);
      });
    });

    // Bank Loans & Next Cycle
    DOM.btnTakeLoan.addEventListener('click', () => {
      playBeep(880);
      state.budget += 200000;
      state.reputation = Math.max(0, state.reputation - 5);
      state.loansTaken++;
      updatePermanentHud();
      alert('Emergency NASA Loan approved: +$200,000 added to budget. (-5 Reputation)');
    });

    DOM.btnNextMissionLoop.addEventListener('click', () => {
      state.selectedDataTargets = [];
      state.selections = { launchRocket: null, spaceBus: null, groundStation: null, customFuelAdd: 0 };
      goToStage(1);
    });

    // Design Segment Tabs
    DOM.segTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        playBeep(600);
        DOM.segTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeDesignSegment = e.currentTarget.getAttribute('data-seg');
        renderStage4Design();
      });
    });

    // Roles Switcher
    Object.keys(DOM.roleTabs).forEach(role => {
      DOM.roleTabs[role].addEventListener('click', () => {
        playBeep(700);
        Object.values(DOM.roleTabs).forEach(t => t.classList.remove('active'));
        DOM.roleTabs[role].classList.add('active');
        state.activeRole = role;
      });
    });

    // Saboteur Impostor Gamemode Toggle
    DOM.gamemodeBadge.addEventListener('click', () => {
      playBeep(900);
      state.saboteurMode = !state.saboteurMode;
      if (state.saboteurMode) {
        DOM.gamemodeBadge.className = 'gamemode-toggle saboteur';
        DOM.gamemodeText.textContent = 'SABOTEUR MODE ACTIVE';
        const roles = ['launch', 'space', 'ground'];
        state.saboteurRole = roles[Math.floor(Math.random() * roles.length)];
        alert('⚠️ SABOTEUR MODE ENGAGED!\nOne of the 3 flight stations has a secret saboteur trying to bankrupt the agency. Keep systems calibrated and solve minigames!');
      } else {
        DOM.gamemodeBadge.className = 'gamemode-toggle';
        DOM.gamemodeText.textContent = 'CO-OP MODE';
        state.saboteurRole = null;
      }
    });

    // Audio Toggle
    DOM.sfxToggle.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      DOM.sfxIcon.textContent = sfxEnabled ? '🔊' : '🔇';
      DOM.sfxLabel.textContent = sfxEnabled ? 'ON' : 'OFF';
      if (sfxEnabled) playBeep(700);
    });

    // Modals
    DOM.aiStatusPill.addEventListener('click', () => DOM.aiModal.classList.add('active'));
    DOM.aiModalClose.addEventListener('click', () => DOM.aiModal.classList.remove('active'));
    DOM.btnSaveAi.addEventListener('click', () => DOM.aiModal.classList.remove('active'));
    DOM.rulesBtn.addEventListener('click', () => DOM.rulesModal.classList.add('active'));
    DOM.rulesModalClose.addEventListener('click', () => DOM.rulesModal.classList.remove('active'));
    DOM.btnCloseRules.addEventListener('click', () => DOM.rulesModal.classList.remove('active'));
  }

  function init() {
    updatePermanentHud();
    renderStage1Domains();
    setupEventListeners();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
