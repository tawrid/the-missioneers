/* ==========================================================================
   THE MISSIONEERS // SPACE MISSION DESIGN & ECONOMY ENGINE
   Complete Systems Engineering, All 26 Science Instruments, Refinery & Gameplay
   SI Disclosure (Metadata): Code, structured mission/instrument data, and
   procedural Web Audio API SFX synthesis were developed with Super Intelligence
   (SI / LLM) assistance. No NASA logos, flags, or mission identifiers used.
   ========================================================================== */

(function() {
  'use strict';

  const tablerLine = (paths, extraClass = '') => `<svg class="inline-vec-icon tabler-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const tablerFill = (paths, colorClass = '') => `<svg class="inline-vec-icon tabler-icon tabler-filled ${colorClass}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${paths}</svg>`;
  const tablerHybridFill = (paths, colorClass = '') => `<svg class="inline-vec-icon tabler-icon tabler-filled ${colorClass}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const ICONS = {
    rocket: tablerHybridFill('<path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" fill="none" /><path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="#0f172a" />', 'ti-cyan'),
    satellite: tablerHybridFill('<path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414" /><path d="M6 10l-3 3l3 3l3 -3" fill="none" /><path d="M10 6l3 -3l3 3l-3 3" fill="none" /><path d="M12 12l1.5 1.5" fill="none" /><path d="M14.5 17a2.5 2.5 0 0 0 2.5 -2.5" fill="none" /><path d="M15 21a6 6 0 0 0 6 -6" fill="none" />', 'ti-cyan'),
    dish: tablerLine('<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.616 13.924a5 5 0 1 0 -9.23 0" /><path d="M20.307 15.469a9 9 0 1 0 -16.615 0" /><path d="M9 21l3 -9l3 9" /><path d="M10 19h4" />'),
    microscope: tablerHybridFill('<path d="M5 21h14" fill="none" /><path d="M6 18h2" fill="none" /><path d="M7 18v3" fill="none" /><path d="M9 11l3 3l6 -6l-3 -3l-6 6" /><path d="M10.5 12.5l-1.5 1.5" fill="none" /><path d="M17 3l3 3" fill="none" /><path d="M12 21a6 6 0 0 0 3.715 -10.712" fill="none" />', 'ti-cyan'),
    check: tablerLine('<path d="M5 12l5 5l10 -10" />'),
    cross: tablerLine('<path d="M18 6l-12 12" /><path d="M6 6l12 12" />'),
    spinner: tablerLine('<path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />'),
    hourglass: tablerLine('<path d="M6.5 7h11" /><path d="M6.5 17h11" /><path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1" /><path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1" />'),
    alert: tablerFill('<path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />', 'ti-crimson'),
    shield: tablerFill('<path d="M11.998 2l.118 .007l.059 .008l.061 .013l.111 .034a.993 .993 0 0 1 .217 .112l.104 .082l.255 .218a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717a13 13 0 0 1 -9.208 16.25a1 1 0 0 1 -.502 0a13 13 0 0 1 -9.209 -16.25a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.531 -2.527l.263 -.225l.096 -.075a.993 .993 0 0 1 .217 -.112l.112 -.034a.97 .97 0 0 1 .119 -.021l.115 -.007zm3.71 7.293a1 1 0 0 0 -1.415 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />', 'ti-emerald'),
    flame: tablerFill('<path d="M10 2c0 -.88 1.056 -1.331 1.692 -.722c1.958 1.876 3.096 5.995 1.75 9.12l-.08 .174l.012 .003c.625 .133 1.203 -.43 2.303 -2.173l.14 -.224a1 1 0 0 1 1.582 -.153c1.334 1.435 2.601 4.377 2.601 6.27c0 4.265 -3.591 7.705 -8 7.705s-8 -3.44 -8 -7.706c0 -2.252 1.022 -4.716 2.632 -6.301l.605 -.589c.241 -.236 .434 -.43 .618 -.624c1.43 -1.512 2.145 -2.924 2.145 -4.78" />', 'ti-orange'),
    lock: tablerFill('<path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />', 'ti-amber'),
    unlock: tablerLine('<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -6" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M8 11v-5a4 4 0 0 1 8 0" />'),
    dna: tablerHybridFill('<path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" /><path d="M9.172 20.485a4 4 0 1 0 -5.657 -5.657" fill="none" /><path d="M14.828 3.515a4 4 0 0 0 5.657 5.657" fill="none" />', 'ti-purple'),
    link: tablerLine('<path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />'),
    trophy: tablerFill('<path d="M17 3a1 1 0 0 1 .993 .883l.007 .117v2.17a3 3 0 1 1 0 5.659v.171a6.002 6.002 0 0 1 -5 5.917v2.083h3a1 1 0 0 1 .117 1.993l-.117 .007h-8a1 1 0 0 1 -.117 -1.993l.117 -.007h3v-2.083a6.002 6.002 0 0 1 -4.996 -5.692l-.004 -.225v-.171a3 3 0 0 1 -3.996 -2.653l-.003 -.176l.005 -.176a3 3 0 0 1 3.995 -2.654l-.001 -2.17a1 1 0 0 1 1 -1h10zm-12 5a1 1 0 1 0 0 2a1 1 0 0 0 0 -2m14 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2" />', 'ti-gold'),
    cash: tablerFill('<path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -1 1a3 3 0 1 0 0 6v2a1.024 1.024 0 0 1 -.866 -.398l-.068 -.101a1 1 0 0 0 -1.732 .998a3 3 0 0 0 2.505 1.5h.161a1 1 0 0 0 .883 .994l.117 .007a1 1 0 0 0 1 -1l.176 -.005a3 3 0 0 0 -.176 -5.995v-2c.358 -.012 .671 .14 .866 .398l.068 .101a1 1 0 0 0 1.732 -.998a3 3 0 0 0 -2.505 -1.501h-.161a1 1 0 0 0 -1 -1zm1 7a1 1 0 0 1 0 2v-2zm-2 -4v2a1 1 0 0 1 0 -2z" />', 'ti-emerald'),
    star: tablerFill('<path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />', 'ti-gold')
  };

  // ========================================================================
  // 1. DATASETS: 5 MISSION DOMAINS & ALL 26 EXACT NASA INSTRUMENTS
  // ========================================================================

  const MISSION_DOMAINS = [
    {
      id: 'earth',
      name: 'Earth Science',
      icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" class="tabler-icon tabler-filled ti-cyan" aria-hidden="true"><path d="M21.165 16a10 10 0 0 1 -8.434 5.973a1 1 0 0 0 .617 -.444a18 18 0 0 0 2.28 -5.528z" /><path d="M8.372 16a18 18 0 0 0 2.28 5.53a1 1 0 0 0 .616 .443a10 10 0 0 1 -8.433 -5.973z" /><path d="M13.57 16a16 16 0 0 1 -1.57 3.884a16 16 0 0 1 -1.57 -3.884" /><path d="M8.034 10a18 18 0 0 0 0 4h-5.832a10 10 0 0 1 -.002 -4z" /><path d="M13.952 10a16 16 0 0 1 0 4h-3.904a16 16 0 0 1 0 -4z" /><path d="M21.8 10a10.05 10.05 0 0 1 -.002 4h-5.832c.149 -1.329 .149 -2.67 0 -4z" /><path d="M11.267 2.027a1 1 0 0 0 -.615 .444a18 18 0 0 0 -2.28 5.529h-5.54a10.01 10.01 0 0 1 8.334 -5.967z" /><path d="M12 4.116a16 16 0 0 1 1.57 3.885h-3.14c.34 -1.317 .85 -2.6 1.53 -3.817z" /><path d="M12.733 2.026a10.01 10.01 0 0 1 8.435 5.974h-5.54a18 18 0 0 0 -2.28 -5.53a1 1 0 0 0 -.517 -.414z" /></svg>',
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
      icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-filled ti-orange" aria-hidden="true"><path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" fill="currentColor" /><path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" stroke="#fde68a" stroke-width="2" /></svg>',
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
      icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" class="tabler-icon tabler-filled ti-gold" aria-hidden="true"><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" /><path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" /><path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" /><path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" /><path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" /><path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" /></svg>',
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
      icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-filled ti-purple" aria-hidden="true"><path d="M6 21l6 -5l6 5" fill="none" stroke-width="2" /><path d="M12 13v8" fill="none" stroke-width="2" /><path d="M3.294 13.678l.166 .281c.52 .88 1.624 1.265 2.605 .91l14.242 -5.165a1.023 1.023 0 0 0 .565 -1.456l-2.62 -4.705a1.087 1.087 0 0 0 -1.447 -.42l-.056 .032l-12.694 7.618c-1.02 .613 -1.357 1.897 -.76 2.905l-.001 0" /><path d="M14 5l3 5.5" stroke="#f3e8ff" stroke-width="1.6" /></svg>',
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
      icon: '<svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-filled ti-emerald" aria-hidden="true"><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" /><path d="M9.172 20.485a4 4 0 1 0 -5.657 -5.657" fill="none" /><path d="M14.828 3.515a4 4 0 0 0 5.657 5.657" fill="none" /></svg>',
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
      text: '[EARTH SCIENCE] Wildfire & Climate Alert: Thermal Energy (CERES/AIRS), Atmosphere (MOPITT/TEMPO) & Biosphere (MODIS/VIIRS) in peak demand (+70% Sell Value)',
      domain: 'earth',
      domainName: 'Earth Science',
      trendingInstIds: ['thermal_energy', 'atmosphere', 'biosphere'],
      boost: 1.7
    },
    {
      text: '[HELIOPHYSICS] Solar Maximum Approaching: Plasma (SWEPAM/WIND), Cosmic Rays (CRIS/EPAM) & Magnetic/Electric Fields surging (+80% Sell Value)',
      domain: 'helio',
      domainName: 'Heliophysics',
      trendingInstIds: ['plasma', 'cosmic_rays', 'mag_elec_fields'],
      boost: 1.8
    },
    {
      text: '[ASTROPHYSICS] Exoplanet Transit Breakthrough: Light (JWST/NIRSpec), Chemical Composition & Time/Ray Bursts surging (+75% Sell Value)',
      domain: 'astro',
      domainName: 'Astrophysics',
      trendingInstIds: ['light', 'chemical_comp', 'ray_bursts'],
      boost: 1.75
    },
    {
      text: '[PLANETARY SCIENCE] Mars Sample Return Priority: Minerals (CRISM/MRO), Atmosphere (SAM) & Topography telemetry in high demand (+65% Sell Value)',
      domain: 'planetary',
      domainName: 'Planetary Science',
      trendingInstIds: ['minerals', 'atmosphere', 'topography'],
      boost: 1.65
    },
    {
      text: '[LIFE SCIENCES] ISS Commercial Biotech Boom: DNA (MinION), Microbiomes & Spaceflight Environment data in peak demand (+85% Sell Value)',
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
  let bgMusicAudio = null;

  function updateBgMusicVolume() {
    if (bgMusicAudio) {
      bgMusicAudio.volume = Math.max(0, Math.min(1, masterVolume * 0.35));
    }
  }

  function ensureBgMusicPlaying() {
    try {
      if (!bgMusicAudio) {
        bgMusicAudio = new Audio('./Equatorial%20Complex.mp3');
        bgMusicAudio.loop = true;
        bgMusicAudio.preload = 'auto';
      }
      updateBgMusicVolume();
      if (bgMusicAudio.paused) {
        bgMusicAudio.play().catch(() => {});
      }
    } catch {}
  }

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

  function playDiagnosticSpinupSound() {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.55);
      gain.gain.setValueAtTime(0.045 * masterVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.65);
      playQuindarTone();
    } catch (e) {}
  }

  function playDiagnosticStepSound(stepIdx, passed) {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      if (passed) {
        const scale = [523.25, 587.33, 659.25, 783.99, 880.0];
        const baseFreq = scale[stepIdx % scale.length];
        [baseFreq, baseFreq * 1.5].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = idx === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime((idx === 0 ? 0.07 : 0.035) * masterVolume, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32 + idx * 0.05);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.38);
        });
      } else {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(220, now + 0.14);
        gain.gain.setValueAtTime(0.07 * masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {}
  }

  function playDiagnosticFinaleSound() {
    if (masterVolume <= 0.01) return;
    try {
      initAudio();
      const now = audioCtx.currentTime;
      // Deep aerospace pad + ascending mission-ready arpeggio
      const bass = audioCtx.createOscillator();
      const bassGain = audioCtx.createGain();
      bass.type = 'triangle';
      bass.frequency.setValueAtTime(130.81, now);
      bassGain.gain.setValueAtTime(0.07 * masterVolume, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      bass.connect(bassGain);
      bassGain.connect(audioCtx.destination);
      bass.start(now);
      bass.stop(now + 1.55);

      const chord = [261.63, 329.63, 392.0, 493.88, 587.33];
      chord.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const start = now + idx * 0.11;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.065 * masterVolume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.85);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.9);
      });
      setTimeout(() => playQuindarTone(), 480);
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
      paused: false,
      elapsedMs: 0,
      lastTickMs: 0,
      milestonesDone: {},
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
    selectedInventoryIdx: null,
    vaultViewMode: 'grid',

    // Advancements & Lifetime Stats tracking
    currentMissionSpent: 0,
    advStats: {
      totalSpent: 0,
      maxMissionSpent: 0,
      missionsCompleted: 0,
      totalEarned: 0,
      datasetsRefined: 0,
      anomaliesResolved: 0,
      trendingMissions: 0,
      dataManiac: false,
      l4Spliced: false,
      maxRepReached: false,
      debtCleared: false
    },
    advUnlocked: {},

    // Stage 4 View Mode & Saved Spacecraft Visual Blueprint (used in Stage 4 & Stage 6 Live Flight)
    designViewMode: 'image',
    visualDesign: {
      rocketVariant: 0,
      satelliteVariant: 0,
      towerVariant: 0,
      rocketScale: 1.0,
      boosterCount: 2,
      engineCount: 5,
      fairingScale: 1.0,
      fuelId: 'kerosene',
      hasGridFins: true,
      satScale: 1.0,
      busBays: 2,
      solarPanelsPerWing: 2,
      hasRtg: false,
      instrumentCount: 2,
      hasHeatShield: false,
      towerScale: 1.0,
      relayDishCount: 2,
      auxDishCount: 1,
      highReliability: true,
      bandwidthMbps: 85
    }
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
    menuBtnCredits: document.getElementById('menu-btn-credits'),
    menuBtnStats: document.getElementById('menu-btn-stats'),
    creditsModal: document.getElementById('credits-modal'),
    creditsModalClose: document.getElementById('credits-modal-close'),
    creditsModalDone: document.getElementById('credits-modal-done'),
    statsModal: document.getElementById('stats-modal'),
    statsModalClose: document.getElementById('stats-modal-close'),
    statsModalDone: document.getElementById('stats-modal-done'),
    statsGrid: document.getElementById('stats-grid'),

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
    btnPrevSegment: document.getElementById('btn-prev-segment'),
    btnNextSegment: document.getElementById('btn-next-segment'),
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

    initTutorialModal: document.getElementById('init-tutorial-modal'),
    initBtnTutorialYes: document.getElementById('init-btn-tutorial-yes'),
    initBtnTutorialNo: document.getElementById('init-btn-tutorial-no'),

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
    l4ReqStatus: document.getElementById('l4-req-status'),
    l4SynergyMult: document.getElementById('l4-synergy-mult'),
    l4ProjectedVal: document.getElementById('l4-projected-val'),
    l4ForgeFee: document.getElementById('l4-forge-fee'),
    btnForgeL4: document.getElementById('btn-forge-l4'),

    btnRandomMissionName: document.getElementById('btn-random-mission-name'),
    btnFlightPause: document.getElementById('btn-flight-pause'),
    btnVaultGrid: document.getElementById('btn-vault-grid'),
    btnVaultList: document.getElementById('btn-vault-list'),
    btnRedoTutorial: document.getElementById('btn-redo-tutorial'),
    btnResetGameData: document.getElementById('btn-reset-game-data'),

    btnOpenHelp: document.getElementById('btn-open-help'),
    menuHelpIcon: document.getElementById('menu-help-icon'),
    screenCoachOverlay: document.getElementById('screen-coach-overlay'),
    coachMaskSvg: document.getElementById('coach-mask-svg'),
    coachCalloutsLayer: document.getElementById('coach-callouts-layer'),
    btnCloseCoach: document.getElementById('btn-close-coach'),

    tutorialOverlay: document.getElementById('tutorial-overlay'),
    tutorialMaskSvg: document.getElementById('tutorial-mask-svg'),
    tutorialMaskPath: document.getElementById('tutorial-mask-path'),
    tutorialFocusRing: document.getElementById('tutorial-focus-ring'),
    tutorialCallout: document.getElementById('tutorial-callout'),
    tutorialArrow: document.getElementById('tutorial-arrow'),
    tutorialStepBadge: document.getElementById('tutorial-step-badge'),
    tutorialSkipBtn: document.getElementById('tutorial-skip-btn'),
    tutorialTitle: document.getElementById('tutorial-title'),
    tutorialText: document.getElementById('tutorial-text'),
    tutorialNextBtn: document.getElementById('tutorial-next-btn'),

    introCutscene: document.getElementById('intro-cutscene'),
    btnSkipCutscene: document.getElementById('btn-skip-cutscene'),
    btnCutsceneSound: document.getElementById('btn-cutscene-sound'),
    cutsceneStage: document.getElementById('cutscene-stage'),
    cutsceneCaption: document.getElementById('cutscene-caption'),
    buildVerifyIssues: document.getElementById('build-verify-issues'),
    gameNoticeModal: document.getElementById('game-notice-modal'),
    gameNoticeTitle: document.getElementById('game-notice-title'),
    gameNoticeMessage: document.getElementById('game-notice-message'),
    gameNoticeClose: document.getElementById('game-notice-close'),
    gameNoticeCancel: document.getElementById('game-notice-cancel'),
    gameNoticeOk: document.getElementById('game-notice-ok'),

    // Bank Modal
    btnOpenBank: document.getElementById('btn-open-bank'),
    bankModal: document.getElementById('bank-modal'),
    bankModalClose: document.getElementById('bank-modal-close'),
    bankModalDone: document.getElementById('bank-modal-done'),
    modalDebtAmountText: document.getElementById('modal-debt-amount-text'),
    btnModalLoanGrant: document.getElementById('btn-modal-loan-grant'),
    btnModalLoanBank: document.getElementById('btn-modal-loan-bank'),
    btnModalPayDebt: document.getElementById('btn-modal-pay-debt'),

    // Advancements Modal & Toast
    btnOpenAdvancements: document.getElementById('btn-open-advancements'),
    advancementsModal: document.getElementById('advancements-modal'),
    advancementsModalClose: document.getElementById('advancements-modal-close'),
    advancementsModalDone: document.getElementById('advancements-modal-done'),
    advancementsSummary: document.getElementById('advancements-summary'),
    advancementsGrid: document.getElementById('advancements-grid'),
    advancementToast: document.getElementById('advancement-toast'),

    // Stage 4 Stats / Image View & Visual Blueprint
    btnDesignViewImage: document.getElementById('btn-design-view-image'),
    btnDesignViewStats: document.getElementById('btn-design-view-stats'),
    designImageView: document.getElementById('design-image-view'),
    designStatsView: document.getElementById('design-stats-view'),
    designVisualSegTitle: document.getElementById('design-visual-seg-title'),
    btnCycleVariant: document.getElementById('btn-cycle-variant'),
    designVisualStage: document.getElementById('design-visual-stage'),
    designVisualSpecs: document.getElementById('design-visual-specs')
  };

  let pendingNoticeCallback = null;
  let pendingNoticeCancelCallback = null;

  function closeInPageNotice(confirmed = true) {
    if (!DOM.gameNoticeModal) return;
    DOM.gameNoticeModal.classList.remove('active');
    DOM.gameNoticeModal.style.display = 'none';
    if (DOM.gameNoticeOk) DOM.gameNoticeOk.textContent = 'ACKNOWLEDGE';
    if (DOM.gameNoticeCancel) DOM.gameNoticeCancel.style.display = 'none';
    const cb = confirmed ? pendingNoticeCallback : pendingNoticeCancelCallback;
    pendingNoticeCallback = null;
    pendingNoticeCancelCallback = null;
    if (typeof cb === 'function') cb();
    if (typeof tutorialOnNoticeClosed === 'function') tutorialOnNoticeClosed();
  }

  function showInPageNotice(message, title = 'MISSION CONTROL NOTICE', onClose = null, okLabel = 'ACKNOWLEDGE', onCancel = null, cancelLabel = 'CANCEL') {
    if (!DOM.gameNoticeModal || !DOM.gameNoticeMessage) return;
    pendingNoticeCallback = typeof onClose === 'function' ? onClose : null;
    pendingNoticeCancelCallback = typeof onCancel === 'function' ? onCancel : null;
    if (DOM.gameNoticeTitle) DOM.gameNoticeTitle.textContent = title;
    DOM.gameNoticeMessage.textContent = String(message || '');
    if (DOM.gameNoticeOk) DOM.gameNoticeOk.textContent = okLabel;
    if (DOM.gameNoticeCancel) {
      DOM.gameNoticeCancel.textContent = cancelLabel;
      DOM.gameNoticeCancel.style.display = typeof onCancel === 'function' ? 'inline-flex' : 'none';
    }
    DOM.gameNoticeModal.style.display = 'flex';
    DOM.gameNoticeModal.classList.add('active');
  }

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
    const html = `${ICONS.flame} ${text}`;
    if (DOM.tickerText) DOM.tickerText.innerHTML = html;
    if (DOM.tickerTextDup) DOM.tickerTextDup.innerHTML = html;
  }

  function getReputationPriceMultiplier() {
    if (isInfiniteBudget()) {
      return 1.30 * 1.25;
    }
    // Smooth continuous curve: 50 rep = 1.0x, 0 rep = 0.70x, 100 rep = 1.30x
    // Plus +25% Flagship Partner multiplier at 100 Reputation!
    const base = 1.0 + (state.reputation - 50) * 0.006;
    return state.reputation >= 100 ? base * 1.25 : base;
  }

  let lastHudBudget = null;
  let lastHudRep = null;

  function triggerResourceDeltaAnim(valueEl, deltaText, isGain) {
    if (!valueEl) return;
    const box = valueEl.closest('.resource-box');
    if (!box) return;
    box.classList.remove('pulse-gain', 'pulse-loss');
    void box.offsetWidth;
    box.classList.add(isGain ? 'pulse-gain' : 'pulse-loss');
    setTimeout(() => box.classList.remove('pulse-gain', 'pulse-loss'), 750);

    const pop = document.createElement('span');
    pop.className = `res-delta-pop ${isGain ? 'gain' : 'loss'}`;
    pop.textContent = deltaText;
    box.appendChild(pop);
    setTimeout(() => pop.remove(), 1950);
  }

  function updatePermanentHud() {
    const sandbox = isInfiniteBudget();
    if (!sandbox && lastHudBudget !== null && state.budget !== lastHudBudget) {
      const diff = state.budget - lastHudBudget;
      const sign = diff > 0 ? '+' : '-';
      triggerResourceDeltaAnim(DOM.hudBudget, `${sign}$${Math.abs(diff).toLocaleString()}`, diff > 0);
    }
    if (!sandbox && lastHudRep !== null && state.reputation !== lastHudRep) {
      const diff = state.reputation - lastHudRep;
      const sign = diff > 0 ? '+' : '-';
      triggerResourceDeltaAnim(DOM.hudRep, `${sign}${Math.abs(diff)} REP`, diff > 0);
    }
    lastHudBudget = state.budget;
    lastHudRep = state.reputation;

    DOM.hudBudget.textContent = sandbox ? '∞ SANDBOX' : `$${state.budget.toLocaleString()}`;
    DOM.hudRep.textContent = sandbox
      ? '∞ SANDBOX'
      : (state.reputation >= 100 ? '100 / 100 FLAGSHIP' : `${state.reputation} / 100`);

    if (sandbox || state.reputation >= 100) {
      DOM.hudRep.className = 'res-val text-gold';
    } else if (state.reputation < 35) {
      DOM.hudRep.className = 'res-val text-amber';
    } else {
      DOM.hudRep.className = 'res-val text-emerald';
    }

    DOM.vaultCountBadge.textContent = state.dataInventory.length;
    DOM.debtAmountText.textContent = `$${state.activeDebt.toLocaleString()}`;
    if (DOM.modalDebtAmountText) {
      DOM.modalDebtAmountText.textContent = `$${state.activeDebt.toLocaleString()}`;
    }
    if (!sandbox && state.reputation >= 100 && state.advStats && !state.advStats.maxRepReached) {
      state.advStats.maxRepReached = true;
      saveAdvancementsState();
      evaluateAdvancements();
    }
  }

  function updateL4ForgeButtonVisibility() {
    if (!DOM.btnOpenL4Forge) return;
    const hasL3A = state.dataInventory.some(item => item.level === 'L3A');
    DOM.btnOpenL4Forge.style.display = hasL3A ? 'inline-flex' : 'none';
  }

  // ========================================================================
  // 4B. ADVANCEMENTS SYSTEM (TIERED & SINGLE)
  // ========================================================================

  const ADVANCEMENTS_STORAGE_KEY = 'tm_advancements_v1';

  const ADVANCEMENT_DEFS = [
    {
      id: 'big_spender',
      title: 'Big Spender',
      type: 'tiered',
      stat: 'maxMissionSpent',
      description: 'Spend budget on a single mission (hardware, diagnostics, and processing).',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 1000000 },
        { key: 'silver', label: 'Silver', target: 2000000 },
        { key: 'gold', label: 'Gold', target: 4000000 }
      ],
      formatVal: v => `$${Number(v).toLocaleString()}`
    },
    {
      id: 'mission_veteran',
      title: 'Mission Veteran',
      type: 'tiered',
      stat: 'missionsCompleted',
      description: 'Successfully complete full orbital or deep-space missions.',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 1 },
        { key: 'silver', label: 'Silver', target: 5 },
        { key: 'gold', label: 'Gold', target: 10 }
      ],
      formatVal: v => `${v}`
    },
    {
      id: 'data_tycoon',
      title: 'Data Tycoon',
      type: 'tiered',
      stat: 'totalEarned',
      description: 'Earn total revenue by selling refined datasets to buyers.',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 500000 },
        { key: 'silver', label: 'Silver', target: 2000000 },
        { key: 'gold', label: 'Gold', target: 5000000 }
      ],
      formatVal: v => `$${Number(v).toLocaleString()}`
    },
    {
      id: 'master_refiner',
      title: 'Master Refiner',
      type: 'tiered',
      stat: 'datasetsRefined',
      description: 'Refine raw telemetry datasets up through L1, L2, and L3A.',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 3 },
        { key: 'silver', label: 'Silver', target: 10 },
        { key: 'gold', label: 'Gold', target: 25 }
      ],
      formatVal: v => `${v}`
    },
    {
      id: 'crisis_handler',
      title: 'Crisis Handler',
      type: 'tiered',
      stat: 'anomaliesResolved',
      description: 'Resolve mid-flight spacecraft anomalies before systems fail.',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 1 },
        { key: 'silver', label: 'Silver', target: 3 },
        { key: 'gold', label: 'Gold', target: 8 }
      ],
      formatVal: v => `${v}`
    },
    {
      id: 'trend_hunter',
      title: 'Trend Hunter',
      type: 'tiered',
      stat: 'trendingMissions',
      description: 'Launch missions targeting a currently trending scientific category.',
      tiers: [
        { key: 'bronze', label: 'Bronze', target: 1 },
        { key: 'silver', label: 'Silver', target: 3 },
        { key: 'gold', label: 'Gold', target: 6 }
      ],
      formatVal: v => `${v}`
    },
    {
      id: 'data_maniac',
      title: 'Data Maniac',
      type: 'single',
      stat: 'dataManiac',
      description: 'Put every instrument of a single category onto one spacecraft.'
    },
    {
      id: 'l4_architect',
      title: 'L4 Architect',
      type: 'single',
      stat: 'l4Spliced',
      description: 'Splice two L3A datasets together into a Level 4 Master Dataset.'
    },
    {
      id: 'flagship_partner',
      title: 'Flagship Partner',
      type: 'single',
      stat: 'maxRepReached',
      description: 'Reach 100 / 100 Flagship Reputation.'
    },
    {
      id: 'debt_free',
      title: 'Debt-Free',
      type: 'single',
      stat: 'debtCleared',
      description: 'Pay off an active bank loan in full.'
    },
    {
      id: 'master_missioneer',
      title: 'Master Missioneer',
      type: 'completionist',
      description: 'Reach Gold on every tiered advancement and unlock every single advancement.'
    }
  ];

  function defaultAdvStats() {
    return {
      totalSpent: 0,
      maxMissionSpent: 0,
      missionsCompleted: 0,
      totalEarned: 0,
      datasetsRefined: 0,
      anomaliesResolved: 0,
      trendingMissions: 0,
      dataManiac: false,
      l4Spliced: false,
      maxRepReached: false,
      debtCleared: false
    };
  }

  function loadAdvancementsState() {
    try {
      const raw = localStorage.getItem(ADVANCEMENTS_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        state.advStats = Object.assign(defaultAdvStats(), parsed.stats || {});
        state.advUnlocked = parsed.unlocked && typeof parsed.unlocked === 'object' ? parsed.unlocked : {};
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  function saveAdvancementsState() {
    try {
      localStorage.setItem(ADVANCEMENTS_STORAGE_KEY, JSON.stringify({
        stats: state.advStats,
        unlocked: state.advUnlocked
      }));
    } catch (e) {
      // ignore storage errors
    }
  }

  let advToastTimer = null;
  function showAdvancementToast(title, tierLabel) {
    if (!DOM.advancementToast) return;
    DOM.advancementToast.innerHTML = `${ICONS.trophy} <div><strong>Advancement Unlocked: ${title}</strong><span>${tierLabel}</span></div>`;
    DOM.advancementToast.style.display = 'flex';
    if (advToastTimer) clearTimeout(advToastTimer);
    advToastTimer = setTimeout(() => {
      if (DOM.advancementToast) DOM.advancementToast.style.display = 'none';
    }, 4200);
  }

  function getAdvancementTier(def) {
    if (def.type === 'tiered') {
      const val = Number(state.advStats[def.stat] || 0);
      let tier = null;
      def.tiers.forEach(t => {
        if (val >= t.target) tier = t.key;
      });
      return tier;
    }
    if (def.type === 'single') {
      return state.advStats[def.stat] ? 'single' : null;
    }
    if (def.type === 'completionist') {
      const allDone = ADVANCEMENT_DEFS
        .filter(d => d.id !== 'master_missioneer')
        .every(d => (d.type === 'tiered' ? getAdvancementTier(d) === 'gold' : getAdvancementTier(d) === 'single'));
      return allDone ? 'gold' : null;
    }
    return null;
  }

  function evaluateAdvancements() {
    const tierOrder = { bronze: 1, silver: 2, gold: 3, single: 3 };
    let changed = false;
    const newlyUnlocked = [];

    ADVANCEMENT_DEFS.forEach(def => {
      const achieved = getAdvancementTier(def);
      if (!achieved) return;
      const prev = state.advUnlocked[def.id] || null;
      if (!prev || (tierOrder[achieved] || 0) > (tierOrder[prev] || 0)) {
        state.advUnlocked[def.id] = achieved;
        changed = true;
        const label = def.type === 'single'
          ? 'Completed'
          : `${achieved.charAt(0).toUpperCase() + achieved.slice(1)} Tier`;
        newlyUnlocked.push({ title: def.title, label });
      }
    });

    if (changed) {
      saveAdvancementsState();
      if (newlyUnlocked.length > 0) {
        const last = newlyUnlocked[newlyUnlocked.length - 1];
        showAdvancementToast(last.title, last.label);
      }
    }
    if (DOM.advancementsModal && DOM.advancementsModal.style.display === 'flex') {
      renderAdvancementsModal();
    }
  }

  function recordBudgetSpent(amount) {
    if (!amount || amount <= 0) return;
    state.advStats.totalSpent = (state.advStats.totalSpent || 0) + amount;
    state.currentMissionSpent = (state.currentMissionSpent || 0) + amount;
    if (state.currentMissionSpent > (state.advStats.maxMissionSpent || 0)) {
      state.advStats.maxMissionSpent = state.currentMissionSpent;
    }
    saveAdvancementsState();
    evaluateAdvancements();
  }

  function renderStatsModal() {
    if (!DOM.statsGrid) return;
    const s = state.advStats || defaultAdvStats();
    const advGoldOrSingle = ADVANCEMENT_DEFS.filter(def => {
      const t = getAdvancementTier(def);
      return (def.type === 'tiered' && t === 'gold') || (def.type === 'single' && t === 'single') || (def.type === 'completionist' && t === 'gold');
    }).length;
    const items = [
      { label: 'Missions Finished', value: (s.missionsCompleted || 0).toLocaleString() },
      { label: 'Trending Missions', value: (s.trendingMissions || 0).toLocaleString() },
      { label: 'Total Money Spent', value: `$${(s.totalSpent || 0).toLocaleString()}` },
      { label: 'Highest Single-Mission Spend', value: `$${(s.maxMissionSpent || 0).toLocaleString()}` },
      { label: 'Total Revenue Earned', value: `$${(s.totalEarned || 0).toLocaleString()}` },
      { label: 'Datasets Refined', value: (s.datasetsRefined || 0).toLocaleString() },
      { label: 'Anomalies Resolved', value: (s.anomaliesResolved || 0).toLocaleString() },
      { label: 'Advancements Mastered', value: `${advGoldOrSingle} / ${ADVANCEMENT_DEFS.length}` }
    ];
    DOM.statsGrid.innerHTML = items.map(item => `
      <div class="stat-card">
        <span class="stat-label">${item.label}</span>
        <span class="stat-value">${item.value}</span>
      </div>
    `).join('');
  }

  function checkDataManiacOnBuild() {
    if (!state.selectedDomain || !Array.isArray(state.selectedDomain.instruments) || !Array.isArray(state.selectedInstruments)) return;
    const domainInsts = state.selectedDomain.instruments;
    if (domainInsts.length > 0 && domainInsts.every(grp => state.selectedInstruments.some(sel => sel.instId === grp.id))) {
      state.advStats.dataManiac = true;
      saveAdvancementsState();
      evaluateAdvancements();
    }
  }

  function renderAdvancementsModal() {
    if (!DOM.advancementsGrid || !DOM.advancementsSummary) return;

    let goldOrSingleCount = 0;
    const totalCount = ADVANCEMENT_DEFS.length;

    DOM.advancementsGrid.innerHTML = ADVANCEMENT_DEFS.map(def => {
      const unlockedTier = getAdvancementTier(def);
      if ((def.type === 'tiered' && unlockedTier === 'gold') ||
          (def.type === 'single' && unlockedTier === 'single') ||
          (def.type === 'completionist' && unlockedTier === 'gold')) {
        goldOrSingleCount++;
      }

      const cardTierClass = unlockedTier
        ? (def.type === 'single' ? 'tier-single-done' : `tier-${unlockedTier}`)
        : '';

      const pillClass = unlockedTier || 'locked';
      const pillLabel = !unlockedTier
        ? 'LOCKED'
        : (def.type === 'single' ? 'UNLOCKED' : unlockedTier.toUpperCase());

      let progressHtml = '';
      if (def.type === 'tiered') {
        const val = Number(state.advStats[def.stat] || 0);
        const maxTarget = def.tiers[def.tiers.length - 1].target;
        const pct = Math.min(100, Math.round((val / maxTarget) * 100));
        const chips = def.tiers.map(t => {
          const hit = val >= t.target;
          return `<span class="adv-target-chip ${hit ? 'hit' : ''}">${t.label}: ${def.formatVal(t.target)}</span>`;
        }).join('');
        progressHtml = `
          <div class="adv-tier-targets">${chips}</div>
          <div class="adv-progress-wrap"><div class="adv-progress-fill" style="width:${pct}%"></div></div>
          <div class="adv-progress-text">Progress: ${def.formatVal(val)} / ${def.formatVal(maxTarget)}</div>
        `;
      } else if (def.type === 'completionist') {
        const otherTotal = ADVANCEMENT_DEFS.length - 1;
        const otherDone = ADVANCEMENT_DEFS
          .filter(d => d.id !== 'master_missioneer')
          .filter(d => (d.type === 'tiered' ? getAdvancementTier(d) === 'gold' : getAdvancementTier(d) === 'single'))
          .length;
        const pct = Math.round((otherDone / otherTotal) * 100);
        progressHtml = `
          <div class="adv-progress-wrap"><div class="adv-progress-fill" style="width:${pct}%"></div></div>
          <div class="adv-progress-text">Mastered: ${otherDone} / ${otherTotal}</div>
        `;
      }

      return `
        <div class="adv-card ${cardTierClass}">
          <div class="adv-card-head">
            <span class="adv-title">${def.title}</span>
            <span class="adv-tier-pill ${pillClass}">${pillLabel}</span>
          </div>
          <p class="adv-desc">${def.description}</p>
          ${progressHtml}
        </div>
      `;
    }).join('');

    DOM.advancementsSummary.textContent = `${goldOrSingleCount} / ${totalCount} Advancements Mastered`;
  }

  function isMpMode() {
    return state.gameMode === 'coop' || state.gameMode === 'sabotage';
  }

  function goToStage(stageNum, fromRemote = false) {
    closeScreenCoachOverlay();
    playQuindarTone();
    const prevStage = state.stage;
    state.stage = stageNum;

    DOM.stages.forEach((s, idx) => {
      s.classList.toggle('active', idx === stageNum - 1);
    });

    DOM.steppers.forEach((s, idx) => {
      s.classList.toggle('active', idx === stageNum - 1);
      s.classList.toggle('completed', idx < stageNum - 1);
    });

    if (stageNum === 1) renderStage1Domains();
    if (stageNum === 2) renderStage2Instruments();
    if (stageNum === 3) renderStage3Requirements();
    if (stageNum === 4) {
      if (isMpMode()) {
        activeDesignSegment = state.userRole === 'space' ? 'space' : (state.userRole === 'ground' ? 'ground' : 'launch');
      } else {
        activeDesignSegment = 'launch';
      }
      if (prevStage !== 5) {
        randomizeDesignVariants();
      }
      updateDesignSubtabs();
      renderStage4Design();
      calculateTempResources();
    }
    if (stageNum === 5) renderStage5Verification();
    if (stageNum === 6) startStage6Flight();
    if (stageNum === 7) renderStage7RefineryAndMarket();

    if (typeof updateMultiplayerStationBar === 'function') {
      updateMultiplayerStationBar();
    }

    if (!fromRemote && isMpMode() && typeof pushMpSharedState === 'function') {
      pushMpSharedState({
        stage: stageNum,
        domainId: state.selectedDomain ? state.selectedDomain.id : null,
        selectedInstruments: state.selectedInstruments,
        selections: state.selections,
        budget: state.budget,
        reputation: state.reputation,
        dataInventory: state.dataInventory
      });
    }

    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ========================================================================
  // 6. STAGE 1: SET GOAL (5 NASA SCIENCE DISCIPLINES — TEAM VOTE IN 4P)
  // ========================================================================

  function renderStage1Domains() {
    DOM.domainGrid.innerHTML = '';
    const voteBanner = document.getElementById('mp-concept-vote-banner');
    const votes = state.conceptVotes || {};
    const voteEntries = Object.entries(votes);

    if (voteBanner) {
      if (isMpMode()) {
        voteBanner.style.display = 'flex';
        const voteSummary = voteEntries.length > 0
          ? voteEntries.map(([r, d]) => `${r.toUpperCase()}: ${d.toUpperCase()}`).join(' | ')
          : 'No votes cast yet — click a mission concept card below to cast your station vote!';
        const winnerDom = state.conceptVoteWinner ? MISSION_DOMAINS.find(d => d.id === state.conceptVoteWinner) : null;
        const winnerText = winnerDom
          ? `<span class="text-emerald"><strong>WINNING CONCEPT: ${winnerDom.name.toUpperCase()}</strong> (${state.conceptVoteTiebroken ? 'Random Tiebreak — No Majority' : 'Majority Vote Winner'})</span>`
          : `<span class="text-amber">Waiting for all 4 stations to vote (${voteEntries.length}/4 voted)... Majority wins; if no majority, random!</span>`;
        voteBanner.innerHTML = `
          <div><strong>4-PLAYER TEAM CONCEPT VOTE (${voteEntries.length}/4):</strong> <span style="color:#cbd5e1;">${voteSummary}</span></div>
          <div>${winnerText}</div>
        `;
      } else {
        voteBanner.style.display = 'none';
      }
    }

    MISSION_DOMAINS.forEach(dom => {
      const card = document.createElement('div');
      const votersForDom = voteEntries.filter(([, dId]) => dId === dom.id).map(([r]) => r.toUpperCase());
      const myVote = isMpMode() && votes[state.userRole] === dom.id;
      const isSelected = state.selectedDomain?.id === dom.id;
      card.className = `domain-card ${isSelected ? 'selected' : ''}`;
      card.dataset.domainId = dom.id;

      const mpVoteHtml = isMpMode() ? `
        <div class="mp-domain-vote-badges">
          <span>VOTES: <strong>${votersForDom.length}/4</strong> ${votersForDom.length ? `(${votersForDom.join(', ')})` : ''}</span>
          <span>${myVote ? '✓ YOUR VOTE' : 'CLICK TO VOTE'}</span>
        </div>
      ` : '';

      card.innerHTML = `
        <div class="domain-icon">${dom.icon}</div>
        <h3>${dom.name}</h3>
        <p class="domain-desc">${dom.desc}</p>
        <div class="domain-meta-row">
          <span>&Delta;V: <strong class="text-amber">${dom.baseDeltaV} km/s</strong></span>
          <span>Transit: <strong>${dom.transitDurationSec}s</strong></span>
          <span>Return Shield: <strong class="${dom.requiresHeatShield ? 'text-crimson' : 'text-emerald'}">${dom.requiresHeatShield ? 'YES' : 'NO'}</strong></span>
        </div>
        ${mpVoteHtml}
      `;

      card.addEventListener('click', async () => {
        playBeep(700);
        if (isMpMode()) {
          await castMpConceptVote(dom);
          return;
        }
        state.selectedDomain = dom;
        state.selectedInstruments = []; // reset instrument choices
        document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        DOM.btnNextStage1.disabled = false;
      });

      DOM.domainGrid.appendChild(card);
    });

    DOM.btnNextStage1.disabled = !state.selectedDomain;
  }

  // ========================================================================
  // 7. STAGE 2: REAL NASA INSTRUMENTS WITH HOVER CARDS (SPACE PLAYER IN 4P)
  // ========================================================================

  function renderStage2Instruments() {
    if (!state.selectedDomain) {
      state.selectedDomain = MISSION_DOMAINS[0];
    }
    const roleHint = isMpMode()
      ? (state.userRole === 'space'
        ? ' // SPACE PLAYER: SELECT INSTRUMENTS WITHIN ALLOCATED BUDGET'
        : ` // VIEW ONLY (SPACE PLAYER CHOOSES INSTRUMENTS — YOU ARE ${ROLE_DUTY_CONFIG[state.userRole]?.title || state.userRole.toUpperCase()})`)
      : '';
    DOM.stage2DomainTitle.textContent = `STAGE 2: DEFINE CONCEPT // ${state.selectedDomain.name.toUpperCase()} SENSORS${roleHint}`;
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
      const trendingTagHtml = isTrendingInst ? `<span class="inst-trending-tag">${ICONS.flame} TRENDING</span>` : '';
      const t2Locked = state.reputation < 35 && !isInfiniteBudget();

      const card = document.createElement('div');
      card.className = `instrument-card ${isSelected ? 'selected' : ''} ${isTrendingInst ? 'is-trending-inst' : ''}`;
      card.dataset.instId = instGroup.id;

      card.innerHTML = `
        <div class="inst-header">
          <h4 class="inst-title">${instGroup.category} ${trendingTagHtml}</h4>
          <span class="inst-name-badge">${activeData.name}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-main);">${activeData.fullName}</span>
          <div class="tier-toggle-group">
            <button class="tier-btn ${currentTier === 1 ? 'active' : ''}" data-tier="1">T1</button>
            <button class="tier-btn ${currentTier === 2 ? 'active' : ''}" data-tier="2" ${t2Locked ? 'title="Requires 35+ Reputation"' : ''}>
              T2 ${t2Locked ? ICONS.lock : ''}
            </button>
          </div>
        </div>

        <!-- Click Explanation Trigger -->
        <div class="inst-hover-wrap">
          <div class="inst-hover-trigger">
            <span>${tablerLine('<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" />')} Click for Scientific Detector Mechanism &amp; NASA link</span>
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
          ${isSelected ? `${ICONS.check} ${activeData.name} EQUIPPED` : `+ EQUIP ${activeData.name}`}
        </button>
      `;

      const hoverWrap = card.querySelector('.inst-hover-wrap');
      const hoverTrigger = card.querySelector('.inst-hover-trigger');
      const tooltipBox = card.querySelector('.inst-tooltip');
      if (hoverTrigger && hoverWrap) {
        hoverTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const wasOpen = hoverWrap.classList.contains('open');
          document.querySelectorAll('.inst-hover-wrap.open').forEach(w => w.classList.remove('open'));
          if (!wasOpen) hoverWrap.classList.add('open');
        });
      }
      if (tooltipBox) {
        tooltipBox.addEventListener('click', (e) => e.stopPropagation());
      }

      const btnT1 = card.querySelector('[data-tier="1"]');
      const btnT2 = card.querySelector('[data-tier="2"]');
      const btnSelect = card.querySelector('.btn-select-target');

      btnT1.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMpMode() && state.userRole !== 'space') {
          playAlarm();
          showInPageNotice(`ROLE PERMISSION: Only the SPACE PLAYER can choose instruments and sensor tiers! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'SPACE STATION ONLY');
          return;
        }
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
        if (isMpMode()) {
          state.designApprovals.space = false;
          pushMpSharedState({
            selectedInstruments: state.selectedInstruments,
            instrumentTiers: state.instrumentTiers,
            designApprovals: state.designApprovals
          });
          updateMultiplayerStationBar();
        }
      });

      btnT2.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMpMode() && state.userRole !== 'space') {
          playAlarm();
          showInPageNotice(`ROLE PERMISSION: Only the SPACE PLAYER can choose instruments and sensor tiers! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'SPACE STATION ONLY');
          return;
        }
        if (state.reputation < 35 && !isInfiniteBudget()) {
          playAlarm();
          showInPageNotice('Tier 2 advanced NRT sensors require at least 35 Reputation!');
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
        if (isMpMode()) {
          state.designApprovals.space = false;
          pushMpSharedState({
            selectedInstruments: state.selectedInstruments,
            instrumentTiers: state.instrumentTiers,
            designApprovals: state.designApprovals
          });
          updateMultiplayerStationBar();
        }
      });

      btnSelect.addEventListener('click', () => {
        if (isMpMode() && state.userRole !== 'space') {
          playAlarm();
          showInPageNotice(`ROLE PERMISSION: Only the SPACE PLAYER can select scientific instruments! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'SPACE STATION ONLY');
          return;
        }
        playBeep(isSelected ? 500 : 880);
        if (isSelected) {
          state.selectedInstruments = state.selectedInstruments.filter(i => i.instId !== instGroup.id);
        } else {
          const chosen = currentTier === 1 ? instGroup.t1 : instGroup.t2;
          if (isMpMode() && !isInfiniteBudget()) {
            const currentInstCost = state.selectedInstruments.reduce((acc, i) => acc + (i.cost || 0), 0);
            const spaceCap = (state.budgetAllocations && state.budgetAllocations.space) || 500000;
            if (currentInstCost + chosen.cost > spaceCap) {
              playAlarm();
              showInPageNotice(`SPACE BUDGET ALLOCATION EXCEEDED ($${(currentInstCost + chosen.cost).toLocaleString()} / $${spaceCap.toLocaleString()}):\nAsk the USER PLAYER to allocate more budget to the Space Station in the top collaboration bar!`, 'BUDGET ALLOCATION LIMIT');
              return;
            }
          }
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
        if (isMpMode()) {
          state.designApprovals.space = false;
          pushMpSharedState({
            selectedInstruments: state.selectedInstruments,
            instrumentTiers: state.instrumentTiers,
            designApprovals: state.designApprovals
          });
          updateMultiplayerStationBar();
        }
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
    closeScreenCoachOverlay();
    DOM.segTabLaunch.classList.toggle('active', activeDesignSegment === 'launch');
    DOM.segTabSpace.classList.toggle('active', activeDesignSegment === 'space');
    DOM.segTabGround.classList.toggle('active', activeDesignSegment === 'ground');

    DOM.fuelChemistryPanel.style.display = activeDesignSegment === 'launch' ? 'block' : 'none';
    DOM.busExpansionPanel.style.display = (activeDesignSegment === 'space' && !state.customSlidersEnabled) ? 'block' : 'none';
    DOM.reentryShieldPanel.style.display = (activeDesignSegment === 'space' && state.selectedDomain.requiresHeatShield) ? 'block' : 'none';

    if (DOM.btnBackStage4) DOM.btnBackStage4.style.display = activeDesignSegment === 'launch' ? 'inline-flex' : 'none';
    if (DOM.btnPrevSegment) DOM.btnPrevSegment.style.display = activeDesignSegment !== 'launch' ? 'inline-flex' : 'none';
    if (DOM.btnNextSegment) DOM.btnNextSegment.style.display = activeDesignSegment !== 'ground' ? 'inline-flex' : 'none';
    if (DOM.btnNextStage4) DOM.btnNextStage4.style.display = activeDesignSegment === 'ground' ? 'inline-flex' : 'none';
    renderDesignVisualViewport();
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
    DOM.heatShieldStatusText.innerHTML = state.selections.heatShieldInstalled
      ? `${ICONS.check} PICA-X Thermal Heat Shield Installed (Mass: +120 kg, Cost: $45,000)`
      : `${ICONS.cross} Heat Shield Not Installed (High Re-entry Destruction Risk)`;
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
      card.dataset.itemId = item.id;

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
        if (isMpMode()) {
          if (activeDesignSegment === 'launch' && state.userRole !== 'launch') {
            playAlarm();
            showInPageNotice(`ROLE PERMISSION: Only the LAUNCH PLAYER can choose the Launch Rocket! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'LAUNCH STATION ONLY');
            return;
          }
          if (activeDesignSegment === 'space' && state.userRole !== 'space') {
            playAlarm();
            showInPageNotice(`ROLE PERMISSION: Only the SPACE PLAYER can choose the Spacecraft Bus! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'SPACE STATION ONLY');
            return;
          }
          if (activeDesignSegment === 'ground' && state.userRole !== 'ground') {
            playAlarm();
            showInPageNotice(`ROLE PERMISSION: Only the GROUND PLAYER can choose the Ground Communications Network! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'GROUND STATION ONLY');
            return;
          }
        }
        playBeep(750);
        if (activeDesignSegment === 'launch') {
          state.selections.launchRocket = item.id;
          if (isMpMode()) state.designApprovals.launch = false;
        }
        if (activeDesignSegment === 'space') {
          state.selections.spaceBus = item.id;
          if (isMpMode()) state.designApprovals.space = false;
        }
        if (activeDesignSegment === 'ground') {
          state.selections.groundStation = item.id;
          if (isMpMode()) state.designApprovals.ground = true;
        }
        renderStage4Design();
        calculateTempResources();
        if (isMpMode()) {
          pushMpSharedState({
            selections: state.selections,
            designApprovals: state.designApprovals
          });
        }
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
        title: `${ICONS.rocket} CUSTOM LAUNCH VEHICLE ARCHITECTURE (NO PRESETS)`,
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
        title: `${ICONS.satellite} CUSTOM SPACECRAFT BUS ARCHITECTURE (NO PRESETS)`,
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
        title: `${ICONS.dish} CUSTOM GROUND & TELEMETRY NETWORK (NO PRESETS)`,
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
      if (isMpMode() && state.userRole !== activeDesignSegment) {
        input.disabled = true;
      }

      const hintEl = document.createElement('div');
      hintEl.className = 'custom-slider-hint';
      hintEl.textContent = s.hint;

      input.addEventListener('input', (e) => {
        if (isMpMode() && state.userRole !== activeDesignSegment) return;
        const num = parseFloat(e.target.value);
        cd[s.key] = num;
        valSpan.textContent = `${s.step < 1 ? num.toFixed(1) : num.toLocaleString()} ${s.unit}`;
        summaryEl.innerHTML = cfg.summaryFn();
        calculateTempResources();
        if (isMpMode()) {
          pushMpSharedState({ customDesign: state.customDesign });
        }
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
        if (isMpMode() && state.userRole !== 'launch') {
          playAlarm();
          showInPageNotice(`ROLE PERMISSION: Only the LAUNCH PLAYER can choose Rocket Propellant Chemistry!`, 'LAUNCH STATION ONLY');
          return;
        }
        playBeep(650);
        state.selections.selectedFuel = fuel.id;
        if (isMpMode()) state.designApprovals.launch = false;
        renderFuelOptions();
        calculateTempResources();
        if (isMpMode()) {
          pushMpSharedState({ selections: state.selections, designApprovals: state.designApprovals });
        }
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
        if (isMpMode() && state.userRole !== 'space') {
          playAlarm();
          showInPageNotice(`ROLE PERMISSION: Only the SPACE PLAYER can choose Spacecraft Bus Sizing!`, 'SPACE STATION ONLY');
          return;
        }
        playBeep(650);
        state.selections.busSizing = sizing.id;
        if (isMpMode()) state.designApprovals.space = false;
        renderBusSizingOptions();
        calculateTempResources();
        if (isMpMode()) {
          pushMpSharedState({ selections: state.selections, designApprovals: state.designApprovals });
        }
      });
      DOM.busSizingGrid.appendChild(card);
    });
  }

  function getSegmentExpenditure() {
    const sel = state.selections;
    const fuel = FUEL_TYPES[sel.selectedFuel] || FUEL_TYPES.kerosene;
    const rocket = CATALOG.launch.find(i => i.id === sel.launchRocket);
    const bus = CATALOG.space_bus.find(i => i.id === sel.spaceBus);
    const ground = CATALOG.ground.find(i => i.id === sel.groundStation);
    const sizing = BUS_SIZINGS[sel.busSizing] || BUS_SIZINGS.standard;
    const instCost = (state.selectedInstruments || []).reduce((acc, inst) => acc + (inst.cost || 0), 0);
    const shieldCost = sel.heatShieldInstalled ? 45000 : 0;

    if (state.customSlidersEnabled) {
      const cd = state.customDesign;
      const launchCost = fuel.cost + Math.round(cd.launchPayloadMax * 35 + cd.launchDeltaV * 18000 + Math.pow(Math.max(0, cd.launchReliability - 70), 2) * 350);
      const spaceCost = instCost + shieldCost + Math.round(45000 + cd.spaceVolumeMax * 12000 + cd.spacePowerGen * 45 + cd.spaceFuelCap * 30 + Math.pow(Math.max(0, cd.spaceReliability - 70), 2) * 300);
      const groundCost = Math.round(15000 + cd.groundBandwidth * 350 + Math.pow(Math.max(0, cd.groundReliability - 70), 2) * 250);
      return { launchCost, spaceCost, groundCost };
    }
    const launchCost = fuel.cost + (rocket ? rocket.cost : 0);
    const spaceCost = instCost + shieldCost + (bus ? bus.cost + sizing.costAdd : 0);
    const groundCost = ground ? ground.cost : 0;
    return { launchCost, spaceCost, groundCost };
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
      reqVelocity: state.selectedDomain ? state.selectedDomain.baseDeltaV : 7.8,
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
    DOM.hintCost.innerHTML = sandbox
      ? `${ICONS.check} SANDBOX MODE: Unlimited R&amp;D Funding`
      : (overBudget ? `${ICONS.alert} INSUFFICIENT PERMANENT FUNDS!` : `Balance remaining: $${(state.budget - totalCost).toLocaleString()}`);

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
    DOM.hintBandwidth.innerHTML = bandwidth >= 85 ? `${ICONS.check} High bandwidth: Fast downlink, zero buffer loss` : `${ICONS.alert} Low bandwidth: Downlink takes longer; buffer packet drop risk`;

    // Reliabilities
    DOM.relLaunch.textContent = `${relLaunch}%`;
    DOM.relSpace.textContent = `${relSpace}%`;
    DOM.relGround.textContent = `${relGround}%`;

    // Read-only Validation & Missing Items / Solutions (Standard vs Advanced Mode)
    const buildIssues = [];
    const isAdv = !!state.customSlidersEnabled;

    if (!isAdv) {
      if (!rocket) buildIssues.push('Missing Launch Rocket: LAUNCH PLAYER must select a Launch Vehicle in 1. Launch Segment.');
      if (!bus) buildIssues.push('Missing Space Bus: SPACE PLAYER must select a Spacecraft Bus in 2. Space Segment.');
      if (!ground) buildIssues.push('Missing Ground Station: GROUND PLAYER must select a Communications Network in 3. Ground Segment.');
    }

    if ((isAdv || rocket) && totalMass > maxMass) {
      buildIssues.push(
        isAdv
          ? `Mass Exceeded (${totalMass.toLocaleString()} / ${maxMass.toLocaleString()} kg): Increase the "Rocket Max Payload Mass" slider in 1. Launch Segment, or lower "Fuel Capacity" / sensors.`
          : `Mass Exceeded (${totalMass.toLocaleString()} / ${maxMass.toLocaleString()} kg): LAUNCH PLAYER must upgrade to a heavier Launch Rocket or SPACE PLAYER must reduce Bus Sizing / sensors.`
      );
    }
    if ((isAdv || bus) && powerConsumed > powerGen) {
      buildIssues.push(
        isAdv
          ? `Insufficient Power (${powerConsumed} / ${powerGen} W): Increase the "Bus Solar/RTG Power" slider in 2. Space Segment, or unequip high-power sensors.`
          : `Insufficient Power (${powerConsumed} / ${powerGen} W): SPACE PLAYER must select a higher-power Spacecraft Bus or unequip high-power sensors.`
      );
    }
    if ((isAdv || bus) && volumeUsed > maxVolume) {
      buildIssues.push(
        isAdv
          ? `Bus Volume Full (${volumeUsed.toFixed(1)} / ${maxVolume.toFixed(1)} m³): Increase the "Spacecraft Bus Volume" slider in 2. Space Segment, or equip fewer sensors.`
          : `Bus Volume Full (${volumeUsed.toFixed(1)} / ${maxVolume.toFixed(1)} m³): SPACE PLAYER must increase Bus Sizing in 2. Space Segment or equip fewer sensors.`
      );
    }
    if ((isAdv || rocket) && velocityDV < state.tempResources.reqVelocity) {
      buildIssues.push(
        isAdv
          ? `Not enough Delta-V (${velocityDV.toFixed(1)} / ${state.tempResources.reqVelocity.toFixed(1)} km/s): Increase "Base Rocket Velocity (ΔV)" slider or change fuel in 1. Launch Segment.`
          : `Not enough Delta-V (${velocityDV.toFixed(1)} / ${state.tempResources.reqVelocity.toFixed(1)} km/s): LAUNCH PLAYER must upgrade Rocket or switch to Hydrolox/Methalox fuel.`
      );
    }
    if (!sandbox && totalCost > state.budget) {
      buildIssues.push(
        `Over Agency Budget ($${totalCost.toLocaleString()} / $${state.budget.toLocaleString()}): Pick lower-cost hardware or have USER PLAYER claim an Emergency Grant.`
      );
    }

    if (isMpMode()) {
      const segCosts = getSegmentExpenditure();
      const alloc = state.budgetAllocations || { launch: 450000, space: 500000, ground: 250000 };
      if (!sandbox) {
        if (segCosts.launchCost > alloc.launch) {
          buildIssues.push(`Launch Over Allocated Budget ($${segCosts.launchCost.toLocaleString()} / $${alloc.launch.toLocaleString()}): USER PLAYER must allocate more budget to Launch, or LAUNCH PLAYER must pick a cheaper rocket/fuel.`);
        }
        if (segCosts.spaceCost > alloc.space) {
          buildIssues.push(`Space Over Allocated Budget ($${segCosts.spaceCost.toLocaleString()} / $${alloc.space.toLocaleString()}): USER PLAYER must allocate more budget to Space, or SPACE PLAYER must pick a cheaper bus/sensors.`);
        }
        if (segCosts.groundCost > alloc.ground) {
          buildIssues.push(`Ground Over Allocated Budget ($${segCosts.groundCost.toLocaleString()} / $${alloc.ground.toLocaleString()}): USER PLAYER must allocate more budget to Ground, or GROUND PLAYER must pick a cheaper station.`);
        }
      }
      const appr = state.designApprovals || {};
      if (!appr.launch) buildIssues.push('Pending Approval: GROUND PLAYER must approve the Launch Player\'s rocket design in the top collaboration bar.');
      if (!appr.space) buildIssues.push('Pending Approval: GROUND PLAYER must approve the Space Player\'s bus & instrument design in the top collaboration bar.');
      if (!appr.ground) buildIssues.push('Pending Approval: GROUND PLAYER must approve the Ground Communications network in the top collaboration bar.');
    }

    if (!instrumentsCountOk) {
      buildIssues.push('No Science Sensors Equipped: Return to Stage 2 and equip at least one sensor.');
    }

    const isValid = segmentsReady && buildIssues.length === 0;

    if (DOM.buildVerifyIssues) {
      if (isValid) {
        DOM.buildVerifyIssues.style.display = 'none';
        DOM.buildVerifyIssues.innerHTML = '';
      } else {
        DOM.buildVerifyIssues.style.display = 'block';
        DOM.buildVerifyIssues.innerHTML = '';
        const titleEl = document.createElement('div');
        titleEl.className = 'build-verify-issues-title';
        titleEl.textContent = 'BUILD & VERIFY BLOCKED — TEAM COLLABORATION CHECKLIST:';
        const ul = document.createElement('ul');
        buildIssues.forEach(msg => {
          const li = document.createElement('li');
          li.textContent = msg;
          ul.appendChild(li);
        });
        DOM.buildVerifyIssues.appendChild(titleEl);
        DOM.buildVerifyIssues.appendChild(ul);

        if (!sandbox && totalCost > state.budget) {
          const grantBtn = document.createElement('button');
          grantBtn.type = 'button';
          grantBtn.className = 'inline-grant-btn';
          grantBtn.textContent = 'USER PLAYER: CLAIM EMERGENCY GRANT (+$150,000 | -8 REP)';
          grantBtn.addEventListener('click', () => {
            if (isMpMode() && state.userRole !== 'user') {
              playAlarm();
              showInPageNotice('ROLE PERMISSION: Only the USER PLAYER can claim agency grants and allocate budget!', 'USER STATION ONLY');
              return;
            }
            state.budget += 150000;
            state.reputation = Math.max(0, state.reputation - 8);
            playBeep(720);
            updatePermanentHud();
            calculateTempResources();
            if (isMpMode()) {
              pushMpSharedState({ budget: state.budget, reputation: state.reputation });
            }
          });
          DOM.buildVerifyIssues.appendChild(grantBtn);
        }
      }
    }

    DOM.btnNextStage4.disabled = !isValid;

    if (typeof updateMultiplayerStationBar === 'function') {
      updateMultiplayerStationBar();
    }
    syncVisualDesignFromStats();
    renderDesignVisualViewport();
  }

  // ========================================================================
  // 9B. SPACECRAFT & TOWER VISUAL BLUEPRINT ENGINE (3 VARIANTS EACH)
  // ========================================================================

  const ROCKET_VARIANT_NAMES = [
    'Falcon Heavy Multi-Core',
    'SLS Cryogenic Orange Core',
    'Starship / Vulcan Stainless'
  ];

  const SATELLITE_VARIANT_NAMES = [
    'Parabolic Deep-Space Bus',
    'Orbital Lab & Docking Bus',
    'Hexagonal Gold-MLI Observatory'
  ];

  const TOWER_VARIANT_NAMES = [
    'Deep-Space Parabolic Pedestal',
    'Red/White Lattice Relay Tower',
    'Trussed Telemetry Control Mast'
  ];

  function randomizeDesignVariants() {
    state.visualDesign.rocketVariant = Math.floor(Math.random() * 3);
    state.visualDesign.satelliteVariant = Math.floor(Math.random() * 3);
    state.visualDesign.towerVariant = Math.floor(Math.random() * 3);
  }

  function setDesignViewMode(mode) {
    state.designViewMode = mode === 'stats' ? 'stats' : 'image';
    if (DOM.designImageView) {
      DOM.designImageView.style.display = state.designViewMode === 'image' ? 'flex' : 'none';
    }
    if (DOM.designStatsView) {
      DOM.designStatsView.style.display = state.designViewMode === 'stats' ? 'block' : 'none';
    }
    if (DOM.btnDesignViewImage) {
      DOM.btnDesignViewImage.classList.toggle('active', state.designViewMode === 'image');
    }
    if (DOM.btnDesignViewStats) {
      DOM.btnDesignViewStats.classList.toggle('active', state.designViewMode === 'stats');
    }
  }

  function syncVisualDesignFromStats() {
    const tr = state.tempResources;
    const sel = state.selections;
    const vd = state.visualDesign;

    const maxMass = tr.maxMass || 1500;
    const vel = tr.velocity || 7.8;
    const maxVol = tr.maxVolume || 4.0;
    const maxPwr = tr.maxPower || 500;
    const bw = tr.bandwidth || 85;

    // Rocket physical parameters derived from chosen stats
    vd.rocketScale = Math.max(0.78, Math.min(1.26, 0.76 + (maxMass / 9500) * 0.34 + ((vel - 7.0) / 10.0) * 0.14));
    vd.boosterCount = maxMass >= 6200 ? 4 : (maxMass >= 2200 ? 2 : 0);
    vd.engineCount = maxMass >= 6200 ? 9 : (maxMass >= 2200 ? 5 : 3);
    vd.fairingScale = Math.max(0.88, Math.min(1.32, 0.85 + (maxVol / 14) * 0.38));
    vd.fuelId = sel.selectedFuel || 'kerosene';
    vd.hasGridFins = (tr.reliabilityLaunch || 90) >= 88;
    vd.upperStageStretch = Math.max(0, Math.min(28, (vel - 7.5) * 4.2));

    // Satellite physical parameters derived from chosen stats
    vd.satScale = Math.max(0.82, Math.min(1.28, 0.80 + (maxVol / 14) * 0.38));
    vd.busBays = maxVol >= 9.0 ? 3 : (maxVol >= 5.5 ? 2 : 1);
    vd.solarPanelsPerWing = maxPwr >= 2000 ? 4 : (maxPwr >= 1150 ? 3 : (maxPwr >= 600 ? 2 : 1));
    vd.hasRtg = maxPwr >= 1600;
    vd.instrumentCount = Array.isArray(state.selectedInstruments) ? state.selectedInstruments.length : 1;
    vd.hasHeatShield = !!sel.heatShieldInstalled;

    // Ground communications tower parameters derived from chosen stats
    vd.towerScale = Math.max(0.84, Math.min(1.26, 0.82 + (bw / 260) * 0.38));
    vd.bandwidthMbps = bw;
    vd.relayDishCount = bw >= 180 ? 4 : (bw >= 80 ? 2 : 1);
    vd.auxDishCount = bw >= 180 ? 2 : (bw >= 90 ? 1 : 0);
    vd.highReliability = (tr.reliabilityGround || 90) >= 93;
  }

  function getFuelVisualColors(fuelId) {
    if (fuelId === 'methalox') {
      return { stripe: '#0284c7', label: 'CH4/LOX', outerPlume: '#38bdf8', innerPlume: '#e0f2fe', coreGlow: '#818cf8' };
    }
    if (fuelId === 'hydrolox') {
      return { stripe: '#f59e0b', label: 'LH2/LOX', outerPlume: '#67e8f9', innerPlume: '#ffffff', coreGlow: '#38bdf8' };
    }
    if (fuelId === 'hypergolic') {
      return { stripe: '#10b981', label: 'NTO/UDMH', outerPlume: '#34d399', innerPlume: '#fef08a', coreGlow: '#10b981' };
    }
    return { stripe: '#dc2626', label: 'RP-1/LOX', outerPlume: '#f97316', innerPlume: '#fef08a', coreGlow: '#fbbf24' };
  }

  function buildRocketSvg(vd) {
    const fuelVis = getFuelVisualColors(vd.fuelId);
    const v = vd.rocketVariant % 3;
    const s = vd.rocketScale || 1.0;
    const fScale = vd.fairingScale || 1.0;
    const stretch = vd.upperStageStretch || 0;

    const coreW = 34;
    const coreH = Math.round(138 + stretch);
    const baseY = 232;
    const topY = baseY - coreH;
    const fairingH = Math.round(48 * fScale);
    const fairingW = Math.round(38 * Math.min(1.18, fScale));

    // Variant gradient palettes
    let coreGradStops = `
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="28%" stop-color="#f8fafc"/>
      <stop offset="55%" stop-color="#e2e8f0"/>
      <stop offset="85%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    `;
    let fairingGradStops = coreGradStops;
    let boosterGradStops = coreGradStops;

    if (v === 1) {
      // SLS Cryogenic Orange core with white boosters & upper stage
      coreGradStops = `
        <stop offset="0%" stop-color="#9a3412"/>
        <stop offset="28%" stop-color="#fb923c"/>
        <stop offset="55%" stop-color="#ea580c"/>
        <stop offset="88%" stop-color="#9a3412"/>
        <stop offset="100%" stop-color="#7c2d12"/>
      `;
    } else if (v === 2) {
      // Starship / Vulcan polished metallic titanium-steel
      coreGradStops = `
        <stop offset="0%" stop-color="#334155"/>
        <stop offset="25%" stop-color="#cbd5e1"/>
        <stop offset="50%" stop-color="#f8fafc"/>
        <stop offset="78%" stop-color="#64748b"/>
        <stop offset="100%" stop-color="#1e293b"/>
      `;
      fairingGradStops = coreGradStops;
    }

    // Engine bells at bottom
    const drawNozzles = (cx, y, count, widthSpan) => {
      let out = '';
      for (let i = 0; i < count; i++) {
        const offset = count === 1 ? 0 : ((i / (count - 1)) - 0.5) * widthSpan;
        const nx = cx + offset;
        out += `
          <path d="M${nx - 3.2},${y} L${nx + 3.2},${y} L${nx + 5},${y + 9} L${nx - 5},${y + 9} Z" fill="url(#nozzleGrad)" stroke="#334155" stroke-width="0.6"/>
          <ellipse cx="${nx}" cy="${y + 15}" rx="3.8" ry="8" fill="${fuelVis.outerPlume}" opacity="0.75"/>
          <ellipse cx="${nx}" cy="${y + 13}" rx="2.0" ry="5" fill="${fuelVis.innerPlume}" opacity="0.95"/>
        `;
      }
      return out;
    };

    // Helper for side booster (matching MM9HXG reference: nose cone, grid fins, cross struts, swept black landing legs)
    const drawSideBooster = (bx, bHeight, bWidth, isOuter = false) => {
      const bTop = baseY - bHeight;
      const hw = bWidth / 2;
      const sign = bx < 200 ? -1 : 1;
      return `
        <!-- Strut linkages -->
        <line x1="${200 + sign * (coreW / 2)}" y1="${bTop + 14}" x2="${bx - sign * hw}" y2="${bTop + 14}" stroke="#cbd5e1" stroke-width="2.5"/>
        <line x1="${200 + sign * (coreW / 2)}" y1="${baseY - 22}" x2="${bx - sign * hw}" y2="${baseY - 22}" stroke="#cbd5e1" stroke-width="2.5"/>
        <!-- Nose cone -->
        <path d="M${bx - hw},${bTop} C${bx - hw},${bTop - 16} ${bx - 3},${bTop - 26} ${bx},${bTop - 28} C${bx + 3},${bTop - 26} ${bx + hw},${bTop - 16} ${bx + hw},${bTop} Z" fill="url(#boosterGrad)"/>
        <!-- Booster cylinder -->
        <rect x="${bx - hw}" y="${bTop}" width="${bWidth}" height="${bHeight}" fill="url(#boosterGrad)"/>
        <line x1="${bx - hw}" y1="${bTop + 2}" x2="${bx + hw}" y2="${bTop + 2}" stroke="#64748b" stroke-width="1"/>
        <rect x="${bx - hw}" y="${bTop + 18}" width="${bWidth}" height="3" fill="${fuelVis.stripe}" opacity="0.85"/>
        ${vd.hasGridFins && !isOuter ? `
          <rect x="${bx - hw + 1}" y="${bTop + 5}" width="4.5" height="6.5" rx="0.8" fill="#94a3b8" stroke="#475569" stroke-width="0.6"/>
          <rect x="${bx + hw - 5.5}" y="${bTop + 5}" width="4.5" height="6.5" rx="0.8" fill="#94a3b8" stroke="#475569" stroke-width="0.6"/>
        ` : ''}
        <!-- Swept black landing-leg skirt (MM9HXG style) -->
        <path d="M${bx - hw},${baseY - 34} L${bx - hw + 5},${baseY - 34} L${bx - 2},${baseY - 5} L${bx + 2},${baseY - 5} L${bx + hw - 5},${baseY - 34} L${bx + hw},${baseY - 34} L${bx + hw + 1.5},${baseY} L${bx - hw - 1.5},${baseY} Z" fill="url(#legSkirtGrad)"/>
        ${drawNozzles(bx, baseY, 3, bWidth - 8)}
      `;
    };

    let boostersSvg = '';
    const bH = Math.round(coreH * 0.76);
    if (vd.boosterCount >= 2) {
      boostersSvg += drawSideBooster(200 - 34, bH, 24, false);
      boostersSvg += drawSideBooster(200 + 34, bH, 24, false);
    }
    if (vd.boosterCount >= 4) {
      boostersSvg += drawSideBooster(200 - 62, Math.round(bH * 0.84), 19, true);
      boostersSvg += drawSideBooster(200 + 62, Math.round(bH * 0.84), 19, true);
    }

    const fHw = fairingW / 2;
    const fBaseY = topY - 22;
    const fTipY = fBaseY - fairingH;

    return `
      <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="0%">${coreGradStops}</linearGradient>
          <linearGradient id="fairingGrad" x1="0%" y1="0%" x2="100%" y2="0%">${fairingGradStops}</linearGradient>
          <linearGradient id="boosterGrad" x1="0%" y1="0%" x2="100%" y2="0%">${boosterGradStops}</linearGradient>
          <linearGradient id="legSkirtGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="45%" stop-color="#334155"/>
            <stop offset="100%" stop-color="#090d16"/>
          </linearGradient>
          <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="50%" stop-color="#cbd5e1"/>
            <stop offset="100%" stop-color="#1e293b"/>
          </linearGradient>
        </defs>

        <!-- Blueprint Grid & Launch Gantry Frame -->
        <g stroke="rgba(125, 211, 252, 0.08)" stroke-width="1">
          <line x1="0" y1="60" x2="400" y2="60"/><line x1="0" y1="120" x2="400" y2="120"/>
          <line x1="0" y1="180" x2="400" y2="180"/><line x1="0" y1="240" x2="400" y2="240"/>
          <line x1="80" y1="0" x2="80" y2="280"/><line x1="200" y1="0" x2="200" y2="280"/><line x1="320" y1="0" x2="320" y2="280"/>
        </g>
        <!-- Launch Pad Flame Trench -->
        <rect x="70" y="246" width="260" height="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
        <path d="M110,254 L95,274 L305,274 L290,254 Z" fill="#0f172a" stroke="#334155" stroke-width="1"/>

        <g transform="translate(200, ${baseY}) scale(${s.toFixed(2)}) translate(-200, -${baseY})">
          ${boostersSvg}

          <!-- Central Core Stage -->
          <rect x="${200 - coreW / 2}" y="${topY}" width="${coreW}" height="${coreH}" fill="url(#coreGrad)"/>
          <!-- Upper Stage Cylinder -->
          <rect x="${200 - coreW / 2 + 1}" y="${fBaseY}" width="${coreW - 2}" height="24" fill="url(#fairingGrad)"/>
          <!-- Interstage Collar & Propellant Stripe -->
          <rect x="${200 - coreW / 2}" y="${topY - 2}" width="${coreW}" height="5" fill="${v === 1 ? '#1e293b' : '#475569'}"/>
          <rect x="${200 - coreW / 2}" y="${topY + 22}" width="${coreW}" height="4" fill="${fuelVis.stripe}"/>

          <!-- Flag / Agency Decal on Center Core (MM9HXG detail) -->
          <rect x="193" y="${topY + 34}" width="14" height="8" fill="#dc2626"/>
          <rect x="193" y="${topY + 34}" width="14" height="1.6" fill="#ffffff"/>
          <rect x="193" y="${topY + 37.2}" width="14" height="1.6" fill="#ffffff"/>
          <rect x="193" y="${topY + 40.4}" width="14" height="1.6" fill="#ffffff"/>
          <rect x="193" y="${topY + 34}" width="6.5" height="4.8" fill="#1d4ed8"/>

          ${vd.hasGridFins ? `
            <rect x="${200 - coreW / 2 + 2}" y="${topY + 6}" width="5.5" height="8" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="0.7"/>
            <rect x="${200 + coreW / 2 - 7.5}" y="${topY + 6}" width="5.5" height="8" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="0.7"/>
          ` : ''}

          <!-- Bulbous Payload Fairing (MM9HXG style) -->
          <path d="M${200 - coreW / 2 + 1},${fBaseY}
                   L${200 - fHw},${fBaseY - 8}
                   L${200 - fHw},${fBaseY - fairingH * 0.55}
                   C${200 - fHw},${fTipY + 12} 195,${fTipY + 2} 200,${fTipY}
                   C205,${fTipY + 2} ${200 + fHw},${fTipY + 12} ${200 + fHw},${fBaseY - fairingH * 0.55}
                   L${200 + fHw},${fBaseY - 8}
                   L${200 + coreW / 2 - 1},${fBaseY} Z"
                fill="url(#fairingGrad)" stroke="#94a3b8" stroke-width="0.6"/>
          <!-- Fairing center seam line -->
          <line x1="200" y1="${fTipY + 2}" x2="200" y2="${fBaseY}" stroke="rgba(71, 85, 105, 0.45)" stroke-width="0.9" stroke-dasharray="3 2"/>

          ${v === 2 ? `
            <!-- Starship / Vulcan forward aero flaps -->
            <polygon points="${200 - fHw},${fTipY + 16} ${200 - fHw - 9},${fTipY + 28} ${200 - fHw},${fTipY + 34}" fill="#334155"/>
            <polygon points="${200 + fHw},${fTipY + 16} ${200 + fHw + 9},${fTipY + 28} ${200 + fHw},${fTipY + 34}" fill="#334155"/>
          ` : ''}

          <!-- Center Core Swept Black Landing-Leg Skirt (MM9HXG style) -->
          <path d="M${200 - coreW / 2},${baseY - 40}
                   L${200 - coreW / 2 + 6},${baseY - 40}
                   L197,${baseY - 6} L203,${baseY - 6}
                   L${200 + coreW / 2 - 6},${baseY - 40}
                   L${200 + coreW / 2},${baseY - 40}
                   L${200 + coreW / 2 + 2},${baseY}
                   L${200 - coreW / 2 - 2},${baseY} Z"
                fill="url(#legSkirtGrad)"/>

          ${drawNozzles(200, baseY, vd.boosterCount === 0 ? vd.engineCount : 3, coreW - 8)}
        </g>

        <!-- Live Dimension Callouts -->
        <text x="14" y="24" fill="#7dd3fc" font-family="monospace" font-size="10" font-weight="bold">PAYLOAD CAP: ${(state.tempResources.maxMass || 0).toLocaleString()} kg</text>
        <text x="14" y="38" fill="#fbbf24" font-family="monospace" font-size="10">TOTAL ΔV: ${(state.tempResources.velocity || 0).toFixed(1)} km/s (${fuelVis.label})</text>
        <text x="14" y="52" fill="#cbd5e1" font-family="monospace" font-size="10">BOOSTERS: ${vd.boosterCount === 0 ? 'SINGLE CORE' : `${vd.boosterCount}x STRAP-ON`}</text>
      </svg>
    `;
  }

  function buildSatelliteSvg(vd) {
    const v = vd.satelliteVariant % 3;
    const s = vd.satScale || 1.0;
    const panels = vd.solarPanelsPerWing || 2;
    const bays = vd.busBays || 2;
    const instCount = vd.instrumentCount || 1;
    const hasShield = vd.hasHeatShield;

    // Render instrument sensor pods mounted on the bus
    const buildSensorPods = (cx, cy) => {
      let pods = '';
      const count = Math.min(6, Math.max(1, instCount));
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const px = cx + Math.cos(angle) * 24;
        const py = cy + Math.sin(angle) * 14;
        pods += `
          <g transform="translate(${px.toFixed(1)}, ${py.toFixed(1)})">
            <rect x="-5" y="-4" width="10" height="8" rx="1.5" fill="#334155" stroke="#94a3b8" stroke-width="0.8"/>
            <circle cx="0" cy="0" r="2.6" fill="${i % 2 === 0 ? '#38bdf8' : '#c084fc'}"/>
          </g>
        `;
      }
      return pods;
    };

    // Heat shield cap (when installed)
    const buildHeatShieldCap = (x, y, rotDeg) => {
      if (!hasShield) return '';
      return `
        <g transform="translate(${x}, ${y}) rotate(${rotDeg})">
          <path d="M-8,-24 C10,-20 14,20 -8,24 C-2,12 -2,-12 -8,-24 Z" fill="#1e293b" stroke="#f97316" stroke-width="1.8"/>
          <path d="M-4,-18 C6,-14 8,14 -4,18" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="3 2"/>
        </g>
      `;
    };

    if (v === 1) {
      // Variant 1: Orbital Space Station / Docking Module (orbital-space-station-d-vector...webp)
      const bodyW = 54 + bays * 16;
      const bodyH = 44;
      const panelW = 36;
      const panelH = 22 + panels * 14;

      // Grid lines on vertical dark solar wings
      const drawDarkSolarWing = (yDir) => {
        const startY = 140 + yDir * (bodyH / 2 + 8);
        const topY = yDir < 0 ? startY - panelH : startY;
        let grid = '';
        for (let r = 1; r <= panels + 1; r++) {
          const gy = topY + (r / (panels + 2)) * panelH;
          grid += `<line x1="${200 - panelW / 2}" y1="${gy}" x2="${200 + panelW / 2}" y2="${gy}" stroke="#64748b" stroke-width="0.9"/>`;
        }
        return `
          <rect x="197" y="${yDir < 0 ? startY : startY - 8}" width="6" height="8" fill="#cbd5e1"/>
          <rect x="${200 - panelW / 2}" y="${topY}" width="${panelW}" height="${panelH}" fill="#27272a" stroke="#94a3b8" stroke-width="1.2"/>
          <line x1="200" y1="${topY}" x2="200" y2="${topY + panelH}" stroke="#64748b" stroke-width="1"/>
          ${grid}
        `;
      };

      const sphereX = 200 - bodyW / 2 - 22;
      const aftX = 200 + bodyW / 2;

      return `
        <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="orbCylGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="35%" stop-color="#ffffff"/>
              <stop offset="65%" stop-color="#e2e8f0"/>
              <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
            <radialGradient id="orbSphereGrad" cx="38%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="55%" stop-color="#cbd5e1"/>
              <stop offset="100%" stop-color="#64748b"/>
            </radialGradient>
          </defs>
          <!-- Starfield dots -->
          <circle cx="48" cy="44" r="1.3" fill="#e2e8f0" opacity="0.6"/><circle cx="345" cy="52" r="1.5" fill="#7dd3fc" opacity="0.7"/>
          <circle cx="72" cy="228" r="1.2" fill="#e2e8f0" opacity="0.5"/><circle cx="330" cy="215" r="1.4" fill="#fde68a" opacity="0.6"/>

          <g transform="translate(200, 140) scale(${s.toFixed(2)}) translate(-200, -140)">
            ${drawDarkSolarWing(-1)}
            ${drawDarkSolarWing(1)}

            <!-- Ribbed Cylindrical Service Module -->
            <rect x="${200 - bodyW / 2}" y="${140 - bodyH / 2}" width="${bodyW}" height="${bodyH}" fill="url(#orbCylGrad)" stroke="#475569" stroke-width="1"/>
            <rect x="${200 - bodyW / 2}" y="${140 - bodyH / 2}" width="12" height="${bodyH}" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
            <rect x="${200 + bodyW / 2 - 12}" y="${140 - bodyH / 2}" width="12" height="${bodyH}" fill="#94a3b8" stroke="#334155" stroke-width="1"/>
            <line x1="${200 - bodyW / 2 + 12}" y1="140" x2="${200 + bodyW / 2 - 12}" y2="140" stroke="#94a3b8" stroke-width="0.9"/>

            <!-- Spherical Docking Hub on Left (reference image 5) -->
            <rect x="${sphereX + 18}" y="130" width="10" height="20" fill="url(#orbCylGrad)" stroke="#64748b" stroke-width="0.8"/>
            <rect x="${sphereX - 8}" y="110" width="16" height="5" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
            <rect x="${sphereX - 8}" y="165" width="16" height="5" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
            <rect x="${sphereX - 28}" y="131" width="5" height="18" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
            <circle cx="${sphereX}" cy="140" r="24" fill="url(#orbSphereGrad)" stroke="#64748b" stroke-width="1"/>
            <!-- Viewport Window -->
            <circle cx="${sphereX}" cy="140" r="7.5" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
            <circle cx="${sphereX}" cy="140" r="5" fill="#0ea5e9" opacity="0.85"/>

            <!-- Aft Engine Module & Bell on Right -->
            <rect x="${aftX}" y="128" width="14" height="24" fill="url(#orbCylGrad)" stroke="#64748b" stroke-width="0.8"/>
            <polygon points="${aftX + 14},131 ${aftX + 26},128 ${aftX + 26},152 ${aftX + 14},149" fill="#cbd5e1" stroke="#64748b" stroke-width="0.8"/>
            <polygon points="${aftX + 26},130 ${aftX + 35},133 ${aftX + 35},147 ${aftX + 26},150" fill="#1e293b"/>

            ${vd.hasRtg ? `
              <!-- RTG Nuclear Boom -->
              <rect x="186" y="${140 - bodyH / 2 - 14}" width="28" height="8" rx="2" fill="#f59e0b" stroke="#78350f" stroke-width="1"/>
            ` : ''}

            ${buildSensorPods(200, 140)}
            ${buildHeatShieldCap(sphereX - 28, 140, 180)}
          </g>

          <text x="14" y="24" fill="#7dd3fc" font-family="monospace" font-size="10" font-weight="bold">BUS VOL: ${(state.tempResources.maxVolume || 0).toFixed(1)} m³ (${bays} BAY${bays > 1 ? 'S' : ''})</text>
          <text x="14" y="38" fill="#fbbf24" font-family="monospace" font-size="10">POWER: ${state.tempResources.maxPower || 0} W (${panels * 2} SOLAR PANELS${vd.hasRtg ? ' + RTG' : ''})</text>
          <text x="14" y="52" fill="${hasShield ? '#34d399' : '#cbd5e1'}" font-family="monospace" font-size="10">SENSORS: ${instCount} EQUIPPED | SHIELD: ${hasShield ? 'PICA-X INSTALLED' : 'NONE'}</text>
        </svg>
      `;
    }

    // Variant 0 (Isometric Blue-Wing Satellite from images.jpeg) & Variant 2 (Gold-MLI Hexagonal Observatory)
    const isGold = v === 2;
    const busLen = 46 + bays * 14;
    const busRad = 20 + bays * 2;
    const panelLen = 28 + panels * 16;
    const panelW = 36;

    const buildBlueSolarWing = (dir) => {
      // dir = -1 (left wing) or +1 (right wing)
      let out = '';
      const segLen = panelLen / panels;
      for (let p = 0; p < panels; p++) {
        const x0 = dir < 0 ? -(busRad + 8 + (p + 1) * segLen + p * 4) : (busRad + 8 + p * (segLen + 4));
        const y0 = -panelW / 2;
        out += `
          <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${segLen.toFixed(1)}" height="${panelW}" fill="${isGold ? '#0f766e' : '#1d4ed8'}" stroke="#e2e8f0" stroke-width="1"/>
          <line x1="${(x0 + segLen * 0.33).toFixed(1)}" y1="${y0}" x2="${(x0 + segLen * 0.33).toFixed(1)}" y2="${y0 + panelW}" stroke="rgba(255,255,255,0.45)" stroke-width="0.7"/>
          <line x1="${(x0 + segLen * 0.66).toFixed(1)}" y1="${y0}" x2="${(x0 + segLen * 0.66).toFixed(1)}" y2="${y0 + panelW}" stroke="rgba(255,255,255,0.45)" stroke-width="0.7"/>
          <line x1="${x0}" y1="-6" x2="${x0 + segLen}" y2="-6" stroke="rgba(255,255,255,0.45)" stroke-width="0.7"/>
          <line x1="${x0}" y1="6" x2="${x0 + segLen}" y2="6" stroke="rgba(255,255,255,0.45)" stroke-width="0.7"/>
        `;
      }
      const strutEnd = dir * (busRad + 8 + panels * (segLen + 4));
      return `
        <line x1="${dir * busRad}" y1="-5" x2="${strutEnd.toFixed(1)}" y2="-5" stroke="#94a3b8" stroke-width="2"/>
        <line x1="${dir * busRad}" y1="5" x2="${strutEnd.toFixed(1)}" y2="5" stroke="#94a3b8" stroke-width="2"/>
        ${out}
      `;
    };

    return `
      <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="satBusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            ${isGold ? `
              <stop offset="0%" stop-color="#92400e"/>
              <stop offset="35%" stop-color="#fde68a"/>
              <stop offset="65%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#78350f"/>
            ` : `
              <stop offset="0%" stop-color="#64748b"/>
              <stop offset="32%" stop-color="#f8fafc"/>
              <stop offset="65%" stop-color="#cbd5e1"/>
              <stop offset="100%" stop-color="#475569"/>
            `}
          </linearGradient>
        </defs>

        <!-- Starfield -->
        <circle cx="52" cy="48" r="1.4" fill="#e2e8f0" opacity="0.65"/><circle cx="348" cy="60" r="1.5" fill="#7dd3fc" opacity="0.75"/>
        <circle cx="68" cy="230" r="1.2" fill="#fde68a" opacity="0.55"/><circle cx="335" cy="222" r="1.4" fill="#e2e8f0" opacity="0.65"/>

        <!-- Tilted Isometric Satellite matching images.jpeg -->
        <g transform="translate(200, 142) scale(${s.toFixed(2)}) rotate(-36)">
          ${buildBlueSolarWing(-1)}
          ${buildBlueSolarWing(1)}

          <!-- Forward Sensor / Telescope Module -->
          <polygon points="-10,${-busLen / 2 - 28} 10,${-busLen / 2 - 28} 14,${-busLen / 2 - 18} -14,${-busLen / 2 - 18}" fill="url(#satBusGrad)" stroke="#475569" stroke-width="0.8"/>
          <rect x="-13" y="${-busLen / 2 - 18}" width="26" height="18" rx="2" fill="url(#satBusGrad)" stroke="#64748b" stroke-width="0.8"/>
          <rect x="-8" y="${-busLen / 2 - 6}" width="16" height="8" fill="#334155"/>

          <!-- Main Cylindrical / Hexagonal Bus Chassis -->
          <rect x="${-busRad}" y="${-busLen / 2}" width="${busRad * 2}" height="${busLen}" rx="5" fill="url(#satBusGrad)" stroke="#475569" stroke-width="1"/>
          <line x1="${-busRad}" y1="0" x2="${busRad}" y2="0" stroke="rgba(51,65,85,0.5)" stroke-width="1"/>

          ${vd.hasRtg ? `
            <rect x="${busRad - 2}" y="-18" width="16" height="7" rx="1.5" fill="#f59e0b" stroke="#78350f" stroke-width="0.9"/>
          ` : ''}

          <!-- Equipped Scientific Instrument Hardpoints -->
          ${buildSensorPods(0, -4)}

          <!-- Aft Parabolic High-Gain Dish Antenna & Tripod Struts (images.jpeg detail) -->
          <rect x="-7" y="${busLen / 2}" width="14" height="10" fill="#94a3b8"/>
          <ellipse cx="0" cy="${busLen / 2 + 18}" rx="28" ry="9" fill="#e2e8f0" stroke="#64748b" stroke-width="1.2"/>
          <ellipse cx="0" cy="${busLen / 2 + 20}" rx="24" ry="6.5" fill="#94a3b8"/>
          <line x1="-14" y1="${busLen / 2 + 19}" x2="0" y2="${busLen / 2 + 37}" stroke="#cbd5e1" stroke-width="1.1"/>
          <line x1="14" y1="${busLen / 2 + 19}" x2="0" y2="${busLen / 2 + 37}" stroke="#cbd5e1" stroke-width="1.1"/>
          <line x1="0" y1="${busLen / 2 + 21}" x2="0" y2="${busLen / 2 + 37}" stroke="#cbd5e1" stroke-width="1.1"/>
          <circle cx="0" cy="${busLen / 2 + 37}" r="2.2" fill="#f8fafc"/>

          ${hasShield ? `
            <!-- PICA-X Blunt Atmospheric Re-entry Heat Shield Cap on Forebody -->
            <path d="M-24,${-busLen / 2 - 26} Q0,${-busLen / 2 - 44} 24,${-busLen / 2 - 26} L18,${-busLen / 2 - 20} L-18,${-busLen / 2 - 20} Z" fill="#1e293b" stroke="#f97316" stroke-width="1.8"/>
          ` : ''}
        </g>

        <text x="14" y="24" fill="#7dd3fc" font-family="monospace" font-size="10" font-weight="bold">BUS VOL: ${(state.tempResources.maxVolume || 0).toFixed(1)} m³ (${bays} BAY${bays > 1 ? 'S' : ''})</text>
        <text x="14" y="38" fill="#fbbf24" font-family="monospace" font-size="10">POWER: ${state.tempResources.maxPower || 0} W (${panels * 2} SOLAR PANELS${vd.hasRtg ? ' + RTG' : ''})</text>
        <text x="14" y="52" fill="${hasShield ? '#34d399' : '#cbd5e1'}" font-family="monospace" font-size="10">SENSORS: ${instCount} EQUIPPED | SHIELD: ${hasShield ? 'PICA-X INSTALLED' : 'NONE'}</text>
      </svg>
    `;
  }

  function buildTowerSvg(vd) {
    const v = vd.towerVariant % 3;
    const s = vd.towerScale || 1.0;
    const bw = vd.bandwidthMbps || 85;
    const relayCount = vd.relayDishCount || 2;
    const auxCount = vd.auxDishCount || 0;
    const hiRel = vd.highReliability;
    const waveRings = bw >= 180 ? 4 : (bw >= 90 ? 3 : 2);

    // Helper for auxiliary flanking parabolic ground dish when bandwidth is high
    const drawAuxDish = (ax, ay, scaleDir = 1) => `
      <g transform="translate(${ax}, ${ay}) scale(${scaleDir}, 1)">
        <rect x="-12" y="0" width="24" height="8" fill="#cbd5e1"/>
        <rect x="-5" y="-22" width="10" height="22" fill="#94a3b8"/>
        <g transform="translate(0, -24) rotate(-22)">
          <path d="M-24,-6 C-18,10 18,10 24,-6 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
          <ellipse cx="0" cy="-6" rx="24" ry="5" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
          <line x1="-14" y1="-6" x2="0" y2="-20" stroke="#e2e8f0" stroke-width="1.2"/>
          <line x1="14" y1="-6" x2="0" y2="-20" stroke="#e2e8f0" stroke-width="1.2"/>
          <line x1="0" y1="-6" x2="0" y2="-22" stroke="#dc2626" stroke-width="2"/>
        </g>
      </g>
    `;

    // Signal wave arcs radiating from top of tower/dish
    const drawSignalWaves = (wx, wy) => {
      let arcs = '';
      for (let i = 1; i <= waveRings; i++) {
        const r = i * 16;
        arcs += `<path d="M${wx - r},${wy - r * 0.45} A${r},${r} 0 0,1 ${wx + r},${wy - r * 0.45}" fill="none" stroke="${i % 2 === 0 ? '#34d399' : '#38bdf8'}" stroke-width="1.8" stroke-dasharray="5 3" opacity="${(0.95 - i * 0.16).toFixed(2)}"/>`;
      }
      return arcs;
    };

    let mainTowerHtml = '';
    if (v === 0) {
      // Variant 0: Deep-Space Parabolic Dish on Pedestal (left of modern-telecommunication-towers-set-vector.jpg)
      mainTowerHtml = `
        ${drawSignalWaves(208, 76)}
        <!-- Pedestal Base -->
        <polygon points="156,250 244,250 236,236 164,236" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <rect x="160" y="228" width="80" height="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1"/>
        <!-- Safety Railing -->
        <line x1="162" y1="222" x2="238" y2="222" stroke="#94a3b8" stroke-width="1"/>
        <!-- Vertical Concrete/Steel Pedestal Column -->
        <rect x="184" y="210" width="32" height="18" fill="#94a3b8"/>
        <rect x="190" y="148" width="20" height="62" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <!-- Control Bay Box & Blue Window -->
        <rect x="185" y="132" width="30" height="22" rx="2" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
        <rect x="193" y="140" width="14" height="10" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
        <line x1="178" y1="130" x2="178" y2="188" stroke="#94a3b8" stroke-width="2.5"/>
        <line x1="222" y1="130" x2="222" y2="188" stroke="#94a3b8" stroke-width="2.5"/>

        <!-- Giant Tilted Parabolic Reflector Dish -->
        <g transform="translate(200, 114) rotate(16)">
          <!-- Ribbed Dish Underbelly -->
          <path d="M-74,-8 C-58,28 58,28 74,-8 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>
          <path d="M-64,2 L64,2 M-48,12 L48,12 M-35,-6 L-24,18 M0,-6 L0,20 M35,-6 L24,18" stroke="#475569" stroke-width="1.2" fill="none"/>
          <!-- Dish Rim & Reflective Bowl -->
          <ellipse cx="0" cy="-8" rx="74" ry="16" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
          <ellipse cx="0" cy="-6" rx="64" ry="12" fill="#e2e8f0"/>
          <!-- Central Red Feed Column & 4 Quadripod Struts -->
          <line x1="0" y1="-6" x2="0" y2="-48" stroke="#dc2626" stroke-width="4"/>
          <ellipse cx="0" cy="-38" rx="6" ry="2.5" fill="#dc2626"/>
          <line x1="-58" y1="-8" x2="0" y2="-38" stroke="#f8fafc" stroke-width="1.8"/>
          <line x1="58" y1="-8" x2="0" y2="-38" stroke="#f8fafc" stroke-width="1.8"/>
          <line x1="-22" y1="4" x2="0" y2="-38" stroke="#cbd5e1" stroke-width="1.4"/>
          <line x1="22" y1="4" x2="0" y2="-38" stroke="#cbd5e1" stroke-width="1.4"/>
        </g>
      `;
    } else if (v === 1) {
      // Variant 1: Red-and-White Lattice Observation & Relay Tower (center-right of reference sheet)
      mainTowerHtml = `
        ${drawSignalWaves(200, 34)}
        <!-- Pedestal Base -->
        <polygon points="154,250 246,250 238,240 162,240" fill="#cbd5e1" stroke="#64748b" stroke-width="1"/>
        <!-- Central Red Cylinder Shaft -->
        <rect x="191" y="128" width="18" height="112" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
        <!-- White Steel Lattice Outer Frame -->
        <line x1="170" y1="240" x2="184" y2="128" stroke="#e2e8f0" stroke-width="2.2"/>
        <line x1="230" y1="240" x2="216" y2="128" stroke="#e2e8f0" stroke-width="2.2"/>
        <path d="M170,240 L226,216 L174,192 L222,168 L178,144 L216,128
                 M230,240 L174,216 L226,192 L178,168 L222,144 L184,128"
              fill="none" stroke="#cbd5e1" stroke-width="1.3"/>
        <!-- Circular Observation & Telemetry Cupola -->
        <polygon points="178,128 222,128 232,114 168,114" fill="#dc2626" stroke="#991b1b" stroke-width="1"/>
        <rect x="168" y="104" width="64" height="10" rx="3" fill="#e2e8f0" stroke="#64748b" stroke-width="1"/>
        <!-- Panoramic Windows -->
        <circle cx="178" cy="109" r="2.8" fill="#38bdf8"/><circle cx="187" cy="109" r="2.8" fill="#38bdf8"/>
        <circle cx="196" cy="109" r="2.8" fill="#38bdf8"/><circle cx="205" cy="109" r="2.8" fill="#38bdf8"/>
        <circle cx="214" cy="109" r="2.8" fill="#38bdf8"/><circle cx="223" cy="109" r="2.8" fill="#38bdf8"/>
        <polygon points="166,104 234,104 222,95 178,95" fill="#dc2626"/>
        <polygon points="182,95 218,95 212,88 188,88" fill="#cbd5e1"/>
        <!-- Upper Lattice Mast & Spire -->
        <rect x="195" y="54" width="10" height="34" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
        <path d="M195,88 L205,76 L195,64 L205,54 M205,88 L195,76 L205,64 L195,54" fill="none" stroke="#cbd5e1" stroke-width="1.1"/>
        <line x1="200" y1="54" x2="200" y2="24" stroke="#f8fafc" stroke-width="2"/>
        <circle cx="200" cy="24" r="3" fill="#ef4444"/>
        <!-- Side Microwave Relay Drums -->
        <ellipse cx="168" cy="162" rx="4.5" ry="9" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
        <ellipse cx="232" cy="162" rx="4.5" ry="9" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
        ${relayCount >= 4 ? `
          <ellipse cx="174" cy="196" rx="4.5" ry="9" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
          <ellipse cx="226" cy="196" rx="4.5" ry="9" fill="#f8fafc" stroke="#64748b" stroke-width="1"/>
        ` : ''}
      `;
    } else {
      // Variant 2: Trussed Steel Mast with Elevated Telemetry Control Deck (center-left of reference sheet)
      mainTowerHtml = `
        ${drawSignalWaves(200, 34)}
        <!-- Twin Red Vertical Support Columns -->
        <rect x="188" y="138" width="7" height="112" fill="#dc2626"/>
        <rect x="205" y="138" width="7" height="112" fill="#dc2626"/>
        <!-- Wide A-Frame Steel Lattice Legs -->
        <line x1="158" y1="250" x2="182" y2="138" stroke="#cbd5e1" stroke-width="2.2"/>
        <line x1="242" y1="250" x2="218" y2="138" stroke="#cbd5e1" stroke-width="2.2"/>
        <line x1="170" y1="205" x2="230" y2="205" stroke="#cbd5e1" stroke-width="1.5"/>
        <line x1="177" y1="170" x2="223" y2="170" stroke="#cbd5e1" stroke-width="1.5"/>
        <path d="M158,250 L230,205 L177,170 L218,138 M242,250 L170,205 L223,170 L182,138" fill="none" stroke="#94a3b8" stroke-width="1.2"/>

        <!-- Elevated Telemetry Control Cabin (with blue glass monitor grid) -->
        <rect x="162" y="110" width="76" height="28" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
        <rect x="174" y="114" width="52" height="16" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
        <rect x="177" y="116" width="46" height="5" fill="#38bdf8"/>
        <rect x="177" y="123" width="46" height="5" fill="#0ea5e9"/>
        <!-- Side Parabolic Dish on Cabin Balcony -->
        <ellipse cx="244" cy="108" rx="6" ry="13" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>
        <line x1="244" y1="108" x2="253" y2="108" stroke="#64748b" stroke-width="1.5"/>
        ${relayCount >= 2 ? `<ellipse cx="156" cy="108" rx="6" ry="13" fill="#f8fafc" stroke="#64748b" stroke-width="1.2"/>` : ''}

        <!-- Upper Steel Lattice Mast -->
        <rect x="188" y="54" width="24" height="56" fill="none" stroke="#e2e8f0" stroke-width="1.8"/>
        <path d="M188,110 L212,92 L188,74 L212,54 M212,110 L188,92 L212,74 L188,54" fill="none" stroke="#cbd5e1" stroke-width="1.3"/>
        <line x1="200" y1="54" x2="200" y2="24" stroke="#f8fafc" stroke-width="2.2"/>
        <circle cx="200" cy="24" r="3" fill="#34d399"/>
      `;
    }

    return `
      <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
        <!-- Ground Station Horizon & Pad -->
        <path d="M0,250 L400,250 L400,280 L0,280 Z" fill="#0f1e32"/>
        <line x1="0" y1="250" x2="400" y2="250" stroke="#38bdf8" stroke-width="1.5" opacity="0.5"/>

        <g transform="translate(200, 250) scale(${s.toFixed(2)}) translate(-200, -250)">
          ${auxCount >= 1 ? drawAuxDish(88, 250, 1) : ''}
          ${auxCount >= 2 ? drawAuxDish(312, 250, -1) : ''}
          ${hiRel ? `
            <!-- Redundant Cryo-Receiver Bunker -->
            <rect x="122" y="234" width="28" height="16" rx="2" fill="#1e293b" stroke="#34d399" stroke-width="1"/>
            <circle cx="130" cy="242" r="2.2" fill="#34d399"/><circle cx="142" cy="242" r="2.2" fill="#34d399"/>
          ` : ''}
          ${mainTowerHtml}
        </g>

        <text x="14" y="24" fill="#34d399" font-family="monospace" font-size="10" font-weight="bold">DOWNLINK BANDWIDTH: ${bw} Mbps</text>
        <text x="14" y="38" fill="#7dd3fc" font-family="monospace" font-size="10">ARRAY CONFIG: MAIN TOWER${auxCount > 0 ? ` + ${auxCount} AUX DISH${auxCount > 1 ? 'ES' : ''}` : ''}</text>
        <text x="14" y="52" fill="#cbd5e1" font-family="monospace" font-size="10">GROUND RELIABILITY: ${state.tempResources.reliabilityGround || 90}%</text>
      </svg>
    `;
  }

  function renderDesignVisualViewport() {
    if (!DOM.designVisualStage) return;
    syncVisualDesignFromStats();
    const vd = state.visualDesign;
    const tr = state.tempResources;

    if (activeDesignSegment === 'launch') {
      const vIdx = vd.rocketVariant % 3;
      if (DOM.designVisualSegTitle) {
        DOM.designVisualSegTitle.textContent = `LAUNCH VEHICLE // ${ROCKET_VARIANT_NAMES[vIdx].toUpperCase()}`;
      }
      if (DOM.btnCycleVariant) {
        DOM.btnCycleVariant.textContent = `STYLE ${vIdx + 1} / 3`;
      }
      DOM.designVisualStage.innerHTML = buildRocketSvg(vd);
      if (DOM.designVisualSpecs) {
        DOM.designVisualSpecs.innerHTML = `
          <div class="design-spec-pill"><span class="lbl">MASS / CAP</span><span class="val ${tr.mass > tr.maxMass ? 'text-crimson' : 'text-emerald'}">${tr.mass.toLocaleString()} / ${tr.maxMass.toLocaleString()} kg</span></div>
          <div class="design-spec-pill"><span class="lbl">VELOCITY (ΔV)</span><span class="val ${tr.velocity < tr.reqVelocity ? 'text-crimson' : 'text-amber'}">${tr.velocity.toFixed(1)} / ${tr.reqVelocity.toFixed(1)} km/s</span></div>
          <div class="design-spec-pill"><span class="lbl">RELIABILITY</span><span class="val text-cyan">${tr.reliabilityLaunch}%</span></div>
          <div class="design-spec-pill"><span class="lbl">TOTAL COST</span><span class="val text-cyan">$${tr.totalCost.toLocaleString()}</span></div>
        `;
      }
    } else if (activeDesignSegment === 'space') {
      const vIdx = vd.satelliteVariant % 3;
      if (DOM.designVisualSegTitle) {
        DOM.designVisualSegTitle.textContent = `SPACECRAFT BUS // ${SATELLITE_VARIANT_NAMES[vIdx].toUpperCase()}`;
      }
      if (DOM.btnCycleVariant) {
        DOM.btnCycleVariant.textContent = `STYLE ${vIdx + 1} / 3`;
      }
      DOM.designVisualStage.innerHTML = buildSatelliteSvg(vd);
      if (DOM.designVisualSpecs) {
        DOM.designVisualSpecs.innerHTML = `
          <div class="design-spec-pill"><span class="lbl">POWER BUS</span><span class="val ${tr.power > tr.maxPower ? 'text-crimson' : 'text-amber'}">${tr.power} / ${tr.maxPower} W</span></div>
          <div class="design-spec-pill"><span class="lbl">BUS VOLUME</span><span class="val ${tr.volume > tr.maxVolume ? 'text-crimson' : 'text-emerald'}">${tr.volume.toFixed(1)} / ${tr.maxVolume.toFixed(1)} m³</span></div>
          <div class="design-spec-pill"><span class="lbl">RELIABILITY</span><span class="val text-cyan">${tr.reliabilitySpace}%</span></div>
          <div class="design-spec-pill"><span class="lbl">HEAT SHIELD</span><span class="val ${vd.hasHeatShield ? 'text-emerald' : 'text-muted'}">${vd.hasHeatShield ? 'INSTALLED' : 'NONE'}</span></div>
        `;
      }
    } else {
      const vIdx = vd.towerVariant % 3;
      if (DOM.designVisualSegTitle) {
        DOM.designVisualSegTitle.textContent = `GROUND STATION // ${TOWER_VARIANT_NAMES[vIdx].toUpperCase()}`;
      }
      if (DOM.btnCycleVariant) {
        DOM.btnCycleVariant.textContent = `STYLE ${vIdx + 1} / 3`;
      }
      DOM.designVisualStage.innerHTML = buildTowerSvg(vd);
      if (DOM.designVisualSpecs) {
        DOM.designVisualSpecs.innerHTML = `
          <div class="design-spec-pill"><span class="lbl">BANDWIDTH</span><span class="val ${tr.bandwidth >= 85 ? 'text-emerald' : 'text-amber'}">${tr.bandwidth} Mbps</span></div>
          <div class="design-spec-pill"><span class="lbl">GROUND REL</span><span class="val text-cyan">${tr.reliabilityGround}%</span></div>
          <div class="design-spec-pill"><span class="lbl">TOTAL MASS</span><span class="val ${tr.mass > tr.maxMass ? 'text-crimson' : 'text-emerald'}">${tr.mass.toLocaleString()} / ${tr.maxMass.toLocaleString()} kg</span></div>
          <div class="design-spec-pill"><span class="lbl">TOTAL COST</span><span class="val text-cyan">$${tr.totalCost.toLocaleString()}</span></div>
        `;
      }
    }
  }

  // ========================================================================
  // 10. STAGE 5: BUILD & VERIFY (DIAGNOSTICS BENEFIT)
  // ========================================================================

  let testsRun = false;

  function renderStage5Verification() {
    const alreadyDiagnosed = state.tempResources.diagnosticsBonus > 0;
    testsRun = alreadyDiagnosed;
    DOM.btnNextStage5.disabled = false; // Player can choose to launch directly or run test
    const sandbox = isInfiniteBudget();
    const diagFee = sandbox ? 0 : DIAGNOSTIC_COST;

    DOM.invCurrentBudget.textContent = sandbox ? '∞ SANDBOX' : `$${state.budget.toLocaleString()}`;
    DOM.invCost.textContent = `-$${state.tempResources.totalCost.toLocaleString()}`;
    DOM.invRemaining.textContent = sandbox ? '∞ SANDBOX' : `$${(state.budget - state.tempResources.totalCost).toLocaleString()}`;

    if (alreadyDiagnosed) {
      DOM.btnRunTests.innerHTML = `${ICONS.check} DIAGNOSTIC SIMULATION COMPLETED (+10% RELIABILITY ACTIVE)`;
      DOM.btnRunTests.disabled = true;
      const tests = [
        { id: 'test-launch', name: 'Launch Segment: Structural Integrity & Clearance', pass: state.tempResources.mass <= state.tempResources.maxMass, fix: 'Go back to Stage 4 and pick a heavier Launch Rocket or reduce Bus Sizing.' },
        { id: 'test-prop', name: 'Propulsion: Velocity & Thrust Chamber Check', pass: state.tempResources.velocity >= state.tempResources.reqVelocity, fix: 'Go back to Stage 4 and upgrade your Rocket or switch to Hydrolox fuel.' },
        { id: 'test-power', name: 'Power Bus: Solar/RTG Equilibrium Verified', pass: state.tempResources.power <= state.tempResources.maxPower, fix: 'Go back to Stage 4 and upgrade your Spacecraft Bus power.' },
        { id: 'test-sensors', name: 'Scientific Sensors: Detectors Calibrated', pass: true, fix: '' },
        { id: 'test-ground', name: 'Ground Link: Handshake Protocol', pass: true, fix: '' }
      ];
      DOM.testList.innerHTML = tests.map(t =>
        `<li id="${t.id}" class="${t.pass ? 'passed' : 'failed'}">${t.pass ? ICONS.check : ICONS.cross} ${t.name}: ${t.pass ? 'PASSED VERIFICATION' : `FAILED — ${t.fix}`}</li>`
      ).join('');
      return;
    }

    DOM.btnRunTests.innerHTML = sandbox
      ? `${ICONS.microscope} RUN FULL DIAGNOSTIC SIMULATION (FREE IN SANDBOX | +10% RELIABILITY)`
      : `${ICONS.microscope} RUN FULL DIAGNOSTIC SIMULATION (-$${DIAGNOSTIC_COST.toLocaleString()} | +10% RELIABILITY)`;
    DOM.btnRunTests.disabled = !sandbox && state.budget < diagFee;

    DOM.testList.innerHTML = `
      <li id="test-launch">${ICONS.hourglass} Launch Segment: Structural loads &amp; fairing volume check...</li>
      <li id="test-prop">${ICONS.hourglass} Propulsion System: Specific impulse &amp; delta-v burn check...</li>
      <li id="test-power">${ICONS.hourglass} Electrical Bus: Sensor load vs. generation check...</li>
      <li id="test-sensors">${ICONS.hourglass} Scientific Instruments: Sensor calibration &amp; optics...</li>
      <li id="test-ground">${ICONS.hourglass} Ground Receiver: Telemetry link &amp; bandwidth check...</li>
    `;
  }

  function runSystemDiagnostics() {
    if (state.tempResources.diagnosticsBonus > 0) {
      return;
    }
    const sandbox = isInfiniteBudget();
    if (!sandbox && state.budget < DIAGNOSTIC_COST) {
      playAlarm();
      showInPageNotice(`Insufficient funds for Pre-Flight Diagnostics ($${DIAGNOSTIC_COST.toLocaleString()} required).`, 'INSUFFICIENT FUNDS');
      return;
    }

    if (!sandbox) {
      state.budget -= DIAGNOSTIC_COST;
      recordBudgetSpent(DIAGNOSTIC_COST);
      updatePermanentHud();
      DOM.invCurrentBudget.textContent = `$${state.budget.toLocaleString()}`;
      DOM.invRemaining.textContent = `$${(state.budget - state.tempResources.totalCost).toLocaleString()}`;
    }

    playDiagnosticSpinupSound();
    DOM.btnRunTests.disabled = true;
    DOM.btnRunTests.innerHTML = `${ICONS.satellite} RUNNING FULL DIAGNOSTIC SIMULATION...`;

    const tests = [
      { id: 'test-launch', name: 'Launch Segment: Structural Integrity & Clearance', pass: state.tempResources.mass <= state.tempResources.maxMass, fix: 'Go back to Stage 4 and pick a heavier Launch Rocket or reduce Bus Sizing.' },
      { id: 'test-prop', name: 'Propulsion: Velocity & Thrust Chamber Check', pass: state.tempResources.velocity >= state.tempResources.reqVelocity, fix: 'Go back to Stage 4 and upgrade your Rocket or switch to Hydrolox fuel.' },
      { id: 'test-power', name: 'Power Bus: Solar/RTG Equilibrium Verified', pass: state.tempResources.power <= state.tempResources.maxPower, fix: 'Go back to Stage 4 and upgrade your Spacecraft Bus power.' },
      { id: 'test-sensors', name: 'Scientific Sensors: Detectors Calibrated', pass: true, fix: '' },
      { id: 'test-ground', name: 'Ground Link: Handshake Protocol', pass: true, fix: '' }
    ];

    const initialDelayMs = 600;
    const stepIntervalMs = 850;
    const scanLeadMs = 380;

    tests.forEach((t, i) => {
      const scanAt = initialDelayMs + i * stepIntervalMs;
      const resolveAt = scanAt + scanLeadMs;

      setTimeout(() => {
        const el = document.getElementById(t.id);
        if (el) {
          el.innerHTML = `${ICONS.spinner} SCANNING — ${t.name}...`;
        }
        playBeep(1180 + i * 70, 0.05);
      }, scanAt);

      setTimeout(() => {
        const el = document.getElementById(t.id);
        if (el) {
          el.className = t.pass ? 'passed' : 'failed';
          el.innerHTML = `${t.pass ? ICONS.check : ICONS.cross} ${t.name}: ${t.pass ? 'PASSED VERIFICATION' : `FAILED — ${t.fix}`}`;
        }
        playDiagnosticStepSound(i, t.pass);

        if (i === tests.length - 1) {
          setTimeout(() => {
            testsRun = true;
            // Grant +10% Reliability bonus and +5 Reputation!
            state.tempResources.diagnosticsBonus = 10;
            state.reputation = Math.min(100, state.reputation + 5);
            DOM.btnRunTests.innerHTML = `${ICONS.check} DIAGNOSTICS VERIFIED (+10% RELIABILITY)`;
            updatePermanentHud();
            calculateTempResources();
            playDiagnosticFinaleSound();
            showInPageNotice('SYSTEM DIAGNOSTICS COMPLETED!\nGranted +10% Reliability Bonus across all flight segments and +5 Permanent Reputation for flight readiness rigor.', 'DIAGNOSTICS COMPLETE');
          }, 750);
        }
      }, resolveAt);
    });
  }

  // ========================================================================
  // 11. STAGE 6: IMPLEMENT (FLIGHT OPS & URGENT TIMED ANOMALIES)
  // ========================================================================

  let flightAnimId = null;
  let flightProgress = 0;
  let canvasFlightCtx = null;
  let flightDurationMs = 12000;

  let hasSeenStage6Tutorial = false;

  function setFlightPaused(paused) {
    state.flight.paused = !!paused;
    state.flight.lastTickMs = performance.now();
    if (DOM.btnFlightPause) {
      DOM.btnFlightPause.textContent = state.flight.paused ? 'RESUME TIME' : 'PAUSE TIME';
      DOM.btnFlightPause.classList.toggle('primary', state.flight.paused);
      DOM.btnFlightPause.classList.toggle('secondary', !state.flight.paused);
    }
  }

  function startStage6Flight() {
    // Deduct procurement cost (unless Sandbox)
    if (!isInfiniteBudget()) {
      state.budget -= state.tempResources.totalCost;
      recordBudgetSpent(state.tempResources.totalCost);
      updatePermanentHud();
    }
    checkDataManiacOnBuild();

    state.flight = {
      segment: 'launch',
      progress: 0,
      running: true,
      paused: false,
      elapsedMs: 0,
      lastTickMs: performance.now(),
      flightStartWallMs: performance.now(),
      milestonesDone: {},
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null,
      anomalyUrgentSeconds: 15,
      anomalyUrgentTimer: null,
      anomaliesEncountered: 0,
      anomaliesResolvedThisFlight: 0,
      flightOutcome: 'IN_FLIGHT',
      failReason: ''
    };

    setFlightPaused(false);
    DOM.anomalyAlertBox.style.display = 'none';
    DOM.btnCompleteFlight.style.display = 'none';
    DOM.flightTerminal.innerHTML = '';

    // Flight duration scales with mission distance!
    flightDurationMs = state.selectedDomain.transitDurationSec * 1000;

    logFlightMessage(`IGNITION [${state.missionName}]: Spacecraft launching on ${state.selectedDomain.name} trajectory.`);
    logFlightMessage(`Mission transit profile: ${state.selectedDomain.transitDurationSec}s (${getDifficultyConfig().name}).`);

    const canvas = DOM.flightCanvas;
    canvasFlightCtx = canvas.getContext('2d');

    flightProgress = 0;
    if (flightAnimId) cancelAnimationFrame(flightAnimId);

    const beginFlight = () => {
      state.flight.lastTickMs = performance.now();
      runFlightLoop();
    };

    if (!hasSeenStage6Tutorial && !(typeof tutorialState !== 'undefined' && tutorialState.active)) {
      hasSeenStage6Tutorial = true;
      showInPageNotice(
        'FLIGHT BRIEFING:\n' +
        '1. Watch the 3 health bars (Rocket, Sensors, Telemetry) below the flight view.\n' +
        '2. If an Anomaly Alert appears on the right, click INTERVENE before the 15s timer runs out.\n' +
        '3. When flight finishes, review the Post-Flight Mission Report (Save, Share, or Compare your design) before entering the Data Refinery.',
        'STAGE 6 // FLIGHT BRIEFING',
        beginFlight,
        'LAUNCH MISSION'
      );
    } else {
      hasSeenStage6Tutorial = true;
      beginFlight();
    }
  }

  function logFlightMessage(msg, isAlert = false, iconKey = null) {
    const el = document.createElement('div');
    el.className = 'event-message';
    const ts = document.createElement('span');
    ts.className = 'timestamp';
    ts.textContent = `[T+${Math.round(flightProgress * state.selectedDomain.transitDurationSec)}s ${isAlert ? 'ALERT' : 'INFO'}]`;
    el.appendChild(ts);
    if (iconKey && ICONS[iconKey]) {
      const iconWrap = document.createElement('span');
      iconWrap.innerHTML = ` ${ICONS[iconKey]}`;
      el.appendChild(iconWrap);
    }
    el.appendChild(document.createTextNode(` ${msg}`));
    DOM.flightTerminal.appendChild(el);
    DOM.flightTerminal.scrollTop = DOM.flightTerminal.scrollHeight;
  }

  function checkFlightMilestones(elapsedMs) {
    if (!state.flight.running) return;
    const diff = getDifficultyConfig();
    const done = state.flight.milestonesDone;
    const tLaunch = flightDurationMs * 0.25;
    const tExtra = flightDurationMs * 0.42;
    const tSpace = flightDurationMs * 0.55;
    const tGround = flightDurationMs * 0.80;
    const tEnd = flightDurationMs * 1.05;

    if (!done.launch && elapsedMs >= tLaunch) {
      done.launch = true;
      state.flight.segment = 'space';
      DOM.flightSegmentName.textContent = 'SPACE SEGMENT';
      DOM.flightPhaseName.textContent = 'STAGE SEPARATION & FAIRING JETTISON';
      logFlightMessage('Main stage separation confirmed. Spacecraft bus deployed solar panels.', false, 'satellite');
      triggerTimedAnomaly('launch');
    }

    if (!done.extra && diff.extraAnomalyChance > 0 && elapsedMs >= tExtra) {
      done.extra = true;
      if (!state.flight.anomalyActive && Math.random() < diff.extraAnomalyChance) {
        logFlightMessage('Deep-space solar flare interference detected!', true, 'alert');
        triggerTimedAnomaly('space');
      }
    }

    if (!done.space && elapsedMs >= tSpace) {
      done.space = true;
      DOM.flightPhaseName.textContent = 'SCIENCE INSTRUMENT CALIBRATION';
      logFlightMessage('Space Segment: Instruments online. Gathering multi-spectral telemetry.', false, 'microscope');
      state.flight.dataAccumulatedMB += 550;
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;
      triggerTimedAnomaly('space');
    }

    if (!done.ground && elapsedMs >= tGround) {
      done.ground = true;
      state.flight.segment = 'ground';
      DOM.flightSegmentName.textContent = 'GROUND SEGMENT';
      DOM.flightPhaseName.textContent = 'DOWNLINKING TELEMETRY';

      const bw = state.tempResources.bandwidth;
      if (bw < 30) {
        logFlightMessage('Low Bandwidth warning: Telemetry buffer bottlenecked at ground receiver.', true, 'alert');
        state.flight.dataAccumulatedMB = Math.round(state.flight.dataAccumulatedMB * 0.7);
      } else {
        state.flight.dataAccumulatedMB += 850;
      }
      DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;

      triggerTimedAnomaly('ground');
    }

    if (!done.end && elapsedMs >= tEnd) {
      done.end = true;
      if (state.selectedDomain.requiresHeatShield && !state.selections.heatShieldInstalled) {
        playAlarm();
        logFlightMessage('RE-ENTRY CATASTROPHE: No heat shield installed! Re-entry temperatures reached 1600°C and incinerated all biological samples.', true, 'alert');
        state.flight.dataAccumulatedMB = 0;
        state.flight.flightOutcome = 'FAILED';
        state.flight.failReason = 'Atmospheric Re-entry Burnup (No Heat Shield Installed)';
        showInPageNotice('MISSION FAILURE: Atmospheric Re-entry burned up your biological samples because no Heat Shield was installed!', 'MISSION FAILURE');
      } else if (state.selectedDomain.requiresHeatShield && state.selections.heatShieldInstalled) {
        logFlightMessage('RE-ENTRY SUCCESS: PICA-X heat shield protected the biological sample return capsule during splashdown!', false, 'shield');
      }

      state.flight.segment = 'done';
      if (state.flight.dataAccumulatedMB > 0 && state.flight.launchIntegrity > 0) {
        state.flight.flightOutcome = 'SUCCEEDED';
      } else {
        state.flight.flightOutcome = 'FAILED';
        if (!state.flight.failReason) {
          state.flight.failReason = 'Zero Telemetry Downlinked (Segment Failure)';
        }
      }
      DOM.flightPhaseName.textContent = 'MISSION FLIGHT OPERATIONS COMPLETE';
      logFlightMessage('MISSION COMPLETED: Downlinked telemetry verified. Review Mission Report before Data Refinery.', false, 'trophy');
      DOM.btnCompleteFlight.style.display = 'block';
      if (state.flight.dataAccumulatedMB > 0) {
        state.advStats.missionsCompleted = (state.advStats.missionsCompleted || 0) + 1;
        if (state.selectedDomain && state.currentTrend && state.currentTrend.domain === state.selectedDomain.id) {
          state.advStats.trendingMissions = (state.advStats.trendingMissions || 0) + 1;
        }
        saveAdvancementsState();
        evaluateAdvancements();
      }
      if (typeof tutorialOnFlightComplete === 'function') tutorialOnFlightComplete();
      if (!(typeof tutorialState !== 'undefined' && tutorialState.active) && typeof openMissionReportModal === 'function') {
        openMissionReportModal();
      }
    }
  }

  function triggerTimedAnomaly(seg) {
    if (state.flight.anomalyActive) return;

    const diff = getDifficultyConfig();
    const isTutorialLaunchAnomaly = (typeof tutorialState !== 'undefined' && tutorialState.active && seg === 'launch');
    const isSabotaged = (state.gameMode === 'sabotage') && (state.saboteurRole === seg);
    if (!isTutorialLaunchAnomaly && !isSabotaged && Math.random() > diff.anomalyChance) {
      logFlightMessage(`${seg.toUpperCase()} segment nominal — no anomaly triggered.`, false, 'check');
      return;
    }

    let anomaly = null;
    if (seg === 'launch') {
      anomaly = {
        title: isSabotaged ? 'VALVE PRESSURE SURGE (SABOTAGE DETECTED!)' : 'MECHANICAL VALVE PRESSURE SURGE',
        seg: 'launch',
        desc: 'Rocket propellant chamber pressure oscillating rapidly. Launch station must stabilize regulator valve immediately!',
        minigameType: 'pressure'
      };
    } else if (seg === 'space') {
      anomaly = {
        title: isSabotaged ? 'SENSOR SENSITIVITY SPIKE (SABOTAGE DETECTED!)' : 'SENSOR OPTICAL DETUNE',
        seg: 'space',
        desc: 'Spacecraft star-tracker drift causing sensor optical detune. Space station must tune the frequency slider immediately!',
        minigameType: 'frequency'
      };
    } else if (seg === 'ground') {
      anomaly = {
        title: isSabotaged ? 'BUFFER OVERFLOW (SABOTAGE DETECTED!)' : 'GROUND STATION AZIMUTH DRIFT',
        seg: 'ground',
        desc: 'Tracking dish slewing off-axis. Packet loss detected! Ground station must lock tracking angle immediately!',
        minigameType: 'dish'
      };
    }

    state.flight.anomalyActive = true;
    state.flight.anomaliesEncountered = (state.flight.anomaliesEncountered || 0) + 1;
    state.flight.activeAnomalyData = anomaly;
    state.flight.anomalyUrgentSeconds = 15;

    DOM.anomalySegmentBadge.innerHTML = `${ICONS.alert} ${anomaly.title}`;
    DOM.anomalySummary.textContent = anomaly.desc;
    DOM.anomalyCountdownText.textContent = `URGENT: ${state.flight.anomalyUrgentSeconds}s`;
    DOM.anomalyTimerBar.style.width = '100%';
    DOM.anomalyAlertBox.style.display = 'block';
    playAlarm();
    if (typeof tutorialOnAnomalyTriggered === 'function') tutorialOnAnomalyTriggered();

    // Start 15-second unaddressed anomaly countdown timer!
    if (state.flight.anomalyUrgentTimer) clearInterval(state.flight.anomalyUrgentTimer);
    state.flight.anomalyUrgentTimer = setInterval(() => {
      if (state.flight.paused) return;
      state.flight.anomalyUrgentSeconds -= 1;
      const pct = (state.flight.anomalyUrgentSeconds / 15) * 100;
      DOM.anomalyTimerBar.style.width = `${Math.max(0, pct)}%`;
      DOM.anomalyCountdownText.textContent = `URGENT: ${state.flight.anomalyUrgentSeconds}s`;

      // Passive financial drain while delayed (scaled by difficulty, 0 in Sandbox)
      if (state.flight.anomalyUrgentSeconds % 3 === 0 && diff.anomalyDrain > 0 && !isInfiniteBudget()) {
        state.budget = Math.max(0, state.budget - diff.anomalyDrain);
        updatePermanentHud();
        logFlightMessage(`Telemetry anomaly leaking fuel & funds: -$${diff.anomalyDrain.toLocaleString()} lost to drift.`, true, 'alert');
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
      state.flight.flightOutcome = 'FAILED';
      state.flight.failReason = 'Unaddressed Launch Valve Rupture (-$300,000 salvage penalty)';
      const penalty = 300000;
      state.budget = Math.max(0, state.budget - penalty);
      updatePermanentHud();
      showInPageNotice(
        `UNADDRESSED LAUNCH FAILURE!\nPropellant valve rupture resulted in catastrophic vehicle explosion. You lost -$${penalty.toLocaleString()} in salvage fees and the mission immediately failed.`,
        'LAUNCH FAILURE',
        () => {
          if (typeof openMissionReportModal === 'function') openMissionReportModal();
          else goToStage(7);
        }
      );
    } else if (anomaly.seg === 'space') {
      state.flight.spaceIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      state.flight.flightOutcome = 'FAILED';
      state.flight.failReason = 'Unaddressed Space Sensor Burnout (0 MB collected)';
      showInPageNotice(`UNADDRESSED SPACE FAILURE!\nSensors suffered electrical burnout. Zero data collected.`, 'SPACE SEGMENT FAILURE');
    } else if (anomaly.seg === 'ground') {
      state.flight.groundIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      state.flight.flightOutcome = 'FAILED';
      state.flight.failReason = 'Unaddressed Ground Tracking Drift (All downlink packets lost)';
      showInPageNotice(`UNADDRESSED GROUND FAILURE!\nTracking dish drifted completely out of line of sight. All data lost.`, 'GROUND SEGMENT FAILURE');
    }
  }

  function drawCanvasTower(ctx, tx, ty, vd, scale = 0.42) {
    const v = (vd.towerVariant || 0) % 3;
    const s = scale * (vd.towerScale || 1.0);
    ctx.save();
    ctx.translate(tx, ty);
    ctx.scale(s, s);

    // Base pad
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-18, -5, 36, 5);

    if (v === 0) {
      // Variant 0: Deep-Space Parabolic Dish Pedestal
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-6, -34, 12, 29);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-4, -30, 8, 5);
      ctx.save();
      ctx.translate(0, -38);
      ctx.rotate(0.28);
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI, false);
      ctx.fillStyle = '#e2e8f0';
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -18);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    } else if (v === 1) {
      // Variant 1: Red-and-White Lattice Relay Tower
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-4, -52, 8, 47);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-12, -5);
      ctx.lineTo(-6, -52);
      ctx.moveTo(12, -5);
      ctx.lineTo(6, -52);
      ctx.stroke();
      // Observation cupola
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-13, -58, 26, 6);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-11, -56, 22, 3);
      // Spire
      ctx.beginPath();
      ctx.moveTo(0, -58);
      ctx.lineTo(0, -76);
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -76, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    } else {
      // Variant 2: Trussed Mast with Elevated Control Cabin
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-6, -48, 3, 43);
      ctx.fillRect(3, -48, 3, 43);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-14, -5);
      ctx.lineTo(-7, -48);
      ctx.moveTo(14, -5);
      ctx.lineTo(7, -48);
      ctx.stroke();
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(-15, -58, 30, 10);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-10, -56, 20, 6);
      ctx.beginPath();
      ctx.moveTo(0, -58);
      ctx.lineTo(0, -76);
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCanvasRocket(ctx, x, y, angleRad, vd, thrustActive = true, onlyBooster = false) {
    const v = (vd.rocketVariant || 0) % 3;
    const s = 0.42 * (vd.rocketScale || 1.0);
    const fuelVis = getFuelVisualColors(vd.fuelId);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angleRad + Math.PI / 2); // Rocket drawn nose-up (-Y), aligned with travel angle
    ctx.scale(s, s);

    const coreW = 20;
    const coreH = 68;

    // Side boosters
    const drawMiniBooster = (bx) => {
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(bx - 5.5, -18, 11, 48);
      ctx.beginPath();
      ctx.moveTo(bx - 5.5, -18);
      ctx.quadraticCurveTo(bx, -32, bx + 5.5, -18);
      ctx.fill();
      // Swept black landing skirt
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bx - 6, 18, 12, 12);
      if (thrustActive) {
        const flicker = 0.85 + Math.random() * 0.35;
        ctx.beginPath();
        ctx.ellipse(bx, 38, 4, 10 * flicker, 0, 0, Math.PI * 2);
        ctx.fillStyle = fuelVis.outerPlume;
        ctx.fill();
      }
    };

    if (vd.boosterCount >= 2) {
      drawMiniBooster(-17);
      drawMiniBooster(17);
    }
    if (vd.boosterCount >= 4) {
      drawMiniBooster(-29);
      drawMiniBooster(29);
    }

    // Core cylinder color based on variant
    if (v === 1) ctx.fillStyle = '#ea580c';
    else if (v === 2) ctx.fillStyle = '#94a3b8';
    else ctx.fillStyle = '#f1f5f9';

    ctx.fillRect(-coreW / 2, -28, coreW, coreH - 12);

    // Fuel stripe & flag decal
    ctx.fillStyle = fuelVis.stripe;
    ctx.fillRect(-coreW / 2, -18, coreW, 3);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-4, -10, 8, 5);
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(-4, -10, 4, 3);

    // Swept black landing-leg skirt at base
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-coreW / 2, 14);
    ctx.lineTo(coreW / 2, 14);
    ctx.lineTo(coreW / 2 + 2, 28);
    ctx.lineTo(-coreW / 2 - 2, 28);
    ctx.closePath();
    ctx.fill();

    if (!onlyBooster) {
      // Bulbous Payload Fairing at top
      const fScale = vd.fairingScale || 1.0;
      const fW = 22 * Math.min(1.18, fScale);
      const fH = 30 * fScale;
      ctx.fillStyle = v === 2 ? '#cbd5e1' : '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(-fW / 2, -28);
      ctx.lineTo(-fW / 2, -28 - fH * 0.5);
      ctx.quadraticCurveTo(0, -28 - fH * 1.15, fW / 2, -28 - fH * 0.5);
      ctx.lineTo(fW / 2, -28);
      ctx.closePath();
      ctx.fill();
    }

    // Main Exhaust Plume
    if (thrustActive) {
      const flicker = 0.85 + Math.random() * 0.35;
      ctx.beginPath();
      ctx.ellipse(0, 42, 6.5, 16 * flicker, 0, 0, Math.PI * 2);
      ctx.fillStyle = fuelVis.outerPlume;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 37, 3.5, 9 * flicker, 0, 0, Math.PI * 2);
      ctx.fillStyle = fuelVis.innerPlume;
      ctx.fill();
    }

    ctx.restore();
  }

  function drawCanvasSatellite(ctx, x, y, angleRad, vd, deployPct = 1.0, reEntryHeat = 0) {
    const v = (vd.satelliteVariant || 0) % 3;
    const s = 0.52 * (vd.satScale || 1.0);
    const panels = vd.solarPanelsPerWing || 2;
    const bays = vd.busBays || 2;
    const unfold = Math.max(0.08, Math.min(1.0, deployPct));

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angleRad);
    ctx.scale(s, s);

    const wingSpan = (22 + panels * 12) * unfold;
    const wingW = 16;

    // Solar Array Wings (unfolding with deployPct)
    ctx.fillStyle = v === 1 ? '#27272a' : (v === 2 ? '#0f766e' : '#1d4ed8');
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.2;

    // Top & Bottom Solar Wings (perpendicular to velocity vector)
    ctx.fillRect(-wingW / 2, -14 - wingSpan, wingW, wingSpan);
    ctx.strokeRect(-wingW / 2, -14 - wingSpan, wingW, wingSpan);
    ctx.fillRect(-wingW / 2, 14, wingW, wingSpan);
    ctx.strokeRect(-wingW / 2, 14, wingW, wingSpan);

    // Solar panel cell grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 0.8;
    for (let i = 1; i <= panels; i++) {
      const py = 14 + (i / (panels + 0.5)) * wingSpan;
      ctx.beginPath();
      ctx.moveTo(-wingW / 2, -py);
      ctx.lineTo(wingW / 2, -py);
      ctx.moveTo(-wingW / 2, py);
      ctx.lineTo(wingW / 2, py);
      ctx.stroke();
    }

    // Spacecraft Bus Body
    const busLen = 28 + bays * 8;
    if (v === 1) {
      // Variant 1: Orbital Lab + Spherical Docking Node
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(-busLen / 2, -12, busLen, 24);
      ctx.beginPath();
      ctx.arc(busLen / 2 + 8, 0, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(busLen / 2 + 8, 0, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0ea5e9';
      ctx.fill();
    } else {
      // Variant 0 (Silver Parabolic Bus) or Variant 2 (Gold-MLI Bus)
      ctx.fillStyle = v === 2 ? '#f59e0b' : '#e2e8f0';
      ctx.fillRect(-busLen / 2, -11, busLen, 22);
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(-busLen / 2, -11, busLen, 22);
      // Aft Parabolic High-Gain Dish
      ctx.beginPath();
      ctx.ellipse(-busLen / 2 - 6, 0, 4, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.stroke();
    }

    // Instrument Sensor Turrets
    const instCount = Math.min(5, Math.max(1, vd.instrumentCount || 1));
    for (let i = 0; i < instCount; i++) {
      const ix = -busLen / 3 + (i / Math.max(1, instCount - 1)) * (busLen * 0.65);
      ctx.beginPath();
      ctx.arc(ix, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#c084fc';
      ctx.fill();
    }

    // Forebody Heat Shield (when installed)
    if (vd.hasHeatShield) {
      ctx.beginPath();
      ctx.arc(busLen / 2 + (v === 1 ? 16 : 4), 0, 14, -Math.PI * 0.42, Math.PI * 0.42);
      ctx.strokeStyle = reEntryHeat > 0 ? '#fb923c' : '#334155';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Atmospheric Re-entry Plasma Shockwave (for Life Sciences return!)
    if (reEntryHeat > 0) {
      const noseX = busLen / 2 + (v === 1 ? 20 : 8);
      ctx.beginPath();
      ctx.arc(noseX, 0, 22, -Math.PI * 0.48, Math.PI * 0.48);
      ctx.strokeStyle = vd.hasHeatShield
        ? `rgba(251, 146, 60, ${0.85 * reEntryHeat})`
        : `rgba(239, 68, 68, ${0.95 * reEntryHeat})`;
      ctx.lineWidth = 7;
      ctx.stroke();
    }

    ctx.restore();
  }

  function runFlightLoop() {
    if (state.stage !== 6) return;

    const ctx = canvasFlightCtx;
    const w = DOM.flightCanvas.width;
    const h = DOM.flightCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const now = performance.now();
    const dt = Math.min(100, Math.max(0, now - (state.flight.lastTickMs || now)));
    state.flight.lastTickMs = now;

    if (state.flight.running && !state.flight.paused) {
      state.flight.elapsedMs += dt;
      if (flightProgress < 1.0) {
        flightProgress = Math.min(1.0, state.flight.elapsedMs / flightDurationMs);
      }
      checkFlightMilestones(state.flight.elapsedMs);
    }

    const t = Math.min(1.0, flightProgress);
    const domId = state.selectedDomain ? state.selectedDomain.id : 'earth';
    const vd = state.visualDesign;

    // 1. Deep-Space Background & Twinkling Starfield
    const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 20, w * 0.5, h * 0.5, w * 0.7);
    bgGrad.addColorStop(0, '#091526');
    bgGrad.addColorStop(1, '#030712');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 42; i++) {
      const sx = ((i * 197) % (w - 20)) + 10;
      const sy = ((i * 131) % (h - 20)) + 10;
      const alpha = 0.25 + 0.35 * Math.sin(now * 0.002 + i);
      ctx.fillStyle = `rgba(226, 232, 240, ${alpha.toFixed(2)})`;
      ctx.fillRect(sx, sy, i % 4 === 0 ? 2 : 1.3, i % 4 === 0 ? 2 : 1.3);
    }

    // Helper to draw Earth with continents, atmosphere, and Communications Tower
    const drawEarthAndTower = (ex, ey, er, towerAngleDeg = -35) => {
      // Atmosphere halo
      const halo = ctx.createRadialGradient(ex, ey, er * 0.85, ex, ey, er * 1.28);
      halo.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
      halo.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(ex, ey, er * 1.28, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Ocean sphere
      const ocean = ctx.createRadialGradient(ex - er * 0.3, ey - er * 0.3, er * 0.1, ex, ey, er);
      ocean.addColorStop(0, '#38bdf8');
      ocean.addColorStop(0.55, '#0284c7');
      ocean.addColorStop(1, '#0f172a');
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();

      // Stylized landmasses
      ctx.save();
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = 'rgba(52, 211, 153, 0.55)';
      ctx.beginPath();
      ctx.ellipse(ex - er * 0.25, ey - er * 0.18, er * 0.38, er * 0.22, -0.3, 0, Math.PI * 2);
      ctx.ellipse(ex + er * 0.28, ey + er * 0.22, er * 0.32, er * 0.25, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Communications Tower on Earth's surface
      const rad = (towerAngleDeg * Math.PI) / 180;
      const tx = ex + Math.cos(rad) * er;
      const ty = ey + Math.sin(rad) * er;
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(rad + Math.PI / 2);
      drawCanvasTower(ctx, 0, 0, vd, Math.max(0.32, er / 145));
      ctx.restore();

      return { tx, ty };
    };

    // Quad Bezier helper & tangent
    const evalQuad = (p0, p1, p2, u) => {
      const mu = 1 - u;
      const x = mu * mu * p0.x + 2 * mu * u * p1.x + u * u * p2.x;
      const y = mu * mu * p0.y + 2 * mu * u * p1.y + u * u * p2.y;
      const dx = 2 * mu * (p1.x - p0.x) + 2 * u * (p2.x - p1.x);
      const dy = 2 * mu * (p1.y - p0.y) + 2 * u * (p2.y - p1.y);
      return { x, y, angle: Math.atan2(dy, dx) };
    };

    let craftPos = { x: 100, y: 200, angle: 0 };
    let sepOrigin = { x: 200, y: 150, angle: 0 };
    let towerPos = { tx: 100, ty: 260 };
    let reEntryHeat = 0;
    let showParachute = false;

    if (domId === 'earth') {
      // EARTH SCIENCE: Launch from Earth -> Deploy -> Continuous Low Earth Orbit around Earth
      const ex = 420, ey = 215, er = 72;
      const rx = 185, ry = 122;
      towerPos = drawEarthAndTower(ex, ey, er, -125);

      // Draw LEO Orbital Ellipse
      ctx.beginPath();
      ctx.ellipse(ex, ey, rx, ry, -0.12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.38)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.stroke();

      // Ascent curve from Earth surface to orbit insertion point (angle = -Math.PI * 0.75)
      const insAngle = -Math.PI * 0.72;
      const insX = ex + Math.cos(insAngle) * rx * Math.cos(-0.12) - Math.sin(insAngle) * ry * Math.sin(-0.12);
      const insY = ey + Math.cos(insAngle) * rx * Math.sin(-0.12) + Math.sin(insAngle) * ry * Math.cos(-0.12);
      const p0 = { x: ex - er * 0.65, y: ey - er * 0.72 };
      const p1 = { x: ex - rx * 0.78, y: ey - ry * 0.98 };
      const p2 = { x: insX, y: insY };

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      ctx.stroke();
      ctx.setLineDash([]);

      sepOrigin = evalQuad(p0, p1, p2, 1.0);

      if (t < 0.25) {
        craftPos = evalQuad(p0, p1, p2, t / 0.25);
      } else {
        const orbitU = (t - 0.25) / 0.75;
        const theta = insAngle + orbitU * Math.PI * 2.6;
        const rot = -0.12;
        const lx = Math.cos(theta) * rx;
        const ly = Math.sin(theta) * ry;
        const dlx = -Math.sin(theta) * rx;
        const dly = Math.cos(theta) * ry;
        craftPos = {
          x: ex + lx * Math.cos(rot) - ly * Math.sin(rot),
          y: ey + lx * Math.sin(rot) + ly * Math.cos(rot),
          angle: Math.atan2(dlx * Math.sin(rot) + dly * Math.cos(rot), dlx * Math.cos(rot) - dly * Math.sin(rot))
        };

        // Sensor Nadir Scan Cone toward Earth
        if (t >= 0.35) {
          ctx.beginPath();
          ctx.moveTo(craftPos.x, craftPos.y);
          ctx.lineTo(ex - 18, ey - 12);
          ctx.lineTo(ex + 18, ey + 12);
          ctx.closePath();
          ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
          ctx.fill();
        }
      }
    } else if (domId === 'life') {
      // LIFE SCIENCES: Launch from Earth -> Orbit / ISS Rendezvous -> Return to Earth with Re-entry & Splashdown!
      const ex = 195, ey = 250, er = 78;
      towerPos = drawEarthAndTower(ex, ey, er, -52);

      // Orbital Lab (ISS reference node) at (545, 115)
      const issX = 545, issY = 115;
      ctx.save();
      ctx.translate(issX, issY);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.65)';
      ctx.fillStyle = '#334155';
      ctx.fillRect(-26, -3, 52, 6);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(-22, -18, 8, 36);
      ctx.fillRect(14, -18, 8, 36);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('ISS LAB', -20, -24);
      ctx.restore();

      const pLaunch0 = { x: ex + er * 0.45, y: ey - er * 0.88 };
      const pLaunch1 = { x: 265, y: 65 };
      const pLaunch2 = { x: 420, y: 105 };

      const pOrbit1 = { x: 545, y: 65 };
      const pOrbit2 = { x: 585, y: 155 };

      const pReturn1 = { x: 440, y: 315 };
      const pReturn2 = { x: ex + er * 0.88, y: ey + er * 0.32 };

      // Outbound & Orbital Arc (Cyan)
      ctx.beginPath();
      ctx.moveTo(pLaunch0.x, pLaunch0.y);
      ctx.quadraticCurveTo(pLaunch1.x, pLaunch1.y, pLaunch2.x, pLaunch2.y);
      ctx.quadraticCurveTo(pOrbit1.x, pOrbit1.y, pOrbit2.x, pOrbit2.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.stroke();

      // Atmospheric Return Trajectory Arc back to Earth (Amber/Emerald)
      ctx.beginPath();
      ctx.moveTo(pOrbit2.x, pOrbit2.y);
      ctx.quadraticCurveTo(pReturn1.x, pReturn1.y, pReturn2.x, pReturn2.y);
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.55)';
      ctx.stroke();
      ctx.setLineDash([]);

      sepOrigin = evalQuad(pLaunch0, pLaunch1, pLaunch2, 1.0);

      if (t < 0.25) {
        craftPos = evalQuad(pLaunch0, pLaunch1, pLaunch2, t / 0.25);
      } else if (t < 0.70) {
        const u = (t - 0.25) / 0.45;
        craftPos = evalQuad(pLaunch2, pOrbit1, pOrbit2, u);
      } else {
        const u = (t - 0.70) / 0.30;
        craftPos = evalQuad(pOrbit2, pReturn1, pReturn2, u);
        if (u > 0.35 && u < 0.88) {
          reEntryHeat = Math.sin(((u - 0.35) / 0.53) * Math.PI);
        }
        if (u >= 0.85) {
          showParachute = true;
        }
      }
    } else if (domId === 'planetary') {
      // PLANETARY SCIENCE: Launch from Earth -> Interplanetary Transfer -> Orbit Distant Ringed Planet
      const ex = 95, ey = 315, er = 46;
      towerPos = drawEarthAndTower(ex, ey, er, -45);

      // Distant Ringed Planet at (645, 145)
      const px = 645, py = 145, pr = 36;
      const orbRx = 82, orbRy = 46;

      // Planetary Capture Orbit Ellipse
      ctx.beginPath();
      ctx.ellipse(px, py, orbRx, orbRy, -0.2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.38)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      // Ringed Planet Body & Rings
      const pGrad = ctx.createRadialGradient(px - 10, py - 10, 4, px, py, pr);
      pGrad.addColorStop(0, '#fdba74');
      pGrad.addColorStop(0.6, '#ea580c');
      pGrad.addColorStop(1, '#7c2d12');
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fillStyle = pGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(px, py, pr * 1.85, pr * 0.52, -0.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(253, 230, 138, 0.75)';
      ctx.lineWidth = 4;
      ctx.setLineDash([]);
      ctx.stroke();

      const p0 = { x: ex + er * 0.7, y: ey - er * 0.7 };
      const p1 = { x: 185, y: 165 };
      const pSep = { x: 265, y: 145 };
      const pTrans1 = { x: 420, y: 95 };
      const insAngle = Math.PI;
      const pCapture = {
        x: px + Math.cos(insAngle) * orbRx * Math.cos(-0.2),
        y: py + Math.cos(insAngle) * orbRx * Math.sin(-0.2)
      };

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, pSep.x, pSep.y);
      ctx.quadraticCurveTo(pTrans1.x, pTrans1.y, pCapture.x, pCapture.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      sepOrigin = evalQuad(p0, p1, pSep, 1.0);

      if (t < 0.25) {
        craftPos = evalQuad(p0, p1, pSep, t / 0.25);
      } else if (t < 0.65) {
        craftPos = evalQuad(pSep, pTrans1, pCapture, (t - 0.25) / 0.40);
      } else {
        const u = (t - 0.65) / 0.35;
        const theta = Math.PI + u * Math.PI * 2.1;
        const rot = -0.2;
        const lx = Math.cos(theta) * orbRx;
        const ly = Math.sin(theta) * orbRy;
        const dlx = -Math.sin(theta) * orbRx;
        const dly = Math.cos(theta) * orbRy;
        craftPos = {
          x: px + lx * Math.cos(rot) - ly * Math.sin(rot),
          y: py + lx * Math.sin(rot) + ly * Math.cos(rot),
          angle: Math.atan2(dlx * Math.sin(rot) + dly * Math.cos(rot), dlx * Math.cos(rot) - dly * Math.sin(rot))
        };
      }
    } else if (domId === 'helio') {
      // HELIOPHYSICS: Launch from Earth -> Sun-Earth L1 Halo Orbit facing the Blazing Sun
      const ex = 100, ey = 310, er = 44;
      towerPos = drawEarthAndTower(ex, ey, er, -45);

      // Blazing Sun on Right (745, 195)
      const sx = 745, sy = 195, sr = 62;
      const corona = ctx.createRadialGradient(sx, sy, sr * 0.6, sx, sy, sr * 2.1);
      corona.addColorStop(0, 'rgba(251, 191, 36, 0.55)');
      corona.addColorStop(0.5, 'rgba(249, 115, 22, 0.18)');
      corona.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.beginPath();
      ctx.arc(sx, sy, sr * 2.1, 0, Math.PI * 2);
      ctx.fillStyle = corona;
      ctx.fill();

      const sunGrad = ctx.createRadialGradient(sx - 12, sy - 12, 8, sx, sy, sr);
      sunGrad.addColorStop(0, '#fef08a');
      sunGrad.addColorStop(0.6, '#f59e0b');
      sunGrad.addColorStop(1, '#ea580c');
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Solar Wind Waves travelling outward from Sun
      for (let wIdx = 0; wIdx < 3; wIdx++) {
        const waveR = sr + 18 + (((now * 0.04) + wIdx * 45) % 135);
        ctx.beginPath();
        ctx.arc(sx, sy, waveR, Math.PI * 0.68, Math.PI * 1.32);
        ctx.strokeStyle = `rgba(251, 191, 36, ${(1 - (waveR - sr) / 155) * 0.45})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // L1 Halo Orbit at (490, 195)
      const l1x = 490, l1y = 195, l1rx = 52, l1ry = 86;
      ctx.beginPath();
      ctx.ellipse(l1x, l1y, l1rx, l1ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.42)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      const p0 = { x: ex + er * 0.7, y: ey - er * 0.7 };
      const p1 = { x: 195, y: 175 };
      const pSep = { x: 275, y: 165 };
      const pTrans1 = { x: 365, y: 155 };
      const pL1Entry = { x: l1x - l1rx, y: l1y };

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, pSep.x, pSep.y);
      ctx.quadraticCurveTo(pTrans1.x, pTrans1.y, pL1Entry.x, pL1Entry.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();
      ctx.setLineDash([]);

      sepOrigin = evalQuad(p0, p1, pSep, 1.0);

      if (t < 0.25) {
        craftPos = evalQuad(p0, p1, pSep, t / 0.25);
      } else if (t < 0.58) {
        craftPos = evalQuad(pSep, pTrans1, pL1Entry, (t - 0.25) / 0.33);
      } else {
        const u = (t - 0.58) / 0.42;
        const theta = Math.PI + u * Math.PI * 2.2;
        craftPos = {
          x: l1x + Math.cos(theta) * l1rx,
          y: l1y + Math.sin(theta) * l1ry,
          angle: Math.atan2(Math.cos(theta) * l1ry, -Math.sin(theta) * l1rx)
        };
      }
    } else {
      // ASTROPHYSICS: Launch from Earth -> L2 Deep-Space Observatory Halo Orbit -> Deep-Field Galaxy Scan
      const ex = 100, ey = 310, er = 44;
      towerPos = drawEarthAndTower(ex, ey, er, -45);

      // Distant Spiral Galaxy & Nebula on Right (685, 125)
      const gx = 685, gy = 125;
      const nebGrad = ctx.createRadialGradient(gx, gy, 4, gx, gy, 58);
      nebGrad.addColorStop(0, 'rgba(243, 232, 255, 0.95)');
      nebGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.45)');
      nebGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.18)');
      nebGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.arc(gx, gy, 58, 0, Math.PI * 2);
      ctx.fillStyle = nebGrad;
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(gx, gy, 36, 14, -0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(233, 213, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // L2 Halo Orbit at (445, 195)
      const l2x = 445, l2y = 195, l2rx = 50, l2ry = 82;
      ctx.beginPath();
      ctx.ellipse(l2x, l2y, l2rx, l2ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.42)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      const p0 = { x: ex + er * 0.7, y: ey - er * 0.7 };
      const p1 = { x: 190, y: 175 };
      const pSep = { x: 265, y: 165 };
      const pTrans1 = { x: 340, y: 160 };
      const pL2Entry = { x: l2x - l2rx, y: l2y };

      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.quadraticCurveTo(p1.x, p1.y, pSep.x, pSep.y);
      ctx.quadraticCurveTo(pTrans1.x, pTrans1.y, pL2Entry.x, pL2Entry.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.stroke();
      ctx.setLineDash([]);

      sepOrigin = evalQuad(p0, p1, pSep, 1.0);

      if (t < 0.25) {
        craftPos = evalQuad(p0, p1, pSep, t / 0.25);
      } else if (t < 0.55) {
        craftPos = evalQuad(pSep, pTrans1, pL2Entry, (t - 0.25) / 0.30);
      } else {
        const u = (t - 0.55) / 0.45;
        const theta = Math.PI + u * Math.PI * 2.1;
        craftPos = {
          x: l2x + Math.cos(theta) * l2rx,
          y: l2y + Math.sin(theta) * l2ry,
          angle: Math.atan2(gy - (l2y + Math.sin(theta) * l2ry), gx - (l2x + Math.cos(theta) * l2rx))
        };

        // Deep-Field Telescope Observation Cone toward Galaxy
        ctx.beginPath();
        ctx.moveTo(craftPos.x, craftPos.y);
        ctx.lineTo(gx - 22, gy - 26);
        ctx.lineTo(gx + 18, gy + 26);
        ctx.closePath();
        ctx.fillStyle = 'rgba(192, 132, 252, 0.14)';
        ctx.fill();
      }
    }

    // 2. Stage Separation & Fairing Split Animation (0.25 <= t <= 0.42)
    if (t >= 0.25 && t <= 0.44) {
      const sepU = (t - 0.25) / 0.19; // 0 -> 1
      const alpha = Math.max(0, 1 - sepU);
      ctx.save();
      ctx.globalAlpha = alpha;

      // Drifting First-Stage Booster falling back
      const bx = sepOrigin.x - Math.cos(sepOrigin.angle) * (18 + sepU * 55);
      const by = sepOrigin.y - Math.sin(sepOrigin.angle) * (18 + sepU * 35) + sepU * 42;
      drawCanvasRocket(ctx, bx, by, sepOrigin.angle + sepU * 0.65, vd, false, true);

      // Left & Right Payload Fairing Halves splitting apart
      const perpX = -Math.sin(sepOrigin.angle);
      const perpY = Math.cos(sepOrigin.angle);
      [-1, 1].forEach(side => {
        const fx = sepOrigin.x + Math.cos(sepOrigin.angle) * (12 + sepU * 24) + perpX * side * (8 + sepU * 28);
        const fy = sepOrigin.y + Math.sin(sepOrigin.angle) * (12 + sepU * 24) + perpY * side * (8 + sepU * 28);
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(sepOrigin.angle + side * sepU * 0.85);
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.ellipse(0, 0, 9, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Expanding separation ring
      ctx.beginPath();
      ctx.arc(sepOrigin.x, sepOrigin.y, 10 + sepU * 32, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(125, 211, 252, ${alpha.toFixed(2)})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      ctx.restore();
    }

    // 3. Downlink Telemetry Ripples to Ground Communications Tower (t >= 0.78)
    if (t >= 0.78) {
      const dx = towerPos.tx - craftPos.x;
      const dy = towerPos.ty - craftPos.y;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(craftPos.x, craftPos.y);
      ctx.lineTo(towerPos.tx, towerPos.ty);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.55)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let rIdx = 0; rIdx < 3; rIdx++) {
        const prog = (((now * 0.0014) + rIdx * 0.33) % 1);
        const rx = craftPos.x + dx * prog;
        const ry = craftPos.y + dy * prog;
        ctx.beginPath();
        ctx.arc(rx, ry, 5 + prog * 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - prog) * 0.85})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Draw Active Spacecraft (Rocket during Launch t < 0.25, Deploying/Deployed Satellite for t >= 0.25)
    if (t < 0.25) {
      drawCanvasRocket(ctx, craftPos.x, craftPos.y, craftPos.angle, vd, true, false);
    } else {
      const deployPct = Math.min(1.0, (t - 0.25) / 0.12);
      if (showParachute && vd.hasHeatShield) {
        // Recovery Parachutes during Life Sciences splashdown!
        ctx.save();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(craftPos.x, craftPos.y);
        ctx.lineTo(craftPos.x - 16, craftPos.y - 24);
        ctx.moveTo(craftPos.x, craftPos.y);
        ctx.lineTo(craftPos.x + 16, craftPos.y - 24);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(craftPos.x, craftPos.y - 24, 18, Math.PI, 0, false);
        ctx.fillStyle = '#f97316';
        ctx.fill();
        ctx.restore();
      }
      drawCanvasSatellite(ctx, craftPos.x, craftPos.y, craftPos.angle, vd, deployPct, reEntryHeat);
    }

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
      logFlightMessage(`ANOMALY RESOLVED: ${anomaly.seg.toUpperCase()} station stabilized the issue!`, false, 'check');
      DOM.anomalyAlertBox.style.display = 'none';
      state.flight.anomalyActive = false;
      state.flight.anomaliesResolvedThisFlight = (state.flight.anomaliesResolvedThisFlight || 0) + 1;
      state.advStats.anomaliesResolved = (state.advStats.anomaliesResolved || 0) + 1;
      saveAdvancementsState();
      evaluateAdvancements();
      if (state.flight.paused) setFlightPaused(false);
      if (typeof tutorialOnAnomalyResolved === 'function') tutorialOnAnomalyResolved();
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
      DOM.invDecayHint.innerHTML = state.difficulty === 'hard'
        ? `${ICONS.alert} HARD MODE: Unsold non-L4 datasets decay 15%/cycle (L4 &amp; Splicer components ignore decay)`
        : '';
    }

    renderInventoryList();
    updatePermanentHud();
  }

  function renderInventoryList() {
    updateL4ForgeButtonVisibility();
    DOM.dataInventoryList.innerHTML = '';
    DOM.dataInventoryList.classList.toggle('list-view', state.inventoryViewMode === 'list');
    if (DOM.btnInvGrid) DOM.btnInvGrid.classList.toggle('active', state.inventoryViewMode === 'grid');
    if (DOM.btnInvList) DOM.btnInvList.classList.toggle('active', state.inventoryViewMode === 'list');

    if (state.dataInventory.length === 0) {
      DOM.dataInventoryList.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); font-size: 0.8rem;">No datasets currently in inventory. Complete a flight to gather L0/L1B telemetry.</p>`;
      DOM.processingControls.style.display = 'none';
      DOM.processingRecipe.innerHTML = `<p>Select a data package from your inventory above to view available refinement recipes.</p>`;
      return;
    }

    state.dataInventory.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `data-card ${state.selectedInventoryIdx === idx ? 'selected' : ''}`;

      // Check dynamic trend boost
      const isTrending = state.currentTrend && state.currentTrend.domain === item.domain;
      const trendBadge = isTrending ? `<span class="trend-badge">${ICONS.flame} TRENDING (+${Math.round((state.currentTrend.boost - 1) * 100)}%)</span>` : '';

      const decayMultiplier = getItemDecayMultiplier(item);
      const decayBadge = (state.difficulty === 'hard' && item.level !== 'L4' && (item.cyclesOld || 0) > 0)
        ? `<span class="decay-badge">-${item.cyclesOld * 15}% DECAY</span>`
        : '';

      const trendMultiplier = isTrending ? state.currentTrend.boost : 1.0;
      const currentMarketVal = Math.round(item.estValue * decayMultiplier * trendMultiplier);

      card.innerHTML = `
        ${decayBadge}
        <span class="data-level-badge">${item.level}</span>
        <strong style="color: var(--text-main); font-size: 0.85rem;">${item.name}</strong>
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
        <p style="font-size: 0.78rem; color: var(--color-gold); margin-top: 0.35rem;">${ICONS.dna} Use the <strong>L4 ANCIENT SYNTHESIS FORGE</strong> button above to combine this L3A dataset with any number of loose L2+ datasets! More data stuffed in = exponentially higher L4 value.</p>
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
      warningHtml = `<p style="color: var(--color-crimson); font-size: 0.72rem; margin-top: 0.3rem;">${ICONS.alert} UNPROFITABLE SINGLE REFINEMENT: Lab cost ($${curLevelInfo.refineCost.toLocaleString()}) exceeds single-value gain ($${valueGain.toLocaleString()})! Profitable when combined into L3/L4.</p>`;
    }

    let recipeSpecial = '';
    if (combineCfg) {
      recipeSpecial = `<p style="font-size: 0.72rem; color: var(--color-cyan);">${ICONS.link} ${combineCfg.label}</p>`;
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
    if (isMpMode() && state.userRole !== 'user') {
      playAlarm();
      showInPageNotice(`ROLE PERMISSION: Only the USER PLAYER can refine and sell datasets! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'USER STATION ONLY');
      return;
    }
    if (state.selectedInventoryIdx === null) return;
    const item = state.dataInventory[state.selectedInventoryIdx];
    if (!item) return;

    const combineCfg = getCombineConfig(item.level);
    if (combineCfg && combineCfg.required) {
      playAlarm();
      showInPageNotice(`${item.level} → ${combineCfg.target} requires combining 2 datasets!`);
      return;
    }

    const curLevelInfo = DATA_LEVELS[item.level];
    const sandbox = isInfiniteBudget();
    if (!curLevelInfo.next || (!sandbox && state.budget < curLevelInfo.refineCost)) {
      playAlarm();
      return;
    }

    playBeep(1100);
    if (!sandbox) {
      state.budget -= curLevelInfo.refineCost;
      recordBudgetSpent(curLevelInfo.refineCost);
    }
    const nextKey = curLevelInfo.next;
    item.level = nextKey;
    item.estValue = DATA_LEVELS[nextKey].baseVal;
    state.advStats.datasetsRefined = (state.advStats.datasetsRefined || 0) + 1;
    saveAdvancementsState();
    evaluateAdvancements();

    updatePermanentHud();
    renderInventoryList();
    renderRefineryWorkbench(item);
    if (isMpMode()) {
      pushMpSharedState({ budget: state.budget, dataInventory: state.dataInventory });
    }
  }

  function combineSelectedData() {
    if (isMpMode() && state.userRole !== 'user') {
      playAlarm();
      showInPageNotice(`ROLE PERMISSION: Only the USER PLAYER can refine and combine datasets! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'USER STATION ONLY');
      return;
    }
    if (state.selectedInventoryIdx === null) return;
    const primaryIdx = state.selectedInventoryIdx;
    const item = state.dataInventory[primaryIdx];
    if (!item) return;

    const combineCfg = getCombineConfig(item.level);
    if (!combineCfg) return;

    const partnerIdx = parseInt(DOM.combinePartnerSelect.value, 10);
    if (isNaN(partnerIdx) || partnerIdx === primaryIdx || !state.dataInventory[partnerIdx]) {
      playAlarm();
      showInPageNotice(`Select a valid second ${combineCfg.minPartnerLevel}+ dataset to combine!`);
      return;
    }

    const partner = state.dataInventory[partnerIdx];
    if (!isLevelAtLeast(partner.level, combineCfg.minPartnerLevel)) {
      playAlarm();
      showInPageNotice(`Partner dataset must be at least ${combineCfg.minPartnerLevel}.`);
      return;
    }

    const sandbox = isInfiniteBudget();
    if (!sandbox && state.budget < combineCfg.cost) {
      playAlarm();
      showInPageNotice(`Insufficient funds! Combining requires $${combineCfg.cost.toLocaleString()}.`);
      return;
    }

    playBeep(1250);
    if (!sandbox) {
      state.budget -= combineCfg.cost;
      recordBudgetSpent(combineCfg.cost);
    }

    item.level = combineCfg.target;
    item.estValue = DATA_LEVELS[combineCfg.target].baseVal;
    if (!item.name.includes(partner.name)) {
      item.name = `${item.name} + ${partner.name}`;
    }
    state.advStats.datasetsRefined = (state.advStats.datasetsRefined || 0) + 1;
    saveAdvancementsState();
    evaluateAdvancements();

    // Consume the 2nd dataset (2 datasets -> 1 combined dataset)
    state.dataInventory.splice(partnerIdx, 1);
    state.selectedInventoryIdx = partnerIdx < primaryIdx ? primaryIdx - 1 : primaryIdx;

    updatePermanentHud();
    renderInventoryList();
    if (state.dataInventory[state.selectedInventoryIdx]) {
      renderRefineryWorkbench(state.dataInventory[state.selectedInventoryIdx]);
    }
    if (isMpMode()) {
      pushMpSharedState({ budget: state.budget, dataInventory: state.dataInventory });
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
            <strong style="color: var(--text-main); font-size: 0.8rem;">${it.name}</strong>
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

    // Render RIGHT: Available L2+ Datasets
    DOM.l4OfferingsList.innerHTML = '';
    const available = state.dataInventory
      .map((it, idx) => ({ it, idx }))
      .filter(({ it, idx }) => isLevelAtLeast(it.level, 'L2') && it.level !== 'L4' && !state.l4ChamberIndices.includes(idx));

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
            <strong style="color: var(--text-main); font-size: 0.8rem;">${it.name}</strong>
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
      DOM.l4ReqStatus.innerHTML = `${ICONS.check} Ready to Splice L4 Master Dataset`;
      DOM.l4ReqStatus.className = 'text-emerald';
    } else {
      DOM.l4ReqStatus.textContent = !proj.hasL3A ? 'Need at least 1× L3A dataset' : 'Need at least 2 total L2+ datasets';
      DOM.l4ReqStatus.className = 'text-crimson';
    }
    DOM.l4SynergyMult.textContent = `${proj.mult.toFixed(2)}x (${proj.items.length} datasets)`;
    DOM.l4ProjectedVal.textContent = `$${proj.projectedVal.toLocaleString()}`;
    DOM.l4ForgeFee.textContent = proj.fee === 0 ? '$0 (SANDBOX)' : `$${proj.fee.toLocaleString()}`;
    DOM.btnForgeL4.disabled = !proj.valid || (!isInfiniteBudget() && state.budget < proj.fee);
  }

  function forgeL4Dataset() {
    if (isMpMode() && state.userRole !== 'user') {
      playAlarm();
      showInPageNotice(`ROLE PERMISSION: Only the USER PLAYER can splice L4 Master Datasets! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'USER STATION ONLY');
      return;
    }
    const proj = getL4ForgeProjected(state.l4ChamberIndices);
    if (!proj.valid) {
      playAlarm();
      return;
    }
    if (!isInfiniteBudget() && state.budget < proj.fee) {
      playAlarm();
      showInPageNotice(`Insufficient funds for L4 Synthesis ($${proj.fee.toLocaleString()} required).`);
      return;
    }

    playBeep(1320);
    if (!isInfiniteBudget()) {
      state.budget -= proj.fee;
      recordBudgetSpent(proj.fee);
    }
    state.advStats.l4Spliced = true;
    saveAdvancementsState();
    evaluateAdvancements();

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
    if (isMpMode()) {
      pushMpSharedState({ budget: state.budget, dataInventory: state.dataInventory });
    }
    showInPageNotice(`L4 MASTER DATASET FORGED!\nSynthesized ${proj.items.length} datasets into 1 L4 Master Dataset worth $${proj.projectedVal.toLocaleString()} (immune to cycle degradation)!`, 'L4 SPLICING COMPLETE');
  }

  function sellDataToBuyer(buyerType) {
    if (isMpMode() && state.userRole !== 'user') {
      playAlarm();
      showInPageNotice(`ROLE PERMISSION: Only the USER PLAYER can sell refined datasets on the market! (Your locked station: ${ROLE_DUTY_CONFIG[state.userRole].title})`, 'USER STATION ONLY');
      return;
    }
    if (state.gameMode !== 'singleplayer' && !state.groundApproved) {
      playAlarm();
      showInPageNotice('GROUND APPROVAL REQUIRED: Ground Player must grant approval before selling datasets!', 'GROUND CONTROL HOLD');
      return;
    }
    if (state.selectedInventoryIdx === null) {
      playAlarm();
      showInPageNotice('Select a dataset from your inventory to sell!');
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
      if (payout > 0) {
        state.advStats.totalEarned = (state.advStats.totalEarned || 0) + payout;
        saveAdvancementsState();
        evaluateAdvancements();
      }
    }
    state.reputation = Math.max(0, Math.min(100, state.reputation + repDelta));

    playBeep(payout > 0 ? 1200 : 800);
    const flagshipNote = state.reputation >= 100 ? '\n100-Reputation Flagship Partner Bonus Active (+25% Payout & +$150k/Cycle)!' : '';
    showInPageNotice(`Data sold to ${buyerType.toUpperCase()}!\nCash Earned: $${payout.toLocaleString()}\nReputation Change: ${repDelta >= 0 ? '+' : ''}${repDelta}${flagshipNote}`, 'DATA SALE COMPLETE');

    state.dataInventory.splice(state.selectedInventoryIdx, 1);
    state.selectedInventoryIdx = null;

    updatePermanentHud();
    renderInventoryList();
    if (isMpMode()) {
      pushMpSharedState({ budget: state.budget, reputation: state.reputation, dataInventory: state.dataInventory });
    }
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
    const isList = state.vaultViewMode === 'list';
    DOM.vaultListContainer.classList.toggle('list-view', isList);
    if (DOM.btnVaultGrid) DOM.btnVaultGrid.classList.toggle('active', !isList);
    if (DOM.btnVaultList) DOM.btnVaultList.classList.toggle('active', isList);

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
        <div class="vault-card-meta">
          <span class="data-level-badge">${item.level}</span>
          <div style="display: flex; flex-direction: column; gap: 0.15rem;">
            <strong style="color: var(--text-main); font-size: 0.85rem;">${item.name}</strong>
            <span style="font-size: 0.72rem; color: var(--text-muted);">${item.category} (${item.domainName})</span>
          </div>
          ${decayBadge}
        </div>
        <span class="vault-card-val" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--color-emerald); margin-top: 0.4rem;">
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

    let cycleMessages = [`Mission Cycle ${state.missionCycle} Started!`];

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
        cycleMessages.push(`HARD MODE: ${decayedCount} non-L4 dataset(s) decayed by 15% (L4 datasets immune).`);
      }
    }

    // 100 Reputation Government Grant Bonus
    if (state.reputation >= 100 && !isInfiniteBudget()) {
      const grantBonus = 150000;
      state.budget += grantBonus;
      cycleMessages.push(`100-Reputation NASA Flagship Grant: +$${grantBonus.toLocaleString()} awarded!`);
    }

    // Debt interest: 5% interest on unpaid debt
    if (state.activeDebt > 0) {
      const interest = Math.round(state.activeDebt * 0.05);
      state.activeDebt += interest;
      cycleMessages.push(`Unpaid debt accrued 5% interest (+$${interest.toLocaleString()}). Total debt: $${state.activeDebt.toLocaleString()}.`);
    }

    showInPageNotice(cycleMessages.join('\n'));

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
    state.currentMissionSpent = 0;
    randomizeDesignVariants();

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
      showInPageNotice('SABOTEUR IMPOSTOR MODE ENGAGED!\nOne station is an undercover saboteur introducing hidden malfunctions. Your crew must solve urgent minigames to prevent bankruptcy!', 'SABOTEUR MODE');
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

    const closeCreditsModal = () => {
      if (!DOM.creditsModal) return;
      DOM.creditsModal.classList.remove('active');
      DOM.creditsModal.style.display = 'none';
    };
    if (DOM.menuBtnCredits && DOM.creditsModal) {
      DOM.menuBtnCredits.addEventListener('click', () => {
        playBeep(650);
        DOM.creditsModal.classList.add('active');
        DOM.creditsModal.style.display = 'flex';
      });
    }
    if (DOM.creditsModalClose) DOM.creditsModalClose.addEventListener('click', closeCreditsModal);
    if (DOM.creditsModalDone) DOM.creditsModalDone.addEventListener('click', closeCreditsModal);

    const closeStatsModal = () => {
      if (!DOM.statsModal) return;
      DOM.statsModal.classList.remove('active');
      DOM.statsModal.style.display = 'none';
    };
    if (DOM.menuBtnStats && DOM.statsModal) {
      DOM.menuBtnStats.addEventListener('click', () => {
        playBeep(650);
        renderStatsModal();
        DOM.statsModal.classList.add('active');
        DOM.statsModal.style.display = 'flex';
      });
    }
    if (DOM.statsModalClose) DOM.statsModalClose.addEventListener('click', closeStatsModal);
    if (DOM.statsModalDone) DOM.statsModalDone.addEventListener('click', closeStatsModal);

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

    // Vault Button & View Mode
    DOM.btnOpenVault.addEventListener('click', openDataVault);
    if (DOM.btnVaultGrid) {
      DOM.btnVaultGrid.addEventListener('click', () => {
        playBeep(650);
        state.vaultViewMode = 'grid';
        renderVaultList();
      });
    }
    if (DOM.btnVaultList) {
      DOM.btnVaultList.addEventListener('click', () => {
        playBeep(650);
        state.vaultViewMode = 'list';
        renderVaultList();
      });
    }
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

    if (DOM.btnRedoTutorial) {
      DOM.btnRedoTutorial.addEventListener('click', () => {
        playBeep(820);
        DOM.settingsModal.classList.remove('active');
        DOM.settingsModal.style.display = 'none';
        startGuidedTutorialFlow();
      });
    }

    if (DOM.btnResetGameData) {
      DOM.btnResetGameData.addEventListener('click', () => {
        playBeep(620);
        showInPageNotice(
          'Reset all mission progress, budget, reputation, stored datasets, and preferences back to a fresh start?',
          'CONFIRM RESET GAME DATA',
          () => {
            resetAllGameData();
            DOM.settingsModal.classList.remove('active');
            DOM.settingsModal.style.display = 'none';
            showInPageNotice('All game data has been reset to defaults.', 'DATA RESET COMPLETE');
          },
          'RESET EVERYTHING',
          () => {},
          'CANCEL'
        );
      });
    }

    // Startup Tutorial Prompt Modal
    if (DOM.initBtnTutorialYes) {
      DOM.initBtnTutorialYes.addEventListener('click', () => {
        playBeep(900);
        if (DOM.initTutorialModal) DOM.initTutorialModal.classList.remove('active');
        startGuidedTutorialFlow();
      });
    }
    if (DOM.initBtnTutorialNo) {
      DOM.initBtnTutorialNo.addEventListener('click', () => {
        playBeep(700);
        if (DOM.initTutorialModal) DOM.initTutorialModal.classList.remove('active');
        if (DOM.initModeModal) DOM.initModeModal.classList.add('active');
      });
    }

    // LM Studio Test Connection
    if (DOM.btnTestLmSettings) {
      DOM.btnTestLmSettings.addEventListener('click', async () => {
        playBeep(750);
        DOM.settingsLmStatus.textContent = 'Testing connection to LM Studio...';
        DOM.settingsLmStatus.className = 'text-amber';
        const rawUrl = (document.getElementById('input-lm-url')?.value || 'http://localhost:1234/v1').trim();
        let parsedUrl;
        try {
          parsedUrl = new URL(rawUrl);
        } catch {
          DOM.settingsLmStatus.innerHTML = `${ICONS.alert} Invalid LM Studio URL format.`;
          DOM.settingsLmStatus.className = 'text-amber';
          return;
        }
        const allowedHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
        if (!['http:', 'https:'].includes(parsedUrl.protocol) || !allowedHosts.has(parsedUrl.hostname)) {
          DOM.settingsLmStatus.innerHTML = `${ICONS.alert} Only local http(s)://localhost or 127.0.0.1 endpoints are permitted.`;
          DOM.settingsLmStatus.className = 'text-amber';
          return;
        }
        const lmUrl = parsedUrl.toString().replace(/\/+$/, '');
        try {
          const resp = await fetch(`${lmUrl}/models`, { method: 'GET', signal: AbortSignal.timeout(3000) });
          if (resp.ok) {
            const data = await resp.json();
            const modelCount = data.data ? data.data.length : 1;
            DOM.settingsLmStatus.innerHTML = `${ICONS.check} Connected! Found ${modelCount} active model(s).`;
            DOM.settingsLmStatus.className = 'text-emerald';
            playBeep(1200);
          } else {
            DOM.settingsLmStatus.innerHTML = `${ICONS.alert} Connected, but models endpoint returned ${resp.status}. Built-in fallback ready.`;
            DOM.settingsLmStatus.className = 'text-amber';
          }
        } catch (err) {
          DOM.settingsLmStatus.innerHTML = 'LM Studio offline or CORS blocked. Built-in procedural AI fallback will handle all events.';
          DOM.settingsLmStatus.className = 'text-muted';
        }
      });
    }

    DOM.sliderVolume.addEventListener('input', (e) => {
      masterVolume = parseInt(e.target.value) / 100;
      DOM.volumeVal.textContent = `${e.target.value}%`;
      updateBgMusicVolume();
      playBeep(880);
    });

    const selectTextSize = document.getElementById('select-text-size');
    const applyTextSize = (size) => {
      const val = ['small', 'normal', 'large'].includes(size) ? size : 'normal';
      document.documentElement.classList.remove('text-size-small', 'text-size-normal', 'text-size-large');
      document.documentElement.classList.add(`text-size-${val}`);
      if (selectTextSize) selectTextSize.value = val;
      try { localStorage.setItem('tm_text_size', val); } catch (err) {}
    };
    try {
      applyTextSize(localStorage.getItem('tm_text_size') || 'normal');
    } catch (err) {
      applyTextSize('normal');
    }
    if (selectTextSize) {
      selectTextSize.addEventListener('change', (e) => {
        applyTextSize(e.target.value);
        playBeep(760);
      });
    }

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
          DOM.tickerLockBadge.innerHTML = state.trendLocked ? `${ICONS.lock} LOCKED` : `${ICONS.unlock} LIVE`;
        }
      });
    }

    // Mission Name Customization & Randomizer
    if (DOM.inputMissionName) {
      DOM.inputMissionName.addEventListener('input', (e) => {
        state.missionName = e.target.value.trim() || 'ARTEMIS-1';
      });
    }
    if (DOM.btnRandomMissionName && DOM.inputMissionName) {
      const RANDOM_MISSION_NAMES = [
        'ARTEMIS-1', 'VOYAGER-3', 'KEPLER-X', 'CASSINI-II', 'DAWN-7',
        'NEW HORIZONS', 'OSIRIS-APEX', 'EUROPA CLIPPER', 'WEBB-PRIME',
        'TESS-NOVA', 'PIONEER-12', 'GALILEO-NEXT', 'JUNO-POLAR',
        'MAGELLAN-IV', 'DRAGONFLY-1', 'VIKING-9', 'SENTINEL-6', 'HELIOS-STAR'
      ];
      DOM.btnRandomMissionName.addEventListener('click', () => {
        playBeep(820);
        const cur = DOM.inputMissionName.value.trim();
        const pool = RANDOM_MISSION_NAMES.filter(n => n !== cur);
        const pick = pool[Math.floor(Math.random() * pool.length)] || 'ARTEMIS-1';
        DOM.inputMissionName.value = pick;
        state.missionName = pick;
      });
    }

    // Stage 6 Pause Time Toggle
    if (DOM.btnFlightPause) {
      DOM.btnFlightPause.addEventListener('click', () => {
        if (!state.flight.running) return;
        playBeep(state.flight.paused ? 860 : 540);
        setFlightPaused(!state.flight.paused);
        logFlightMessage(state.flight.paused ? 'Simulation time PAUSED by Flight Director.' : 'Simulation time RESUMED.', false);
      });
    }

    // Stage Transitions
    DOM.btnNextStage1.addEventListener('click', async () => {
      if (isMpMode()) {
        if (!state.conceptVoteWinner && state.selectedDomain) {
          await castMpConceptVote(state.selectedDomain, true);
        }
        if (!state.selectedDomain) {
          playAlarm();
          showInPageNotice('Cast a vote for a Mission Concept first!', 'TEAM CONCEPT VOTE');
          return;
        }
      }
      goToStage(2);
    });
    DOM.btnBackStage2.addEventListener('click', () => goToStage(1));
    DOM.btnNextStage2.addEventListener('click', () => {
      if (isMpMode() && state.userRole !== 'space') {
        const spaceIsBot = state.mpLobby && Array.isArray(state.mpLobby.players) && state.mpLobby.players.some(p => p.role === 'space' && p.is_bot);
        if (!spaceIsBot) {
          playAlarm();
          showInPageNotice('ROLE PERMISSION: Only the SPACE PLAYER can confirm the scientific instruments and advance to Stage 3!', 'SPACE STATION ONLY');
          return;
        }
      }
      goToStage(3);
    });
    DOM.btnBackStage3.addEventListener('click', () => goToStage(2));
    DOM.btnNextStage3.addEventListener('click', () => goToStage(4));
    DOM.btnBackStage4.addEventListener('click', () => goToStage(3));
    DOM.btnNextStage4.addEventListener('click', () => goToStage(5));
    DOM.btnBackStage5.addEventListener('click', () => goToStage(4));
    DOM.btnNextStage5.addEventListener('click', () => {
      if (state.gameMode !== 'singleplayer' && !state.groundApproved) {
        playAlarm();
        showInPageNotice('GROUND APPROVAL REQUIRED: Ground Player must approve the launch before proceeding to Launch & Flight!', 'LAUNCH HOLD');
        return;
      }
      goToStage(6);
    });

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

    if (DOM.btnPrevSegment) {
      DOM.btnPrevSegment.addEventListener('click', () => {
        playBeep(600);
        if (activeDesignSegment === 'ground') activeDesignSegment = 'space';
        else if (activeDesignSegment === 'space') activeDesignSegment = 'launch';
        renderStage4Design();
      });
    }
    if (DOM.btnNextSegment) {
      DOM.btnNextSegment.addEventListener('click', () => {
        playBeep(700);
        if (activeDesignSegment === 'launch') activeDesignSegment = 'space';
        else if (activeDesignSegment === 'space') activeDesignSegment = 'ground';
        renderStage4Design();
      });
    }

    // Stage 4 HUD View Mode Toggle (Image View vs Stats View) & Variant Cycler
    if (DOM.btnDesignViewImage) {
      DOM.btnDesignViewImage.addEventListener('click', () => {
        playBeep(720);
        setDesignViewMode('image');
      });
    }
    if (DOM.btnDesignViewStats) {
      DOM.btnDesignViewStats.addEventListener('click', () => {
        playBeep(720);
        setDesignViewMode('stats');
      });
    }
    if (DOM.btnCycleVariant) {
      DOM.btnCycleVariant.addEventListener('click', () => {
        playBeep(780);
        if (activeDesignSegment === 'launch') {
          state.visualDesign.rocketVariant = (state.visualDesign.rocketVariant + 1) % 3;
        } else if (activeDesignSegment === 'space') {
          state.visualDesign.satelliteVariant = (state.visualDesign.satelliteVariant + 1) % 3;
        } else {
          state.visualDesign.towerVariant = (state.visualDesign.towerVariant + 1) % 3;
        }
        renderDesignVisualViewport();
      });
    }

    // Heat Shield Checkbox
    DOM.chkHeatShield.addEventListener('change', (e) => {
      if (isMpMode() && state.userRole !== 'space') {
        e.target.checked = state.selections.heatShieldInstalled;
        playAlarm();
        showInPageNotice('ROLE PERMISSION: Only the SPACE PLAYER can install or remove the Spacecraft Re-entry Heat Shield!', 'SPACE STATION ONLY');
        return;
      }
      playBeep(700);
      state.selections.heatShieldInstalled = e.target.checked;
      if (isMpMode()) state.designApprovals.space = false;
      renderStage4Design();
      calculateTempResources();
      if (isMpMode()) {
        pushMpSharedState({ selections: state.selections, designApprovals: state.designApprovals });
      }
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

    // Shared Bank / Loan Helpers
    function claimEmergencyGrant() {
      playBeep(880);
      if (!isInfiniteBudget()) {
        state.budget += 150000;
        state.reputation = Math.max(0, state.reputation - 8);
        updatePermanentHud();
        showInPageNotice('NASA Emergency Grant approved: +$150,000 added to budget. (-8 Reputation)');
      } else {
        showInPageNotice('Sandbox Mode already has ∞ Budget & ∞ Reputation.');
      }
    }

    function borrowBankLoan() {
      playBeep(880);
      state.budget += 250000;
      state.activeDebt += 275000;
      updatePermanentHud();
      showInPageNotice('Commercial Bank Loan approved: +$250,000 received. $275,000 debt added.');
    }

    function repayOutstandingDebt() {
      if (state.activeDebt <= 0) {
        showInPageNotice('You have no active debt.');
        return;
      }
      if (state.budget < state.activeDebt) {
        const pay = state.budget;
        state.budget = 0;
        state.activeDebt -= pay;
        playBeep(900);
        showInPageNotice(`Partial debt payment of $${pay.toLocaleString()} processed. Remaining debt: $${state.activeDebt.toLocaleString()}.`);
      } else {
        state.budget -= state.activeDebt;
        state.activeDebt = 0;
        playBeep(1200);
        state.advStats.debtCleared = true;
        saveAdvancementsState();
        evaluateAdvancements();
        showInPageNotice('Debt fully paid off! Your credit standing is pristine.', 'DEBT CLEARED');
      }
      updatePermanentHud();
    }

    // Loans (Stage 7)
    DOM.btnLoanGrant.addEventListener('click', claimEmergencyGrant);
    DOM.btnLoanBank.addEventListener('click', borrowBankLoan);
    DOM.btnPayDebt.addEventListener('click', repayOutstandingDebt);

    // Bank Modal (Accessible Anytime from HUD)
    const closeBankModal = () => {
      if (!DOM.bankModal) return;
      DOM.bankModal.classList.remove('active');
      DOM.bankModal.style.display = 'none';
    };
    if (DOM.btnOpenBank && DOM.bankModal) {
      DOM.btnOpenBank.addEventListener('click', () => {
        playBeep(700);
        updatePermanentHud();
        DOM.bankModal.classList.add('active');
        DOM.bankModal.style.display = 'flex';
      });
    }
    if (DOM.bankModalClose) DOM.bankModalClose.addEventListener('click', closeBankModal);
    if (DOM.bankModalDone) DOM.bankModalDone.addEventListener('click', closeBankModal);
    if (DOM.btnModalLoanGrant) DOM.btnModalLoanGrant.addEventListener('click', claimEmergencyGrant);
    if (DOM.btnModalLoanBank) DOM.btnModalLoanBank.addEventListener('click', borrowBankLoan);
    if (DOM.btnModalPayDebt) DOM.btnModalPayDebt.addEventListener('click', repayOutstandingDebt);

    // Advancements Modal (Accessible Anytime from HUD)
    const closeAdvancementsModal = () => {
      if (!DOM.advancementsModal) return;
      DOM.advancementsModal.classList.remove('active');
      DOM.advancementsModal.style.display = 'none';
    };
    if (DOM.btnOpenAdvancements && DOM.advancementsModal) {
      DOM.btnOpenAdvancements.addEventListener('click', () => {
        playBeep(700);
        renderAdvancementsModal();
        DOM.advancementsModal.classList.add('active');
        DOM.advancementsModal.style.display = 'flex';
      });
    }
    if (DOM.advancementsModalClose) DOM.advancementsModalClose.addEventListener('click', closeAdvancementsModal);
    if (DOM.advancementsModalDone) DOM.advancementsModalDone.addEventListener('click', closeAdvancementsModal);

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

    // ? Screen Coach Overlay (Available on Main Menu & Every Stage)
    if (DOM.btnOpenHelp) DOM.btnOpenHelp.addEventListener('click', () => { playBeep(760); openScreenCoachOverlay(); });
    if (DOM.menuHelpIcon) DOM.menuHelpIcon.addEventListener('click', () => { playBeep(760); openScreenCoachOverlay(); });
    if (DOM.btnCloseCoach) DOM.btnCloseCoach.addEventListener('click', closeScreenCoachOverlay);
    if (DOM.screenCoachOverlay) {
      DOM.screenCoachOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.screenCoachOverlay || e.target === DOM.coachCalloutsLayer) {
          closeScreenCoachOverlay();
        }
      });
    }

    if (DOM.gameNoticeClose) DOM.gameNoticeClose.addEventListener('click', () => closeInPageNotice(false));
    if (DOM.gameNoticeCancel) DOM.gameNoticeCancel.addEventListener('click', () => closeInPageNotice(false));
    if (DOM.gameNoticeOk) DOM.gameNoticeOk.addEventListener('click', () => closeInPageNotice(true));
    if (DOM.gameNoticeModal) {
      DOM.gameNoticeModal.addEventListener('click', (e) => {
        if (e.target === DOM.gameNoticeModal) closeInPageNotice(false);
      });
    }

    document.addEventListener('click', () => {
      document.querySelectorAll('.inst-hover-wrap.open').forEach(w => w.classList.remove('open'));
    });
  }

  // Element-by-element explanations per screen (used by the ? gray overlay)
  const SCREEN_ELEMENT_GUIDES = [
    { selector: '#menu-btn-singleplayer', text: 'Start a solo game where you control every step.' },
    { selector: '#menu-btn-multiplayer', text: 'Play Co-op (4 stations) or Saboteur Impostor mode.' },
    { selector: '#menu-btn-settings', text: 'Adjust sound volume, text size, or spacecraft design mode.' },
    { selector: '#menu-btn-manual', text: 'Read the engineering rules & data levels.' },
    { selector: '#menu-btn-credits', text: 'View music licensing and acknowledgments.' },
    { selector: '#menu-btn-stats', text: 'View your lifetime mission statistics and records.' },
    { selector: '.resource-box.budget', text: 'Your total money to buy rockets, sensors & lab work.' },
    { selector: '.resource-box.rep', text: 'Reputation unlocks Tier 2 sensors & boosts data prices.' },
    { selector: '#btn-open-vault', text: 'View all science datasets you currently own.' },
    { selector: '#btn-open-settings', text: 'Change sound volume, text size, or spacecraft design mode.' },
    { selector: '#btn-return-menu', text: 'Go back to the Main Menu.' },
    { selector: '#trends-ticker', text: 'Live Market Trend! Click to lock/unlock bonus payouts.' },
    { selector: '#domain-grid', text: 'Pick where your mission goes (Earth, Planets, Sun, Deep Space, Life).' },
    { selector: '#btn-next-stage1', text: 'Continue to choose your science sensors.' },
    { selector: '#data-types-container', text: 'Pick what measurements & NASA sensors to fly.' },
    { selector: '#btn-next-stage2', text: 'Continue to review mission objectives.' },
    { selector: '#stage-3 .req-card:nth-of-type(1) .req-row:nth-of-type(1)', text: 'Primary Discipline: The science area you chose for this mission.' },
    { selector: '#stage-3 .req-card:nth-of-type(1) .req-row:nth-of-type(2)', text: 'Equipped Instruments: The science sensors flying on your spacecraft.' },
    { selector: '#stage-3 .req-card:nth-of-type(1) .req-row:nth-of-type(3)', text: 'Trajectory Velocity (Delta-V): Speed your rocket must reach to arrive.' },
    { selector: '#stage-3 .req-card:nth-of-type(1) .req-row:nth-of-type(4)', text: 'Flight Transit Duration: How long the trip takes before data arrives.' },
    { selector: '#stage-3 .req-card:nth-of-type(1) .req-row:nth-of-type(5)', text: 'Return Shield: Whether a heat shield is needed to survive landing.' },
    { selector: '#stage-3 .req-card:nth-of-type(2) .req-row:nth-of-type(1)', text: 'Estimated Mass: Total weight your rocket needs to lift.' },
    { selector: '#stage-3 .req-card:nth-of-type(2) .req-row:nth-of-type(2)', text: 'Minimum Bus Power: Electricity (Watts) needed to run all sensors.' },
    { selector: '#stage-3 .req-card:nth-of-type(2) .req-row:nth-of-type(3)', text: 'Bus Volume Needed: Space inside the spacecraft body for your gear.' },
    { selector: '#stage-3 .req-card:nth-of-type(2) .req-row:nth-of-type(4)', text: 'Downlink Bandwidth: Antenna speed needed to beam data back to Earth.' },
    { selector: '#btn-next-stage3', text: 'Start building your Rocket, Spacecraft & Ground Dish.' },
    { selector: '.segment-tabs', text: '3 Mission Parts: Launch Rocket, Space Bus, & Ground Dish.' },
    { selector: '#fuel-chemistry-panel', text: 'Fuel Types: Pick RP-1, Methalox, Hydrolox, or Hypergolic. Each trades cost, weight & engine efficiency (Isp).' },
    { selector: '#bus-expansion-panel', text: 'Bus Sizing: Enlarge the spacecraft body to fit more sensors (adds weight & fuel use).' },
    { selector: '#reentry-shield-panel', text: 'Heat Shield: Mandatory protection for return missions surviving 1600 C re-entry.' },
    { selector: '#segment-options-container', text: 'Pick hardware for the active segment.' },
    { selector: '#stage-4 .gauge-card', text: 'Mission Expenditure: Total money spent vs. your remaining budget.' },
    { selector: '#temp-mass-card', text: 'Total Mass: Combined weight of rocket, bus, sensors & fuel vs. lift limit.' },
    { selector: '#temp-power-card', text: 'Power Consumption: Electricity used by sensors vs. bus power generated.' },
    { selector: '#temp-vol-card', text: 'Payload Volume: Physical space used by sensors vs. bus capacity.' },
    { selector: '#temp-vel-card', text: 'Velocity (Delta-V): Speed your rocket + fuel provides vs. mission target.' },
    { selector: '.bandwidth-meter-box', text: 'Downlink Bandwidth: Data transfer speed from space to ground stations.' },
    { selector: '.segment-reliability-row', text: 'Reliability: Chance each segment (Launch, Space, Ground) runs without failure.' },
    { selector: '#btn-prev-segment', text: 'Go back to the previous segment.' },
    { selector: '#btn-next-segment', text: 'Move to the next segment.' },
    { selector: '#btn-next-stage4', text: 'Build complete! Proceed to pre-flight verification.' },
    { selector: '#btn-run-tests', text: 'Optional ground test: +10% flight reliability & +5 Rep.' },
    { selector: '#test-list', text: 'Live checklist of spacecraft safety checks.' },
    { selector: '#btn-next-stage5', text: 'Launch your spacecraft into flight!' },
    { selector: '#flight-canvas', text: 'Live mission trajectory & spacecraft flight view.' },
    { selector: '.flight-gauges-row', text: 'Live health bars for Launch Rocket, Space Sensors, and Ground Telemetry.' },
    { selector: '#flight-terminal', text: 'Live flight log — urgent errors & anomalies will pop up in this area! Click Intervene quickly when one appears.' },
    { selector: '#btn-complete-flight', text: 'Flight complete! Head to the Data Refinery & Market.' },
    { selector: '#data-inventory-list', text: 'Your collected datasets. Click one to refine or sell it.' },
    { selector: '#processing-station', text: 'Refine L0->L3A data or combine datasets to raise value.' },
    { selector: '#btn-open-l4-forge', text: 'Level 4 Splicer: splice L2+ datasets into an L4 Master Dataset.' },
    { selector: '.buyers-grid', text: 'Data Market Exchange: Sell your processed dataset to a buyer for cash or Reputation.' },
    { selector: '#buyer-institute', text: 'Scientific Institute: Standard cash payout + boosts Reputation (+8 Rep).' },
    { selector: '#buyer-opensource', text: 'Open Source: $0 cash payout, but gives the biggest Reputation boost (+20 Rep).' },
    { selector: '#buyer-shady', text: 'Classified Agency: Pays 2.5x cash, but hurts your Reputation (-15 Rep).' },
    { selector: '.bank-box', text: 'Loan & Debt Center: Claim emergency grants, borrow cash, or pay off active debt.' },
    { selector: '#btn-next-mission-loop', text: 'Start your next mission cycle!' }
  ];

  let coachRafId = null;
  let coachResizeHandler = null;
  let coachPairs = [];
  let coachMaskPathEl = null;

  function updateScreenCoachPositions() {
    if (!DOM.screenCoachOverlay || !DOM.screenCoachOverlay.classList.contains('active')) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cutouts = [];

    coachPairs.forEach(pair => {
      const rect = pair.el.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8 || rect.bottom < 0 || rect.top > vh) {
        pair.box.style.display = 'none';
        pair.tip.style.display = 'none';
        return;
      }
      pair.box.style.display = 'block';
      pair.tip.style.display = '';

      const x = Math.max(4, rect.left - 4);
      const y = Math.max(4, rect.top - 4);
      const w = Math.min(vw - 8, rect.width + 8);
      const h = rect.height + 8;
      cutouts.push({ x, y, w, h });

      pair.box.style.left = `${x}px`;
      pair.box.style.top = `${y}px`;
      pair.box.style.width = `${w}px`;
      pair.box.style.height = `${h}px`;

      const placeAbove = rect.bottom + 74 > vh && rect.top > 85;
      pair.tip.style.left = `${Math.min(Math.max(8, rect.left), Math.max(8, vw - 295))}px`;
      pair.tip.style.top = placeAbove
        ? `${Math.max(12, rect.top - 58)}px`
        : `${Math.min(vh - 80, rect.bottom + 8)}px`;
    });

    if (DOM.coachMaskSvg && coachMaskPathEl) {
      DOM.coachMaskSvg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      let pathD = `M0,0 H${vw} V${vh} H0 Z `;
      cutouts.forEach(c => {
        pathD += `M${c.x},${c.y} h${c.w} v${c.h} h${-c.w} Z `;
      });
      coachMaskPathEl.setAttribute('d', pathD);
    }
  }

  function closeScreenCoachOverlay() {
    if (!DOM.screenCoachOverlay) return;
    DOM.screenCoachOverlay.classList.remove('active');
    if (coachRafId) {
      cancelAnimationFrame(coachRafId);
      coachRafId = null;
    }
    if (coachResizeHandler) {
      window.removeEventListener('resize', coachResizeHandler);
      window.removeEventListener('scroll', coachResizeHandler, true);
      coachResizeHandler = null;
    }
    coachPairs = [];
    coachMaskPathEl = null;
    if (DOM.coachCalloutsLayer) DOM.coachCalloutsLayer.innerHTML = '';
    if (DOM.coachMaskSvg) DOM.coachMaskSvg.innerHTML = '';
  }

  function openScreenCoachOverlay() {
    if (!DOM.screenCoachOverlay || !DOM.coachCalloutsLayer) return;
    DOM.coachCalloutsLayer.innerHTML = '';
    DOM.screenCoachOverlay.classList.add('active');

    const hintBanner = document.createElement('div');
    hintBanner.className = 'coach-hint-banner';
    hintBanner.textContent = 'Hover or tap any highlighted area to read its description.';
    DOM.coachCalloutsLayer.appendChild(hintBanner);

    const vh = window.innerHeight;
    let delayIdx = 0;
    coachPairs = [];

    SCREEN_ELEMENT_GUIDES.forEach(item => {
      const el = document.querySelector(item.selector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8 || rect.bottom < 0 || rect.top > vh) return;

      const box = document.createElement('div');
      box.className = 'coach-highlight-box';
      box.style.animationDelay = `${delayIdx * 0.04}s`;

      const tip = document.createElement('div');
      tip.className = 'coach-tip-pill';
      tip.textContent = item.text;

      const pair = { el, box, tip };
      coachPairs.push(pair);

      const activateOnlyThis = (active) => {
        coachPairs.forEach(p => {
          p.box.classList.remove('is-hovered');
          p.tip.classList.remove('is-hovered');
        });
        if (active) {
          box.classList.add('is-hovered');
          tip.classList.add('is-hovered');
        }
      };

      box.addEventListener('mouseenter', () => activateOnlyThis(true));
      box.addEventListener('mouseleave', () => activateOnlyThis(false));
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = box.classList.contains('is-hovered');
        activateOnlyThis(!wasActive);
      });

      DOM.coachCalloutsLayer.appendChild(box);
      DOM.coachCalloutsLayer.appendChild(tip);
      delayIdx++;
    });

    if (DOM.coachMaskSvg) {
      coachMaskPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      coachMaskPathEl.setAttribute('fill', 'rgba(51, 65, 85, 0.78)');
      coachMaskPathEl.setAttribute('fill-rule', 'evenodd');
      DOM.coachMaskSvg.innerHTML = '';
      DOM.coachMaskSvg.appendChild(coachMaskPathEl);
    }

    coachResizeHandler = () => updateScreenCoachPositions();
    window.addEventListener('resize', coachResizeHandler);
    window.addEventListener('scroll', coachResizeHandler, true);

    const tickCoach = () => {
      if (!DOM.screenCoachOverlay.classList.contains('active')) return;
      updateScreenCoachPositions();
      coachRafId = requestAnimationFrame(tickCoach);
    };
    updateScreenCoachPositions();
    coachRafId = requestAnimationFrame(tickCoach);
  }

  // ========================================================================
  // 18. RESET GAME DATA & GUIDED INTERACTIVE TUTORIAL
  // ========================================================================

  function resetAllGameData() {
    endGuidedTutorial(false);
    try {
      localStorage.removeItem('tm_text_size');
      localStorage.removeItem(ADVANCEMENTS_STORAGE_KEY);
    } catch (e) {}
    state.advStats = defaultAdvStats();
    state.currentMissionSpent = 0;
    state.advUnlocked = {};
    document.documentElement.classList.remove('text-size-small', 'text-size-large');
    document.documentElement.classList.add('text-size-normal');
    const selSize = document.getElementById('select-text-size');
    if (selSize) selSize.value = 'normal';

    state.difficulty = 'hard';
    state.customSlidersEnabled = false;
    if (DOM.chkAdvSliders) DOM.chkAdvSliders.checked = false;
    state.budget = getDifficultyConfig().startingBudget;
    state.reputation = 50;
    state.activeDebt = 0;
    state.cycleCount = 1;
    state.trendLocked = false;
    if (DOM.trendsTicker) DOM.trendsTicker.classList.remove('locked');
    if (DOM.tickerLockBadge) DOM.tickerLockBadge.innerHTML = `${ICONS.unlock} LIVE`;
    state.currentTrend = MARKET_TREND_POOLS[0];
    setTickerText(state.currentTrend.text);
    state.missionName = 'ARTEMIS-1';
    if (DOM.inputMissionName) DOM.inputMissionName.value = 'ARTEMIS-1';
    state.selectedDomain = null;
    state.selectedInstruments = [];
    state.instrumentTiers = {};
    state.dataInventory = [];
    state.selectedInventoryIdx = null;
    state.vaultViewMode = 'grid';
    state.inventoryViewMode = 'grid';
    state.selections = {
      launchRocket: null,
      selectedFuel: 'kerosene',
      spaceBus: null,
      busSizing: 'standard',
      heatShieldInstalled: false,
      groundStation: null
    };
    randomizeDesignVariants();
    hasSeenStage6Tutorial = false;
    updatePermanentHud();
    renderStage1Domains();
    goToStage(1);
  }

  const tutorialState = {
    active: false,
    stepIdx: 0,
    rafId: null,
    cleanupFn: null,
    waitingForAnomaly: false,
    waitingForFlightEnd: false,
    waitingForNoticeClose: false
  };

  function getRecommendedRocketId() {
    const reqVel = state.tempResources.reqVelocity || (state.selectedDomain ? state.selectedDomain.baseDeltaV : 7.8);
    const fuel = FUEL_TYPES[state.selections.selectedFuel] || FUEL_TYPES.kerosene;
    const bus = CATALOG.space_bus[0];
    const estMass = state.tempResources.mass || ((bus ? bus.dryMass : 350) + state.selectedInstruments.length * 140 + 400);
    const match = CATALOG.launch.find(r => r.payloadMass >= estMass && (r.velocityDV + (fuel ? fuel.dvBonus : 0)) >= reqVel);
    return (match || CATALOG.launch[CATALOG.launch.length - 1]).id;
  }

  function getRecommendedBusId() {
    const reqPower = 75 + state.selectedInstruments.reduce((acc, i) => acc + i.power, 0);
    const reqVol = Math.max(2.0, state.selectedInstruments.length * 1.1);
    const match = CATALOG.space_bus.find(b => b.basePower >= reqPower && b.baseVol >= reqVol)
      || CATALOG.space_bus.find(b => b.basePower >= reqPower)
      || CATALOG.space_bus[CATALOG.space_bus.length - 1];
    return match.id;
  }

  function getRecommendedGroundId() {
    const sorted = [...CATALOG.ground].sort((a, b) => (b.bandwidthMbps || 0) - (a.bandwidthMbps || 0));
    return sorted[0].id;
  }

  const TUTORIAL_STEPS = [
    {
      title: '1. MARKET DEMAND TRENDS',
      text: () => `Watch the Global Data Demand Trend bar! Missions and instruments matching the trending discipline (${state.currentTrend?.domainName || 'Earth Science'}) earn a huge +${Math.round(((state.currentTrend?.boost || 1.7) - 1) * 100)}% sell value bonus. Always aim for what is trending! Click NEXT to begin.`,
      getTarget: () => document.querySelector('#trends-ticker'),
      showNext: true
    },
    {
      title: '2. SELECT THE TRENDING DISCIPLINE',
      text: () => `Select ${state.currentTrend?.domainName || 'the trending discipline'} here to match the active Market Trend and maximize your mission payout.`,
      getTarget: () => document.querySelector(`.domain-card[data-domain-id="${state.currentTrend?.domain || 'earth'}"]`),
      advanceOnClick: true
    },
    {
      title: '3. PROCEED TO INSTRUMENTS',
      text: 'Great! Now click PROCEED TO DEFINE CONCEPT to choose your science sensors.',
      getTarget: () => document.querySelector('#btn-next-stage1'),
      advanceOnClick: true
    },
    {
      title: '4. PICK A TRENDING INSTRUMENT',
      text: 'Instruments marked TRENDING earn the market trend bonus! Click a trending instrument card to equip it.',
      getTarget: () => document.querySelector('.instrument-card.is-trending-inst'),
      advanceOnEvent: 'instrument-selected'
    },
    {
      title: '5. MISSION OBJECTIVES',
      text: 'Click MISSION OBJECTIVES to review the physics and power limits for your mission.',
      getTarget: () => document.querySelector('#btn-next-stage2'),
      advanceOnClick: true
    },
    {
      title: '6. COMMENCE DESIGN & BUDGET',
      text: 'Here are your mission delta-v, mass, power, and bandwidth targets. Click COMMENCE DESIGN & BUDGET to build your spacecraft.',
      getTarget: () => document.querySelector('#btn-next-stage3'),
      advanceOnClick: true
    },
    {
      title: '7. CHOOSE A CAPABLE ROCKET',
      text: 'Pick a launch vehicle with enough Payload Mass and Delta-V velocity to reach your destination.',
      getTarget: () => document.querySelector(`.opt-card[data-item-id="${getRecommendedRocketId()}"]`),
      advanceOnClick: true
    },
    {
      title: '8. NEXT SEGMENT (SPACE BUS)',
      text: 'Rocket selected! Click NEXT SEGMENT to configure your spacecraft bus.',
      getTarget: () => document.querySelector('#btn-next-segment'),
      advanceOnClick: true
    },
    {
      title: '9. CHOOSE A BUS WITH ENOUGH POWER',
      text: 'Select a spacecraft bus that supplies enough electrical power (Watts) and internal volume for your sensors.',
      getTarget: () => document.querySelector(`.opt-card[data-item-id="${getRecommendedBusId()}"]`),
      advanceOnClick: true
    },
    {
      title: '10. NEXT SEGMENT (GROUND DISH)',
      text: 'Spacecraft bus ready! Click NEXT SEGMENT to pick your ground receiving station.',
      getTarget: () => document.querySelector('#btn-next-segment'),
      advanceOnClick: true
    },
    {
      title: '11. PICK HIGH-BANDWIDTH GROUND SEGMENT',
      text: 'Choose the high-bandwidth Deep Space Network dish so all science telemetry downlinks without packet loss.',
      getTarget: () => document.querySelector(`.opt-card[data-item-id="${getRecommendedGroundId()}"]`),
      advanceOnClick: true
    },
    {
      title: '12. BUILD & VERIFY',
      text: 'All 3 segments are green! Click BUILD & VERIFY to run pre-flight safety checks.',
      getTarget: () => document.querySelector('#btn-next-stage4'),
      advanceOnClick: true
    },
    {
      title: '13. RUN DIAGNOSTIC SIMULATION',
      text: 'Click RUN FULL DIAGNOSTIC SIMULATION to test all systems for +10% flight reliability and +5 Reputation.',
      getTarget: () => document.querySelector('#btn-run-tests'),
      advanceOnClick: true,
      delayMs: 1200
    },
    {
      title: '14. AUTHORIZE LAUNCH & IMPLEMENT',
      text: 'Diagnostics passed! Click AUTHORIZE LAUNCH & IMPLEMENT to send your spacecraft into flight.',
      getTarget: () => document.querySelector('#btn-next-stage5'),
      advanceOnClick: true,
      waitForAnomaly: true
    },
    {
      title: '15. ANOMALY ALERT — PAUSE TIME!',
      text: 'An urgent in-flight error just triggered! Click PAUSE TIME to freeze the 15-second countdown while you inspect the alert.',
      getTarget: () => document.querySelector('#btn-flight-pause'),
      advanceOnClick: true
    },
    {
      title: '16. SOLVE THE ANOMALY',
      text: 'Click INTERVENE & SOLVE ISSUE! In the minigame, pump the valve or align the slider so the red needle stays inside the green target zone before time runs out.',
      getTarget: () => document.querySelector('#btn-start-minigame'),
      advanceOnClick: true,
      waitForFlightEnd: true
    },
    {
      title: '17. GO TO USER SEGMENT',
      text: 'Mission flight succeeded! Click ENTER USER SEGMENT & DATA REFINERY to process and sell your data.',
      getTarget: () => document.querySelector('#btn-complete-flight'),
      advanceOnClick: true
    },
    {
      title: '18. SELECT YOUR DATA',
      text: 'Click your newly downlinked dataset in the Mission Data Inventory to inspect it on the workbench.',
      getTarget: () => document.querySelector('#data-inventory-list .data-card'),
      advanceOnClick: true
    },
    {
      title: '19. REFINE DATA',
      text: 'Click REFINE TO L1A to process raw telemetry into a higher-value scientific dataset.',
      getTarget: () => document.querySelector('#btn-refine-data'),
      advanceOnClick: true
    },
    {
      title: '20. SELL TO INSTITUTE',
      text: 'Click SELL TO INSTITUTE to earn budget cash and +8 Reputation!',
      getTarget: () => document.querySelector('#buyer-institute .btn-sell-action'),
      advanceOnClick: true,
      waitForNoticeClose: true
    },
    {
      title: '21. COMMENCE NEXT MISSION CYCLE',
      text: 'Click COMMENCE NEXT MISSION CYCLE to advance to your next mission and refresh market trends!',
      getTarget: () => document.querySelector('#btn-next-mission-loop'),
      advanceOnClick: true
    }
  ];

  function updateTutorialOverlayPosition() {
    if (!tutorialState.active || !DOM.tutorialOverlay || !DOM.tutorialOverlay.classList.contains('active')) return;
    const step = TUTORIAL_STEPS[tutorialState.stepIdx];
    if (!step) return;
    const el = step.getTarget();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (!el) {
      if (DOM.tutorialFocusRing) DOM.tutorialFocusRing.style.display = 'none';
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      if (DOM.tutorialFocusRing) DOM.tutorialFocusRing.style.display = 'none';
      return;
    }

    const pad = 6;
    const x = Math.max(2, rect.left - pad);
    const y = Math.max(2, rect.top - pad);
    const w = Math.min(vw - x - 2, rect.width + pad * 2);
    const h = Math.min(vh - y - 2, rect.height + pad * 2);

    if (DOM.tutorialMaskSvg && DOM.tutorialMaskPath) {
      DOM.tutorialMaskSvg.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      DOM.tutorialMaskPath.setAttribute('d', `M0,0 H${vw} V${vh} H0 Z M${x},${y} h${w} v${h} h${-w} Z`);
    }

    if (DOM.tutorialFocusRing) {
      DOM.tutorialFocusRing.style.display = 'block';
      DOM.tutorialFocusRing.style.left = `${x}px`;
      DOM.tutorialFocusRing.style.top = `${y}px`;
      DOM.tutorialFocusRing.style.width = `${w}px`;
      DOM.tutorialFocusRing.style.height = `${h}px`;
    }

    if (DOM.tutorialCallout) {
      const calloutW = Math.min(360, vw - 24);
      const calloutH = DOM.tutorialCallout.offsetHeight || 150;
      const spaceBelow = vh - (y + h);
      const placeAbove = spaceBelow < calloutH + 24 && y > calloutH + 24;
      const leftPos = Math.min(Math.max(12, x + w / 2 - calloutW / 2), vw - calloutW - 12);
      const topPos = placeAbove
        ? Math.max(12, y - calloutH - 16)
        : Math.min(vh - calloutH - 12, y + h + 16);

      DOM.tutorialCallout.style.left = `${leftPos}px`;
      DOM.tutorialCallout.style.top = `${topPos}px`;

      if (DOM.tutorialArrow) {
        DOM.tutorialArrow.className = `tutorial-arrow ${placeAbove ? 'arrow-down' : 'arrow-up'}`;
        const arrowX = Math.min(Math.max(16, (x + w / 2) - leftPos - 10), calloutW - 36);
        DOM.tutorialArrow.style.left = `${arrowX}px`;
      }
    }
  }

  function clearTutorialStepListeners() {
    if (typeof tutorialState.cleanupFn === 'function') {
      tutorialState.cleanupFn();
      tutorialState.cleanupFn = null;
    }
  }

  function showTutorialStep(idx) {
    clearTutorialStepListeners();
    if (!tutorialState.active) return;

    if (idx >= TUTORIAL_STEPS.length) {
      endGuidedTutorial(true);
      return;
    }

    tutorialState.stepIdx = idx;
    const step = TUTORIAL_STEPS[idx];
    const targetEl = step.getTarget();

    if (targetEl && typeof targetEl.scrollIntoView === 'function') {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }

    if (DOM.tutorialStepBadge) DOM.tutorialStepBadge.textContent = `STEP ${idx + 1} / ${TUTORIAL_STEPS.length}`;
    if (DOM.tutorialTitle) DOM.tutorialTitle.textContent = step.title;
    if (DOM.tutorialText) DOM.tutorialText.textContent = typeof step.text === 'function' ? step.text() : step.text;
    if (DOM.tutorialNextBtn) DOM.tutorialNextBtn.style.display = step.showNext ? 'inline-flex' : 'none';

    if (DOM.tutorialOverlay) DOM.tutorialOverlay.classList.add('active');

    const advance = () => {
      if (!tutorialState.active) return;
      clearTutorialStepListeners();
      if (step.waitForAnomaly) {
        tutorialState.waitingForAnomaly = true;
        if (DOM.tutorialOverlay) DOM.tutorialOverlay.classList.remove('active');
        return;
      }
      if (step.waitForFlightEnd) {
        tutorialState.waitingForFlightEnd = true;
        if (DOM.tutorialOverlay) DOM.tutorialOverlay.classList.remove('active');
        return;
      }
      if (step.waitForNoticeClose) {
        tutorialState.waitingForNoticeClose = true;
        if (DOM.tutorialOverlay) DOM.tutorialOverlay.classList.remove('active');
        return;
      }
      const nextIdx = idx + 1;
      if (step.delayMs) {
        setTimeout(() => showTutorialStep(nextIdx), step.delayMs);
      } else {
        setTimeout(() => showTutorialStep(nextIdx), 80);
      }
    };

    if (step.advanceOnClick && targetEl) {
      const onTargetClick = () => advance();
      targetEl.addEventListener('click', onTargetClick, { once: true });
      tutorialState.cleanupFn = () => targetEl.removeEventListener('click', onTargetClick);
    } else if (step.advanceOnEvent === 'instrument-selected') {
      const container = DOM.dataTypesContainer;
      const onContainerClick = () => {
        setTimeout(() => {
          if (state.selectedInstruments.length > 0 && tutorialState.active && tutorialState.stepIdx === idx) {
            advance();
          }
        }, 60);
      };
      if (container) {
        container.addEventListener('click', onContainerClick);
        tutorialState.cleanupFn = () => container.removeEventListener('click', onContainerClick);
      }
    }

    updateTutorialOverlayPosition();
  }

  function tutorialOnAnomalyTriggered() {
    if (!tutorialState.active || !tutorialState.waitingForAnomaly) return;
    tutorialState.waitingForAnomaly = false;
    setTimeout(() => showTutorialStep(tutorialState.stepIdx + 1), 120);
  }

  function tutorialOnAnomalyResolved() {
    // Flight resumes automatically; wait for tutorialOnFlightComplete
  }

  function tutorialOnNoticeClosed() {
    if (!tutorialState.active || !tutorialState.waitingForNoticeClose) return;
    tutorialState.waitingForNoticeClose = false;
    setTimeout(() => showTutorialStep(tutorialState.stepIdx + 1), 120);
  }

  function tutorialOnFlightComplete() {
    if (!tutorialState.active || !tutorialState.waitingForFlightEnd) return;
    tutorialState.waitingForFlightEnd = false;
    setTimeout(() => showTutorialStep(tutorialState.stepIdx + 1), 120);
  }

  function endGuidedTutorial(showCongrats = false) {
    clearTutorialStepListeners();
    tutorialState.active = false;
    tutorialState.waitingForAnomaly = false;
    tutorialState.waitingForFlightEnd = false;
    if (tutorialState.rafId) {
      cancelAnimationFrame(tutorialState.rafId);
      tutorialState.rafId = null;
    }
    if (DOM.tutorialOverlay) DOM.tutorialOverlay.classList.remove('active');

    if (showCongrats) {
      playBeep(1200);
      showInPageNotice(
        'Congratulations, Flight Director!\n\nYou have completed the Guided Tutorial: you selected a trending NASA mission, engineered a capable rocket, bus, and ground link, paused & resolved an in-flight anomaly, refined your downlinked data, and sold it to advance to the next mission cycle.\n\nYou are ready to lead NASA\'s Science Directorate!',
        'TUTORIAL COMPLETE — CONGRATULATIONS!'
      );
    }
  }

  function startGuidedTutorialFlow() {
    // Configure Basic Controls + Easy (Cadet) difficulty
    state.customSlidersEnabled = false;
    if (DOM.chkAdvSliders) DOM.chkAdvSliders.checked = false;
    state.difficulty = 'easy';
    state.budget = DIFFICULTY_MODES.easy.startingBudget;
    state.reputation = 50;
    state.gameMode = 'singleplayer';
    state.selectedDomain = null;
    state.selectedInstruments = [];
    state.selections.heatShieldInstalled = false;

    if (DOM.initTutorialModal) DOM.initTutorialModal.classList.remove('active');
    if (DOM.initModeModal) DOM.initModeModal.classList.remove('active');
    if (DOM.initDifficultyModal) DOM.initDifficultyModal.classList.remove('active');
    if (DOM.mainMenuOverlay) {
      DOM.mainMenuOverlay.classList.remove('active');
      DOM.mainMenuOverlay.style.display = 'none';
    }
    if (DOM.appContainer) DOM.appContainer.style.display = 'flex';
    if (DOM.hudModeBadge) DOM.hudModeBadge.textContent = 'SINGLEPLAYER';
    if (DOM.rolesBar) DOM.rolesBar.style.display = 'none';
    if (DOM.saboteurStatusPill) DOM.saboteurStatusPill.style.display = 'none';

    updatePermanentHud();
    renderStage1Domains();
    goToStage(1);

    tutorialState.active = true;
    tutorialState.waitingForAnomaly = false;
    tutorialState.waitingForFlightEnd = false;
    if (tutorialState.rafId) cancelAnimationFrame(tutorialState.rafId);

    const tickTutorial = () => {
      if (!tutorialState.active) return;
      updateTutorialOverlayPosition();
      tutorialState.rafId = requestAnimationFrame(tickTutorial);
    };
    tutorialState.rafId = requestAnimationFrame(tickTutorial);

    if (DOM.tutorialNextBtn) {
      DOM.tutorialNextBtn.onclick = () => {
        playBeep(820);
        showTutorialStep(tutorialState.stepIdx + 1);
      };
    }
    if (DOM.tutorialSkipBtn) {
      DOM.tutorialSkipBtn.onclick = () => {
        playBeep(620);
        endGuidedTutorial(false);
      };
    }

    showTutorialStep(0);
  }

  let cutsceneSoundEnabled = true;
  let hasUserAudioGesture = false;

  function playCutsceneTones(sceneIdx) {
    if (!cutsceneSoundEnabled || masterVolume <= 0) return;
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const now = audioCtx.currentTime;

      const playTone = (freq, type, startOffset, dur, vol, endFreq = null) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + startOffset);
        if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, now + startOffset + dur);
        gain.gain.setValueAtTime(0.001, now + startOffset);
        gain.gain.linearRampToValueAtTime(vol * masterVolume, now + startOffset + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + startOffset);
        osc.stop(now + startOffset + dur + 0.02);
      };

      // Deep cinematic sub-pad on every scene transition
      playTone(65, 'sine', 0, 1.4, 0.09, 55);

      if (sceneIdx === 0) {
        playTone(440, 'sine', 0.1, 0.35, 0.06, 880);
        playTone(1320, 'triangle', 0.55, 0.25, 0.04);
      } else if (sceneIdx === 1) {
        playTone(523.25, 'sine', 0.1, 0.3, 0.05);
        playTone(659.25, 'sine', 0.28, 0.4, 0.05);
      } else if (sceneIdx === 2) {
        playTone(196, 'triangle', 0.1, 0.25, 0.07);
        playTone(293.66, 'triangle', 0.35, 0.25, 0.07);
        playTone(392, 'sine', 0.6, 0.5, 0.06);
      } else if (sceneIdx === 3) {
        // Rocket ignition noise roar + ascending synth
        const bufSize = Math.floor(audioCtx.sampleRate * 1.4);
        const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
        const noise = audioCtx.createBufferSource();
        noise.buffer = buf;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, now);
        filter.frequency.exponentialRampToValueAtTime(950, now + 1.2);
        const nGain = audioCtx.createGain();
        nGain.gain.setValueAtTime(0.01, now);
        nGain.gain.linearRampToValueAtTime(0.12 * masterVolume, now + 0.25);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        noise.connect(filter);
        filter.connect(nGain);
        nGain.connect(audioCtx.destination);
        noise.start(now);
        playTone(110, 'sawtooth', 0.05, 1.2, 0.04, 330);
      } else if (sceneIdx === 4) {
        playTone(740, 'square', 0.1, 0.12, 0.03);
        playTone(587.33, 'sine', 0.35, 0.45, 0.06, 880);
        playTone(2525, 'sine', 0.85, 0.18, 0.05);
      } else if (sceneIdx === 5) {
        [523.25, 659.25, 783.99, 987.77, 1174.66].forEach((f, idx) => {
          playTone(f, 'sine', 0.12 + idx * 0.14, 0.65, 0.05);
        });
      }
    } catch {
      // Ignore if AudioContext is blocked
    }
  }

  function playCutsceneCue(sceneIdx) {
    if (!cutsceneSoundEnabled || masterVolume <= 0) return;
    try {
      initAudio();
      if (!audioCtx || audioCtx.state !== 'running') return;
      hasUserAudioGesture = true;
      playCutsceneTones(sceneIdx);
    } catch {
      // Ignore if AudioContext is blocked
    }
  }

  function startIntroCutscene() {
    if (!DOM.introCutscene || !DOM.cutsceneStage) return;
    const scenes = Array.from(DOM.cutsceneStage.querySelectorAll('.cutscene-scene'));
    if (scenes.length === 0) return;

    let masterTl = null;
    let fallbackTimer = null;
    let activeSceneIdx = 0;

    const isAudioLive = () => Boolean(cutsceneSoundEnabled && audioCtx && audioCtx.state === 'running');

    const updateSoundBtnLabel = () => {
      if (!DOM.btnCutsceneSound) return;
      DOM.btnCutsceneSound.textContent = isAudioLive() ? 'AUDIO: ON' : 'AUDIO: OFF';
    };

    try { initAudio(); } catch {}
    updateSoundBtnLabel();

    const unlockAudioOnGesture = (e) => {
      if (e && DOM.btnCutsceneSound && DOM.btnCutsceneSound.contains(e.target)) return;
      hasUserAudioGesture = true;
      try {
        initAudio();
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
          audioCtx.resume().then(() => {
            updateSoundBtnLabel();
            if (cutsceneSoundEnabled) playCutsceneTones(activeSceneIdx);
          }).catch(() => {});
        } else if (audioCtx.state === 'running') {
          updateSoundBtnLabel();
          if (cutsceneSoundEnabled) playCutsceneTones(activeSceneIdx);
        }
      } catch {}
    };
    document.addEventListener('pointerdown', unlockAudioOnGesture, { once: true });
    document.addEventListener('keydown', unlockAudioOnGesture, { once: true });

    if (DOM.btnCutsceneSound) {
      DOM.btnCutsceneSound.addEventListener('click', (e) => {
        e.stopPropagation();
        try { initAudio(); } catch {}
        // First user interaction or suspended context: unlock AudioContext & play immediately
        if (!hasUserAudioGesture || !audioCtx || audioCtx.state !== 'running') {
          hasUserAudioGesture = true;
          cutsceneSoundEnabled = true;
          if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
              updateSoundBtnLabel();
              playCutsceneTones(activeSceneIdx);
            }).catch(() => {});
          } else {
            updateSoundBtnLabel();
            playCutsceneTones(activeSceneIdx);
          }
          return;
        }
        cutsceneSoundEnabled = !cutsceneSoundEnabled;
        if (cutsceneSoundEnabled) {
          try { playCutsceneTones(activeSceneIdx); } catch {}
        }
        updateSoundBtnLabel();
      });
    }

    const finishCutscene = () => {
      if (masterTl) {
        masterTl.kill();
        masterTl = null;
      }
      if (fallbackTimer) {
        clearInterval(fallbackTimer);
        fallbackTimer = null;
      }
      if (window.gsap) {
        window.gsap.to(DOM.introCutscene, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            DOM.introCutscene.classList.remove('active');
            DOM.introCutscene.style.display = 'none';
          }
        });
      } else {
        DOM.introCutscene.classList.remove('active');
        DOM.introCutscene.style.display = 'none';
      }
    };

    if (DOM.btnSkipCutscene) {
      DOM.btnSkipCutscene.addEventListener('click', () => {
        try { initAudio(); playBeep(700); } catch {}
        finishCutscene();
      });
    }

    const setSceneUI = (idx) => {
      activeSceneIdx = idx;
      if (DOM.cutsceneCaption && scenes[idx]) {
        DOM.cutsceneCaption.textContent = scenes[idx].getAttribute('data-caption') || '';
      }
      updateSoundBtnLabel();
    };

    // Scene 3 Bezier trajectory helper for rocket (M 360 470 Q 580 200 940 145)
    const rocketMover = scenes[3] ? scenes[3].querySelector('.cs-rocket-mover') : null;
    const rocketProg = { t: 0 };
    const updateRocketAlongArc = () => {
      if (!rocketMover) return;
      const u = rocketProg.t;
      const mu = 1 - u;
      const x = mu * mu * 360 + 2 * mu * u * 580 + u * u * 940;
      const y = mu * mu * 470 + 2 * mu * u * 200 + u * u * 145;
      const dx = 2 * mu * (580 - 360) + 2 * u * (940 - 580);
      const dy = 2 * mu * (200 - 470) + 2 * u * (145 - 200);
      // Tabler rocket icon inside .cs-rocket-ship is natively oriented at -45 deg (up-right)
      const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 45;
      rocketMover.setAttribute('transform', `translate(${x.toFixed(1)}, ${y.toFixed(1)}) rotate(${deg.toFixed(1)})`);
    };
    updateRocketAlongArc();

    // Scene 4 clone satellite pulse circles to form continuous travelling ripples
    const rippleGroup = scenes[4] ? scenes[4].querySelector('.cs-pulse-ripples') : null;
    if (rippleGroup) {
      const baseRipple = rippleGroup.querySelector('.cs-pulse-ripple');
      if (baseRipple && rippleGroup.querySelectorAll('.cs-pulse-ripple').length < 4) {
        for (let i = 0; i < 3; i++) {
          const clone = baseRipple.cloneNode(true);
          rippleGroup.appendChild(clone);
        }
      }
    }

    if (window.gsap) {
      const g = window.gsap;
      g.set(scenes, { autoAlpha: 0, scale: 0.96 });
      masterTl = g.timeline({ onComplete: finishCutscene });

      // Scene 0: Orbital Target Lock (middle planet stays steady — no zoom in/out)
      masterTl
        .call(() => { setSceneUI(0); playCutsceneCue(0); })
        .to(scenes[0], { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(scenes[0].querySelector('.cs-reticle'), { rotation: -120, scale: 1.7, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.25, ease: 'expo.out' }, '<0.08')
        .to(scenes[0].querySelector('.cs-planet-ringed'), { y: -14, x: -10, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<0.1')
        .to(scenes[0], { autoAlpha: 0, scale: 1.03, duration: 0.45, ease: 'power2.in' }, '+=0.35');

      // Scene 1: Solar Wings Unfold, Sensors Dock & Sweep Scan
      masterTl
        .call(() => { setSceneUI(1); playCutsceneCue(1); })
        .to(scenes[1], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo(scenes[1].querySelector('.cs-wing-l'), { scaleX: 0, transformOrigin: 'right center' }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '<0.1')
        .fromTo(scenes[1].querySelector('.cs-wing-r'), { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.7, ease: 'power3.out' }, '<')
        .fromTo(scenes[1].querySelector('.cs-sensor-left'), { x: -110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '<0.15')
        .fromTo(scenes[1].querySelector('.cs-sensor-right'), { x: 110, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '<')
        .fromTo(scenes[1].querySelector('.cs-scan-cone'), { opacity: 0, scaleY: 0.1, transformOrigin: 'top center' }, { opacity: 1, scaleY: 1, duration: 0.8, ease: 'power2.out' }, '<0.35')
        .to(scenes[1].querySelector('.cs-scan-cone'), { skewX: 8, duration: 0.9, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<0.4')
        .to(scenes[1], { autoAlpha: 0, scale: 1.03, duration: 0.45, ease: 'power2.in' }, '+=0.8');

      // Scene 2: 3-Segment Assembly & Telemetry Flow
      masterTl
        .call(() => { setSceneUI(2); playCutsceneCue(2); })
        .to(scenes[2], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo([scenes[2].querySelector('.cs-seg-1'), scenes[2].querySelector('.cs-seg-2'), scenes[2].querySelector('.cs-seg-3')],
          { y: 45, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.25, duration: 0.7, ease: 'power3.out' }, '<0.1')
        .fromTo([scenes[2].querySelector('.cs-link-1'), scenes[2].querySelector('.cs-link-2')],
          { strokeDashoffset: 80, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: 'power1.inOut' }, '<0.3')
        .to(scenes[2], { autoAlpha: 0, scale: 1.03, duration: 0.45, ease: 'power2.in' }, '+=1.4');

      // Scene 3: Rocket Liftoff & Orbital Arc (accurate Bezier path + tangent heading)
      masterTl
        .call(() => {
          rocketProg.t = 0;
          updateRocketAlongArc();
          setSceneUI(3);
          playCutsceneCue(3);
        })
        .to(scenes[3], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo(scenes[3].querySelector('.cs-traj-arc'), { strokeDashoffset: 160, opacity: 0.2 }, { strokeDashoffset: 0, opacity: 1, duration: 2.1, ease: 'power1.inOut' }, '<0.1')
        .fromTo(rocketProg, { t: 0 }, { t: 1, duration: 2.2, ease: 'power2.inOut', onUpdate: updateRocketAlongArc }, '<0.1')
        .to(scenes[3].querySelector('.cs-plume'), { scaleY: 1.5, opacity: 0.85, duration: 0.14, repeat: 14, yoyo: true }, '<')
        .to(scenes[3], { autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '+=0.9');

      // Scene 4: Anomaly Shockwave, Travelling Satellite Pulse Ripples, Shield & Downlink Stream
      const rippleCircles = scenes[4].querySelectorAll('.cs-pulse-ripple');
      masterTl
        .call(() => {
          setSceneUI(4);
          playCutsceneCue(4);
          if (rippleCircles.length > 0) {
            g.killTweensOf(rippleCircles);
            g.fromTo(
              rippleCircles,
              { attr: { r: 26 }, opacity: 0.95 },
              {
                attr: { r: 225 },
                opacity: 0,
                duration: 1.85,
                stagger: 0.38,
                repeat: -1,
                ease: 'none'
              }
            );
          }
        })
        .to(scenes[4], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo(scenes[4].querySelector('.cs-anomaly-ring'), { scale: 0.65, opacity: 0.9 }, { scale: 1.25, opacity: 0.15, duration: 0.9, repeat: 2, ease: 'power2.out' }, '<0.1')
        .fromTo(scenes[4].querySelector('.cs-shield-wave'), { scale: 0.5, opacity: 0 }, { scale: 1.05, opacity: 1, duration: 0.8, ease: 'expo.out' }, '<0.35')
        .fromTo(scenes[4].querySelector('.cs-downlink-wave'), { strokeDashoffset: 140 }, { strokeDashoffset: 0, duration: 1.4, ease: 'none' }, '<0.25')
        .to(scenes[4], { autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '+=1.3');

      // Scene 5: L4 Splicer Synthesis & Growth Curve
      masterTl
        .call(() => { setSceneUI(5); playCutsceneCue(5); })
        .to(scenes[5], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo([scenes[5].querySelector('.cs-node-l0'), scenes[5].querySelector('.cs-node-l2')],
          { x: -60, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.2, duration: 0.65, ease: 'power2.out' }, '<0.1')
        .fromTo(scenes[5].querySelector('.cs-node-l4'), { scale: 0.5, rotation: -45, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.85, ease: 'back.out(1.4)' }, '<0.3')
        .fromTo(scenes[5].querySelectorAll('.cs-value-bars rect'), { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, stagger: 0.18, duration: 0.65, ease: 'power3.out' }, '<0.25')
        .to(scenes[5], { autoAlpha: 0, duration: 0.45 }, '+=1.6');
    } else {
      let current = 0;
      scenes[0].classList.add('active');
      setSceneUI(0);
      playCutsceneCue(0);
      fallbackTimer = setInterval(() => {
        scenes[current].classList.remove('active');
        current++;
        if (current >= scenes.length) {
          finishCutscene();
        } else {
          scenes[current].classList.add('active');
          setSceneUI(current);
          playCutsceneCue(current);
        }
      }, 3600);
    }
  }

  // ========================================================================
  // 19. MISSION REPORT, DESIGN ARCHIVE (SAVE/SHARE/COMPARE), LEADERBOARD & MULTIPLAYER HUB
  // ========================================================================

  const DESIGNS_STORAGE_KEY = 'tm_saved_designs_v1';
  const LEADERBOARD_STORAGE_KEY = 'tm_leaderboard_v1';

  const DEFAULT_SAVED_DESIGNS = [
    {
      id: 'preset_terra_1',
      name: 'TERRA-EARTH-BASELINE',
      domainId: 'earth',
      domainName: 'Earth Science (LEO)',
      instruments: ['AIRS (T1)', 'CERES (T1)'],
      rocketName: 'Falcon-Light LEO',
      fuelName: 'RP-1 Kerosene',
      busName: 'Standard LEO Bus',
      heatShield: false,
      groundName: 'Regional VHF Array',
      totalCost: 420000,
      mass: 980,
      maxMass: 1500,
      power: 390,
      maxPower: 600,
      volume: 4.1,
      maxVolume: 5.5,
      velocity: 8.1,
      reqVelocity: 7.8,
      bandwidth: 85,
      relLaunch: 92,
      relSpace: 91,
      relGround: 94,
      outcome: 'SUCCEEDED',
      anomalies: '1 / 1 Fixed',
      flightTimeSec: 12,
      dataMB: 1400
    },
    {
      id: 'preset_europa_2',
      name: 'EUROPA-DEEP-SPACE-MK2',
      domainId: 'planetary',
      domainName: 'Planetary Science (Deep Space)',
      instruments: ['MOLA (T2)', 'THEMIS (T2)', 'SAM (T1)'],
      rocketName: 'SLS Block-1B Heavy',
      fuelName: 'Cryo Hydrolox (LH2/LOX)',
      busName: 'Deep-Space Armored Bus',
      heatShield: false,
      groundName: 'NASA Deep Space Network (70m)',
      totalCost: 915000,
      mass: 2450,
      maxMass: 3800,
      power: 880,
      maxPower: 1200,
      volume: 6.8,
      maxVolume: 8.5,
      velocity: 12.4,
      reqVelocity: 11.2,
      bandwidth: 160,
      relLaunch: 96,
      relSpace: 95,
      relGround: 98,
      outcome: 'SUCCEEDED',
      anomalies: '2 / 2 Fixed',
      flightTimeSec: 18,
      dataMB: 1950
    }
  ];

  function loadSavedDesigns() {
    try {
      const raw = localStorage.getItem(DESIGNS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_SAVED_DESIGNS.slice();
  }

  function saveDesignsToStorage(list) {
    try {
      localStorage.setItem(DESIGNS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function buildCurrentDesignSnapshot(customName = '') {
    try { calculateTempResources(); } catch (e) {}
    const dom = state.selectedDomain || MISSION_DOMAINS[0];
    const tr = state.tempResources || {};
    const sel = state.selections || {};
    const instList = (state.selectedInstruments && state.selectedInstruments.length > 0)
      ? state.selectedInstruments.map(i => `${i.name} (T${i.tier || 1})`)
      : ['AIRS (T1)'];

    const rocketName = state.customSlidersEnabled
      ? `Custom Booster (${state.customDesign.launchPayloadMax}kg)`
      : (sel.launchRocket ? sel.launchRocket.name : 'Standard LEO Booster');
    const fuelObj = (FUEL_TYPES && FUEL_TYPES[sel.selectedFuel]) || FUEL_TYPES.kerosene || Object.values(FUEL_TYPES)[0];
    const busName = state.customSlidersEnabled
      ? `Custom Bus (${state.customDesign.spacePowerGen}W)`
      : (sel.spaceBus ? `${sel.spaceBus.name} (${sel.busSizing})` : 'Standard Spacecraft Bus');
    const groundName = state.customSlidersEnabled
      ? `Custom Dish (${state.customDesign.groundBandwidth} Mbps)`
      : (sel.groundStation ? sel.groundStation.name : 'Standard Ground Dish');

    const fl = state.flight || {};
    const elapsedSec = fl.elapsedMs
      ? Math.max(1, Math.round(fl.elapsedMs / 1000))
      : (dom.transitDurationSec || 12);
    const enc = fl.anomaliesEncountered || 0;
    const res = fl.anomaliesResolvedThisFlight || 0;
    const outcome = (fl.flightOutcome && fl.flightOutcome !== 'IN_FLIGHT')
      ? fl.flightOutcome
      : (fl.dataAccumulatedMB > 0 ? 'SUCCEEDED' : 'DESIGN_ONLY');

    return {
      id: `design_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: (customName || state.missionName || 'ARTEMIS-DESIGN').trim().slice(0, 36),
      domainId: dom.id,
      domainName: dom.name,
      instruments: instList,
      rocketName,
      fuelName: fuelObj ? fuelObj.name : 'RP-1 Kerosene',
      busName,
      heatShield: Boolean(sel.heatShieldInstalled),
      groundName,
      totalCost: Math.round(tr.totalCost || 380000),
      mass: Math.round(tr.mass || 950),
      maxMass: Math.round(tr.maxMass || 1500),
      power: Math.round(tr.power || 350),
      maxPower: Math.round(tr.maxPower || 600),
      volume: Number((tr.volume || 3.8).toFixed(1)),
      maxVolume: Number((tr.maxVolume || 5.5).toFixed(1)),
      velocity: Number((tr.velocity || 8.0).toFixed(1)),
      reqVelocity: Number((tr.reqVelocity || dom.baseDeltaV || 7.8).toFixed(1)),
      bandwidth: Math.round(tr.bandwidth || 85),
      relLaunch: Math.round(tr.reliabilityLaunch || 90),
      relSpace: Math.round(tr.reliabilitySpace || 90),
      relGround: Math.round(tr.reliabilityGround || 90),
      outcome,
      anomalies: `${enc} / ${res} Fixed`,
      flightTimeSec: elapsedSec,
      dataMB: Math.round(fl.dataAccumulatedMB || 0)
    };
  }

  function encodeDesignShareCode(design) {
    const compact = {
      n: design.name,
      d: design.domainName,
      i: design.instruments,
      r: design.rocketName,
      f: design.fuelName,
      b: design.busName,
      h: design.heatShield ? 1 : 0,
      g: design.groundName,
      c: design.totalCost,
      m: [design.mass, design.maxMass],
      p: [design.power, design.maxPower],
      v: [design.volume, design.maxVolume],
      dv: [design.velocity, design.reqVelocity],
      bw: design.bandwidth,
      rel: [design.relLaunch, design.relSpace, design.relGround],
      o: design.outcome,
      a: design.anomalies,
      t: design.flightTimeSec,
      mb: design.dataMB
    };
    const jsonStr = JSON.stringify(compact);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return `TM1:${b64}`;
  }

  function decodeDesignShareCode(codeStr) {
    const raw = (codeStr || '').trim();
    const cleaned = raw.startsWith('TM1:') ? raw.slice(4).trim() : raw;
    const jsonStr = decodeURIComponent(escape(atob(cleaned)));
    const c = JSON.parse(jsonStr);
    if (!c || typeof c !== 'object') throw new Error('Invalid share code');
    return {
      id: `shared_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      name: String(c.n || 'SHARED-DESIGN').slice(0, 36),
      domainId: 'earth',
      domainName: String(c.d || 'Earth Science'),
      instruments: Array.isArray(c.i) ? c.i : ['AIRS (T1)'],
      rocketName: String(c.r || 'Custom Booster'),
      fuelName: String(c.f || 'RP-1 Kerosene'),
      busName: String(c.b || 'Standard Bus'),
      heatShield: Boolean(c.h),
      groundName: String(c.g || 'Deep Space Dish'),
      totalCost: Number(c.c || 400000),
      mass: Number((c.m && c.m[0]) || 900),
      maxMass: Number((c.m && c.m[1]) || 1500),
      power: Number((c.p && c.p[0]) || 400),
      maxPower: Number((c.p && c.p[1]) || 600),
      volume: Number((c.v && c.v[0]) || 4.0),
      maxVolume: Number((c.v && c.v[1]) || 6.0),
      velocity: Number((c.dv && c.dv[0]) || 8.0),
      reqVelocity: Number((c.dv && c.dv[1]) || 7.8),
      bandwidth: Number(c.bw || 85),
      relLaunch: Number((c.rel && c.rel[0]) || 90),
      relSpace: Number((c.rel && c.rel[1]) || 90),
      relGround: Number((c.rel && c.rel[2]) || 90),
      outcome: String(c.o || 'SHARED'),
      anomalies: String(c.a || '0 / 0 Fixed'),
      flightTimeSec: Number(c.t || 12),
      dataMB: Number(c.mb || 0)
    };
  }

  function openMissionReportModal() {
    const modal = document.getElementById('mission-report-modal');
    if (!modal) {
      goToStage(7);
      return;
    }
    const fl = state.flight || {};
    const succeeded = fl.flightOutcome === 'SUCCEEDED' || (fl.dataAccumulatedMB > 0 && fl.launchIntegrity > 0);
    const badge = document.getElementById('report-outcome-badge');
    const rmStatus = document.getElementById('rm-status');
    const rmAnomalies = document.getElementById('rm-anomalies');
    const rmFlightTime = document.getElementById('rm-flight-time');
    const rmPackets = document.getElementById('rm-packets');
    const rmCost = document.getElementById('rm-cost');
    const rmIntegrity = document.getElementById('rm-integrity');
    const leadEl = document.getElementById('report-summary-lead');
    const summaryEl = document.getElementById('report-design-summary');
    const nameInput = document.getElementById('report-design-name-input');
    const shareBox = document.getElementById('report-share-feedback');
    const voteBtn = document.getElementById('btn-report-vote-saboteur');

    if (shareBox) shareBox.style.display = 'none';
    if (nameInput) nameInput.value = `${state.missionName || 'ARTEMIS'}-CYCLE-${state.missionCycle || 1}`;
    if (voteBtn) {
      voteBtn.style.display = state.gameMode === 'sabotage' ? 'inline-flex' : 'none';
    }

    if (badge) {
      badge.textContent = succeeded ? 'MISSION SUCCEEDED' : 'MISSION FAILED';
      badge.classList.toggle('failed', !succeeded);
    }
    if (rmStatus) {
      rmStatus.textContent = succeeded ? 'SUCCEEDED' : 'FAILED';
      rmStatus.className = `rm-val ${succeeded ? 'text-emerald' : 'text-crimson'}`;
    }

    const enc = fl.anomaliesEncountered || 0;
    const res = fl.anomaliesResolvedThisFlight || 0;
    if (rmAnomalies) {
      rmAnomalies.textContent = `${enc} Encountered / ${res} Fixed`;
    }

    const wallElapsedSec = fl.flightStartWallMs
      ? Math.max(1, Math.round((performance.now() - fl.flightStartWallMs) / 1000))
      : (state.selectedDomain ? state.selectedDomain.transitDurationSec : 12);
    const simSec = state.selectedDomain ? state.selectedDomain.transitDurationSec : wallElapsedSec;
    if (rmFlightTime) {
      rmFlightTime.textContent = `${simSec}s Transit (${wallElapsedSec}s Real)`;
    }

    const pktCount = succeeded ? Math.max(1, state.selectedInstruments.length) : 0;
    if (rmPackets) {
      rmPackets.textContent = `${pktCount} Datasets (${fl.dataAccumulatedMB || 0} MB)`;
      rmPackets.className = `rm-val ${succeeded ? 'text-emerald' : 'text-crimson'}`;
    }

    if (rmCost) {
      rmCost.textContent = `$${(state.tempResources.totalCost || 0).toLocaleString()}`;
    }
    if (rmIntegrity) {
      rmIntegrity.textContent = `L:${fl.launchIntegrity ?? 100}% / S:${fl.spaceIntegrity ?? 100}% / G:${fl.groundIntegrity ?? 100}%`;
    }
    if (leadEl) {
      leadEl.textContent = succeeded
        ? `Mission [${state.missionName}] successfully completed orbital operations and downlinked ${fl.dataAccumulatedMB} MB of scientific telemetry.`
        : `Mission [${state.missionName}] failed during flight operations: ${fl.failReason || 'Critical telemetry loss'}.`;
    }

    const snap = buildCurrentDesignSnapshot();
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div><strong>Domain:</strong> ${snap.domainName}</div>
        <div><strong>Instruments:</strong> ${snap.instruments.join(', ')}</div>
        <div><strong>Launch Vehicle:</strong> ${snap.rocketName} (${snap.fuelName})</div>
        <div><strong>Spacecraft Bus:</strong> ${snap.busName} ${snap.heatShield ? '+ Heat Shield' : ''}</div>
        <div><strong>Ground Station:</strong> ${snap.groundName} (${snap.bandwidth} Mbps)</div>
        <div><strong>Mass / Power / Δv:</strong> ${snap.mass}/${snap.maxMass} kg | ${snap.power}/${snap.maxPower} W | ${snap.velocity}/${snap.reqVelocity} km/s</div>
      `;
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  function renderDesignsModal(highlightCompareId = null) {
    const designs = loadSavedDesigns();
    const currentSnap = buildCurrentDesignSnapshot(`${state.missionName || 'CURRENT'} (Active)`);
    currentSnap.id = '__current__';

    const countEl = document.getElementById('saved-designs-count');
    if (countEl) countEl.textContent = String(designs.length);

    const nameIn = document.getElementById('design-save-name');
    if (nameIn && !nameIn.value) {
      nameIn.value = `${state.missionName || 'ARTEMIS'}-MK${designs.length + 1}`;
    }

    const selA = document.getElementById('compare-select-a');
    const selB = document.getElementById('compare-select-b');
    const allOptions = [currentSnap, ...designs];

    if (selA && selB) {
      const prevA = selA.value;
      const prevB = highlightCompareId || selB.value;
      const makeOpts = () => allOptions.map(d => `<option value="${d.id}">${d.name} (${d.domainName})</option>`).join('');
      selA.innerHTML = makeOpts();
      selB.innerHTML = makeOpts();
      selA.value = allOptions.some(d => d.id === prevA) ? prevA : '__current__';
      if (highlightCompareId && allOptions.some(d => d.id === highlightCompareId)) {
        selB.value = highlightCompareId;
      } else if (allOptions.some(d => d.id === prevB) && prevB !== selA.value) {
        selB.value = prevB;
      } else if (designs[0]) {
        selB.value = designs[0].id;
      }
      renderDesignComparisonTable(allOptions, selA.value, selB.value);
    }

    const listEl = document.getElementById('saved-designs-list');
    if (listEl) {
      listEl.innerHTML = '';
      designs.forEach(d => {
        const row = document.createElement('div');
        row.className = 'saved-design-item';
        row.innerHTML = `
          <div>
            <strong class="text-cyan">${d.name}</strong>
            <span style="color:#94a3b8; margin-left:0.4rem;">${d.domainName} | $${Number(d.totalCost || 0).toLocaleString()} | ${d.mass}/${d.maxMass} kg | ${d.velocity} km/s | ${d.outcome || 'DESIGN'}</span>
          </div>
          <div class="designs-inline-row">
            <button type="button" class="hud-view-btn" data-action="compare" data-id="${d.id}">COMPARE</button>
            <button type="button" class="hud-view-btn" data-action="share" data-id="${d.id}">SHARE CODE</button>
            <button type="button" class="hud-view-btn" data-action="delete" data-id="${d.id}">DELETE</button>
          </div>
        `;
        listEl.appendChild(row);
      });

      listEl.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const act = btn.getAttribute('data-action');
          const id = btn.getAttribute('data-id');
          const found = designs.find(x => x.id === id);
          if (!found) return;
          playBeep(760);
          if (act === 'compare') {
            if (selB) selB.value = found.id;
            renderDesignComparisonTable(allOptions, selA ? selA.value : '__current__', found.id);
          } else if (act === 'share') {
            const code = encodeDesignShareCode(found);
            const banner = document.getElementById('design-share-banner');
            if (banner) {
              banner.style.display = 'block';
              banner.textContent = `SHARE CODE FOR [${found.name}]: ${code}`;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(code).catch(() => {});
            }
          } else if (act === 'delete') {
            const updated = designs.filter(x => x.id !== id);
            saveDesignsToStorage(updated);
            renderDesignsModal();
          }
        });
      });
    }
  }

  function renderDesignComparisonTable(allOptions, idA, idB) {
    const wrap = document.getElementById('designs-comparison-table-wrap');
    if (!wrap) return;
    const dA = allOptions.find(d => d.id === idA) || allOptions[0];
    const dB = allOptions.find(d => d.id === idB) || allOptions[1] || allOptions[0];
    if (!dA || !dB) return;

    const betterLow = (a, b) => (a < b ? ['text-emerald', ''] : a > b ? ['', 'text-emerald'] : ['', '']);
    const betterHigh = (a, b) => (a > b ? ['text-emerald', ''] : a < b ? ['', 'text-emerald'] : ['', '']);

    const [costClsA, costClsB] = betterLow(dA.totalCost, dB.totalCost);
    const [dvClsA, dvClsB] = betterHigh(dA.velocity, dB.velocity);
    const [bwClsA, bwClsB] = betterHigh(dA.bandwidth, dB.bandwidth);
    const avgRelA = Math.round((dA.relLaunch + dA.relSpace + dA.relGround) / 3);
    const avgRelB = Math.round((dB.relLaunch + dB.relSpace + dB.relGround) / 3);
    const [relClsA, relClsB] = betterHigh(avgRelA, avgRelB);

    wrap.innerHTML = `
      <table class="designs-comparison-table">
        <thead>
          <tr>
            <th>METRIC / PARAMETER</th>
            <th>${dA.name}</th>
            <th>${dB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scientific Domain</td>
            <td>${dA.domainName}</td>
            <td>${dB.domainName}</td>
          </tr>
          <tr>
            <td>Equipped Instruments</td>
            <td>${(dA.instruments || []).join(', ')}</td>
            <td>${(dB.instruments || []).join(', ')}</td>
          </tr>
          <tr>
            <td>Launch Vehicle &amp; Fuel</td>
            <td>${dA.rocketName} (${dA.fuelName})</td>
            <td>${dB.rocketName} (${dB.fuelName})</td>
          </tr>
          <tr>
            <td>Spacecraft Bus &amp; Shield</td>
            <td>${dA.busName} (${dA.heatShield ? 'Heat Shield' : 'No Shield'})</td>
            <td>${dB.busName} (${dB.heatShield ? 'Heat Shield' : 'No Shield'})</td>
          </tr>
          <tr>
            <td>Total Expenditure Cost</td>
            <td class="${costClsA}">$${Number(dA.totalCost).toLocaleString()}</td>
            <td class="${costClsB}">$${Number(dB.totalCost).toLocaleString()}</td>
          </tr>
          <tr>
            <td>Mass / Lift Capacity</td>
            <td>${dA.mass} / ${dA.maxMass} kg</td>
            <td>${dB.mass} / ${dB.maxMass} kg</td>
          </tr>
          <tr>
            <td>Power Draw / Generation</td>
            <td>${dA.power} / ${dA.maxPower} W</td>
            <td>${dB.power} / ${dB.maxPower} W</td>
          </tr>
          <tr>
            <td>Velocity (&Delta;v) / Target</td>
            <td class="${dvClsA}">${dA.velocity} / ${dA.reqVelocity} km/s</td>
            <td class="${dvClsB}">${dB.velocity} / ${dB.reqVelocity} km/s</td>
          </tr>
          <tr>
            <td>Downlink Bandwidth</td>
            <td class="${bwClsA}">${dA.bandwidth} Mbps (${dA.groundName})</td>
            <td class="${bwClsB}">${dB.bandwidth} Mbps (${dB.groundName})</td>
          </tr>
          <tr>
            <td>Avg Segment Reliability</td>
            <td class="${relClsA}">${avgRelA}% (L:${dA.relLaunch}% S:${dA.relSpace}% G:${dA.relGround}%)</td>
            <td class="${relClsB}">${avgRelB}% (L:${dB.relLaunch}% S:${dB.relSpace}% G:${dB.relGround}%)</td>
          </tr>
          <tr>
            <td>Flight Outcome &amp; Anomalies</td>
            <td>${dA.outcome} (${dA.anomalies}, ${dA.flightTimeSec}s)</td>
            <td>${dB.outcome} (${dB.anomalies}, ${dB.flightTimeSec}s)</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  function openDesignsModal(highlightCompareId = null) {
    const modal = document.getElementById('designs-modal');
    if (!modal) return;
    renderDesignsModal(highlightCompareId);
    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  // Money Leaderboard
  async function fetchAndRenderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;
    let entries = [
      { name: 'CDR. VANCE (JPL)', money: 1840000, missions: 7, reputation: 96, mode: '4P CO-OP' },
      { name: 'DR. ELENA ROSTOVA', money: 1520000, missions: 6, reputation: 92, mode: 'SABOTAGE' },
      { name: 'KSC FLIGHT OPS', money: 1290000, missions: 5, reputation: 88, mode: '4P CO-OP' },
      { name: 'DIRECTOR CHEN', money: 1110000, missions: 4, reputation: 84, mode: 'SINGLEPLAYER' },
      { name: 'ORBITAL PIONEERS', money: 945000, missions: 3, reputation: 79, mode: 'SABOTAGE' }
    ];
    try {
      const resp = await fetch('/api/leaderboard');
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data.entries)) {
          entries = data.entries.map(e => ({
            name: e.name,
            money: e.money < 50000 ? e.money * 1000 : e.money,
            missions: e.missions || 1,
            reputation: e.reputation || 50,
            mode: e.mode || 'SINGLEPLAYER'
          }));
        }
      }
    } catch (e) {}

    try {
      const localRaw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (localRaw) {
        const localArr = JSON.parse(localRaw);
        if (Array.isArray(localArr)) {
          localArr.forEach(le => {
            if (!entries.some(x => x.name.toUpperCase() === le.name.toUpperCase() && x.money >= le.money)) {
              entries.push(le);
            }
          });
        }
      }
    } catch (e) {}

    entries.sort((a, b) => b.money - a.money);
    tbody.innerHTML = entries.slice(0, 15).map((e, idx) => `
      <tr>
        <td><strong class="${idx === 0 ? 'text-gold' : idx < 3 ? 'text-cyan' : ''}">#${idx + 1}</strong></td>
        <td><strong>${e.name}</strong></td>
        <td class="text-emerald" style="font-family:var(--font-mono); font-weight:700;">$${Number(e.money).toLocaleString()}</td>
        <td>${e.missions}</td>
        <td>${e.reputation} / 100</td>
        <td><span class="badge">${e.mode}</span></td>
      </tr>
    `).join('');
  }

  async function submitCurrentScoreToLeaderboard() {
    const input = document.getElementById('leaderboard-callsign-input');
    const name = ((input && input.value) || 'CDR. MISSIONEER').trim().slice(0, 26) || 'CDR. MISSIONEER';
    const money = Math.round(state.budget || 1200000);
    const missions = Math.max(1, (state.advStats && state.advStats.missionsCompleted) || state.missionCycle || 1);
    const reputation = Math.round(state.reputation || 50);
    const mode = state.gameMode === 'sabotage' ? 'SABOTAGE' : state.gameMode === 'coop' ? '4P CO-OP' : 'SINGLEPLAYER';

    const entry = { name, money, missions, reputation, mode };
    try {
      const localRaw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      const localArr = localRaw ? JSON.parse(localRaw) : [];
      localArr.push(entry);
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(localArr));
    } catch (e) {}

    try {
      await fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
    } catch (e) {}

    playBeep(1100);
    await fetchAndRenderLeaderboard();
  }

  function openLeaderboardModal() {
    const modal = document.getElementById('leaderboard-modal');
    if (!modal) return;
    fetchAndRenderLeaderboard();
    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  // ========================================================================
  // 20. 4-PLAYER COLLABORATION & SABOTAGE MULTIPLAYER + LOBBY & MATCHMAKING
  // ========================================================================

  const ROLE_DUTY_CONFIG = {
    launch: {
      title: 'LAUNCH PLAYER',
      duty: 'LAUNCH PLAYER: Design rocket & propellant, manage Δv, and fix mechanical booster issues.',
      taskBtn: 'CALIBRATE BOOSTER VALVES (+3% LAUNCH REL)',
      sabotageAct: 'UNDERFILL PROPELLANT & TAMPER REGULATOR VALVE'
    },
    space: {
      title: 'SPACE PLAYER',
      duty: 'SPACE PLAYER: Plan scientific instruments & bus frame, and fix orbital sensor issues.',
      taskBtn: 'ALIGN STAR-TRACKER OPTICS (+3% SPACE REL)',
      sabotageAct: 'DETUNE OPTICAL SENSORS & DRAIN SOLAR BUS'
    },
    ground: {
      title: 'GROUND PLAYER',
      duty: 'GROUND PLAYER: Receive telemetry, fix computer/downlink issues, negotiate, and approve launches & sales.',
      taskBtn: 'OPTIMIZE DOWNLINK BUFFER (+10 Mbps)',
      sabotageAct: 'INJECT PACKET LOSS & SLEW TRACKING DISH'
    },
    user: {
      title: 'USER PLAYER',
      duty: 'USER PLAYER: Find best market deals, coordinate part purchases with Launch & Space, manage loans & refine data.',
      taskBtn: 'SCOUT MARKET DEAL & REBATE (+$25,000)',
      sabotageAct: 'SIPHON AGENCY FUNDS & LOCK PREDATORY SPREAD'
    }
  };

  state.mpLobby = null;
  state.userRole = 'launch';
  state.groundApproved = true;
  state.budgetAllocations = { launch: 450000, space: 500000, ground: 250000 };
  state.designApprovals = { launch: false, space: false, ground: false };
  state.conceptVotes = {};
  state.conceptVoteWinner = null;
  state.conceptVoteTiebroken = false;
  state.mpSharedVersion = 0;
  state.sabotageForensicLogs = [
    'Forensic Telemetry Monitor initialized across all 4 stations (Launch, Space, Ground, User).'
  ];

  async function pushMpSharedState(patch = {}) {
    if (!isMpMode() || !state.mpLobby || !state.mpLobby.code) return null;
    return sendLobbyAction({
      action: 'sync_state',
      code: state.mpLobby.code,
      player_name: getMpPlayerName(),
      shared_state: patch
    });
  }

  async function castMpConceptVote(domainObj, forceResolve = false) {
    if (!state.mpLobby || !state.mpLobby.code) return null;
    const domId = domainObj ? domainObj.id : (state.conceptVotes[state.userRole] || state.domainId || 'earth');
    state.conceptVotes = state.conceptVotes || {};
    state.conceptVotes[state.userRole] = domId;
    renderStage1Domains();
    return sendLobbyAction({
      action: 'vote_concept',
      code: state.mpLobby.code,
      player_name: getMpPlayerName(),
      role: state.userRole,
      domain_id: domId,
      force_resolve: Boolean(forceResolve)
    });
  }

  function applyMpSharedState(shared) {
    if (!shared || typeof shared !== 'object') return;
    if (typeof shared.missionCycle === 'number') state.missionCycle = shared.missionCycle;
    if (typeof shared.missionName === 'string') {
      state.missionName = shared.missionName;
      if (DOM.inputMissionName && document.activeElement !== DOM.inputMissionName) {
        DOM.inputMissionName.value = shared.missionName;
      }
    }
    if (shared.conceptVotes && typeof shared.conceptVotes === 'object') {
      state.conceptVotes = { ...shared.conceptVotes };
    }
    if ('conceptVoteWinner' in shared) {
      state.conceptVoteWinner = shared.conceptVoteWinner;
    }
    if (typeof shared.conceptVoteTiebroken === 'boolean') {
      state.conceptVoteTiebroken = shared.conceptVoteTiebroken;
    }
    if (shared.domainId !== undefined) {
      state.domainId = shared.domainId;
    }
    if (Array.isArray(shared.selectedInstruments)) {
      state.selectedInstruments = [...shared.selectedInstruments];
    }
    if (shared.instrumentTiers && typeof shared.instrumentTiers === 'object') {
      state.instrumentTiers = { ...shared.instrumentTiers };
    }
    if (typeof shared.budget === 'number') state.budget = shared.budget;
    if (typeof shared.reputation === 'number') state.reputation = shared.reputation;
    if (typeof shared.activeDebt === 'number') state.activeDebt = shared.activeDebt;
    if (shared.budgetAllocations && typeof shared.budgetAllocations === 'object') {
      state.budgetAllocations = { ...state.budgetAllocations, ...shared.budgetAllocations };
    }
    if (shared.selections && typeof shared.selections === 'object') {
      state.selections = { ...state.selections, ...shared.selections };
    }
    if (typeof shared.customSlidersEnabled === 'boolean') {
      state.customSlidersEnabled = shared.customSlidersEnabled;
    }
    if (shared.customDesign && typeof shared.customDesign === 'object') {
      state.customDesign = { ...state.customDesign, ...shared.customDesign };
    }
    if (shared.designApprovals && typeof shared.designApprovals === 'object') {
      state.designApprovals = { ...state.designApprovals, ...shared.designApprovals };
    }
    if (typeof shared.groundApproved === 'boolean') {
      state.groundApproved = shared.groundApproved;
    }
    if (typeof shared.diagnosticsBonus === 'number') {
      state.diagnosticsBonus = shared.diagnosticsBonus;
    }
    if (Array.isArray(shared.dataInventory)) {
      state.dataInventory = shared.dataInventory;
    }
    if (Array.isArray(shared.sabotageForensicLogs)) {
      state.sabotageForensicLogs = shared.sabotageForensicLogs;
    }

    if (!isMpMode()) return;

    if (typeof shared.stage === 'number' && shared.stage >= 1 && shared.stage <= 7 && shared.stage !== state.stage) {
      goToStage(shared.stage, true);
      return;
    }

    updatePermanentHud();
    updateMultiplayerStationBar();
    if (state.stage === 1) {
      renderStage1Domains();
    } else if (state.stage === 2) {
      renderStage2Instruments();
    } else if (state.stage === 3) {
      renderStage3Funding();
    } else if (state.stage === 4) {
      calculateTempResources();
      renderStage4Design();
    } else if (state.stage === 7) {
      renderStage7Refinery();
    }
  }

  function renderMpCollabWorkspace() {
    const ws = document.getElementById('mp-collab-workspace');
    if (!ws) return;
    if (!isMpMode()) {
      ws.innerHTML = '';
      ws.style.display = 'none';
      return;
    }
    ws.style.display = 'grid';

    const alloc = state.budgetAllocations || { launch: 450000, space: 500000, ground: 250000 };
    const approvals = state.designApprovals || { launch: false, space: false, ground: false };
    const isUserRole = state.userRole === 'user';
    const isGroundRole = state.userRole === 'ground';

    const spentLaunch = getSegmentExpenditure('launch');
    const spentSpace = getSegmentExpenditure('space');
    const spentGround = getSegmentExpenditure('ground');

    const stations = [
      { key: 'launch', label: 'Launch Player (Rocket)', spent: spentLaunch, cap: alloc.launch || 0, app: Boolean(approvals.launch) },
      { key: 'space', label: 'Space Player (Instruments & Bus)', spent: spentSpace, cap: alloc.space || 0, app: Boolean(approvals.space) },
      { key: 'ground', label: 'Ground Player (Comms)', spent: spentGround, cap: alloc.ground || 0, app: Boolean(approvals.ground) }
    ];

    ws.innerHTML = `
      <div class="mp-collab-box">
        <div class="mp-collab-title">
          <span>💰 USER PLAYER BUDGET ALLOCATION</span>
          <span class="badge ${isUserRole ? 'text-emerald' : 'text-muted'}">${isUserRole ? 'YOUR AUTHORITY (USER PLAYER)' : 'CONTROLLED BY USER PLAYER'}</span>
        </div>
        ${stations.map(st => `
          <div class="mp-alloc-row">
            <span><strong>${st.label}:</strong> <span class="${st.spent > st.cap ? 'text-crimson' : 'text-cyan'}">${formatMoney(st.spent)}</span> / ${formatMoney(st.cap)}</span>
            <div class="mp-alloc-controls">
              <button type="button" class="mp-alloc-btn" data-alloc-role="${st.key}" data-alloc-delta="-50000" ${!isUserRole ? 'disabled' : ''}>-$50k</button>
              <button type="button" class="mp-alloc-btn" data-alloc-role="${st.key}" data-alloc-delta="50000" ${!isUserRole ? 'disabled' : ''}>+$50k</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="mp-collab-box">
        <div class="mp-collab-title">
          <span>🛡️ GROUND PLAYER DESIGN APPROVALS</span>
          <span class="badge ${isGroundRole ? 'text-emerald' : 'text-muted'}">${isGroundRole ? 'YOUR AUTHORITY (GROUND PLAYER)' : 'CONTROLLED BY GROUND PLAYER'}</span>
        </div>
        ${stations.map(st => `
          <div class="mp-approval-row">
            <span><strong>${st.label}:</strong> <span class="${st.app ? 'text-emerald' : 'text-amber'}">${st.app ? 'APPROVED ✓' : 'PENDING ⏳'}</span></span>
            <button type="button" class="mp-alloc-btn" data-approve-seg="${st.key}" ${!isGroundRole ? 'disabled' : ''}>
              ${st.app ? 'REVOKE' : 'APPROVE ✓'}
            </button>
          </div>
        `).join('')}
        ${isGroundRole ? `
          <div style="display:flex; justify-content:flex-end; margin-top:0.2rem;">
            <button type="button" class="mp-alloc-btn" id="btn-mp-approve-all-designs" style="border-color:rgba(16,185,129,0.6); color:#34d399;">APPROVE ALL DESIGNS & LAUNCH ✓</button>
          </div>
        ` : ''}
      </div>
    `;

    ws.querySelectorAll('button[data-alloc-role]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.userRole !== 'user') {
          playAlarm();
          showInPageNotice('Only the User Player can allocate station budgets!', 'USER PLAYER ONLY');
          return;
        }
        const rk = btn.getAttribute('data-alloc-role');
        const delta = parseInt(btn.getAttribute('data-alloc-delta'), 10) || 0;
        const cur = state.budgetAllocations[rk] || 0;
        const nextVal = Math.max(50000, Math.min(1500000, cur + delta));
        state.budgetAllocations[rk] = nextVal;
        playBeep(delta > 0 ? 880 : 620);
        renderMpCollabWorkspace();
        if (state.stage === 2) renderStage2Instruments();
        if (state.stage === 4) {
          calculateTempResources();
          renderStage4Design();
        }
        pushMpSharedState({ budgetAllocations: state.budgetAllocations });
      });
    });

    ws.querySelectorAll('button[data-approve-seg]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.userRole !== 'ground') {
          playAlarm();
          showInPageNotice('Only the Ground Player can approve or hold station designs!', 'GROUND PLAYER ONLY');
          return;
        }
        const seg = btn.getAttribute('data-approve-seg');
        state.designApprovals[seg] = !state.designApprovals[seg];
        playBeep(state.designApprovals[seg] ? 920 : 540);
        renderMpCollabWorkspace();
        if (state.stage === 4) {
          calculateTempResources();
          renderStage4Design();
        }
        pushMpSharedState({ designApprovals: state.designApprovals });
      });
    });

    ws.querySelector('#btn-mp-approve-all-designs')?.addEventListener('click', () => {
      if (state.userRole !== 'ground') return;
      state.designApprovals = { launch: true, space: true, ground: true };
      state.groundApproved = true;
      playChord([523.25, 659.25, 783.99], 'triangle', 0.25);
      updateMultiplayerStationBar();
      if (state.stage === 4) {
        calculateTempResources();
        renderStage4Design();
      }
      pushMpSharedState({
        designApprovals: state.designApprovals,
        groundApproved: true
      });
    });
  }

  function updateMultiplayerStationBar() {
    const dutyText = document.getElementById('mp-role-duty-text');
    const taskBtn = document.getElementById('btn-mp-station-task');
    const roomPill = document.getElementById('mp-hud-room-code');
    const approveBtn = document.getElementById('btn-mp-ground-approve');
    const sabBtn = document.getElementById('btn-mp-sabotage-act');
    const voteBtn = document.getElementById('btn-open-saboteur-vote');

    const role = state.userRole || 'launch';
    const cfg = ROLE_DUTY_CONFIG[role] || ROLE_DUTY_CONFIG.launch;

    if (DOM.roleTabs) {
      const players = (state.mpLobby && Array.isArray(state.mpLobby.players)) ? state.mpLobby.players : [];
      const tabLabels = {
        launch: 'Launch Player',
        space: 'Space Player',
        ground: 'Ground Player',
        user: 'User Player'
      };
      Object.keys(DOM.roleTabs).forEach(rk => {
        const tab = DOM.roleTabs[rk];
        if (!tab) return;
        const isMine = rk === role;
        tab.classList.toggle('active', isMine);
        tab.classList.toggle('locked-other', isMpMode() && !isMine);
        const occ = players.find(p => p.role === rk);
        const spanEl = tab.querySelector('span');
        if (spanEl) {
          spanEl.textContent = occ
            ? `${tabLabels[rk]} (${occ.name}${isMine ? ' • YOU' : ''})`
            : `${tabLabels[rk]}${isMine ? ' (YOU)' : ''}`;
        }
      });
    }

    if (dutyText) dutyText.textContent = cfg.duty;
    if (taskBtn) taskBtn.textContent = cfg.taskBtn;
    if (roomPill) {
      roomPill.textContent = state.mpLobby
        ? `ROOM: ${state.mpLobby.code} (${state.mpLobby.visibility.toUpperCase()}) • 4/4 CREW`
        : `ROOM: LOCAL ${state.gameMode.toUpperCase()}`;
    }
    if (approveBtn) {
      approveBtn.textContent = state.groundApproved
        ? 'GROUND APPROVAL: GRANTED ✓'
        : 'GROUND APPROVAL: HOLD ⚠';
      approveBtn.className = `mp-mini-btn ${state.groundApproved ? 'emerald' : 'crimson'}`;
    }
    if (sabBtn) {
      sabBtn.style.display = state.gameMode === 'sabotage' ? 'inline-flex' : 'none';
    }
    if (voteBtn) {
      voteBtn.style.display = state.gameMode === 'sabotage' ? 'inline-flex' : 'none';
    }
    renderMpCollabWorkspace();
  }

  function executeActiveStationTask() {
    const role = state.userRole || 'launch';
    playBeep(940);
    if (role === 'launch') {
      state.tempResources.reliabilityLaunch = Math.min(99, (state.tempResources.reliabilityLaunch || 90) + 3);
      if (state.flight && state.flight.running) {
        state.flight.launchIntegrity = Math.min(100, (state.flight.launchIntegrity || 80) + 12);
        logFlightMessage('LAUNCH PLAYER: Mechanical booster valves stabilized (+12% Launch Integrity).', false, 'check');
      } else {
        showInPageNotice('LAUNCH PLAYER TASK COMPLETE:\nCalibrated turbopump & regulator valves (+3% Launch Reliability).', 'LAUNCH STATION');
      }
    } else if (role === 'space') {
      state.tempResources.reliabilitySpace = Math.min(99, (state.tempResources.reliabilitySpace || 90) + 3);
      if (state.flight && state.flight.running) {
        state.flight.spaceIntegrity = Math.min(100, (state.flight.spaceIntegrity || 80) + 12);
        state.flight.dataAccumulatedMB = (state.flight.dataAccumulatedMB || 0) + 150;
        if (DOM.flightDataCounter) DOM.flightDataCounter.textContent = `${state.flight.dataAccumulatedMB} MB`;
        logFlightMessage('SPACE PLAYER: Calibrated payload optics (+150 MB telemetry & +12% Space Integrity).', false, 'microscope');
      } else {
        showInPageNotice('SPACE PLAYER TASK COMPLETE:\nAligned star-tracker and instrument thermal bus (+3% Space Reliability).', 'SPACE STATION');
      }
    } else if (role === 'ground') {
      state.tempResources.bandwidth = (state.tempResources.bandwidth || 85) + 10;
      state.tempResources.reliabilityGround = Math.min(99, (state.tempResources.reliabilityGround || 90) + 3);
      if (state.flight && state.flight.running) {
        state.flight.groundIntegrity = Math.min(100, (state.flight.groundIntegrity || 80) + 12);
        logFlightMessage('GROUND PLAYER: Cleared receiver computer buffer & locked dish azimuth (+10 Mbps).', false, 'satellite');
      } else {
        showInPageNotice('GROUND PLAYER TASK COMPLETE:\nOptimized ground receiver array (+10 Mbps Downlink Bandwidth & +3% Ground Reliability).', 'GROUND STATION');
      }
    } else if (role === 'user') {
      if (!state._userRebateCycle || state._userRebateCycle !== state.missionCycle) {
        state._userRebateCycle = state.missionCycle;
        state.budget += 25000;
        updatePermanentHud();
        pushMpSharedState({ budget: state.budget });
        showInPageNotice('USER PLAYER TASK COMPLETE:\nNegotiated vendor part procurement rebate & scouted buyer contracts (+$25,000 Agency Budget).', 'USER STATION');
      } else {
        showInPageNotice('USER PLAYER MARKET INTEL:\nCurrent High-Demand Domain: ' + (state.currentTrend ? state.currentTrend.domain.toUpperCase() : 'EARTH') + ' (2.0x Payout Bonus). Coordinate with Space & Ground stations!', 'USER STATION');
      }
    }
    if (state.stage === 4) {
      renderDesignVisualViewport();
    }
  }

  function triggerCovertSabotageAction() {
    if (state.gameMode !== 'sabotage') return;
    if (!state.saboteurRole) {
      const roles = ['launch', 'space', 'ground', 'user'];
      state.saboteurRole = roles[Math.floor(Math.random() * roles.length)];
    }
    const sabRole = state.saboteurRole;
    playAlarm();

    const clueMap = {
      launch: 'FORENSIC ALERT [LAUNCH SEGMENT]: Unauthorized valve pressure command & propellant underfill signature detected on Launch console!',
      space: 'FORENSIC ALERT [SPACE SEGMENT]: Covert star-tracker optical detune & payload bus power spike traced to Space console!',
      ground: 'FORENSIC ALERT [GROUND SEGMENT]: Deliberate telemetry packet drop & dish azimuth slew injected from Ground terminal!',
      user: 'FORENSIC ALERT [USER SEGMENT]: Unauthorized $45,000 budget siphon & high-interest debt routing traced to User financial desk!'
    };

    const clue = clueMap[sabRole] || clueMap.space;
    state.sabotageForensicLogs.push(`[CYCLE ${state.missionCycle}] ${clue}`);

    if (!isInfiniteBudget()) {
      state.budget = Math.max(0, state.budget - 45000);
      updatePermanentHud();
    }
    if (state.flight && state.flight.running && !state.flight.anomalyActive) {
      const targetSeg = sabRole === 'user' ? 'ground' : sabRole;
      triggerTimedAnomaly(targetSeg);
    } else {
      showInPageNotice(
        `COVERT SABOTAGE DETECTED!\nA Saboteur among the 4 stations just caused a system malfunction (-$45,000 emergency containment cost).\n\nOpen "FIND & VOTE SABOTEUR" to inspect the forensic station logs and vote out the Saboteur!`,
        'SABOTAGE ALERT'
      );
    }
    pushMpSharedState({ budget: state.budget, sabotageForensicLogs: state.sabotageForensicLogs });
  }

  function openSaboteurVoteModal() {
    const modal = document.getElementById('saboteur-vote-modal');
    if (!modal) return;
    if (!state.saboteurRole) {
      const roles = ['launch', 'space', 'ground', 'user'];
      state.saboteurRole = roles[Math.floor(Math.random() * roles.length)];
    }
    const clueBox = document.getElementById('saboteur-clue-box');
    const resultBox = document.getElementById('saboteur-vote-result');
    if (resultBox) resultBox.style.display = 'none';

    const hintByRole = {
      launch: 'Telemetry audit shows anomalous turbopump valve oscillations and fuel mixture tampering in the Launch bay.',
      space: 'Telemetry audit shows deliberate optical calibration drift and unscheduled power bus drain on the Space bus.',
      ground: 'Telemetry audit shows manual downlink buffer overflow and falsified launch signoff packets on the Ground console.',
      user: 'Telemetry audit shows off-ledger wire transfers and artificially discounted contract quotes at the User market desk.'
    };

    const logs = state.sabotageForensicLogs.slice(-5);
    logs.push(`LATEST FORENSIC TRACE: ${hintByRole[state.saboteurRole]}`);
    if (clueBox) {
      clueBox.innerHTML = logs.map(l => `<div style="margin-bottom:0.35rem;">&bull; ${l}</div>`).join('');
    }

    modal.classList.add('active');
    modal.style.display = 'flex';
  }

  async function castSaboteurVote(suspectRole) {
    if (!state.saboteurRole) {
      const roles = ['launch', 'space', 'ground', 'user'];
      state.saboteurRole = roles[Math.floor(Math.random() * roles.length)];
    }
    let caught = suspectRole === state.saboteurRole;
    let actualRole = state.saboteurRole;

    if (state.mpLobby && state.mpLobby.code) {
      try {
        const resp = await fetch('/api/lobbies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'vote_saboteur',
            code: state.mpLobby.code,
            player_name: getMpPlayerName(),
            suspect_role: suspectRole
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          caught = Boolean(data.caught);
          actualRole = data.saboteur_role || actualRole;
          state.mpLobby = data.lobby || state.mpLobby;
        }
      } catch (e) {}
    }

    const resultBox = document.getElementById('saboteur-vote-result');
    if (caught) {
      playBeep(1250);
      if (!isInfiniteBudget()) {
        state.budget += 200000;
        updatePermanentHud();
      }
      state.reputation = Math.min(100, state.reputation + 10);
      updatePermanentHud();
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.borderColor = 'var(--color-emerald)';
        resultBox.style.color = 'var(--color-emerald)';
        resultBox.textContent = `TRIBUNAL VERDICT: ${suspectRole.toUpperCase()} PLAYER WAS THE SABOTEUR! Saboteur ejected — +$200,000 security recovery & +10 Reputation awarded!`;
      }
    } else {
      playAlarm();
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.borderColor = 'var(--color-crimson)';
        resultBox.style.color = 'var(--color-crimson)';
        resultBox.textContent = `TRIBUNAL VERDICT: ${suspectRole.toUpperCase()} Player was INNOCENT! The true Saboteur was ${actualRole.toUpperCase()} Player!`;
      }
    }
  }

  function getMpPlayerName() {
    const el = document.getElementById('mp-player-name');
    return ((el && el.value) || 'CDR. PIONEER').trim().slice(0, 22) || 'CDR. PIONEER';
  }

  let mpLobbyPollTimer = null;

  function startMpLobbyPolling() {
    if (mpLobbyPollTimer) return;
    mpLobbyPollTimer = setInterval(() => {
      const modal = document.getElementById('multiplayer-lobby-modal');
      const modalOpen = modal && modal.classList.contains('active');
      const inActiveMp = state.mpLobby && state.gameMode !== 'singleplayer';
      if (!modalOpen && !inActiveMp) {
        stopMpLobbyPolling();
        return;
      }
      refreshPublicLobbies();
    }, 1500);
  }

  function stopMpLobbyPolling() {
    if (mpLobbyPollTimer) {
      clearInterval(mpLobbyPollTimer);
      mpLobbyPollTimer = null;
    }
  }

  function renderActiveMpLobbyRoom(lobby, publicList = null) {
    if (lobby !== undefined) {
      state.mpLobby = lobby;
      if (lobby && lobby.saboteur_role) {
        state.saboteurRole = lobby.saboteur_role;
      }
    }
    const titleEl = document.getElementById('mp-room-title');
    const metaEl = document.getElementById('mp-room-meta');
    const codeEl = document.getElementById('mp-room-code-display');
    const slotsEl = document.getElementById('mp-stations-slots');
    const logsEl = document.getElementById('mp-room-logs');
    const delBtn = document.getElementById('btn-mp-delete-lobby');
    const launchBtn = document.getElementById('btn-mp-launch-game');
    const removeBotsBtn = document.getElementById('btn-mp-remove-bots');

    const lob = state.mpLobby;
    if (!lob) {
      if (titleEl) titleEl.textContent = 'NO ACTIVE LOBBY SELECTED';
      if (metaEl) metaEl.textContent = 'Use Quickplay, Create a Lobby, or Join from the Public Browser';
      if (codeEl) codeEl.textContent = '------';
      if (delBtn) delBtn.style.display = 'none';
      if (removeBotsBtn) removeBotsBtn.disabled = true;
      if (launchBtn) {
        launchBtn.disabled = false;
        launchBtn.textContent = 'ENTER MISSION CONTROL →';
      }
      if (slotsEl) {
        slotsEl.innerHTML = ['launch', 'space', 'ground', 'user'].map(r => `
          <div class="mp-station-slot-card">
            <strong class="text-cyan">${ROLE_DUTY_CONFIG[r].title}</strong>
            <span>Unassigned Station</span>
          </div>
        `).join('');
      }
      if (logsEl) logsEl.innerHTML = '';
      if (Array.isArray(publicList)) {
        renderPublicLobbiesBrowser(publicList);
      }
      updateMultiplayerStationBar();
      return;
    }

    const myName = getMpPlayerName().toUpperCase();
    const me = Array.isArray(lob.players) ? lob.players.find(p => p.name.toUpperCase() === myName) : null;
    if (me && me.role) {
      state.userRole = me.role;
    }

    const isHost = Boolean(lob.host && lob.host.toUpperCase() === myName);
    const playerCount = (lob.players || []).length;
    if (delBtn) delBtn.style.display = isHost ? 'inline-flex' : 'none';
    if (removeBotsBtn) {
      const hasBots = (lob.players || []).some(p => p.is_bot);
      removeBotsBtn.disabled = !hasBots || lob.status === 'in_progress';
    }
    if (launchBtn) {
      if (playerCount < 4) {
        launchBtn.disabled = true;
        launchBtn.textContent = `NEED 4/4 CREW TO START (${playerCount}/4) — FILL AI CREW OR INVITE PLAYERS`;
      } else {
        launchBtn.disabled = !isHost;
        launchBtn.textContent = isHost ? 'ENTER MISSION CONTROL (4/4 READY) →' : 'WAITING FOR HOST TO START...';
      }
    }

    if (lob.shared_state) {
      applyMpSharedState(lob.shared_state);
    }

    if (titleEl) titleEl.textContent = `${lob.name}`;
    if (metaEl) {
      metaEl.textContent = `Host: ${lob.host || 'CREATOR'} | Mode: ${lob.gamemode === 'sabotage' ? '4P SABOTAGE (Find the Saboteur)' : '4P COLLABORATION (Co-op)'} | Visibility: ${lob.visibility.toUpperCase()} | Crew: ${playerCount}/4 (4 Required)`;
    }
    if (codeEl) codeEl.textContent = lob.code;

    if (slotsEl) {
      const isLocked = lob.status === 'in_progress';
      slotsEl.innerHTML = ['launch', 'space', 'ground', 'user'].map(r => {
        const occ = (lob.players || []).find(p => p.role === r);
        return `
          <div class="mp-station-slot-card ${occ ? 'occupied' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong class="text-cyan">${ROLE_DUTY_CONFIG[r].title}</strong>
              ${isLocked
                ? `<span class="badge">ROLE LOCKED</span>`
                : `<button type="button" class="hud-view-btn" data-claim-role="${r}">CLAIM STATION</button>`}
            </div>
            <span class="${occ ? 'text-emerald' : 'text-muted'}">${occ ? `${occ.name} ${occ.is_bot ? '(AI Crew)' : '(Human)'}` : 'OPEN SLOT'}</span>
          </div>
        `;
      }).join('');

      if (!isLocked) {
        slotsEl.querySelectorAll('button[data-claim-role]').forEach(btn => {
          btn.addEventListener('click', async () => {
            const r = btn.getAttribute('data-claim-role');
            state.userRole = r;
            playBeep(780);
            await sendLobbyAction({ action: 'select_role', code: lob.code, player_name: getMpPlayerName(), role: r });
          });
        });
      }
    }

    if (logsEl && Array.isArray(lob.logs)) {
      logsEl.innerHTML = lob.logs.map(l => `<div class="mp-log-line">[${(l.role || 'OPS').toUpperCase()}] ${l.text}</div>`).join('');
      logsEl.scrollTop = logsEl.scrollHeight;
    }

    if (Array.isArray(publicList)) {
      renderPublicLobbiesBrowser(publicList);
    }
    updateMultiplayerStationBar();

    if (lob.status === 'in_progress' && state.mpEnteredLobbyCode !== lob.code) {
      state.mpEnteredLobbyCode = lob.code;
      launchMultiplayerSessionFromLobby();
    }
  }

  function renderPublicLobbiesBrowser(lobbies) {
    const listEl = document.getElementById('mp-public-lobbies-list');
    if (!listEl) return;
    if (!Array.isArray(lobbies) || lobbies.length === 0) {
      listEl.innerHTML = '<div class="mp-lobby-row">No public lobbies open. Click Create Lobby or Quickplay!</div>';
      return;
    }
    const myName = getMpPlayerName().toUpperCase();
    listEl.innerHTML = lobbies.map(l => {
      const isHost = l.host && l.host.toUpperCase() === myName;
      return `
      <div class="mp-lobby-row">
        <div>
          <strong class="text-cyan">${l.name}</strong>
          <span class="badge" style="margin-left:0.35rem;">${l.gamemode === 'sabotage' ? 'SABOTAGE' : '4P CO-OP'}</span>
          <small style="color:#94a3b8; margin-left:0.35rem;">Code: ${l.code} | ${l.player_count || (l.players || []).length}/4</small>
        </div>
        <div style="display:flex; gap:0.35rem; align-items:center;">
          ${isHost ? `<button type="button" class="hud-view-btn" style="border-color:rgba(244,63,94,0.6); color:#fb7185;" data-delete-code="${l.code}">DELETE</button>` : ''}
          <button type="button" class="hud-view-btn" data-join-code="${l.code}">JOIN</button>
        </div>
      </div>
    `;
    }).join('');

    listEl.querySelectorAll('button[data-join-code]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-join-code');
        playBeep(840);
        await sendLobbyAction({ action: 'join', code, player_name: getMpPlayerName() });
      });
    });
    listEl.querySelectorAll('button[data-delete-code]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-delete-code');
        playBeep(520);
        await sendLobbyAction({ action: 'delete', code, player_name: getMpPlayerName() });
      });
    });
  }

  async function refreshPublicLobbies() {
    try {
      const code = state.mpLobby ? state.mpLobby.code : '';
      const resp = await fetch(`/api/lobbies${code ? `?code=${encodeURIComponent(code)}` : ''}`);
      if (resp.ok) {
        const data = await resp.json();
        renderPublicLobbiesBrowser(data.lobbies || []);
        if (code && !data.lobby) {
          state.mpLobby = null;
          state.mpEnteredLobbyCode = null;
          renderActiveMpLobbyRoom(null, data.lobbies || []);
        } else if (data.lobby) {
          renderActiveMpLobbyRoom(data.lobby);
        }
        return;
      }
    } catch (e) {}
  }

  async function sendLobbyAction(payload) {
    try {
      const resp = await fetch('/api/lobbies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.deleted) {
          state.mpLobby = null;
          state.mpEnteredLobbyCode = null;
          renderActiveMpLobbyRoom(null, data.lobbies || []);
        } else {
          renderActiveMpLobbyRoom(data.lobby, data.lobbies);
        }
        return data;
      } else {
        const err = await resp.json().catch(() => ({}));
        if (err.error) showInPageNotice(err.error, 'LOBBY NOTICE');
      }
    } catch (e) {
      // Offline fallback lobby actions
      if (payload.action === 'delete') {
        state.mpLobby = null;
        state.mpEnteredLobbyCode = null;
        renderActiveMpLobbyRoom(null, []);
        return { deleted: true, lobbies: [] };
      }
      if (payload.action === 'remove_bots' && state.mpLobby) {
        state.mpLobby.players = (state.mpLobby.players || []).filter(p => !p.is_bot);
        renderActiveMpLobbyRoom(state.mpLobby, [state.mpLobby]);
        return { lobby: state.mpLobby };
      }
      if (payload.action === 'vote_concept' && state.mpLobby) {
        const domId = payload.domain_id || 'earth';
        state.conceptVotes = { launch: domId, space: domId, ground: 'helio', user: domId };
        state.conceptVoteWinner = domId;
        state.conceptVoteTiebroken = false;
        state.domainId = domId;
        renderStage1Domains();
        return { lobby: state.mpLobby };
      }
      if (payload.action === 'sync_state' && state.mpLobby) {
        state.mpLobby.shared_state = { ...(state.mpLobby.shared_state || {}), ...(payload.shared_state || {}) };
        applyMpSharedState(state.mpLobby.shared_state);
        return { lobby: state.mpLobby };
      }
      const fallbackCode = payload.code || 'LOCAL4';
      const gm = payload.gamemode === 'sabotage' ? 'sabotage' : 'coop';
      const fallbackLobby = {
        code: fallbackCode,
        name: payload.name || 'Local Crew Lobby',
        host: payload.player_name || 'CDR. PIONEER',
        gamemode: gm,
        visibility: payload.visibility || 'public',
        status: payload.action === 'start' ? 'in_progress' : 'open',
        saboteur_role: gm === 'sabotage' ? 'space' : null,
        players: [
          { name: payload.player_name || 'CDR. PIONEER', role: payload.role || 'launch', is_bot: false, ready: true },
          { name: 'AI-SAGAN', role: 'space', is_bot: true, ready: true },
          { name: 'AI-KRANZ', role: 'ground', is_bot: true, ready: true },
          { name: 'AI-JOHNSON', role: 'user', is_bot: true, ready: true }
        ],
        logs: [{ role: 'ground', text: `Lobby ${fallbackCode} active.` }]
      };
      renderActiveMpLobbyRoom(fallbackLobby, [fallbackLobby]);
      return { lobby: fallbackLobby };
    }
    return null;
  }

  function openMultiplayerLobbyModal(defaultGamemode = null) {
    const modal = document.getElementById('multiplayer-lobby-modal');
    if (!modal) return;
    if (defaultGamemode) {
      const gmSel = document.getElementById('mp-create-gamemode');
      const qpSel = document.getElementById('mp-quickplay-mode');
      if (gmSel) gmSel.value = defaultGamemode;
      if (qpSel) qpSel.value = defaultGamemode;
    }
    modal.classList.add('active');
    modal.style.display = 'flex';
    refreshPublicLobbies();
    renderActiveMpLobbyRoom(state.mpLobby);
    startMpLobbyPolling();
  }

  function launchMultiplayerSessionFromLobby() {
    const lob = state.mpLobby;
    if (lob) state.mpEnteredLobbyCode = lob.code;
    const gm = lob ? lob.gamemode : 'coop';
    state.gameMode = gm === 'sabotage' ? 'sabotage' : 'coop';
    if (state.gameMode === 'sabotage') {
      state.saboteurRole = (lob && lob.saboteur_role) || ['launch', 'space', 'ground', 'user'][Math.floor(Math.random() * 4)];
    } else {
      state.saboteurRole = null;
    }

    const myName = getMpPlayerName().toUpperCase();
    const me = lob && Array.isArray(lob.players) ? lob.players.find(p => p.name.toUpperCase() === myName) : null;
    if (me && me.role) {
      state.userRole = me.role;
    }

    const modal = document.getElementById('multiplayer-lobby-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
    if (DOM.mainMenuOverlay) {
      DOM.mainMenuOverlay.classList.remove('active');
      DOM.mainMenuOverlay.style.display = 'none';
    }
    if (DOM.appContainer) DOM.appContainer.style.display = 'flex';
    if (DOM.hudModeBadge) {
      DOM.hudModeBadge.textContent = state.gameMode === 'sabotage' ? 'SABOTAGE (4P)' : '4P CO-OP';
    }
    if (DOM.rolesBar) DOM.rolesBar.style.display = 'flex';
    if (DOM.saboteurStatusPill) {
      DOM.saboteurStatusPill.style.display = state.gameMode === 'sabotage' ? 'inline-block' : 'none';
    }

    if (lob && lob.shared_state) {
      applyMpSharedState(lob.shared_state);
    }

    startMpLobbyPolling();
    updateMultiplayerStationBar();
    const startStage = (lob && lob.shared_state && lob.shared_state.stage) ? lob.shared_state.stage : 1;
    goToStage(startStage, true);
  }

  function bindNewFeatureListeners() {
    // 1. Main Menu & HUD Leaderboard Buttons
    const menuBtnLb = document.getElementById('menu-btn-leaderboard');
    const hudBtnLb = document.getElementById('btn-open-leaderboard');
    const closeLb = () => {
      const m = document.getElementById('leaderboard-modal');
      if (m) { m.classList.remove('active'); m.style.display = 'none'; }
    };
    if (menuBtnLb) menuBtnLb.addEventListener('click', () => { playBeep(720); openLeaderboardModal(); });
    if (hudBtnLb) hudBtnLb.addEventListener('click', () => { playBeep(720); openLeaderboardModal(); });
    document.getElementById('leaderboard-modal-close')?.addEventListener('click', closeLb);
    document.getElementById('leaderboard-modal-done')?.addEventListener('click', closeLb);
    document.getElementById('btn-submit-leaderboard')?.addEventListener('click', submitCurrentScoreToLeaderboard);

    // 2. Designs Save, Share & Compare Modal Buttons
    const hudBtnDesigns = document.getElementById('btn-open-designs');
    const stage4BtnDesigns = document.getElementById('btn-stage4-designs');
    const closeDesigns = () => {
      const m = document.getElementById('designs-modal');
      if (m) { m.classList.remove('active'); m.style.display = 'none'; }
    };
    if (hudBtnDesigns) hudBtnDesigns.addEventListener('click', () => { playBeep(740); openDesignsModal(); });
    if (stage4BtnDesigns) stage4BtnDesigns.addEventListener('click', () => { playBeep(740); openDesignsModal(); });
    document.getElementById('designs-modal-close')?.addEventListener('click', closeDesigns);
    document.getElementById('designs-modal-done')?.addEventListener('click', closeDesigns);

    document.getElementById('btn-save-current-design')?.addEventListener('click', () => {
      playBeep(900);
      const nameIn = document.getElementById('design-save-name');
      const snap = buildCurrentDesignSnapshot(nameIn ? nameIn.value : '');
      const list = loadSavedDesigns();
      list.unshift(snap);
      saveDesignsToStorage(list);
      const banner = document.getElementById('design-share-banner');
      if (banner) {
        banner.style.display = 'block';
        banner.textContent = `SAVED MISSION DESIGN [${snap.name}]! Share Code: ${encodeDesignShareCode(snap)}`;
      }
      renderDesignsModal(snap.id);
    });

    document.getElementById('btn-copy-current-share-code')?.addEventListener('click', () => {
      playBeep(860);
      const nameIn = document.getElementById('design-save-name');
      const snap = buildCurrentDesignSnapshot(nameIn ? nameIn.value : '');
      const code = encodeDesignShareCode(snap);
      const banner = document.getElementById('design-share-banner');
      if (banner) {
        banner.style.display = 'block';
        banner.textContent = `SHARE CODE COPIED: ${code}`;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
    });

    document.getElementById('btn-import-design-code')?.addEventListener('click', () => {
      const codeIn = document.getElementById('design-import-code');
      const banner = document.getElementById('design-share-banner');
      try {
        const imported = decodeDesignShareCode(codeIn ? codeIn.value : '');
        const list = loadSavedDesigns();
        list.unshift(imported);
        saveDesignsToStorage(list);
        playBeep(1050);
        if (banner) {
          banner.style.display = 'block';
          banner.textContent = `IMPORTED & SAVED DESIGN: [${imported.name}] (${imported.domainName})`;
        }
        renderDesignsModal(imported.id);
      } catch (e) {
        playAlarm();
        if (banner) {
          banner.style.display = 'block';
          banner.textContent = 'Invalid Share Code format. Paste a valid TM1:... mission design code.';
        }
      }
    });

    const selA = document.getElementById('compare-select-a');
    const selB = document.getElementById('compare-select-b');
    const onCompareChange = () => {
      const designs = loadSavedDesigns();
      const currentSnap = buildCurrentDesignSnapshot(`${state.missionName || 'CURRENT'} (Active)`);
      currentSnap.id = '__current__';
      renderDesignComparisonTable([currentSnap, ...designs], selA ? selA.value : '__current__', selB ? selB.value : '');
    };
    selA?.addEventListener('change', onCompareChange);
    selB?.addEventListener('change', onCompareChange);

    // 3. Post-Flight Mission Report Modal (Before Stage 7 Data Refinery)
    if (DOM.btnCompleteFlight) {
      DOM.btnCompleteFlight.addEventListener('click', (e) => {
        if (typeof tutorialState !== 'undefined' && tutorialState.active) return;
        e.stopImmediatePropagation();
        openMissionReportModal();
      }, true);
    }

    document.getElementById('btn-report-save-design')?.addEventListener('click', () => {
      playBeep(920);
      const nameIn = document.getElementById('report-design-name-input');
      const snap = buildCurrentDesignSnapshot(nameIn ? nameIn.value : '');
      const list = loadSavedDesigns();
      list.unshift(snap);
      saveDesignsToStorage(list);
      const fb = document.getElementById('report-share-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.textContent = `MISSION DESIGN SAVED AS "${snap.name}"!`;
      }
    });

    document.getElementById('btn-report-share-design')?.addEventListener('click', () => {
      playBeep(880);
      const nameIn = document.getElementById('report-design-name-input');
      const snap = buildCurrentDesignSnapshot(nameIn ? nameIn.value : '');
      const code = encodeDesignShareCode(snap);
      const fb = document.getElementById('report-share-feedback');
      if (fb) {
        fb.style.display = 'block';
        fb.textContent = `SHAREABLE DESIGN CODE: ${code}`;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
    });

    document.getElementById('btn-report-compare-design')?.addEventListener('click', () => {
      playBeep(840);
      const nameIn = document.getElementById('report-design-name-input');
      const snap = buildCurrentDesignSnapshot(nameIn ? nameIn.value : '');
      const list = loadSavedDesigns();
      if (!list.some(x => x.name === snap.name)) {
        list.unshift(snap);
        saveDesignsToStorage(list);
      }
      openDesignsModal(list[1] ? list[1].id : list[0]?.id);
    });

    document.getElementById('btn-report-vote-saboteur')?.addEventListener('click', () => {
      playBeep(800);
      openSaboteurVoteModal();
    });

    document.getElementById('btn-report-proceed')?.addEventListener('click', () => {
      playBeep(950);
      const m = document.getElementById('mission-report-modal');
      if (m) {
        m.classList.remove('active');
        m.style.display = 'none';
      }
      goToStage(7);
    });

    // 4. Multiplayer Lobby Creation, Quickplay Matchmaking, Station Tasks & Saboteur Voting
    document.getElementById('mp-btn-lobby-hub')?.addEventListener('click', () => {
      playBeep(820);
      openMultiplayerLobbyModal();
    });
    if (DOM.mpBtnCoop) {
      DOM.mpBtnCoop.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        playBeep(840);
        openMultiplayerLobbyModal('coop');
      }, true);
    }
    if (DOM.mpBtnSabotage) {
      DOM.mpBtnSabotage.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        playBeep(840);
        openMultiplayerLobbyModal('sabotage');
      }, true);
    }

    const closeMpLobby = () => {
      const m = document.getElementById('multiplayer-lobby-modal');
      if (m) { m.classList.remove('active'); m.style.display = 'none'; }
    };
    document.getElementById('mp-lobby-modal-close')?.addEventListener('click', closeMpLobby);
    document.getElementById('btn-open-lobby-room')?.addEventListener('click', () => {
      playBeep(760);
      openMultiplayerLobbyModal();
    });

    document.getElementById('btn-mp-refresh-lobbies')?.addEventListener('click', () => {
      playBeep(720);
      refreshPublicLobbies();
    });

    document.getElementById('btn-mp-create-lobby')?.addEventListener('click', async () => {
      playBeep(900);
      const name = document.getElementById('mp-create-name')?.value || `${getMpPlayerName()}'s Mission Room`;
      const gamemode = document.getElementById('mp-create-gamemode')?.value || 'coop';
      const visibility = document.getElementById('mp-create-visibility')?.value || 'public';
      const role = document.getElementById('mp-create-role')?.value || 'launch';
      state.userRole = role;
      await sendLobbyAction({
        action: 'create',
        player_name: getMpPlayerName(),
        name,
        gamemode,
        visibility,
        role
      });
    });

    document.getElementById('btn-mp-join-code')?.addEventListener('click', async () => {
      const code = (document.getElementById('mp-join-code-input')?.value || '').trim().toUpperCase();
      if (!code) return;
      playBeep(860);
      await sendLobbyAction({
        action: 'join',
        code,
        player_name: getMpPlayerName()
      });
    });

    document.getElementById('btn-mp-quickplay')?.addEventListener('click', async () => {
      playBeep(980);
      const gm = document.getElementById('mp-quickplay-mode')?.value || 'any';
      await sendLobbyAction({
        action: 'quickplay',
        player_name: getMpPlayerName(),
        gamemode: gm
      });
    });

    document.getElementById('btn-mp-fill-bots')?.addEventListener('click', async () => {
      playBeep(820);
      if (!state.mpLobby) {
        await sendLobbyAction({
          action: 'create',
          player_name: getMpPlayerName(),
          name: `${getMpPlayerName()}'s Squad`,
          gamemode: document.getElementById('mp-create-gamemode')?.value || 'coop',
          visibility: 'public',
          role: 'launch'
        });
      }
      if (state.mpLobby) {
        await sendLobbyAction({
          action: 'fill_bots',
          code: state.mpLobby.code,
          player_name: getMpPlayerName()
        });
      }
    });

    document.getElementById('btn-mp-remove-bots')?.addEventListener('click', async () => {
      playBeep(660);
      if (!state.mpLobby) {
        showInPageNotice('Join or create a lobby first before removing AI crew.', 'LOBBY NOTICE');
        return;
      }
      await sendLobbyAction({
        action: 'remove_bots',
        code: state.mpLobby.code,
        player_name: getMpPlayerName()
      });
    });

    document.getElementById('btn-mp-delete-lobby')?.addEventListener('click', async () => {
      playBeep(520);
      if (!state.mpLobby) return;
      await sendLobbyAction({
        action: 'delete',
        code: state.mpLobby.code,
        player_name: getMpPlayerName()
      });
    });

    document.getElementById('btn-mp-launch-game')?.addEventListener('click', async () => {
      playBeep(1100);
      if (!state.mpLobby) {
        showInPageNotice('Create or join a lobby room with 4 players first.', '4 PLAYERS REQUIRED');
        return;
      }
      const myName = getMpPlayerName().toUpperCase();
      if (state.mpLobby.host && state.mpLobby.host.toUpperCase() !== myName) {
        showInPageNotice('Only the lobby creator can start Mission Control for the crew.', 'HOST ONLY');
        return;
      }
      const playerCount = (state.mpLobby.players || []).length;
      if (playerCount < 4) {
        playAlarm();
        showInPageNotice(
          `There must be 4 players to start a game (currently ${playerCount}/4).\n\nWait for human crew to join or click "+ FILL AI CREW" so all 4 stations (Launch, Space, Ground, User) are staffed.`,
          '4 PLAYERS REQUIRED'
        );
        return;
      }
      const res = await sendLobbyAction({
        action: 'start',
        code: state.mpLobby.code,
        player_name: getMpPlayerName()
      });
      if (!res || !res.lobby) return;
      state.mpEnteredLobbyCode = res.lobby.code;
      launchMultiplayerSessionFromLobby();
    });

    // Station Role Tabs: roles are locked during the game and cannot be switched
    if (DOM.roleTabs) {
      Object.keys(DOM.roleTabs).forEach(rk => {
        DOM.roleTabs[rk]?.addEventListener('click', () => {
          if (rk !== state.userRole) {
            playAlarm();
            const myTitle = ROLE_DUTY_CONFIG[state.userRole]?.title || state.userRole.toUpperCase();
            showInPageNotice(
              `ROLE LOCKED: You cannot switch roles during the game.\n\nYour assigned station is ${myTitle}. Coordinate with the other 3 players on their stations!`,
              'ROLE SWITCHING DISABLED'
            );
            updateMultiplayerStationBar();
            return;
          }
          playBeep(700);
          updateMultiplayerStationBar();
        });
      });
    }

    document.getElementById('btn-mp-station-task')?.addEventListener('click', executeActiveStationTask);
    document.getElementById('btn-mp-ground-approve')?.addEventListener('click', async () => {
      if (state.gameMode !== 'singleplayer' && state.userRole !== 'ground') {
        playAlarm();
        showInPageNotice('Only the Ground Player station can grant or hold Ground Approval!', 'STATION DUTY');
        return;
      }
      playBeep(820);
      state.groundApproved = !state.groundApproved;
      updateMultiplayerStationBar();
      if (state.mpLobby && state.gameMode !== 'singleplayer') {
        await sendLobbyAction({
          action: 'sync_state',
          code: state.mpLobby.code,
          player_name: getMpPlayerName(),
          shared_state: { groundApproved: state.groundApproved }
        });
      }
    });
    document.getElementById('btn-mp-sabotage-act')?.addEventListener('click', triggerCovertSabotageAction);
    document.getElementById('btn-open-saboteur-vote')?.addEventListener('click', () => {
      playBeep(800);
      openSaboteurVoteModal();
    });

    const closeSabVote = () => {
      const m = document.getElementById('saboteur-vote-modal');
      if (m) { m.classList.remove('active'); m.style.display = 'none'; }
    };
    document.getElementById('saboteur-vote-close')?.addEventListener('click', closeSabVote);
    document.getElementById('saboteur-vote-done')?.addEventListener('click', closeSabVote);
    document.querySelectorAll('.suspect-vote-card[data-suspect]').forEach(card => {
      card.addEventListener('click', () => {
        const suspect = card.getAttribute('data-suspect');
        castSaboteurVote(suspect);
      });
    });
  }

  function init() {
    loadAdvancementsState();
    randomizeDesignVariants();
    state.currentTrend = MARKET_TREND_POOLS[0];
    setTickerText(state.currentTrend.text);
    updatePermanentHud();
    renderStage1Domains();
    setupEventListeners();
    bindNewFeatureListeners();
    updateMultiplayerStationBar();
    startIntroCutscene();

    const startMusicOnGesture = () => ensureBgMusicPlaying();
    document.addEventListener('pointerdown', startMusicOnGesture, { once: true });
    document.addEventListener('keydown', startMusicOnGesture, { once: true });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
