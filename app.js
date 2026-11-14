/* ==========================================================================
   THE MISSIONEERS // NASA SPACE MISSION DESIGN & ECONOMY ENGINE
   Complete Systems Engineering, All 26 NASA Instruments, Refinery & Gameplay
   ========================================================================== */

(function() {
  'use strict';

  // ========================================================================
  // 1. DATASETS: 5 MISSION DOMAINS & ALL 26 EXACT NASA INSTRUMENTS
  // ========================================================================

  const MISSION_DOMAINS = [
    {
      id: 'earth',
      name: 'Earth Science',
      icon: '🌍',
      desc: 'NASA Land, Atmosphere Near Real-Time Capability for Earth Observation (LANCE).',
      baseDeltaV: 7.6,
      transitDurationSec: 10,
      requiresHeatShield: false,
      instruments: [
        {
          id: 'thermal_energy',
          category: 'Thermal & Radiative Energy',
          t1: { name: 'CERES', fullName: "Clouds & Earth's Radiant Energy System", mass: 100, power: 90, cost: 75000, link: 'https://ceres.larc.nasa.gov/data/documentation/', desc: 'Uses three scanning thermistor bolometers to measure reflected sunlight and emitted Earth heat.' },
          t2: { name: 'AIRS', fullName: 'Atmospheric Infrared Sounder', mass: 177, power: 256, cost: 210000, link: 'https://airs.jpl.nasa.gov/', desc: 'Cooled diffraction grating and HgCdTe detectors calibrated against onboard 308 K blackbody streaming 2,378 IR channels via LANCE.' }
        },
        {
          id: 'atmosphere',
          category: 'Atmospheric Composition & Aerosols',
          t1: { name: 'MOPITT', fullName: 'Measurements of Pollution in Troposphere', mass: 182, power: 245, cost: 85000, link: 'https://terra.nasa.gov/about/terra-instruments/mopitt', desc: 'Gas-correlation spectroscopy passing infrared light through onboard carbon monoxide cells.' },
          t2: { name: 'TEMPO', fullName: 'Tropospheric Emissions: Monitoring Pollution', mass: 135, power: 140, cost: 230000, link: 'https://tempo.si.edu/', desc: 'Geostationary UV-Vis grating spectrometer delivering hourly neighborhood-scale air-quality radiances.' }
        },
        {
          id: 'water',
          category: 'Water Cycle & Moisture',
          t1: { name: 'TMI', fullName: 'TRMM Microwave Imager', mass: 65, power: 50, cost: 60000, link: 'https://gpm.nasa.gov/missions/TRMM/satellite/TMI', desc: 'Measures natural microwave radiation emitted by raindrops and water vapor in tropical latitudes.' },
          t2: { name: 'SMAP', fullName: 'SMAP L-Band Radiometer', mass: 220, power: 150, cost: 240000, link: 'https://smap.jpl.nasa.gov/', desc: '6-meter rotating mesh antenna detecting L-band emissions from top 5 cm soil moisture in near real time.' }
        },
        {
          id: 'ice',
          category: 'Cryosphere & Ice Dynamics',
          t1: { name: 'GLAS', fullName: 'Geoscience Laser Altimeter System', mass: 300, power: 330, cost: 95000, link: 'https://science.gsfc.nasa.gov/attic/glas/', desc: 'Single-beam infrared Nd:YAG laser altimeter measuring polar ice sheet elevation over multi-month cycles.' },
          t2: { name: 'ATLAS', fullName: 'Advanced Topographic Laser Altimeter', mass: 298, power: 320, cost: 260000, link: 'https://www.earthdata.nasa.gov/data/instruments/atlas', desc: 'Splits green laser into six beams and counts individual returning photons down to the nanosecond.' }
        },
        {
          id: 'ocean',
          category: 'Ocean Physics & Biogeochemistry',
          t1: { name: 'SeaWiFS', fullName: 'Sea-Viewing Wide Field Sensor', mass: 50, power: 65, cost: 55000, link: 'https://science.nasa.gov/mission/seawifs/', desc: 'Rotating telescope measuring visible sunlight reflecting off ocean chlorophyll and phytoplankton.' },
          t2: { name: 'OCI', fullName: 'Ocean Color Instrument (PACE)', mass: 270, power: 310, cost: 250000, link: 'https://pace.oceansciences.org/oci.htm', desc: 'Hyperspectral grating from UV to SWIR identifying exact phytoplankton species and harmful algal blooms.' }
        },
        {
          id: 'topography',
          category: 'Topography & Solid Earth Deformation',
          t1: { name: 'SRTM', fullName: 'Shuttle Radar Topography Mission', mass: 1400, power: 900, cost: 110000, link: 'https://www.jpl.nasa.gov/missions/shuttle-radar-topography-mission-srtm/', desc: '60-meter mast from the Space Shuttle bouncing C-band radar signals to create global elevation maps.' },
          t2: { name: 'NISAR', fullName: 'NASA-ISRO SAR Radar', mass: 1100, power: 1500, cost: 320000, link: 'https://nisar.jpl.nasa.gov/', desc: 'Dual L-band and S-band radar with 12m reflector detecting centimeter-scale ground shifts from earthquakes.' }
        },
        {
          id: 'biosphere',
          category: 'Biosphere & Land Cover',
          t1: { name: 'TM', fullName: 'Landsat Thematic Mapper', mass: 258, power: 332, cost: 80000, link: 'https://science.nasa.gov/mission/landsat/tm/', desc: 'Captured 7 spectral bands at 30-meter resolution every 16 days for long-term farm and forest mapping.' },
          t2: { name: 'VIIRS', fullName: 'Visible Infrared Radiometer Suite', mass: 275, power: 240, cost: 270000, link: 'https://www.earthdata.nasa.gov/sensors/viirs', desc: 'Daily swaths across 22 visible and infrared bands feeding calibrated Level 1B radiances to detect wildfires.' }
        }
      ]
    },
    {
      id: 'planetary',
      name: 'Planetary Science',
      icon: '🪐',
      desc: 'NASA Planetary Data System (PDS) robotic exploration of moons, asteroids, and Mars.',
      baseDeltaV: 13.8,
      transitDurationSec: 28,
      requiresHeatShield: false,
      instruments: [
        {
          id: 'topography',
          category: 'Topography & Subsurface Structure',
          t1: { name: 'Navcam', fullName: 'Mars Rover Navigation Cameras', mass: 1, power: 5, cost: 30000, link: 'https://www-robotics.jpl.nasa.gov/media/documents/HelmickAero07tanav.pdf', desc: 'Paired monochrome CCD cameras capturing stereo images to calculate 3D terrain distances.' },
          t2: { name: 'MOLA/LOLA', fullName: 'Orbiter Laser Altimeters', mass: 26, power: 31, cost: 180000, link: 'https://attic.gsfc.nasa.gov/mola/', desc: 'Rapid infrared laser pulses timed to build global high-resolution 3D topographic maps.' }
        },
        {
          id: 'temperature',
          category: 'Surface & Atmospheric Temperature',
          t1: { name: 'REMS', fullName: 'Rover Environmental Monitoring Station', mass: 1.3, power: 3, cost: 25000, link: 'https://mars.nasa.gov/msl/spacecraft/instruments/rems/', desc: 'Thermopile infrared sensors mounted on rover mast reading local ground brightness temperature.' },
          t2: { name: 'MCS', fullName: 'Mars Climate Sounder', mass: 9, power: 15, cost: 160000, link: 'https://mars.nasa.gov/mro/mission/instruments/mcs/', desc: '9 visible and far-IR channels scanning planet limb to produce daily global temperature maps.' }
        },
        {
          id: 'minerals',
          category: 'Mineralogy & Elemental Composition',
          t1: { name: 'APXS', fullName: 'Alpha Particle X-Ray Spectrometer', mass: 0.6, power: 2, cost: 35000, link: 'https://science.nasa.gov/science-org-term/photojournal-instrument-apxs-alpha-particle-x-ray-spectrometer/', desc: 'Presses directly against rock and bombards with alpha particles to read emitted X-ray spectrum.' },
          t2: { name: 'CRISM', fullName: 'Compact Reconnaissance Spectrometer', mass: 33, power: 46, cost: 220000, link: 'https://science.nasa.gov/resource/crism-exploring-the-geology-of-mars/', desc: 'Splits reflected sunlight into 544 infrared wavelengths to map water-bearing clays and sulfates.' }
        },
        {
          id: 'atmosphere',
          category: 'Atmospheric Dynamics & Composition',
          t1: { name: 'Viking Boom', fullName: 'Viking Meteorology Boom', mass: 2.5, power: 4, cost: 28000, link: 'https://science.nasa.gov/mission/viking-1/', desc: 'Heated thermocouple wires and simple diaphragm gauge recording wind speed and air pressure.' },
          t2: { name: 'SAM', fullName: 'Sample Analysis at Mars', mass: 40, power: 75, cost: 280000, link: 'https://mars.nasa.gov/msl/spacecraft/instruments/sam/', desc: 'Quadrupole mass spec, gas chromatograph, and tunable laser spectrometer detecting ppb methane spikes.' }
        },
        {
          id: 'gravity',
          category: 'Gravity, Seismicity & Interior',
          t1: { name: 'SEIS', fullName: 'Seismic Experiment Interior Structure', mass: 11, power: 5, cost: 45000, link: 'https://mars.nasa.gov/insight/spacecraft/instruments/seis/', desc: 'Ultra-sensitive pendulums inside vacuum sphere on ground detecting marsquakes and meteor impacts.' },
          t2: { name: 'GRAIL LGRS', fullName: 'Lunar Gravity Ranging System', mass: 22, power: 25, cost: 260000, link: 'https://www.jpl.nasa.gov/missions/gravity-recovery-and-interior-laboratory-grail/', desc: 'Links two formation-flying orbiters with Ka-band beam measuring micrometer distance changes.' }
        },
        {
          id: 'magnetic_fields',
          category: 'Intrinsic & Induced Magnetic Fields',
          t1: { name: 'MAG', fullName: 'Single Fluxgate Magnetometer', mass: 1.5, power: 2, cost: 20000, link: 'https://pds-ppi.igpp.ucla.edu/search/instrument', desc: 'Magnetic core wrapped in copper coils on boom measuring local magnetic field strength.' },
          t2: { name: 'ECM', fullName: 'Europa Clipper Magnetometer', mass: 6, power: 12, cost: 240000, link: 'https://science.nasa.gov/mission/europa-clipper/spacecraft-instruments-ecm/', desc: 'Multiple boom-mounted fluxgate sensors separating weak induced ocean signals from Jupiter field.' }
        }
      ]
    },
    {
      id: 'helio',
      name: 'Heliophysics',
      icon: '☀️',
      desc: 'Sun-Earth L1 space-weather monitors (ACE, SOHO, IMAP) warning Earth of solar storms.',
      baseDeltaV: 11.2,
      transitDurationSec: 16,
      requiresHeatShield: false,
      instruments: [
        {
          id: 'irradiance',
          category: 'Solar Electromagnetic Irradiance',
          t1: { name: 'TIM', fullName: 'Total Irradiance Monitor (SORCE)', mass: 8, power: 14, cost: 40000, link: 'https://lasp.colorado.edu/sorce/instruments/tim/', desc: 'Four electrical substitution radiometers measuring solar total combined irradiance.' },
          t2: { name: 'AIA', fullName: 'Atmospheric Imaging Assembly (SDO)', mass: 110, power: 135, cost: 250000, link: 'https://svs.gsfc.nasa.gov/3828/', desc: 'Four telescopes capturing full-disk Sun images across 10 EUV wavelengths every 12 seconds.' }
        },
        {
          id: 'mag_elec_fields',
          category: 'Vector Magnetic & Electric Fields',
          t1: { name: 'Voyager MAG', fullName: 'Triaxial Fluxgate Magnetometer', mass: 5.6, power: 2.2, cost: 30000, link: 'https://data.nasa.gov/dataset/voyager-2-48-s-triaxial-fluxgate-magnetometer-mag-magnetic-field-data-near-and-beyond-term', desc: 'Measures strength and orientation of interplanetary magnetic fields along spacecraft path.' },
          t2: { name: 'HMI', fullName: 'Helioseismic & Magnetic Imager', mass: 73, power: 90, cost: 230000, link: 'https://sdo.gsfc.nasa.gov/mission/instruments.php', desc: 'Measures polarization of solar iron lines to map 3D magnetic fields across visible surface.' }
        },
        {
          id: 'plasma',
          category: 'Thermal Plasma & Solar Wind',
          t1: { name: 'Faraday Cup', fullName: 'SWEAP Solar Wind Cup (Parker)', mass: 4.5, power: 8, cost: 35000, link: 'https://science.nasa.gov/blogs/parker-solar-probe/2018/04/30/faraday-cup-bests-sun-simulator/', desc: 'High-temperature metal collector plates catching solar wind ions to read speed and flow angle.' },
          t2: { name: 'SWAPI/SWEPAM', fullName: 'Solar Wind Ion & Electron Analyzers', mass: 14, power: 18, cost: 210000, link: 'https://science.nasa.gov/blogs/imap/2025/09/24/nasas-imap-suite-of-instruments/', desc: 'Curved electrostatic plates bending ions by energy streaming real-time solar wind speed.' }
        },
        {
          id: 'cosmic_rays',
          category: 'Energetic Particles & Cosmic Rays',
          t1: { name: 'CRS', fullName: 'Cosmic Ray Subsystem', mass: 7.5, power: 5.5, cost: 38000, link: 'https://three.jsc.nasa.gov/articles/CosmicRayDetectors.pdf', desc: 'Stacked silicon solid-state detectors counting high-energy nuclei passing through craft.' },
          t2: { name: 'HIT', fullName: 'High-Energy Ion Telescope (IMAP)', mass: 18, power: 22, cost: 225000, link: 'https://science.nasa.gov/blogs/imap/2025/09/24/nasas-imap-suite-of-instruments/', desc: 'Segmented silicon detector array reading exact energy, direction, and element of solar protons.' }
        }
      ]
    },
    {
      id: 'astro',
      name: 'Astrophysics',
      icon: '🔭',
      desc: 'Target of Opportunity (ToO) transient observatories and deep-space space telescopes.',
      baseDeltaV: 11.8,
      transitDurationSec: 22,
      requiresHeatShield: false,
      instruments: [
        {
          id: 'light',
          category: 'Photometric Flux & Polarization',
          t1: { name: 'GALEX', fullName: 'Galaxy Evolution Explorer Telescope', mass: 75, power: 85, cost: 65000, link: 'https://www.galex.caltech.edu/', desc: '0.5m telescope and microchannel plate detectors surveying ultraviolet sky brightness.' },
          t2: { name: 'Swift BAT', fullName: 'Burst Alert Telescope', mass: 220, power: 260, cost: 290000, link: 'https://swift.gsfc.nasa.gov/about_swift/bat_desc.html', desc: 'Coded aperture mask of 52,000 lead tiles spotting gamma-ray bursts to broadcast coordinates.' }
        },
        {
          id: 'positioning',
          category: 'Astrometry & Proper Motion',
          t1: { name: 'FGS', fullName: 'Hubble Fine Guidance Sensors', mass: 220, power: 160, cost: 85000, link: 'https://science.nasa.gov/mission/hubble/observatory/design/fine-guidance-sensors/', desc: 'Optical interferometers locking onto guide stars to measure relative star positions.' },
          t2: { name: 'Roman WFI', fullName: 'Wide Field Instrument (Roman)', mass: 450, power: 480, cost: 360000, link: 'https://roman.gsfc.nasa.gov/wide_field_instrument.html', desc: '300-megapixel infrared array with field of view 100x Hubble to map billions of star positions.' }
        },
        {
          id: 'redshift',
          category: 'Radial Velocity & Redshift',
          t1: { name: 'STIS', fullName: 'Space Telescope Imaging Spectrograph', mass: 375, power: 270, cost: 95000, link: 'https://science.nasa.gov/mission/hubble/observatory/design/space-telescope-imaging-spectrograph/', desc: 'Slit spectrograph on Hubble measuring Doppler shift of stars and distant galaxies.' },
          t2: { name: 'NEID', fullName: 'Extreme-Precision Doppler Spectrometer', mass: 240, power: 310, cost: 330000, link: 'https://www.nasa.gov/solar-system/neid-spectrometer-lights-up-path-to-exoplanet-exploration/', desc: 'Laser frequency comb inside vacuum chamber measuring star wobbles down to 30 cm/s.' }
        },
        {
          id: 'chemical_comp',
          category: 'Spectral Line & Chemical Abundances',
          t1: { name: 'IRS', fullName: 'Spitzer Infrared Spectrograph', mass: 50, power: 60, cost: 55000, link: 'https://www.spitzer.caltech.edu/mission/the-infrared-spectrograph-irs', desc: 'Silicon and germanium detectors reading molecular signatures in star-forming dust.' },
          t2: { name: 'NIRSpec', fullName: 'Near-Infrared Spectrograph (JWST)', mass: 196, power: 145, cost: 350000, link: 'https://webb.nasa.gov/content/observatory/instruments/nirspec.html', desc: 'Micro-shutter array of 250,000 tiny windows capturing spectra of 100 galaxies simultaneously.' }
        },
        {
          id: 'ray_bursts',
          category: 'Time-Domain Variability & Timing',
          t1: { name: 'Kepler', fullName: 'Kepler Exoplanet Photometer', mass: 140, power: 110, cost: 90000, link: 'https://data.nasa.gov/dataset/kepler', desc: 'Monitored brightness of 150,000 stars continuously, storing data for monthly downlinks.' },
          t2: { name: 'NICER', fullName: 'Neutron Star Composition Explorer', mass: 372, power: 400, cost: 310000, link: 'https://heasarc.gsfc.nasa.gov/docs/nicer/', desc: '56 X-ray concentrators on ISS timing pulsar flashes to within 100 nanoseconds.' }
        }
      ]
    },
    {
      id: 'life',
      name: 'Space Life Sciences & Human Research',
      icon: '🧬',
      desc: 'NASA Open Science Data Repository (OSDR) ISS orbital biology and astronaut health.',
      baseDeltaV: 9.3,
      transitDurationSec: 6,
      requiresHeatShield: true, // Physical sample recovery requires atmospheric re-entry heat shield!
      instruments: [
        {
          id: 'dna',
          category: 'Multi-Omics & Molecular Profiles',
          t1: { name: 'BRIC', fullName: 'Biological Research In Canisters', mass: 18, power: 10, cost: 30000, link: 'https://issnationallab.org/facilities/biological-research-in-canisters/', desc: 'Seals plant seedlings or cell cultures inside sterile canisters with fixatives for post-splashdown sequencing.' },
          t2: { name: 'RAZOR EX', fullName: 'WetLab-2 Real-Time qPCR', mass: 28, power: 75, cost: 190000, link: 'https://science.nasa.gov/biological-physical/focus-areas/microbiology/hardware/', desc: 'Microfluidics and fluorescent PCR thermal cycling measuring real-time gene expression in orbit.' }
        },
        {
          id: 'microbiomes',
          category: 'Microbiome & Pathogen Composition',
          t1: { name: 'Agar Slides', fullName: 'Surface Contact Agar Slides', mass: 2, power: 0, cost: 15000, link: 'https://science.nasa.gov/biological-physical/focus-areas/microbiology/hardware/', desc: 'Presses nutrient paddles against cabin walls and incubates to count bacterial/fungal colonies.' },
          t2: { name: 'MinION', fullName: 'Oxford Nanopore DNA Sequencer', mass: 0.15, power: 5, cost: 175000, link: 'https://osdr.nasa.gov/bio/repo/data/payloads/Biomolecule_Sequencer', desc: 'Passes DNA through protein nanopores to sequence unknown microbes in real time in microgravity.' }
        },
        {
          id: 'body',
          category: 'Physiological, Structural & Behavioral',
          t1: { name: 'Actiwatch', fullName: 'Actiwatch Spectrum Accelerometer', mass: 0.08, power: 1, cost: 10000, link: 'https://www.nasa.gov/missions/station/iss-research/wearable-tech-for-space-station-research/', desc: 'Wrist-worn sensor logging crew sleep-wake cycles and activity for post-mission analysis.' },
          t2: { name: 'Mini OCT', fullName: 'Optical Coherence Tomography', mass: 12, power: 35, cost: 210000, link: 'https://techport.nasa.gov/projects/157621', desc: 'Infrared reflections rendering live 3D cross-sections of retina and optic nerve in flight.' }
        },
        {
          id: 'spaceflight_env',
          category: 'Spaceflight Environmental Telemetry',
          t1: { name: 'TLD Badges', fullName: 'Passive Thermoluminescent Badges', mass: 0.05, power: 0, cost: 12000, link: 'https://srag.jsc.nasa.gov/', desc: 'Lithium fluoride crystals trapping cosmic radiation energy, measured after Earth return.' },
          t2: { name: 'REM Timepix', fullName: 'Radiation Environment Monitor', mass: 1.2, power: 8, cost: 185000, link: 'https://www.sciencedirect.com/science/article/abs/pii/S0168900215001977', desc: 'Silicon pixel detector identifying particle type, energy, and dose rate of cosmic rays in real time.' }
        }
      ]
    }
  ];

  // Fuel Chemistry Options
  const FUEL_TYPES = {
    kerosene: { id: 'kerosene', name: 'RP-1 / LOX (Refined Kerosene)', density: 1.0, isp: 310, dvBonus: 0.0, cost: 0, tankVolMult: 1.0, desc: 'Standard dense propellant. Affordable, reliable, standard tankage.' },
    methalox: { id: 'methalox', name: 'Methalox (Liquid Methane / LOX)', density: 0.85, isp: 380, dvBonus: 1.2, cost: 35000, tankVolMult: 1.15, desc: 'High efficiency, clean combustion, excellent vacuum performance.' },
    hydrolox: { id: 'hydrolox', name: 'Hydrolox (Liquid Hydrogen / LOX)', density: 0.35, isp: 450, dvBonus: 2.8, cost: 95000, tankVolMult: 2.2, desc: 'Maximum specific impulse, ultra-light, but requires large insulated cryogenic tanks.' },
    hypergolic: { id: 'hypergolic', name: 'Hypergolic (Hydrazine / NTO)', density: 1.2, isp: 320, dvBonus: 0.6, cost: 50000, tankVolMult: 0.9, desc: 'Storable for years in space. Spontaneous ignition, zero boil-off risk.' }
  };

  // Spacecraft Bus Expansion Options
  const BUS_SIZINGS = {
    standard: { id: 'standard', name: 'Standard Bus', volBonus: 0.0, massAdd: 0, costAdd: 0, maxInstruments: 2, desc: 'Standard fairing chassis. Accommodates 2 scientific instruments.' },
    extended: { id: 'extended', name: 'Extended Chassis', volBonus: 3.5, massAdd: 180, costAdd: 65000, maxInstruments: 3, desc: 'Expanded bus frame. Holds 3 instruments (+180 kg dry mass).' },
    heavy: { id: 'heavy', name: 'Heavy Payload Bay', volBonus: 7.0, massAdd: 420, costAdd: 140000, maxInstruments: 4, desc: 'High-volume platform. Fits 4 instruments (+420 kg dry mass).' },
    flagship: { id: 'flagship', name: 'Flagship Platform', volBonus: 12.0, massAdd: 850, costAdd: 260000, maxInstruments: 6, desc: 'Massive exploration truss. Fits up to 6 scientific instruments.' }
  };

  // Hardware Segments Catalog (3 Options Per Category as requested)
  const CATALOG = {
    launch: [
      { id: 'light_rocket', name: 'AeroScout Light Rocket', cost: 120000, payloadMass: 1400, fairingVol: 4.5, velocityDV: 7.8, reliability: 89, desc: 'Cost-effective light launcher for LEO and small Earth science payloads.' },
      { id: 'medium_rocket', name: 'Atlas Explorer Medium Lift', cost: 340000, payloadMass: 9200, fairingVol: 14.0, velocityDV: 10.5, reliability: 95, desc: 'Reliable multi-stage workhorse capable of lunar and high-energy transfers.' },
      { id: 'heavy_rocket', name: 'Titan-V Heavy Lift Booster', cost: 780000, payloadMass: 26000, fairingVol: 32.0, velocityDV: 14.2, reliability: 98, desc: 'Massive cryogenic heavy booster engineered for deep interplanetary trajectories.' }
    ],

    space_bus: [
      { id: 'micro_bus', name: 'CubeSat Extended Bus', cost: 45000, dryMass: 90, baseVol: 2.0, basePower: 220, fuelCapacity: 200, reliability: 92, desc: 'Compact spacecraft bus with deployable solar panels.' },
      { id: 'standard_bus', name: 'Discovery Class Spacecraft Bus', cost: 160000, dryMass: 380, baseVol: 5.5, basePower: 750, fuelCapacity: 950, reliability: 96, desc: 'Planetary bus with dual-axis solar tracking arrays.' },
      { id: 'flagship_bus', name: 'Flagship Deep-Space Bus (RTG)', cost: 420000, dryMass: 920, baseVol: 14.0, basePower: 1350, fuelCapacity: 2600, reliability: 99, desc: 'Heavy nuclear-powered bus designed for extreme mission durations.' }
    ],

    ground: [
      { id: 'university_dish', name: 'Regional University Ground Station', cost: 35000, bandwidthMbps: 20, bufferMB: 1500, reliability: 88, desc: 'Low-cost dish network. Low bandwidth introduces downlink bottlenecks.' },
      { id: 'commercial_sat', name: 'Commercial Satellite Network Relay', cost: 120000, bandwidthMbps: 85, bufferMB: 6000, reliability: 96, desc: 'Dedicated orbital tracking network with high-speed automated packet routing.' },
      { id: 'deep_space_net', name: 'NASA Deep Space Network (DSN) Allocation', cost: 260000, bandwidthMbps: 250, bufferMB: 25000, reliability: 99, desc: 'Goldstone, Madrid, and Canberra 70-meter dish array with peak bandwidth.' }
    ]
  };

  // NASA Data Processing Levels (L0 -> L4)
  // FIX: Added 'L1B' directly as yield level for Tier 2 sensors!
  const DATA_LEVELS = {
    'L0': { name: 'Level 0 (Raw Telemetry)', baseVal: 75000, next: 'L1A', refineCost: 20000, desc: 'Unprocessed instrument telemetry at full resolution.' },
    'L1A': { name: 'Level 1A (Annotated Raw)', baseVal: 110000, next: 'L1B', refineCost: 25000, desc: 'Time-referenced raw data annotated with ancillary parameters.' },
    'L1B': { name: 'Level 1B (Calibrated Raw)', baseVal: 160000, next: 'L1C', refineCost: 35000, desc: 'Radiometrically calibrated data in physical engineering units.' },
    'L1C': { name: 'Level 1C (Calibrated + Inferred)', baseVal: 230000, next: 'L2', refineCost: 45000, desc: 'Calibrated data with inferred geometric coordinates.' },
    'L2': { name: 'Level 2 (Derived Simulation)', baseVal: 320000, next: 'L2A', refineCost: 60000, desc: 'Geophysical variables derived from environmental algorithms.' },
    'L2A': { name: 'Level 2A (Specified L2)', baseVal: 440000, next: 'L2B', refineCost: 75000, desc: 'High-precision spatial domain subset.' },
    'L2B': { name: 'Level 2B (Calibrated L2A)', baseVal: 580000, next: 'L3', refineCost: 95000, desc: 'Cross-validated calibrated L2A dataset.' },
    'L3': { name: 'Level 3 (Stitched Map)', baseVal: 820000, next: 'L3A', refineCost: 130000, desc: 'Multi-observation uniform space-time projection.' },
    'L3A': { name: 'Level 3A (Temporal Stacking)', baseVal: 1200000, next: 'L4', refineCost: 180000, desc: 'Multi-mission stacked temporal interval dataset.' },
    'L4': { name: 'Level 4 (Integrated Multi-Sensor)', baseVal: 1950000, next: null, refineCost: 0, desc: 'Endgame comprehensive multi-sensor synthesis. Peak market value.' }
  };

  // Dynamic Market Trends (rotates each cycle, scrolls as news headline)
  const MARKET_TREND_POOLS = [
    {
      text: '🔥 [EARTH SCIENCE] Wildfire & Climate Alert: Thermal Energy (CERES/AIRS), Atmosphere (MOPITT/TEMPO) & Biosphere (MODIS/VIIRS) in peak demand (+70% Sell Value)',
      domain: 'earth',
      domainName: 'Earth Science',
      trendingInstIds: ['thermal_energy', 'atmosphere', 'biosphere'],
      boost: 1.7
    },
    {
      text: '🔥 [HELIOPHYSICS] Solar Maximum Approaching: Plasma (SWEPAM/WIND), Cosmic Rays (CRIS/EPAM) & Magnetic/Electric Fields surging (+80% Sell Value)',
      domain: 'helio',
      domainName: 'Heliophysics',
      trendingInstIds: ['plasma', 'cosmic_rays', 'mag_elec_fields'],
      boost: 1.8
    },
    {
      text: '🔥 [ASTROPHYSICS] Exoplanet Transit Breakthrough: Light (JWST/NIRSpec), Chemical Composition & Time/Ray Bursts surging (+75% Sell Value)',
      domain: 'astro',
      domainName: 'Astrophysics',
      trendingInstIds: ['light', 'chemical_comp', 'ray_bursts'],
      boost: 1.75
    },
    {
      text: '🔥 [PLANETARY SCIENCE] Mars Sample Return Priority: Minerals (CRISM/MRO), Atmosphere (SAM) & Topography telemetry in high demand (+65% Sell Value)',
      domain: 'planetary',
      domainName: 'Planetary Science',
      trendingInstIds: ['minerals', 'atmosphere', 'topography'],
      boost: 1.65
    },
    {
      text: '🔥 [LIFE SCIENCES] ISS Commercial Biotech Boom: DNA (MinION), Microbiomes & Spaceflight Environment data in peak demand (+85% Sell Value)',
      domain: 'life',
      domainName: 'Life Sciences',
      trendingInstIds: ['dna', 'microbiomes', 'spaceflight_env'],
      boost: 1.85
    }
  ];

  const DIFFICULTY_MODES = {
    easy: {
      id: 'easy',
      name: 'EASY',
      startingBudget: 2000000,
      anomalyChance: 0.45,
      extraAnomalyChance: 0,
      anomalyDrain: 5000,
      infiniteBudget: false
    },
    normal: {
      id: 'normal',
      name: 'NORMAL',
      startingBudget: 1500000,
      anomalyChance: 0.70,
      extraAnomalyChance: 0,
      anomalyDrain: 8000,
      infiniteBudget: false
    },
    hard: {
      id: 'hard',
      name: 'HARD',
      startingBudget: 1200000,
      anomalyChance: 1.0,
      extraAnomalyChance: 0.5,
      anomalyDrain: 12000,
      infiniteBudget: false
    },
    sandbox: {
      id: 'sandbox',
      name: 'SANDBOX ∞',
      startingBudget: 999999999,
      anomalyChance: 0.35,
      extraAnomalyChance: 0,
      anomalyDrain: 0,
      infiniteBudget: true
    }
  };

  const DIAGNOSTIC_COST = 35000;

  // ========================================================================
  // 2. AUDIO SYNTHESIZER WITH MASTER VOLUME SLIDER
  // ========================================================================

  let audioCtx = null;
  let masterVolume = 0.8;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playQuindarTone() {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2525, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08 * masterVolume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } catch (e) {}
  }

  function playBeep(freq = 880, dur = 0.08) {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06 * masterVolume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }

  function playAlarm() {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(880, now + 0.12);
      osc.frequency.setValueAtTime(520, now + 0.24);
      gain.gain.setValueAtTime(0.09 * masterVolume, now);
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
    // Mode
    gameMode: 'singleplayer', // 'singleplayer' | 'coop' | 'sabotage'
    saboteurRole: null, // 'launch' | 'space' | 'ground'
    difficulty: 'hard', // 'easy' | 'normal' | 'hard' | 'sandbox'
    missionName: 'ARTEMIS-1',

    // Permanent Resources
    budget: 1200000,
    reputation: 50, // 0 - 100
    activeDebt: 0,
    missionCycle: 1,
    currentTrend: MARKET_TREND_POOLS[0],
    trendLocked: false,
    dataInventory: [], // array of { id, name, domain, level, estValue, cyclesOld }
    inventoryViewMode: 'grid', // 'grid' | 'list'
    l4ChamberIndices: [], // inventory indices placed in L4 Ancient Synthesis Forge

    // Advanced Customization Sliders (Stage 4 custom spacecraft sliders)
    customSlidersEnabled: false,
    customDesign: {
      launchPayloadMax: 3000,
      launchDeltaV: 8.5,
      launchReliability: 88,
      spaceVolumeMax: 6.0,
      spacePowerGen: 1000,
      spaceFuelCap: 500,
      spaceReliability: 88,
      groundBandwidth: 100,
      groundReliability: 88
    },

    // Mission Process Lifecycle
    stage: 1,
    selectedDomain: null,
    selectedInstruments: [], // array of { instId, name, fullName, tier, mass, power, cost, link, desc }
    instrumentTiers: {}, // { [instGroup.id]: 1 | 2 } — persists T1/T2 selection even before equipping

    // Design Selections (RESET to launch on cycle!)
    selections: {
      launchRocket: null,
      selectedFuel: 'kerosene',
      spaceBus: null,
      busSizing: 'standard',
      heatShieldInstalled: false,
      groundStation: null
    },

    // Calculated Temporary Mission Resources
    tempResources: {
      mass: 0,
      maxMass: 0,
      power: 0,
      maxPower: 0,
      volume: 0,
      maxVolume: 0,
      velocity: 0,
      reqVelocity: 7.8,
      totalCost: 0,
      bandwidth: 85,
      reliabilityLaunch: 90,
      reliabilitySpace: 90,
      reliabilityGround: 90,
      diagnosticsBonus: 0
    },

    // Flight Ops
    flight: {
      segment: 'launch',
      progress: 0,
      running: false,
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null,
      anomalyUrgentSeconds: 15,
      anomalyUrgentTimer: null
    },

    // Selection in Refinery
    selectedInventoryIdx: null
  };

  // ========================================================================
  // 4. DOM REFERENCES
  // ========================================================================

  const DOM = {
    // Main Menu
    mainMenuOverlay: document.getElementById('main-menu-overlay'),
    menuBtnSingleplayer: document.getElementById('menu-btn-singleplayer'),
    menuBtnMultiplayer: document.getElementById('menu-btn-multiplayer'),
    mpSubgroup: document.getElementById('mp-subgroup'),
    mpBtnCoop: document.getElementById('mp-btn-coop'),
    mpBtnSabotage: document.getElementById('mp-btn-sabotage'),
    menuBtnSettings: document.getElementById('menu-btn-settings'),
    menuBtnManual: document.getElementById('menu-btn-manual'),

    // App Container
    appContainer: document.getElementById('app-container'),
    hudModeBadge: document.getElementById('hud-mode-badge'),
    hudBudget: document.getElementById('hud-budget'),
    hudRep: document.getElementById('hud-rep'),
    btnOpenVault: document.getElementById('btn-open-vault'),
    vaultCountBadge: document.getElementById('vault-count-badge'),
    btnOpenSettings: document.getElementById('btn-open-settings'),
    btnReturnMenu: document.getElementById('btn-return-menu'),

    // Station Bar (Multiplayer only)
    rolesBar: document.getElementById('roles-bar'),
    roleTabs: {
      launch: document.getElementById('tab-role-launch'),
      space: document.getElementById('tab-role-space'),
      ground: document.getElementById('tab-role-ground'),
      user: document.getElementById('tab-role-user')
    },
    saboteurStatusPill: document.getElementById('saboteur-status-pill'),

    // Ticker
    trendsTicker: document.getElementById('trends-ticker'),
    tickerText: document.getElementById('ticker-text'),
    tickerTextDup: document.getElementById('ticker-text-dup'),
    tickerLockBadge: document.getElementById('ticker-lock-badge'),

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
    inputMissionName: document.getElementById('input-mission-name'),
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
    reqReturnShield: document.getElementById('req-return-shield'),
    reqMaxMass: document.getElementById('req-max-mass'),
    reqMinPower: document.getElementById('req-min-power'),
    reqMaxVol: document.getElementById('req-max-vol'),
    reqBandwidth: document.getElementById('req-bandwidth'),
    btnBackStage3: document.getElementById('btn-back-stage3'),
    btnNextStage3: document.getElementById('btn-next-stage3'),

    // Stage 4
    segTabLaunch: document.getElementById('seg-tab-launch'),
    segTabSpace: document.getElementById('seg-tab-space'),
    segTabGround: document.getElementById('seg-tab-ground'),
    fuelChemistryPanel: document.getElementById('fuel-chemistry-panel'),
    fuelOptionsGrid: document.getElementById('fuel-options-grid'),
    busExpansionPanel: document.getElementById('bus-expansion-panel'),
    busSizingGrid: document.getElementById('bus-sizing-grid'),
    reentryShieldPanel: document.getElementById('reentry-shield-panel'),
    chkHeatShield: document.getElementById('chk-heat-shield'),
    heatShieldStatusText: document.getElementById('heat-shield-status-text'),
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
    valBandwidth: document.getElementById('val-bandwidth'),
    hintBandwidth: document.getElementById('hint-bandwidth'),
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
    anomalyCountdownText: document.getElementById('anomaly-countdown-text'),
    anomalyTimerBar: document.getElementById('anomaly-timer-bar'),
    anomalySummary: document.getElementById('anomaly-summary'),
    btnStartMinigame: document.getElementById('btn-start-minigame'),
    btnCompleteFlight: document.getElementById('btn-complete-flight'),

    // Stage 7
    invDecayHint: document.getElementById('inv-decay-hint'),
    btnInvGrid: document.getElementById('btn-inv-grid'),
    btnInvList: document.getElementById('btn-inv-list'),
    dataInventoryList: document.getElementById('data-inventory-list'),
    btnOpenL4Forge: document.getElementById('btn-open-l4-forge'),
    processingRecipe: document.getElementById('processing-recipe'),
    processingControls: document.getElementById('processing-controls'),
    btnRefineData: document.getElementById('btn-refine-data'),
    combinePanel: document.getElementById('combine-panel'),
    combinePartnerSelect: document.getElementById('combine-partner-select'),
    btnCombineData: document.getElementById('btn-combine-data'),
    debtAmountText: document.getElementById('debt-amount-text'),
    btnLoanGrant: document.getElementById('btn-loan-grant'),
    btnLoanBank: document.getElementById('btn-loan-bank'),
    btnPayDebt: document.getElementById('btn-pay-debt'),
    btnNextMissionLoop: document.getElementById('btn-next-mission-loop'),

    // Modals
    vaultModal: document.getElementById('vault-modal'),
    vaultModalClose: document.getElementById('vault-modal-close'),
    vaultModalDone: document.getElementById('vault-modal-done'),
    vaultListContainer: document.getElementById('vault-list-container'),

    settingsModal: document.getElementById('settings-modal'),
    settingsModalClose: document.getElementById('settings-modal-close'),
    settingsModalSave: document.getElementById('settings-modal-save'),
    sliderVolume: document.getElementById('slider-volume'),
    volumeVal: document.getElementById('volume-val'),
    chkAdvSliders: document.getElementById('chk-adv-sliders'),
    btnTestLmSettings: document.getElementById('btn-test-lm-settings'),
    settingsLmStatus: document.getElementById('settings-lm-status'),

    minigameModal: document.getElementById('minigame-modal'),
    minigameTitle: document.getElementById('minigame-title'),
    minigameRoleTag: document.getElementById('minigame-role-tag'),
    minigameInstruction: document.getElementById('minigame-instruction'),
    minigameCanvas: document.getElementById('minigame-canvas'),
    minigameControls: document.getElementById('minigame-controls'),
    minigameTimerFill: document.getElementById('minigame-timer-fill'),
    btnSubmitMinigame: document.getElementById('btn-submit-minigame'),

    rulesModal: document.getElementById('rules-modal'),
    rulesModalClose: document.getElementById('rules-modal-close'),
    btnCloseRules: document.getElementById('btn-close-rules'),

    initModeModal: document.getElementById('init-mode-modal'),
    initBtnBasic: document.getElementById('init-btn-basic'),
    initBtnAdvanced: document.getElementById('init-btn-advanced'),

    initDifficultyModal: document.getElementById('init-difficulty-modal'),
    diffBtnEasy: document.getElementById('diff-btn-easy'),
    diffBtnNormal: document.getElementById('diff-btn-normal'),
    diffBtnHard: document.getElementById('diff-btn-hard'),
    diffBtnSandbox: document.getElementById('diff-btn-sandbox'),

    l4ForgeModal: document.getElementById('l4-forge-modal'),
    l4ForgeClose: document.getElementById('l4-forge-close'),
    l4ChamberList: document.getElementById('l4-chamber-list'),
    l4OfferingsList: document.getElementById('l4-offerings-list'),
    l4ChamberCount: document.getElementById('l4-chamber-count'),
    l4AvailableCount: document.getElementById('l4-available-count'),
    l4ReqStatus: document.getElementById('l4-req-status'),
    l4SynergyMult: document.getElementById('l4-synergy-mult'),
    l4ProjectedVal: document.getElementById('l4-projected-val'),
    l4ForgeFee: document.getElementById('l4-forge-fee'),
    btnForgeL4: document.getElementById('btn-forge-l4')
  };

  // ========================================================================
  // 5. HUD UPDATES & CONTINUOUS REPUTATION CURVE
  // ========================================================================

  function getDifficultyConfig() {
    return DIFFICULTY_MODES[state.difficulty] || DIFFICULTY_MODES.hard;
  }

  function isInfiniteBudget() {
    return getDifficultyConfig().infiniteBudget === true;
  }

  function setTickerText(text) {
    if (DOM.tickerText) DOM.tickerText.textContent = text;
    if (DOM.tickerTextDup) DOM.tickerTextDup.textContent = text;
  }

  function getReputationPriceMultiplier() {
    // Smooth continuous curve: 50 rep = 1.0x, 0 rep = 0.70x, 100 rep = 1.30x
    // Plus +25% Flagship Partner multiplier at 100 Reputation!
    const base = 1.0 + (state.reputation - 50) * 0.006;
    return state.reputation >= 100 ? base * 1.25 : base;
  }

  function updatePermanentHud() {
    DOM.hudBudget.textContent = isInfiniteBudget() ? '∞ SANDBOX' : `$${state.budget.toLocaleString()}`;
    DOM.hudRep.textContent = state.reputation >= 100 ? '100 / 100 🏆 FLAGSHIP' : `${state.reputation} / 100`;

    if (state.reputation >= 100) {
      DOM.hudRep.className = 'res-val text-gold';
    } else if (state.reputation < 35) {
      DOM.hudRep.className = 'res-val text-amber';
    } else {
      DOM.hudRep.className = 'res-val text-emerald';
    }

    DOM.vaultCountBadge.textContent = state.dataInventory.length;
    DOM.debtAmountText.textContent = `$${state.activeDebt.toLocaleString()}`;
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

    if (stageNum === 2) renderStage2Instruments();
    if (stageNum === 3) renderStage3Requirements();
    if (stageNum === 4) {
      // RESET TO LAUNCH SEGMENT ON CYCLE!
      activeDesignSegment = 'launch';
      updateDesignSubtabs();
      renderStage4Design();
      calculateTempResources();
    }
    if (stageNum === 5) renderStage5Verification();
    if (stageNum === 6) startStage6Flight();
    if (stageNum === 7) renderStage7RefineryAndMarket();

    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ========================================================================
  // 6. STAGE 1: SET GOAL (5 NASA SCIENCE DISCIPLINES)
  // ========================================================================

  function renderStage1Domains() {
    DOM.domainGrid.innerHTML = '';
    MISSION_DOMAINS.forEach(dom => {
      const card = document.createElement('div');
      card.className = `domain-card ${state.selectedDomain?.id === dom.id ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="domain-icon">${dom.icon}</div>
        <h3>${dom.name}</h3>
        <p class="domain-desc">${dom.desc}</p>
        <div class="domain-meta-row">
          <span>&Delta;V: <strong class="text-amber">${dom.baseDeltaV} km/s</strong></span>
          <span>Transit: <strong>${dom.transitDurationSec}s</strong></span>
          <span>Return Shield: <strong class="${dom.requiresHeatShield ? 'text-crimson' : 'text-emerald'}">${dom.requiresHeatShield ? 'REQUIRED' : 'NO'}</strong></span>
        </div>
      `;

      card.addEventListener('click', () => {
        playBeep(700);
        state.selectedDomain = dom;
        state.selectedInstruments = []; // reset instrument choices
        document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        DOM.btnNextStage1.disabled = false;
      });

      DOM.domainGrid.appendChild(card);
    });
  }

  // ========================================================================
  // 7. STAGE 2: REAL NASA INSTRUMENTS WITH HOVER CARDS
  // ========================================================================

  function renderStage2Instruments() {
    DOM.stage2DomainTitle.textContent = `STAGE 2: DEFINE CONCEPT // ${state.selectedDomain.name.toUpperCase()} SENSORS`;
    DOM.dataTypesContainer.innerHTML = '';

    const domain = state.selectedDomain;

    domain.instruments.forEach(instGroup => {
      // Check if selected
      const existing = state.selectedInstruments.find(i => i.instId === instGroup.id);
      const isSelected = !!existing;
      const currentTier = existing ? existing.tier : (state.instrumentTiers[instGroup.id] || 1);
      const activeData = currentTier === 1 ? instGroup.t1 : instGroup.t2;

      const isTrendingInst = !!(
        state.currentTrend &&
        state.currentTrend.domain === domain.id &&
        Array.isArray(state.currentTrend.trendingInstIds) &&
        state.currentTrend.trendingInstIds.includes(instGroup.id)
      );
      const trendingTagHtml = isTrendingInst ? `<span class="inst-trending-tag">🔥 TRENDING</span>` : '';
      const t2Locked = state.reputation < 35 && !isInfiniteBudget();

      const card = document.createElement('div');
      card.className = `instrument-card ${isSelected ? 'selected' : ''}`;

      card.innerHTML = `
        <div class="inst-header">
          <h4 class="inst-title">${instGroup.category} ${trendingTagHtml}</h4>
          <span class="inst-name-badge">${activeData.name}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.78rem; font-weight: 600; color: #fff;">${activeData.fullName}</span>
          <div class="tier-toggle-group">
            <button class="tier-btn ${currentTier === 1 ? 'active' : ''}" data-tier="1">T1</button>
            <button class="tier-btn ${currentTier === 2 ? 'active' : ''}" data-tier="2" ${t2Locked ? 'title="Requires 35+ Reputation"' : ''}>
              T2 ${t2Locked ? '🔒' : ''}
            </button>
          </div>
        </div>

        <!-- Hover Explanation Trigger -->
        <div class="inst-hover-wrap">
          <div class="inst-hover-trigger">
            <span>ℹ️ Hover for Scientific Detector Mechanism &amp; NASA link</span>
          </div>
          <div class="inst-tooltip">
            <h5>${activeData.name} — ${activeData.fullName}</h5>
            <p>${activeData.desc}</p>
            <p style="margin-top: 0.4rem;">Official NASA Link: <a href="${activeData.link}" target="_blank" rel="noopener noreferrer">${activeData.link}</a></p>
            <p style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--color-cyan); margin-top: 0.3rem;">Mass: ${activeData.mass} kg | Power: ${activeData.power} W | Cost: $${activeData.cost.toLocaleString()}</p>
          </div>
        </div>

        <div class="inst-specs-row">
          <span>Yield: <strong class="text-cyan">${currentTier === 1 ? 'L0 Raw' : 'L1B Calibrated (NRT)'}</strong></span>
          <span>Mass: <strong>${activeData.mass} kg</strong></span>
          <span>Power: <strong>${activeData.power} W</strong></span>
        </div>

        <button class="btn-select-target ${isSelected ? 'active' : ''}">
          ${isSelected ? `✅ ${activeData.name} EQUIPPED` : `+ EQUIP ${activeData.name}`}
        </button>
      `;

      const btnT1 = card.querySelector('[data-tier="1"]');
      const btnT2 = card.querySelector('[data-tier="2"]');
      const btnSelect = card.querySelector('.btn-select-target');

      btnT1.addEventListener('click', (e) => {
        e.stopPropagation();
        playBeep(650);
        state.instrumentTiers[instGroup.id] = 1;
        if (existing) {
          existing.tier = 1;
          existing.name = instGroup.t1.name;
          existing.fullName = instGroup.t1.fullName;
          existing.mass = instGroup.t1.mass;
          existing.power = instGroup.t1.power;
          existing.cost = instGroup.t1.cost;
        }
        renderStage2Instruments();
      });

      btnT2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.reputation < 35 && !isInfiniteBudget()) {
          playAlarm();
          alert('Tier 2 advanced NRT sensors require at least 35 Reputation!');
          return;
        }
        playBeep(820);
        state.instrumentTiers[instGroup.id] = 2;
        if (existing) {
          existing.tier = 2;
          existing.name = instGroup.t2.name;
          existing.fullName = instGroup.t2.fullName;
          existing.mass = instGroup.t2.mass;
          existing.power = instGroup.t2.power;
          existing.cost = instGroup.t2.cost;
        }
        renderStage2Instruments();
      });

      btnSelect.addEventListener('click', () => {
        playBeep(isSelected ? 500 : 880);
        if (isSelected) {
          state.selectedInstruments = state.selectedInstruments.filter(i => i.instId !== instGroup.id);
        } else {
          const chosen = currentTier === 1 ? instGroup.t1 : instGroup.t2;
          state.selectedInstruments.push({
            instId: instGroup.id,
            category: instGroup.category,
            tier: currentTier,
            name: chosen.name,
            fullName: chosen.fullName,
            mass: chosen.mass,
            power: chosen.power,
            cost: chosen.cost,
            link: chosen.link,
            desc: chosen.desc
          });
        }
        renderStage2Instruments();
        DOM.btnNextStage2.disabled = state.selectedInstruments.length === 0;
      });

      DOM.dataTypesContainer.appendChild(card);
    });

    DOM.btnNextStage2.disabled = state.selectedInstruments.length === 0;
  }

  // ========================================================================
  // 8. STAGE 3: DEFINE REQUIREMENTS OUTLINE
  // ========================================================================

  function renderStage3Requirements() {
    const domain = state.selectedDomain;
    DOM.reqDomainName.textContent = domain.name;
    DOM.reqDataTargets.textContent = state.selectedInstruments.map(i => `${i.name} (T${i.tier})`).join(', ');

    // Calculate requirements
    let estMass = 450;
    let estPower = 150;
    let estVol = 2.5;

    state.selectedInstruments.forEach(i => {
      estMass += i.mass;
      estPower += i.power;
      estVol += 1.2;
    });

    DOM.reqMaxMass.textContent = `~${Math.round(estMass).toLocaleString()} kg total`;
    DOM.reqMinPower.textContent = `≥ ${estPower} W electrical draw`;
    DOM.reqMaxVol.textContent = `≥ ${estVol.toFixed(1)} m³ bus volume`;
    DOM.reqDeltaV.textContent = `${domain.baseDeltaV.toFixed(1)} km/s`;
    DOM.reqDuration.textContent = `${domain.transitDurationSec}s transit`;

    if (domain.requiresHeatShield) {
      DOM.reqReturnShield.textContent = 'MANDATORY (Sample Return Atmospheric Heat Shield)';
      DOM.reqReturnShield.className = 'text-crimson';
    } else {
      DOM.reqReturnShield.textContent = 'NOT REQUIRED (Orbital / Flyby Telemetry)';
      DOM.reqReturnShield.className = 'text-emerald';
    }

    state.tempResources.reqVelocity = domain.baseDeltaV;
  }

  // ========================================================================
  // 9. STAGE 4: DESIGN & PROCUREMENT (3 OPTIONS PER CATEGORY, FUEL & SIZING)
  // ========================================================================

  let activeDesignSegment = 'launch';

  function updateDesignSubtabs() {
    DOM.segTabLaunch.classList.toggle('active', activeDesignSegment === 'launch');
    DOM.segTabSpace.classList.toggle('active', activeDesignSegment === 'space');
    DOM.segTabGround.classList.toggle('active', activeDesignSegment === 'ground');

    DOM.fuelChemistryPanel.style.display = activeDesignSegment === 'launch' ? 'block' : 'none';
    DOM.busExpansionPanel.style.display = (activeDesignSegment === 'space' && !state.customSlidersEnabled) ? 'block' : 'none';
    DOM.reentryShieldPanel.style.display = (activeDesignSegment === 'space' && state.selectedDomain.requiresHeatShield) ? 'block' : 'none';
  }

  function renderStage4Design() {
    updateDesignSubtabs();

    // Render Fuel Options
    renderFuelOptions();

    // Render Bus Sizing Options (only used in Basic Controls mode)
    if (!state.customSlidersEnabled) {
      renderBusSizingOptions();
    }

    // Render Re-entry Heat Shield checkbox state
    DOM.chkHeatShield.checked = state.selections.heatShieldInstalled;
    DOM.heatShieldStatusText.textContent = state.selections.heatShieldInstalled
      ? '✅ PICA-X Thermal Heat Shield Installed (Mass: +120 kg, Cost: $45,000)'
      : '❌ Heat Shield Not Installed (High Re-entry Destruction Risk)';
    DOM.heatShieldStatusText.className = state.selections.heatShieldInstalled ? 'text-emerald' : 'text-crimson';

    DOM.segmentOptionsContainer.innerHTML = '';

    // Advanced Controls: No presets — custom engineering sliders only
    if (state.customSlidersEnabled) {
      renderCustomSlidersSegment();
      return;
    }

    // Basic Controls: Render 3 preset choices for active category
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
      if (item.velocityDV) metricsHtml += `<div class="metric-tag"><span class="label">BASE &Delta;V</span><span class="val text-amber">${item.velocityDV} km/s</span></div>`;
      if (item.basePower) metricsHtml += `<div class="metric-tag"><span class="label">POWER BUS</span><span class="val text-amber">${item.basePower} W</span></div>`;
      if (item.baseVol) metricsHtml += `<div class="metric-tag"><span class="label">BASE VOL</span><span class="val">${item.baseVol} m³</span></div>`;
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

  function renderCustomSlidersSegment() {
    const cd = state.customDesign;
    const panel = document.createElement('div');
    panel.className = 'custom-slider-panel';

    const configs = {
      launch: {
        title: '🚀 CUSTOM LAUNCH VEHICLE ARCHITECTURE (NO PRESETS)',
        badge: 'ADVANCED SLIDERS',
        sliders: [
          { key: 'launchPayloadMax', label: 'Max Payload Mass Capacity', min: 500, max: 25000, step: 250, unit: 'kg', hint: 'Higher payload thrust increases booster procurement cost.' },
          { key: 'launchDeltaV', label: 'Stage Base Δv Velocity', min: 6.0, max: 18.0, step: 0.2, unit: 'km/s', hint: 'Combined with propellant chemistry Δv bonus to reach destination.' },
          { key: 'launchReliability', label: 'Launch Structural Reliability', min: 75, max: 99, step: 1, unit: '%', hint: 'Higher quality-assurance & redundancy exponentially increases cost.' }
        ],
        summaryFn: () => {
          const cost = Math.round(cd.launchPayloadMax * 35 + cd.launchDeltaV * 18000 + Math.pow(Math.max(0, cd.launchReliability - 70), 2) * 350);
          return `<span>Launch Segment Cost: <strong class="text-cyan">$${cost.toLocaleString()}</strong></span><span>Payload Cap: <strong class="text-emerald">${cd.launchPayloadMax.toLocaleString()} kg</strong></span>`;
        }
      },
      space: {
        title: '🛰️ CUSTOM SPACECRAFT BUS ARCHITECTURE (NO PRESETS)',
        badge: 'ADVANCED SLIDERS',
        sliders: [
          { key: 'spaceVolumeMax', label: 'Internal Fairing / Bus Volume', min: 2.0, max: 25.0, step: 0.5, unit: 'm³', hint: 'Each instrument requires 1.1 m³. Larger chassis adds dry mass & cost.' },
          { key: 'spacePowerGen', label: 'Solar / RTG Power Bus Output', min: 300, max: 6000, step: 50, unit: 'W', hint: 'Must exceed avionics (75 W) + equipped instrument power draw.' },
          { key: 'spaceFuelCap', label: 'Onboard Propellant Tank Capacity', min: 100, max: 5000, step: 50, unit: 'kg', hint: 'Adds wet mass to total launch payload.' },
          { key: 'spaceReliability', label: 'Spacecraft Avionics Reliability', min: 75, max: 99, step: 1, unit: '%', hint: 'Redundant flight computers & thermal control reduce in-flight anomalies.' }
        ],
        summaryFn: () => {
          const dry = Math.round(180 + cd.spaceVolumeMax * 95 + cd.spacePowerGen * 0.14);
          const cost = Math.round(45000 + cd.spaceVolumeMax * 12000 + cd.spacePowerGen * 45 + cd.spaceFuelCap * 30 + Math.pow(Math.max(0, cd.spaceReliability - 70), 2) * 300);
          return `<span>Space Bus Cost: <strong class="text-cyan">$${cost.toLocaleString()}</strong></span><span>Bus Dry Mass: <strong class="text-amber">${dry.toLocaleString()} kg</strong></span>`;
        }
      },
      ground: {
        title: '📡 CUSTOM GROUND & TELEMETRY NETWORK (NO PRESETS)',
        badge: 'ADVANCED SLIDERS',
        sliders: [
          { key: 'groundBandwidth', label: 'Downlink Receiver Bandwidth', min: 20, max: 500, step: 10, unit: 'Mbps', hint: '85+ Mbps guarantees zero packet drop during science downlink.' },
          { key: 'groundReliability', label: 'Tracking Network Reliability', min: 75, max: 99, step: 1, unit: '%', hint: 'Multi-site dish redundancy prevents telemetry blackout.' }
        ],
        summaryFn: () => {
          const cost = Math.round(15000 + cd.groundBandwidth * 350 + Math.pow(Math.max(0, cd.groundReliability - 70), 2) * 250);
          return `<span>Ground Segment Cost: <strong class="text-cyan">$${cost.toLocaleString()}</strong></span><span>Bandwidth: <strong class="text-emerald">${cd.groundBandwidth} Mbps</strong></span>`;
        }
      }
    };

    const cfg = configs[activeDesignSegment];
    panel.innerHTML = `
      <div class="custom-slider-panel-header">
        <h4>${cfg.title}</h4>
        <span class="hud-tag text-emerald">${cfg.badge}</span>
      </div>
    `;

    const summaryEl = document.createElement('div');
    summaryEl.className = 'custom-slider-summary';
    summaryEl.innerHTML = cfg.summaryFn();

    cfg.sliders.forEach(s => {
      const row = document.createElement('div');
      row.className = 'custom-slider-row';
      const valDisplay = s.step < 1 ? Number(cd[s.key]).toFixed(1) : Number(cd[s.key]).toLocaleString();

      const header = document.createElement('div');
      header.className = 'custom-slider-header';
      const labelEl = document.createElement('strong');
      labelEl.textContent = s.label;
      const valSpan = document.createElement('span');
      valSpan.id = `cslider-val-${s.key}`;
      valSpan.textContent = `${valDisplay} ${s.unit}`;
      header.appendChild(labelEl);
      header.appendChild(valSpan);

      const input = document.createElement('input');
      input.type = 'range';
      input.id = `cslider-${s.key}`;
      input.min = String(s.min);
      input.max = String(s.max);
      input.step = String(s.step);
      input.value = String(cd[s.key]);

      const hintEl = document.createElement('div');
      hintEl.className = 'custom-slider-hint';
      hintEl.textContent = s.hint;

      input.addEventListener('input', (e) => {
        const num = parseFloat(e.target.value);
        cd[s.key] = num;
        valSpan.textContent = `${s.step < 1 ? num.toFixed(1) : num.toLocaleString()} ${s.unit}`;
        summaryEl.innerHTML = cfg.summaryFn();
        calculateTempResources();
      });

      row.appendChild(header);
      row.appendChild(input);
      row.appendChild(hintEl);
      panel.appendChild(row);
    });

    panel.appendChild(summaryEl);
    DOM.segmentOptionsContainer.appendChild(panel);
  }

  function renderFuelOptions() {
    DOM.fuelOptionsGrid.innerHTML = '';
    Object.values(FUEL_TYPES).forEach(fuel => {
      const card = document.createElement('div');
      card.className = `fuel-card ${state.selections.selectedFuel === fuel.id ? 'selected' : ''}`;
      card.innerHTML = `
        <strong>${fuel.name}</strong>
        <span>Isp: ${fuel.isp}s | &Delta;V: +${fuel.dvBonus} km/s | Cost: +$${fuel.cost.toLocaleString()}</span>
      `;
      card.addEventListener('click', () => {
        playBeep(650);
        state.selections.selectedFuel = fuel.id;
        renderFuelOptions();
        calculateTempResources();
      });
      DOM.fuelOptionsGrid.appendChild(card);
    });
  }

  function renderBusSizingOptions() {
    DOM.busSizingGrid.innerHTML = '';
    Object.values(BUS_SIZINGS).forEach(sizing => {
      const card = document.createElement('div');
      card.className = `bus-size-card ${state.selections.busSizing === sizing.id ? 'selected' : ''}`;
      card.innerHTML = `
        <strong>${sizing.name}</strong>
        <span>Vol: +${sizing.volBonus} m³ | Mass: +${sizing.massAdd} kg | Max: ${sizing.maxInstruments} Inst</span>
      `;
      card.addEventListener('click', () => {
        playBeep(650);
        state.selections.busSizing = sizing.id;
        renderBusSizingOptions();
        calculateTempResources();
      });
      DOM.busSizingGrid.appendChild(card);
    });
  }

  function calculateTempResources() {
    const sel = state.selections;
    const fuel = FUEL_TYPES[sel.selectedFuel] || FUEL_TYPES.kerosene;

    const rocket = CATALOG.launch.find(i => i.id === sel.launchRocket);
    const bus = CATALOG.space_bus.find(i => i.id === sel.spaceBus);
    const ground = CATALOG.ground.find(i => i.id === sel.groundStation);
    const sizing = BUS_SIZINGS[sel.busSizing] || BUS_SIZINGS.standard;

    let totalCost = fuel.cost;
    let dryMass = 0;
    let fuelMass = 0;
    let maxMass = 0;
    let powerGen = 0;
    let powerConsumed = 75; // base avionics
    let volumeUsed = 0;
    let maxVolume = 0;
    let velocityDV = fuel.dvBonus;
    let bandwidth = 85;
    let relLaunch = 90;
    let relSpace = 90;
    let relGround = 90;
    let segmentsReady = false;
    let instrumentsCountOk = true;

    if (state.customSlidersEnabled) {
      const cd = state.customDesign;
      const launchCost = Math.round(cd.launchPayloadMax * 35 + cd.launchDeltaV * 18000 + Math.pow(Math.max(0, cd.launchReliability - 70), 2) * 350);
      const spaceDry = Math.round(180 + cd.spaceVolumeMax * 95 + cd.spacePowerGen * 0.14);
      const spaceCost = Math.round(45000 + cd.spaceVolumeMax * 12000 + cd.spacePowerGen * 45 + cd.spaceFuelCap * 30 + Math.pow(Math.max(0, cd.spaceReliability - 70), 2) * 300);
      const groundCost = Math.round(15000 + cd.groundBandwidth * 350 + Math.pow(Math.max(0, cd.groundReliability - 70), 2) * 250);

      totalCost += launchCost + spaceCost + groundCost;
      dryMass += spaceDry;
      fuelMass += cd.spaceFuelCap;
      maxMass = cd.launchPayloadMax;
      powerGen = cd.spacePowerGen;
      maxVolume = cd.spaceVolumeMax;
      velocityDV += cd.launchDeltaV;
      bandwidth = cd.groundBandwidth;
      relLaunch = cd.launchReliability;
      relSpace = cd.spaceReliability;
      relGround = cd.groundReliability;
      segmentsReady = true;
    } else {
      maxMass = rocket ? rocket.payloadMass : 0;
      powerGen = bus ? bus.basePower : 0;
      maxVolume = (bus ? bus.baseVol : 0) + sizing.volBonus;
      velocityDV += (rocket ? rocket.velocityDV : 0);
      bandwidth = ground ? ground.bandwidthMbps : 85;
      relLaunch = rocket ? rocket.reliability : 90;
      relSpace = bus ? bus.reliability : 90;
      relGround = ground ? ground.reliability : 90;

      if (rocket) totalCost += rocket.cost;
      if (bus) {
        totalCost += bus.cost + sizing.costAdd;
        dryMass += bus.dryMass + sizing.massAdd;
        fuelMass += bus.fuelCapacity;
      }
      if (ground) totalCost += ground.cost;

      segmentsReady = !!(rocket && bus && ground);
      // Instrument capacity is governed by volumeUsed <= maxVolume
      instrumentsCountOk = true;
    }

    // Apply Diagnostic Simulation Bonus (+10% if tested!)
    relLaunch = Math.min(99, relLaunch + state.tempResources.diagnosticsBonus);
    relSpace = Math.min(99, relSpace + state.tempResources.diagnosticsBonus);
    relGround = Math.min(99, relGround + state.tempResources.diagnosticsBonus);

    // Heat Shield
    if (sel.heatShieldInstalled) {
      totalCost += 45000;
      dryMass += 120;
    }

    // Instruments
    state.selectedInstruments.forEach(inst => {
      totalCost += inst.cost;
      dryMass += inst.mass;
      powerConsumed += inst.power;
      volumeUsed += 1.1;
    });

    const totalMass = Math.round(dryMass + fuelMass);

    state.tempResources = {
      mass: totalMass,
      maxMass,
      power: powerConsumed,
      maxPower: powerGen,
      volume: volumeUsed,
      maxVolume,
      velocity: velocityDV,
      reqVelocity: state.selectedDomain.baseDeltaV,
      totalCost,
      bandwidth,
      reliabilityLaunch: relLaunch,
      reliabilitySpace: relSpace,
      reliabilityGround: relGround,
      diagnosticsBonus: state.tempResources.diagnosticsBonus
    };

    // Update HUD
    const sandbox = isInfiniteBudget();
    const overBudget = !sandbox && totalCost > state.budget;
    DOM.valCost.textContent = sandbox ? `$${totalCost.toLocaleString()} / ∞` : `$${totalCost.toLocaleString()} / $${state.budget.toLocaleString()}`;
    const costPct = sandbox ? 15 : (state.budget > 0 ? Math.min(100, Math.round((totalCost / state.budget) * 100)) : 0);
    DOM.barCost.style.width = `${costPct}%`;
    DOM.barCost.className = `progress-bar ${overBudget ? 'danger' : ''}`;
    DOM.hintCost.textContent = sandbox
      ? '✅ SANDBOX MODE: Unlimited R&D Funding'
      : (overBudget ? '⚠️ INSUFFICIENT PERMANENT FUNDS!' : `Balance remaining: $${(state.budget - totalCost).toLocaleString()}`);

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

    // Bandwidth
    DOM.valBandwidth.textContent = `${bandwidth} Mbps`;
    DOM.hintBandwidth.textContent = bandwidth >= 85 ? '✅ High bandwidth: Fast downlink, zero buffer loss' : '⚠️ Low bandwidth: Downlink takes longer; buffer packet drop risk';

    // Reliabilities
    DOM.relLaunch.textContent = `${relLaunch}%`;
    DOM.relSpace.textContent = `${relSpace}%`;
    DOM.relGround.textContent = `${relGround}%`;

    // Validation
    const isValid = (
      segmentsReady &&
      totalMass <= maxMass &&
      powerConsumed <= powerGen &&
      volumeUsed <= maxVolume &&
      velocityDV >= state.tempResources.reqVelocity &&
      (sandbox || totalCost <= state.budget) &&
      instrumentsCountOk
    );

    DOM.btnNextStage4.disabled = !isValid;
  }

  // ========================================================================
  // 10. STAGE 5: BUILD & VERIFY (DIAGNOSTICS BENEFIT)
  // ========================================================================

  let testsRun = false;

  function renderStage5Verification() {
    testsRun = false;
    DOM.btnNextStage5.disabled = false; // Player can choose to launch directly or run test
    const sandbox = isInfiniteBudget();
    const diagFee = sandbox ? 0 : DIAGNOSTIC_COST;

    DOM.invCurrentBudget.textContent = sandbox ? '∞ SANDBOX' : `$${state.budget.toLocaleString()}`;
    DOM.invCost.textContent = `-$${state.tempResources.totalCost.toLocaleString()}`;
    DOM.invRemaining.textContent = sandbox ? '∞ SANDBOX' : `$${(state.budget - state.tempResources.totalCost).toLocaleString()}`;

    DOM.btnRunTests.textContent = sandbox
      ? '🔬 RUN FULL DIAGNOSTIC SIMULATION (FREE IN SANDBOX | +10% RELIABILITY)'
      : `🔬 RUN FULL DIAGNOSTIC SIMULATION (-$${DIAGNOSTIC_COST.toLocaleString()} | +10% RELIABILITY)`;
    DOM.btnRunTests.disabled = !sandbox && state.budget < diagFee;

    DOM.testList.innerHTML = `
      <li id="test-launch">⏳ Launch Segment: Structural loads &amp; fairing volume check...</li>
      <li id="test-prop">⏳ Propulsion System: Specific impulse &amp; delta-v burn check...</li>
      <li id="test-power">⏳ Electrical Bus: Sensor load vs. generation check...</li>
      <li id="test-sensors">⏳ Scientific Instruments: Sensor calibration &amp; optics...</li>
      <li id="test-ground">⏳ Ground Receiver: Telemetry link &amp; bandwidth check...</li>
    `;
  }

  function runSystemDiagnostics() {
    const sandbox = isInfiniteBudget();
    if (!sandbox && state.budget < DIAGNOSTIC_COST) {
      playAlarm();
      alert(`Insufficient funds for Pre-Flight Diagnostics ($${DIAGNOSTIC_COST.toLocaleString()} required).`);
      return;
    }

    if (!sandbox) {
      state.budget -= DIAGNOSTIC_COST;
      updatePermanentHud();
      DOM.invCurrentBudget.textContent = `$${state.budget.toLocaleString()}`;
      DOM.invRemaining.textContent = `$${(state.budget - state.tempResources.totalCost).toLocaleString()}`;
    }

    playBeep(900);
    DOM.btnRunTests.disabled = true;

    const tests = [
      { id: 'test-launch', name: 'Launch Segment: Structural Integrity & Clearance', pass: state.tempResources.mass <= state.tempResources.maxMass },
      { id: 'test-prop', name: 'Propulsion: Velocity & Thrust Chamber Check', pass: state.tempResources.velocity >= state.tempResources.reqVelocity },
      { id: 'test-power', name: 'Power Bus: Solar/RTG Equilibrium Verified', pass: state.tempResources.power <= state.tempResources.maxPower },
      { id: 'test-sensors', name: 'Scientific Sensors: Detectors Calibrated', pass: true },
      { id: 'test-ground', name: 'Ground Link: Handshake Protocol', pass: true }
    ];

    tests.forEach((t, i) => {
      setTimeout(() => {
        const el = document.getElementById(t.id);
        if (el) {
          el.className = t.pass ? 'passed' : 'failed';
          el.textContent = `${t.pass ? '✅' : '❌'} ${t.name}: PASSED VERIFICATION`;
        }
        playBeep(t.pass ? 880 : 350);
        if (i === tests.length - 1) {
          testsRun = true;
          // Grant +10% Reliability bonus and +5 Reputation!
          state.tempResources.diagnosticsBonus = 10;
          state.reputation = Math.min(100, state.reputation + 5);
          updatePermanentHud();
          calculateTempResources();
          alert('✅ NASA DIAGNOSTICS COMPLETED!\nGranted +10% Reliability Bonus across all flight segments and +5 Permanent Reputation for flight readiness rigor.');
        }
      }, (i + 1) * 300);
    });
  }

  // ========================================================================
  // 11. STAGE 6: IMPLEMENT (FLIGHT OPS & URGENT TIMED ANOMALIES)
  // ========================================================================

  let flightAnimId = null;
  let flightProgress = 0;
  let canvasFlightCtx = null;
  let flightDurationMs = 12000;

  function startStage6Flight() {
    // Deduct procurement cost (unless Sandbox)
    if (!isInfiniteBudget()) {
      state.budget -= state.tempResources.totalCost;
      updatePermanentHud();
    }

    state.flight = {
      segment: 'launch',
      progress: 0,
      running: true,
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null,
      anomalyUrgentSeconds: 15,
      anomalyUrgentTimer: null
    };

    DOM.anomalyAlertBox.style.display = 'none';
    DOM.btnCompleteFlight.style.display = 'none';
    DOM.flightTerminal.innerHTML = '';

    // Flight duration scales with mission distance!
    flightDurationMs = state.selectedDomain.transitDurationSec * 1000;

    logFlightMessage(`🚀 IGNITION [${state.missionName}]: Spacecraft launching on ${state.selectedDomain.name} mission trajectory.`);
    logFlightMessage(`⏱️ Mission transit profile: ${state.selectedDomain.transitDurationSec}s transit (${getDifficultyConfig().name}).`);

    const canvas = DOM.flightCanvas;
    canvasFlightCtx = canvas.getContext('2d');

    flightProgress = 0;
    if (flightAnimId) cancelAnimationFrame(flightAnimId);
    runFlightLoop();

    scheduleFlightMilestones();
  }

  function logFlightMessage(msg, isAlert = false) {
    const el = document.createElement('div');
    el.className = 'event-message';
    el.innerHTML = `<span class="timestamp">[T+${Math.round(flightProgress * state.selectedDomain.transitDurationSec)}s ${isAlert ? 'ALERT' : 'INFO'}]</span> ${msg}`;
    DOM.flightTerminal.appendChild(el);
    DOM.flightTerminal.scrollTop = DOM.flightTerminal.scrollHeight;
  }

  function scheduleFlightMilestones() {
    const diff = getDifficultyConfig();
    const tLaunch = flightDurationMs * 0.25;
    const tExtra = flightDurationMs * 0.42;
    const tSpace = flightDurationMs * 0.55;
    const tGround = flightDurationMs * 0.80;
    const tEnd = flightDurationMs * 1.05;

    // Launch Segment milestone
    setTimeout(() => {
      if (!state.flight.running) return;
      state.flight.segment = 'space';
      DOM.flightSegmentName.textContent = 'SPACE SEGMENT';
      DOM.flightPhaseName.textContent = 'STAGE SEPARATION & FAIRING JETTISON';
      logFlightMessage('🛰️ Main stage separation confirmed. Spacecraft bus deployed solar panels.');
      triggerTimedAnomaly('launch');
    }, tLaunch);

    // Extra anomaly window on Hard difficulty
    if (diff.extraAnomalyChance > 0) {
      setTimeout(() => {
        if (!state.flight.running || state.flight.anomalyActive) return;
        if (Math.random() < diff.extraAnomalyChance) {
          logFlightMessage('⚠️ Deep-space solar flare interference detected!', true);
          triggerTimedAnomaly('space');
        }
      }, tExtra);
    }

    // Space Segment milestone
    setTimeout(() => {
      if (!state.flight.running) return;
      DOM.flightPhaseName.textContent = 'SCIENCE INSTRUMENT CALIBRATION';
      logFlightMessage('🔬 Space Segment: Instruments online. Gathering multi-spectral telemetry.');
      state.flight.dataAccumulatedMB += 550;
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;
      triggerTimedAnomaly('space');
    }, tSpace);

    // Ground Segment milestone
    setTimeout(() => {
      if (!state.flight.running) return;
      state.flight.segment = 'ground';
      DOM.flightSegmentName.textContent = 'GROUND SEGMENT';
      DOM.flightPhaseName.textContent = 'DOWNLINKING TELEMETRY';

      // Bandwidth affects downlink speed and buffer capacity
      const bw = state.tempResources.bandwidth;
      if (bw < 30) {
        logFlightMessage('⚠️ Low Bandwidth warning: Telemetry buffer bottlenecked at ground receiver.', true);
        state.flight.dataAccumulatedMB = Math.round(state.flight.dataAccumulatedMB * 0.7); // data lost from buffer overflow!
      } else {
        state.flight.dataAccumulatedMB += 850;
      }
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;

      triggerTimedAnomaly('ground');
    }, tGround);

    // Flight End & Re-entry check for biological missions!
    setTimeout(() => {
      if (!state.flight.running) return;

      // Check Biological Sample Return Heat Shield
      if (state.selectedDomain.requiresHeatShield && !state.selections.heatShieldInstalled) {
        playAlarm();
        logFlightMessage('🚨 RE-ENTRY CATASTROPHE: No heat shield installed! Re-entry temperatures reached 1600°C and incinerated all biological samples.', true);
        state.flight.dataAccumulatedMB = 0;
        alert('🚨 MISSION FAILURE: Atmospheric Re-entry burned up your biological samples because no Heat Shield was installed!');
      } else if (state.selectedDomain.requiresHeatShield && state.selections.heatShieldInstalled) {
        logFlightMessage('🛡️ RE-ENTRY SUCCESS: PICA-X heat shield protected the biological sample return capsule during splashdown!');
      }

      state.flight.segment = 'done';
      DOM.flightPhaseName.textContent = 'MISSION FLIGHT OPERATIONS COMPLETE';
      logFlightMessage('🎉 MISSION COMPLETED: Downlinked telemetry verified. Proceed to User Segment.');
      DOM.btnCompleteFlight.style.display = 'block';
    }, tEnd);
  }

  function triggerTimedAnomaly(seg) {
    if (state.flight.anomalyActive) return;

    const diff = getDifficultyConfig();
    // Saboteur mode logic
    const isSabotaged = (state.gameMode === 'sabotage') && (state.saboteurRole === seg);
    if (!isSabotaged && Math.random() > diff.anomalyChance) {
      logFlightMessage(`✅ ${seg.toUpperCase()} segment nominal — no anomaly triggered.`);
      return;
    }

    let anomaly = null;
    if (seg === 'launch') {
      anomaly = {
        title: isSabotaged ? '🚨 VALVE PRESSURE SURGE (SABOTAGE DETECTED!)' : '⚠️ MECHANICAL VALVE PRESSURE SURGE',
        seg: 'launch',
        desc: 'Rocket propellant chamber pressure oscillating rapidly. Launch station must stabilize regulator valve immediately!',
        minigameType: 'pressure'
      };
    } else if (seg === 'space') {
      anomaly = {
        title: isSabotaged ? '🚨 SENSOR SENSITIVITY SPIKE (SABOTAGE DETECTED!)' : '⚠️ SENSOR OPTICAL DETUNE',
        seg: 'space',
        desc: 'Spacecraft star-tracker drift causing sensor optical detune. Space station must tune the frequency slider immediately!',
        minigameType: 'frequency'
      };
    } else if (seg === 'ground') {
      anomaly = {
        title: isSabotaged ? '🚨 BUFFER OVERFLOW (SABOTAGE DETECTED!)' : '⚠️ GROUND STATION AZIMUTH DRIFT',
        seg: 'ground',
        desc: 'Tracking dish slewing off-axis. Packet loss detected! Ground station must lock tracking angle immediately!',
        minigameType: 'dish'
      };
    }

    state.flight.anomalyActive = true;
    state.flight.activeAnomalyData = anomaly;
    state.flight.anomalyUrgentSeconds = 15;

    DOM.anomalySegmentBadge.textContent = anomaly.title;
    DOM.anomalySummary.textContent = anomaly.desc;
    DOM.anomalyCountdownText.textContent = `URGENT: ${state.flight.anomalyUrgentSeconds}s`;
    DOM.anomalyTimerBar.style.width = '100%';
    DOM.anomalyAlertBox.style.display = 'block';
    playAlarm();

    // Start 15-second unaddressed anomaly countdown timer!
    if (state.flight.anomalyUrgentTimer) clearInterval(state.flight.anomalyUrgentTimer);
    state.flight.anomalyUrgentTimer = setInterval(() => {
      state.flight.anomalyUrgentSeconds -= 1;
      const pct = (state.flight.anomalyUrgentSeconds / 15) * 100;
      DOM.anomalyTimerBar.style.width = `${Math.max(0, pct)}%`;
      DOM.anomalyCountdownText.textContent = `URGENT: ${state.flight.anomalyUrgentSeconds}s`;

      // Passive financial drain while delayed (scaled by difficulty, 0 in Sandbox)
      if (state.flight.anomalyUrgentSeconds % 3 === 0 && diff.anomalyDrain > 0 && !isInfiniteBudget()) {
        state.budget = Math.max(0, state.budget - diff.anomalyDrain);
        updatePermanentHud();
        logFlightMessage(`⚠️ Telemetry anomaly leaking fuel & funds: -$${diff.anomalyDrain.toLocaleString()} lost to drift.`, true);
      }

      if (state.flight.anomalyUrgentSeconds <= 0) {
        clearInterval(state.flight.anomalyUrgentTimer);
        // Time expired without intervention: catastrophic consequence!
        handleAnomalyTimeout(anomaly);
      }
    }, 1000);
  }

  function handleAnomalyTimeout(anomaly) {
    playAlarm();
    DOM.anomalyAlertBox.style.display = 'none';
    state.flight.anomalyActive = false;

    if (anomaly.seg === 'launch') {
      state.flight.launchIntegrity = 0;
      state.flight.running = false;
      const penalty = 300000;
      state.budget = Math.max(0, state.budget - penalty);
      updatePermanentHud();
      alert(`🚨 UNADDRESSED LAUNCH FAILURE!\nPropellant valve rupture resulted in catastrophic vehicle explosion. You lost -$${penalty.toLocaleString()} in salvage fees and the mission immediately failed.`);
      goToStage(7);
    } else if (anomaly.seg === 'space') {
      state.flight.spaceIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      alert(`⚠️ UNADDRESSED SPACE FAILURE!\nSensors suffered electrical burnout. Zero data collected.`);
    } else if (anomaly.seg === 'ground') {
      state.flight.groundIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      alert(`⚠️ UNADDRESSED GROUND FAILURE!\nTracking dish drifted completely out of line of sight. All data lost.`);
    }
  }

  function runFlightLoop() {
    if (state.stage !== 6) return;

    const ctx = canvasFlightCtx;
    const w = DOM.flightCanvas.width;
    const h = DOM.flightCanvas.height;

    ctx.clearRect(0, 0, w, h);

    if (state.flight.running && flightProgress < 1.0) {
      // Step rate based on duration
      flightProgress += 1 / (state.selectedDomain.transitDurationSec * 60);
    }

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, w, h);

    // Trajectory Curve
    ctx.beginPath();
    ctx.moveTo(60, h - 40);
    ctx.quadraticCurveTo(w * 0.4, 50, w - 80, 100);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Compute probe position along curve
    const t = Math.min(1.0, flightProgress);
    const p0x = 60, p0y = h - 40;
    const p1x = w * 0.4, p1y = 50;
    const p2x = w - 80, p2y = 100;

    const curX = (1 - t) * (1 - t) * p0x + 2 * (1 - t) * t * p1x + t * t * p2x;
    const curY = (1 - t) * (1 - t) * p0y + 2 * (1 - t) * t * p1y + t * t * p2y;

    // Vehicle Probe
    ctx.beginPath();
    ctx.arc(curX, curY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Thrust flame
    ctx.beginPath();
    ctx.arc(curX - 8, curY + 6, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();

    // Update status bars
    DOM.fgBarLaunch.style.width = `${state.flight.launchIntegrity}%`;
    DOM.fgValLaunch.textContent = `${state.flight.launchIntegrity}%`;
    DOM.fgBarSpace.style.width = `${state.flight.spaceIntegrity}%`;
    DOM.fgValSpace.textContent = `${state.flight.spaceIntegrity}%`;
    DOM.fgBarGround.style.width = `${state.flight.groundIntegrity}%`;
    DOM.fgValGround.textContent = `${state.flight.groundIntegrity}%`;

    flightAnimId = requestAnimationFrame(runFlightLoop);
  }

  // ========================================================================
  // 12. EVENT MINIGAME ENGINE
  // ========================================================================

  let minigameTimer = null;
  let minigameCurrentVal = 50;
  let minigameTargetVal = 50;
  let minigameTimeLeft = 100;

  function launchMinigame() {
    if (state.flight.anomalyUrgentTimer) {
      clearInterval(state.flight.anomalyUrgentTimer);
    }

    const anomaly = state.flight.activeAnomalyData;
    if (!anomaly) return;

    DOM.minigameTitle.textContent = anomaly.title;
    DOM.minigameRoleTag.textContent = `${anomaly.seg.toUpperCase()} STATION`;
    DOM.minigameModal.classList.add('active');
    DOM.minigameModal.style.display = 'flex';

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
        evaluateMinigameOutcome(false);
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

    // Needle
    const curX = (minigameCurrentVal / 100) * (w - 60) + 30;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(curX, 15);
    ctx.lineTo(curX, h - 15);
    ctx.stroke();
    ctx.lineWidth = 1;

    ctx.fillStyle = '#fff';
    ctx.font = '12px "JetBrains Mono"';
    ctx.fillText(`Target: ${minigameTargetVal}`, 20, 30);
    ctx.fillText(`Current: ${Math.round(minigameCurrentVal)}`, 20, 50);
  }

  function evaluateMinigameOutcome(forceWin = false) {
    if (minigameTimer) clearInterval(minigameTimer);
    DOM.minigameModal.classList.remove('active');
    DOM.minigameModal.style.display = 'none';

    const diff = Math.abs(minigameCurrentVal - minigameTargetVal);
    const success = forceWin || (diff < 20);
    const anomaly = state.flight.activeAnomalyData;

    if (success) {
      playBeep(1200);
      logFlightMessage(`✅ ANOMALY RESOLVED: ${anomaly.seg.toUpperCase()} station stabilized the issue!`);
      DOM.anomalyAlertBox.style.display = 'none';
      state.flight.anomalyActive = false;
    } else {
      handleAnomalyTimeout(anomaly);
    }
  }

  // ========================================================================
  // 13. STAGE 7: DATA REFINERY (L0 -> L4) & 2-DATASET COMBINING
  // ========================================================================

  const LEVEL_ORDER = ['L0', 'L1A', 'L1B', 'L1C', 'L2', 'L2A', 'L2B', 'L3', 'L3A', 'L4'];

  function isLevelAtLeast(level, minLevel) {
    return LEVEL_ORDER.indexOf(level) >= LEVEL_ORDER.indexOf(minLevel);
  }

  function getItemDecayMultiplier(item) {
    if (state.difficulty !== 'hard' || item.level === 'L4' || !item.cyclesOld) return 1.0;
    return Math.max(0.2, 1.0 - item.cyclesOld * 0.15);
  }

  function getCombineConfig(level) {
    if (level === 'L1C') {
      return { target: 'L2', minPartnerLevel: 'L1C', cost: 20000, required: false, label: 'Combine 2× L1C+ datasets into L2 (Alternate Recipe)' };
    }
    if (level === 'L2B') {
      return { target: 'L3', minPartnerLevel: 'L2B', cost: 95000, required: true, label: 'Stitch 2× L2B+ datasets into 1 L3 Spatial Map' };
    }
    if (level === 'L3') {
      return { target: 'L3A', minPartnerLevel: 'L2B', cost: 130000, required: true, label: 'Stack L3 + L2B+ dataset into 1 L3A Temporal Interval' };
    }
    return null;
  }

  function renderStage7RefineryAndMarket() {
    // Tier 2 instruments give L1B calibrated data directly
    if (state.flight.dataAccumulatedMB > 0) {
      state.selectedInstruments.forEach(inst => {
        const initialLevel = inst.tier === 2 ? 'L1B' : 'L0';
        const baseVal = DATA_LEVELS[initialLevel].baseVal;

        state.dataInventory.push({
          id: `data_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          name: inst.name,
          category: inst.category,
          domain: state.selectedDomain.id,
          domainName: state.selectedDomain.name,
          level: initialLevel,
          estValue: baseVal,
          cyclesOld: 0
        });
      });
      state.flight.dataAccumulatedMB = 0;
    }

    if (DOM.invDecayHint) {
      DOM.invDecayHint.textContent = state.difficulty === 'hard'
        ? '⚠️ HARD MODE: Unsold non-L4 datasets decay 15%/cycle (L4 & Forge components ignore decay)'
        : '✅ Stored datasets retain 100% of their scientific value across cycles';
    }

    renderInventoryList();
    updatePermanentHud();
  }

  function renderInventoryList() {
    DOM.dataInventoryList.innerHTML = '';
    DOM.dataInventoryList.classList.toggle('list-view', state.inventoryViewMode === 'list');
    if (DOM.btnInvGrid) DOM.btnInvGrid.classList.toggle('active', state.inventoryViewMode === 'grid');
    if (DOM.btnInvList) DOM.btnInvList.classList.toggle('active', state.inventoryViewMode === 'list');

    if (state.dataInventory.length === 0) {
      DOM.dataInventoryList.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.8rem;">No datasets currently in inventory. Complete a flight to gather L0/L1B telemetry!</p>`;
      DOM.processingControls.style.display = 'none';
      DOM.processingRecipe.innerHTML = `<p>Select a data package from your inventory above to view available refinement recipes.</p>`;
      return;
    }

    state.dataInventory.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `data-card ${state.selectedInventoryIdx === idx ? 'selected' : ''}`;

      // Check dynamic trend boost
      const isTrending = state.currentTrend && state.currentTrend.domain === item.domain;
      const trendBadge = isTrending ? `<span class="trend-badge">🔥 TRENDING (+${Math.round((state.currentTrend.boost - 1) * 100)}%)</span>` : '';

      const decayMultiplier = getItemDecayMultiplier(item);
      const decayBadge = (state.difficulty === 'hard' && item.level !== 'L4' && (item.cyclesOld || 0) > 0)
        ? `<span class="decay-badge">-${item.cyclesOld * 15}% DECAY</span>`
        : '';

      const trendMultiplier = isTrending ? state.currentTrend.boost : 1.0;
      const currentMarketVal = Math.round(item.estValue * decayMultiplier * trendMultiplier);

      card.innerHTML = `
        ${decayBadge}
        <span class="data-level-badge">${item.level}</span>
        <strong style="color: #fff; font-size: 0.85rem;">${item.name}</strong>
        <span style="font-size: 0.7rem; color: var(--text-muted);">${item.category}</span>
        ${trendBadge}
        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-emerald); margin-top: 0.35rem;">
          $${currentMarketVal.toLocaleString()}
        </span>
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
        <h4>${item.level} // MAXIMUM REFINEMENT ATTAINED</h4>
        <p>${curLevelInfo.desc}</p>
        <p class="text-emerald">This is an endgame multi-sensor scientific dataset (immune to cycle degradation). Ready for maximum market sale!</p>
      `;
      DOM.processingControls.style.display = 'none';
      return;
    }

    if (item.level === 'L3A') {
      DOM.processingRecipe.innerHTML = `
        <h4>REFINEMENT PIPELINE: L3A &rarr; L4 (ANCIENT SYNTHESIS FORGE)</h4>
        <p><strong>Current:</strong> ${curLevelInfo.name} ($${curLevelInfo.baseVal.toLocaleString()})</p>
        <p style="font-size: 0.78rem; color: var(--color-gold); margin-top: 0.35rem;">🧬 Use the <strong>L4 ANCIENT SYNTHESIS FORGE</strong> button above to combine this L3A dataset with any number of loose L2+ datasets! More data stuffed in = exponentially higher L4 value.</p>
      `;
      DOM.processingControls.style.display = 'none';
      return;
    }

    const sandbox = isInfiniteBudget();
    const nextLevelKey = curLevelInfo.next;
    const nextLevelInfo = DATA_LEVELS[nextLevelKey];
    const combineCfg = getCombineConfig(item.level);

    // Check if single refinement is unprofitable
    const valueGain = nextLevelInfo.baseVal - curLevelInfo.baseVal;
    const isUnprofitable = curLevelInfo.refineCost > valueGain;

    let warningHtml = '';
    if (isUnprofitable) {
      warningHtml = `<p style="color: var(--color-crimson); font-size: 0.72rem; margin-top: 0.3rem;">⚠️ UNPROFITABLE SINGLE REFINEMENT: Lab cost ($${curLevelInfo.refineCost.toLocaleString()}) exceeds single-value gain ($${valueGain.toLocaleString()})! Profitable when combined into L3/L4.</p>`;
    }

    let recipeSpecial = '';
    if (combineCfg) {
      recipeSpecial = `<p style="font-size: 0.72rem; color: var(--color-cyan);">🔗 ${combineCfg.label}</p>`;
    }

    DOM.processingRecipe.innerHTML = `
      <h4>REFINEMENT PIPELINE: ${item.level} &rarr; ${nextLevelKey}</h4>
      <p><strong>Current:</strong> ${curLevelInfo.name} ($${curLevelInfo.baseVal.toLocaleString()})</p>
      <p><strong>Target:</strong> ${nextLevelInfo.name} ($${nextLevelInfo.baseVal.toLocaleString()})</p>
      <p style="font-size: 0.74rem; color: var(--color-blue); margin-top: 0.3rem;">${nextLevelInfo.desc}</p>
      ${recipeSpecial}
      <p style="margin-top: 0.4rem;">Refinement Lab Fee: <strong class="text-amber">${sandbox ? '$0 (SANDBOX)' : '$' + curLevelInfo.refineCost.toLocaleString()}</strong></p>
      ${warningHtml}
    `;

    DOM.processingControls.style.display = 'block';

    // Single-dataset refine button (hidden if level requires 2-dataset combine)
    if (combineCfg && combineCfg.required) {
      DOM.btnRefineData.style.display = 'none';
    } else {
      DOM.btnRefineData.style.display = 'inline-flex';
      DOM.btnRefineData.textContent = sandbox
        ? `REFINE TO ${nextLevelKey} (FREE)`
        : `REFINE TO ${nextLevelKey} (-$${curLevelInfo.refineCost.toLocaleString()})`;
      DOM.btnRefineData.disabled = !sandbox && state.budget < curLevelInfo.refineCost;
    }

    // 2-dataset combine UI
    if (combineCfg && DOM.combinePanel) {
      DOM.combinePanel.style.display = 'flex';
      DOM.combinePartnerSelect.innerHTML = '';

      const partners = state.dataInventory
        .map((p, idx) => ({ p, idx }))
        .filter(({ p, idx }) => idx !== state.selectedInventoryIdx && isLevelAtLeast(p.level, combineCfg.minPartnerLevel));

      if (partners.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = `Need another ${combineCfg.minPartnerLevel}+ dataset in inventory`;
        DOM.combinePartnerSelect.appendChild(opt);
        DOM.btnCombineData.disabled = true;
        DOM.btnCombineData.textContent = `COMBINE 2 DATASETS → ${combineCfg.target} (NO PARTNER)`;
      } else {
        partners.forEach(({ p, idx }) => {
          const opt = document.createElement('option');
          opt.value = String(idx);
          opt.textContent = `[${p.level}] ${p.name} (${p.domainName})`;
          DOM.combinePartnerSelect.appendChild(opt);
        });
        DOM.btnCombineData.disabled = !sandbox && state.budget < combineCfg.cost;
        DOM.btnCombineData.textContent = sandbox
          ? `COMBINE 2 DATASETS → ${combineCfg.target} (FREE)`
          : `COMBINE 2 DATASETS → ${combineCfg.target} (-$${combineCfg.cost.toLocaleString()})`;
      }
    } else if (DOM.combinePanel) {
      DOM.combinePanel.style.display = 'none';
    }
  }

  function refineSelectedData() {
    if (state.selectedInventoryIdx === null) return;
    const item = state.dataInventory[state.selectedInventoryIdx];
    if (!item) return;

    const combineCfg = getCombineConfig(item.level);
    if (combineCfg && combineCfg.required) {
      playAlarm();
      alert(`${item.level} → ${combineCfg.target} requires combining 2 datasets!`);
      return;
    }

    const curLevelInfo = DATA_LEVELS[item.level];
    const sandbox = isInfiniteBudget();
    if (!curLevelInfo.next || (!sandbox && state.budget < curLevelInfo.refineCost)) {
      playAlarm();
      return;
    }

    playBeep(1100);
    if (!sandbox) state.budget -= curLevelInfo.refineCost;
    const nextKey = curLevelInfo.next;
    item.level = nextKey;
    item.estValue = DATA_LEVELS[nextKey].baseVal;

    updatePermanentHud();
    renderInventoryList();
    renderRefineryWorkbench(item);
  }

  function combineSelectedData() {
    if (state.selectedInventoryIdx === null) return;
    const primaryIdx = state.selectedInventoryIdx;
    const item = state.dataInventory[primaryIdx];
    if (!item) return;

    const combineCfg = getCombineConfig(item.level);
    if (!combineCfg) return;

    const partnerIdx = parseInt(DOM.combinePartnerSelect.value, 10);
    if (isNaN(partnerIdx) || partnerIdx === primaryIdx || !state.dataInventory[partnerIdx]) {
      playAlarm();
      alert(`Select a valid second ${combineCfg.minPartnerLevel}+ dataset to combine!`);
      return;
    }

    const partner = state.dataInventory[partnerIdx];
    if (!isLevelAtLeast(partner.level, combineCfg.minPartnerLevel)) {
      playAlarm();
      alert(`Partner dataset must be at least ${combineCfg.minPartnerLevel}.`);
      return;
    }

    const sandbox = isInfiniteBudget();
    if (!sandbox && state.budget < combineCfg.cost) {
      playAlarm();
      alert(`Insufficient funds! Combining requires $${combineCfg.cost.toLocaleString()}.`);
      return;
    }

    playBeep(1250);
    if (!sandbox) state.budget -= combineCfg.cost;

    item.level = combineCfg.target;
    item.estValue = DATA_LEVELS[combineCfg.target].baseVal;
    if (!item.name.includes(partner.name)) {
      item.name = `${item.name} + ${partner.name}`;
    }

    // Consume the 2nd dataset (2 datasets -> 1 combined dataset)
    state.dataInventory.splice(partnerIdx, 1);
    state.selectedInventoryIdx = partnerIdx < primaryIdx ? primaryIdx - 1 : primaryIdx;

    updatePermanentHud();
    renderInventoryList();
    if (state.dataInventory[state.selectedInventoryIdx]) {
      renderRefineryWorkbench(state.dataInventory[state.selectedInventoryIdx]);
    }
  }

  // L4 ANCIENT SYNTHESIS FORGE (MC Dungeons Ancient Hunts Style)
  function getL4ForgeProjected(chamberIndices) {
    const items = chamberIndices.map(i => state.dataInventory[i]).filter(Boolean);
    const hasL3A = items.some(it => it.level === 'L3A');
    const enoughCount = items.length >= 2;
    const valid = hasL3A && enoughCount;
    // Components used in L4 ALWAYS use their base price, NOT their degraded price!
    const sumBase = items.reduce((acc, it) => acc + (DATA_LEVELS[it.level] ? DATA_LEVELS[it.level].baseVal : it.estValue), 0);
    const mult = 1.65 + Math.max(0, items.length - 2) * 0.25;
    const projectedVal = items.length > 0 ? Math.max(DATA_LEVELS.L4.baseVal, Math.round(sumBase * mult)) : 0;
    const fee = isInfiniteBudget() ? 0 : 180000;
    return { items, hasL3A, enoughCount, valid, sumBase, mult, projectedVal, fee };
  }

  function openL4ForgeModal() {
    playBeep(820);
    state.l4ChamberIndices = [];
    if (DOM.l4ForgeModal) {
      DOM.l4ForgeModal.classList.add('active');
      DOM.l4ForgeModal.style.display = 'flex';
    }
    renderL4Forge();
  }

  function renderL4Forge() {
    if (!DOM.l4ChamberList || !DOM.l4OfferingsList) return;
    // Filter out any stale indices
    state.l4ChamberIndices = state.l4ChamberIndices.filter(idx => state.dataInventory[idx] && isLevelAtLeast(state.dataInventory[idx].level, 'L2') && state.dataInventory[idx].level !== 'L4');

    const proj = getL4ForgeProjected(state.l4ChamberIndices);
    DOM.l4ChamberCount.textContent = `${proj.items.length} ITEM(S)`;

    // Render LEFT: Synthesis Chamber
    DOM.l4ChamberList.innerHTML = '';
    if (proj.items.length === 0) {
      DOM.l4ChamberList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.78rem; padding: 0.5rem;">Click L2+ datasets on the right to place them into the Synthesis Chamber.</p>`;
    } else {
      state.l4ChamberIndices.forEach(invIdx => {
        const it = state.dataInventory[invIdx];
        const baseVal = DATA_LEVELS[it.level] ? DATA_LEVELS[it.level].baseVal : it.estValue;
        const row = document.createElement('div');
        row.className = 'l4-item-row';
        row.innerHTML = `
          <div>
            <span class="data-level-badge">${it.level}</span>
            <strong style="color: #fff; font-size: 0.8rem;">${it.name}</strong>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-emerald);">$${baseVal.toLocaleString()} (Base) ✕</span>
        `;
        row.addEventListener('click', () => {
          playBeep(550);
          state.l4ChamberIndices = state.l4ChamberIndices.filter(i => i !== invIdx);
          renderL4Forge();
        });
        DOM.l4ChamberList.appendChild(row);
      });
    }

    // Render RIGHT: Available L2+ Offerings
    DOM.l4OfferingsList.innerHTML = '';
    const available = state.dataInventory
      .map((it, idx) => ({ it, idx }))
      .filter(({ it, idx }) => isLevelAtLeast(it.level, 'L2') && it.level !== 'L4' && !state.l4ChamberIndices.includes(idx));

    DOM.l4AvailableCount.textContent = `${available.length} ELIGIBLE`;
    if (available.length === 0) {
      DOM.l4OfferingsList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.78rem; padding: 0.5rem;">No remaining L2+ datasets in inventory.</p>`;
    } else {
      available.forEach(({ it, idx }) => {
        const baseVal = DATA_LEVELS[it.level] ? DATA_LEVELS[it.level].baseVal : it.estValue;
        const row = document.createElement('div');
        row.className = 'l4-item-row';
        row.innerHTML = `
          <div>
            <span class="data-level-badge">${it.level}</span>
            <strong style="color: #fff; font-size: 0.8rem;">${it.name}</strong>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cyan);">+$${baseVal.toLocaleString()}</span>
        `;
        row.addEventListener('click', () => {
          playBeep(880);
          state.l4ChamberIndices.push(idx);
          renderL4Forge();
        });
        DOM.l4OfferingsList.appendChild(row);
      });
    }

    // Update stats & button
    if (proj.valid) {
      DOM.l4ReqStatus.textContent = '✅ Ready to Forge L4 Master Dataset';
      DOM.l4ReqStatus.className = 'text-emerald';
    } else {
      DOM.l4ReqStatus.textContent = !proj.hasL3A ? 'Need at least 1× L3A dataset' : 'Need at least 2 total L2+ datasets';
      DOM.l4ReqStatus.className = 'text-crimson';
    }
    DOM.l4SynergyMult.textContent = `${proj.mult.toFixed(2)}x (${proj.items.length} offerings)`;
    DOM.l4ProjectedVal.textContent = `$${proj.projectedVal.toLocaleString()}`;
    DOM.l4ForgeFee.textContent = proj.fee === 0 ? '$0 (SANDBOX)' : `$${proj.fee.toLocaleString()}`;
    DOM.btnForgeL4.disabled = !proj.valid || (!isInfiniteBudget() && state.budget < proj.fee);
  }

  function forgeL4Dataset() {
    const proj = getL4ForgeProjected(state.l4ChamberIndices);
    if (!proj.valid) {
      playAlarm();
      return;
    }
    if (!isInfiniteBudget() && state.budget < proj.fee) {
      playAlarm();
      alert(`Insufficient funds for L4 Synthesis ($${proj.fee.toLocaleString()} required).`);
      return;
    }

    playBeep(1320);
    if (!isInfiniteBudget()) state.budget -= proj.fee;

    const firstItem = proj.items[0];
    const newL4 = {
      id: `data_l4_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: `L4 Master Synthesis (${proj.items.length} datasets)`,
      category: 'Multi-Sensor Synthesis',
      domain: firstItem.domain,
      domainName: firstItem.domainName,
      level: 'L4',
      estValue: proj.projectedVal,
      cyclesOld: 0
    };

    // Remove consumed indices in descending order so indices don't shift
    const sortedDesc = [...state.l4ChamberIndices].sort((a, b) => b - a);
    sortedDesc.forEach(idx => state.dataInventory.splice(idx, 1));
    state.dataInventory.push(newL4);

    state.l4ChamberIndices = [];
    state.selectedInventoryIdx = state.dataInventory.length - 1;

    if (DOM.l4ForgeModal) {
      DOM.l4ForgeModal.classList.remove('active');
      DOM.l4ForgeModal.style.display = 'none';
    }

    updatePermanentHud();
    renderInventoryList();
    renderRefineryWorkbench(newL4);
    alert(`🧬 L4 MASTER DATASET FORGED!\nSynthesized ${proj.items.length} datasets into 1 L4 Master Dataset worth $${proj.projectedVal.toLocaleString()} (immune to cycle degradation)!`);
  }

  function sellDataToBuyer(buyerType) {
    if (state.selectedInventoryIdx === null) {
      playAlarm();
      alert('Select a dataset from your inventory to sell!');
      return;
    }

    const item = state.dataInventory[state.selectedInventoryIdx];
    if (!item) return;

    // Apply smooth reputation curve (+25% Flagship Partner multiplier at 100 Rep)
    const repMultiplier = getReputationPriceMultiplier();

    // Apply Hard-difficulty cycle degradation (L4 is immune!)
    const decayMultiplier = getItemDecayMultiplier(item);

    // Apply market trends
    const isTrending = state.currentTrend && state.currentTrend.domain === item.domain;
    const trendMultiplier = isTrending ? state.currentTrend.boost : 1.0;

    let baseBuyerMult = 1.0;
    let repDelta = 0;

    if (buyerType === 'institute') {
      baseBuyerMult = 1.0;
      repDelta = +8;
    } else if (buyerType === 'opensource') {
      baseBuyerMult = 0.0;
      repDelta = +20;
    } else if (buyerType === 'shady') {
      baseBuyerMult = 2.5;
      repDelta = -15;
    }

    const payout = Math.round(item.estValue * baseBuyerMult * repMultiplier * decayMultiplier * trendMultiplier);
    if (!isInfiniteBudget()) {
      state.budget += payout;
    }
    state.reputation = Math.max(0, Math.min(100, state.reputation + repDelta));

    playBeep(payout > 0 ? 1200 : 800);
    const flagshipNote = state.reputation >= 100 ? '\n🏆 100-Reputation Flagship Partner Bonus Active (+25% Payout & +$150k/Cycle)!' : '';
    alert(`Data sold to ${buyerType.toUpperCase()}!\n💰 Cash Earned: $${payout.toLocaleString()}\n⭐ Reputation Change: ${repDelta >= 0 ? '+' : ''}${repDelta}${flagshipNote}`);

    state.dataInventory.splice(state.selectedInventoryIdx, 1);
    state.selectedInventoryIdx = null;

    updatePermanentHud();
    renderInventoryList();
  }

  // ========================================================================
  // 14. DATA VAULT MODAL (VIEW STORED DATA ANYTIME)
  // ========================================================================

  function openDataVault() {
    playBeep(750);
    DOM.vaultModal.classList.add('active');
    DOM.vaultModal.style.display = 'flex';
    renderVaultList();
  }

  function renderVaultList() {
    DOM.vaultListContainer.innerHTML = '';
    if (state.dataInventory.length === 0) {
      DOM.vaultListContainer.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.85rem;">Vault empty. Complete missions to downlink and store science data!</p>`;
      return;
    }

    state.dataInventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'data-card';

      const decayBadge = (state.difficulty === 'hard' && item.level !== 'L4' && (item.cyclesOld || 0) > 0)
        ? `<span class="decay-badge">-${item.cyclesOld * 15}% Value Decay</span>`
        : '';

      card.innerHTML = `
        ${decayBadge}
        <span class="data-level-badge">${item.level}</span>
        <strong style="color: #fff; font-size: 0.85rem;">${item.name}</strong>
        <span style="font-size: 0.72rem; color: var(--text-muted);">${item.category} (${item.domainName})</span>
        <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-emerald); margin-top: 0.4rem;">
          Base Value: $${item.estValue.toLocaleString()}
        </span>
      `;
      DOM.vaultListContainer.appendChild(card);
    });
  }

  // ========================================================================
  // 15. COMMENCE NEXT MISSION CYCLE (HARD DECAY, FLAGSHIP BONUS & TREND LOCK)
  // ========================================================================

  function commenceNextMissionCycle() {
    playQuindarTone();
    state.missionCycle++;

    let cycleMessages = [`🚀 Mission Cycle ${state.missionCycle} Started!`];

    // Hard difficulty only: non-L4 datasets degrade by 15%/cycle (L4 never degrades!)
    if (state.difficulty === 'hard') {
      let decayedCount = 0;
      state.dataInventory.forEach(item => {
        if (item.level !== 'L4') {
          item.cyclesOld = (item.cyclesOld || 0) + 1;
          decayedCount++;
        }
      });
      if (decayedCount > 0) {
        cycleMessages.push(`⚠️ HARD MODE: ${decayedCount} non-L4 dataset(s) decayed by 15% (L4 datasets immune).`);
      }
    }

    // 100 Reputation Government Grant Bonus
    if (state.reputation >= 100 && !isInfiniteBudget()) {
      const grantBonus = 150000;
      state.budget += grantBonus;
      cycleMessages.push(`🏆 100-Reputation NASA Flagship Grant: +$${grantBonus.toLocaleString()} awarded!`);
    }

    // Debt interest: 5% interest on unpaid debt
    if (state.activeDebt > 0) {
      const interest = Math.round(state.activeDebt * 0.05);
      state.activeDebt += interest;
      cycleMessages.push(`⚠️ Unpaid debt accrued 5% interest (+$${interest.toLocaleString()}). Total debt: $${state.activeDebt.toLocaleString()}.`);
    }

    alert(cycleMessages.join('\n'));

    // Rotate market trends unless locked by player
    if (!state.trendLocked) {
      const newTrend = MARKET_TREND_POOLS[Math.floor(Math.random() * MARKET_TREND_POOLS.length)];
      state.currentTrend = newTrend;
      setTickerText(newTrend.text);
    }

    // Reset design choices to Launch Segment
    activeDesignSegment = 'launch';
    state.selectedInstruments = [];
    state.instrumentTiers = {};
    state.selections = {
      launchRocket: null,
      selectedFuel: 'kerosene',
      spaceBus: null,
      busSizing: 'standard',
      heatShieldInstalled: false,
      groundStation: null
    };
    state.tempResources.diagnosticsBonus = 0;

    updatePermanentHud();
    goToStage(1);
  }

  // ========================================================================
  // 16. EVENT LISTENERS & SETUP
  // ========================================================================

  function setupEventListeners() {
    // Main Menu Buttons
    DOM.menuBtnSingleplayer.addEventListener('click', () => {
      playBeep(880);
      state.gameMode = 'singleplayer';
      DOM.mainMenuOverlay.classList.remove('active');
      DOM.mainMenuOverlay.style.display = 'none';
      DOM.appContainer.style.display = 'flex';
      DOM.hudModeBadge.textContent = 'SINGLEPLAYER';
      DOM.rolesBar.style.display = 'none'; // HIDE in singleplayer!
      DOM.saboteurStatusPill.style.display = 'none';
      goToStage(1);
    });

    DOM.menuBtnMultiplayer.addEventListener('click', () => {
      playBeep(700);
      DOM.mpSubgroup.style.display = DOM.mpSubgroup.style.display === 'none' ? 'flex' : 'none';
    });

    DOM.mpBtnCoop.addEventListener('click', () => {
      playBeep(880);
      state.gameMode = 'coop';
      DOM.mainMenuOverlay.classList.remove('active');
      DOM.mainMenuOverlay.style.display = 'none';
      DOM.appContainer.style.display = 'flex';
      DOM.hudModeBadge.textContent = 'MULTIPLAYER CO-OP';
      DOM.rolesBar.style.display = 'flex';
      DOM.saboteurStatusPill.style.display = 'none';
      goToStage(1);
    });

    DOM.mpBtnSabotage.addEventListener('click', () => {
      playBeep(880);
      state.gameMode = 'sabotage';
      DOM.mainMenuOverlay.classList.remove('active');
      DOM.mainMenuOverlay.style.display = 'none';
      DOM.appContainer.style.display = 'flex';
      DOM.hudModeBadge.textContent = 'SABOTEUR MODE';
      DOM.rolesBar.style.display = 'flex';
      DOM.saboteurStatusPill.style.display = 'inline-block';
      const roles = ['launch', 'space', 'ground'];
      state.saboteurRole = roles[Math.floor(Math.random() * roles.length)];
      alert('🕵️ SABOTEUR IMPOSTOR MODE ENGAGED!\nOne station is an undercover saboteur introducing hidden malfunctions. Your crew must solve urgent minigames to prevent bankruptcy!');
      goToStage(1);
    });

    DOM.menuBtnSettings.addEventListener('click', () => {
      playBeep(650);
      DOM.settingsModal.classList.add('active');
      DOM.settingsModal.style.display = 'flex';
    });

    DOM.menuBtnManual.addEventListener('click', () => {
      playBeep(650);
      DOM.rulesModal.classList.add('active');
      DOM.rulesModal.style.display = 'flex';
    });

    DOM.btnReturnMenu.addEventListener('click', () => {
      playBeep(600);
      DOM.mainMenuOverlay.classList.add('active');
      DOM.mainMenuOverlay.style.display = 'flex';
      DOM.appContainer.style.display = 'none';
    });

    // Station Role Tabs (Multiplayer Co-op & Saboteur)
    if (DOM.roleTabs) {
      Object.keys(DOM.roleTabs).forEach(roleKey => {
        const tab = DOM.roleTabs[roleKey];
        if (tab) {
          tab.addEventListener('click', () => {
            playBeep(700);
            Object.values(DOM.roleTabs).forEach(t => t && t.classList.remove('active'));
            tab.classList.add('active');
            state.userRole = roleKey;
            if (state.stage === 4) {
              if (roleKey === 'launch') {
                activeDesignSegment = 'launch';
                renderStage4Design();
              } else if (roleKey === 'space') {
                activeDesignSegment = 'space';
                renderStage4Design();
              } else if (roleKey === 'ground') {
                activeDesignSegment = 'ground';
                renderStage4Design();
              }
            }
          });
        }
      });
    }

    // Vault Button
    DOM.btnOpenVault.addEventListener('click', openDataVault);
    DOM.vaultModalClose.addEventListener('click', () => {
      DOM.vaultModal.classList.remove('active');
      DOM.vaultModal.style.display = 'none';
    });
    DOM.vaultModalDone.addEventListener('click', () => {
      DOM.vaultModal.classList.remove('active');
      DOM.vaultModal.style.display = 'none';
    });

    // Settings Button & Volume
    DOM.btnOpenSettings.addEventListener('click', () => {
      DOM.settingsModal.classList.add('active');
      DOM.settingsModal.style.display = 'flex';
    });
    DOM.settingsModalClose.addEventListener('click', () => {
      DOM.settingsModal.classList.remove('active');
      DOM.settingsModal.style.display = 'none';
    });
    DOM.settingsModalSave.addEventListener('click', () => {
      DOM.settingsModal.classList.remove('active');
      DOM.settingsModal.style.display = 'none';
    });

    // LM Studio Test Connection
    if (DOM.btnTestLmSettings) {
      DOM.btnTestLmSettings.addEventListener('click', async () => {
        playBeep(750);
        DOM.settingsLmStatus.textContent = 'Testing connection to LM Studio...';
        DOM.settingsLmStatus.className = 'text-amber';
        const lmUrl = document.getElementById('setting-lm-url')?.value || 'http://localhost:1234/v1';
        try {
          const resp = await fetch(`${lmUrl}/models`, { method: 'GET', signal: AbortSignal.timeout(3000) });
          if (resp.ok) {
            const data = await resp.json();
            const modelCount = data.data ? data.data.length : 1;
            DOM.settingsLmStatus.textContent = `✅ Connected! Found ${modelCount} active model(s).`;
            DOM.settingsLmStatus.className = 'text-emerald';
            playBeep(1200);
          } else {
            DOM.settingsLmStatus.textContent = `⚠️ Connected, but models endpoint returned ${resp.status}. Built-in fallback ready.`;
            DOM.settingsLmStatus.className = 'text-amber';
          }
        } catch (err) {
          DOM.settingsLmStatus.textContent = 'ℹ️ LM Studio offline or CORS blocked. Built-in procedural AI fallback will handle all events.';
          DOM.settingsLmStatus.className = 'text-muted';
        }
      });
    }

    DOM.sliderVolume.addEventListener('input', (e) => {
      masterVolume = parseInt(e.target.value) / 100;
      DOM.volumeVal.textContent = `${e.target.value}%`;
      playBeep(880);
    });

    // Initialization Controls Mode Selection -> chains to Difficulty Selection
    if (DOM.initBtnBasic) {
      DOM.initBtnBasic.addEventListener('click', () => {
        playBeep(700);
        state.customSlidersEnabled = false;
        DOM.chkAdvSliders.checked = false;
        DOM.initModeModal.classList.remove('active');
        if (DOM.initDifficultyModal) DOM.initDifficultyModal.classList.add('active');
        if (state.stage === 4) {
          renderStage4Design();
          calculateTempResources();
        }
      });
    }

    if (DOM.initBtnAdvanced) {
      DOM.initBtnAdvanced.addEventListener('click', () => {
        playBeep(900);
        state.customSlidersEnabled = true;
        DOM.chkAdvSliders.checked = true;
        DOM.initModeModal.classList.remove('active');
        if (DOM.initDifficultyModal) DOM.initDifficultyModal.classList.add('active');
        if (state.stage === 4) {
          renderStage4Design();
          calculateTempResources();
        }
      });
    }

    // Initialization Difficulty & Sandbox Selection
    const applyDifficulty = (diffId) => {
      playBeep(diffId === 'sandbox' ? 1100 : 800);
      state.difficulty = diffId;
      const cfg = getDifficultyConfig();
      state.budget = cfg.startingBudget;
      if (DOM.initDifficultyModal) DOM.initDifficultyModal.classList.remove('active');
      updatePermanentHud();
      if (state.stage === 2) renderStage2Instruments();
      if (state.stage === 4) calculateTempResources();
      if (state.stage === 5) renderStage5Verification();
    };
    if (DOM.diffBtnEasy) DOM.diffBtnEasy.addEventListener('click', () => applyDifficulty('easy'));
    if (DOM.diffBtnNormal) DOM.diffBtnNormal.addEventListener('click', () => applyDifficulty('normal'));
    if (DOM.diffBtnHard) DOM.diffBtnHard.addEventListener('click', () => applyDifficulty('hard'));
    if (DOM.diffBtnSandbox) DOM.diffBtnSandbox.addEventListener('click', () => applyDifficulty('sandbox'));

    // Advanced Sliders Toggle
    DOM.chkAdvSliders.addEventListener('change', (e) => {
      state.customSlidersEnabled = e.target.checked;
      if (state.stage === 4) {
        renderStage4Design();
        calculateTempResources();
      }
    });

    // Demand Trend Ticker Lock Toggle
    if (DOM.trendsTicker) {
      DOM.trendsTicker.addEventListener('click', () => {
        playBeep(state.trendLocked ? 650 : 950);
        state.trendLocked = !state.trendLocked;
        DOM.trendsTicker.classList.toggle('locked', state.trendLocked);
        if (DOM.tickerLockBadge) {
          DOM.tickerLockBadge.textContent = state.trendLocked ? '🔒 LOCKED' : '🔓 LIVE';
        }
      });
    }

    // Mission Name Customization
    if (DOM.inputMissionName) {
      DOM.inputMissionName.addEventListener('input', (e) => {
        state.missionName = e.target.value.trim() || 'ARTEMIS-1';
      });
    }

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

    // Design Sub-Tabs (Launch, Space, Ground)
    DOM.segTabLaunch.addEventListener('click', () => {
      playBeep(600);
      activeDesignSegment = 'launch';
      renderStage4Design();
    });
    DOM.segTabSpace.addEventListener('click', () => {
      playBeep(600);
      activeDesignSegment = 'space';
      renderStage4Design();
    });
    DOM.segTabGround.addEventListener('click', () => {
      playBeep(600);
      activeDesignSegment = 'ground';
      renderStage4Design();
    });

    // Heat Shield Checkbox
    DOM.chkHeatShield.addEventListener('change', (e) => {
      playBeep(700);
      state.selections.heatShieldInstalled = e.target.checked;
      renderStage4Design();
      calculateTempResources();
    });

    // Test Bench Diagnostics
    DOM.btnRunTests.addEventListener('click', runSystemDiagnostics);

    // Minigame
    DOM.btnStartMinigame.addEventListener('click', launchMinigame);
    DOM.btnSubmitMinigame.addEventListener('click', () => evaluateMinigameOutcome(false));
    DOM.btnCompleteFlight.addEventListener('click', () => goToStage(7));

    // Refinery & Market
    DOM.btnRefineData.addEventListener('click', refineSelectedData);
    if (DOM.btnCombineData) {
      DOM.btnCombineData.addEventListener('click', combineSelectedData);
    }
    if (DOM.btnInvGrid) {
      DOM.btnInvGrid.addEventListener('click', () => {
        playBeep(650);
        state.inventoryViewMode = 'grid';
        renderInventoryList();
      });
    }
    if (DOM.btnInvList) {
      DOM.btnInvList.addEventListener('click', () => {
        playBeep(650);
        state.inventoryViewMode = 'list';
        renderInventoryList();
      });
    }
    if (DOM.btnOpenL4Forge) {
      DOM.btnOpenL4Forge.addEventListener('click', openL4ForgeModal);
    }
    if (DOM.l4ForgeClose) {
      DOM.l4ForgeClose.addEventListener('click', () => {
        DOM.l4ForgeModal.classList.remove('active');
        DOM.l4ForgeModal.style.display = 'none';
      });
    }
    if (DOM.btnForgeL4) {
      DOM.btnForgeL4.addEventListener('click', forgeL4Dataset);
    }
    document.querySelectorAll('.btn-sell-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const buyer = e.currentTarget.getAttribute('data-buyer');
        sellDataToBuyer(buyer);
      });
    });

    // Loans
    DOM.btnLoanGrant.addEventListener('click', () => {
      playBeep(880);
      state.budget += 150000;
      state.reputation = Math.max(0, state.reputation - 8);
      updatePermanentHud();
      alert('NASA Emergency Grant approved: +$150,000 added to budget. (-8 Reputation)');
    });

    DOM.btnLoanBank.addEventListener('click', () => {
      playBeep(880);
      state.budget += 250000;
      state.activeDebt += 275000;
      updatePermanentHud();
      alert('Commercial Bank Loan approved: +$250,000 received. $275,000 debt added.');
    });

    DOM.btnPayDebt.addEventListener('click', () => {
      if (state.activeDebt <= 0) {
        alert('You have no active debt.');
        return;
      }
      if (state.budget < state.activeDebt) {
        // partial pay
        const pay = state.budget;
        state.budget = 0;
        state.activeDebt -= pay;
        playBeep(900);
        alert(`Partial debt payment of $${pay.toLocaleString()} processed. Remaining debt: $${state.activeDebt.toLocaleString()}.`);
      } else {
        state.budget -= state.activeDebt;
        state.activeDebt = 0;
        playBeep(1200);
        alert('🎉 Debt fully paid off! Your credit standing is pristine.');
      }
      updatePermanentHud();
    });

    DOM.btnNextMissionLoop.addEventListener('click', commenceNextMissionCycle);

    // Rules Modal
    DOM.rulesModalClose.addEventListener('click', () => {
      DOM.rulesModal.classList.remove('active');
      DOM.rulesModal.style.display = 'none';
    });
    DOM.btnCloseRules.addEventListener('click', () => {
      DOM.rulesModal.classList.remove('active');
      DOM.rulesModal.style.display = 'none';
    });
  }

  function init() {
    state.currentTrend = MARKET_TREND_POOLS[0];
    setTickerText(state.currentTrend.text);
    updatePermanentHud();
    renderStage1Domains();
    setupEventListeners();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
