/* ==========================================================================
   THE MISSIONEERS // NASA SPACE MISSION DESIGN & ECONOMY ENGINE
   Complete Systems Engineering, All 26 NASA Instruments, Refinery & Gameplay
   ========================================================================== */

(function() {
  'use strict';

  const tablerLine = (paths, extraClass = '') => `<svg class="inline-vec-icon tabler-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const tablerFill = (paths, colorClass = '') => `<svg class="inline-vec-icon tabler-icon tabler-filled ${colorClass}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${paths}</svg>`;
  const tablerHybridFill = (paths, colorClass = '') => `<svg class="inline-vec-icon tabler-icon tabler-filled ${colorClass}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const ICONS = {
    rocket: tablerHybridFill('<path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" fill="none" /><path d="M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="#0f172a" />', 'ti-cyan'),
    satellite: tablerHybridFill('<path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414" /><path d="M6 10l-3 3l3 3l3 -3" fill="none" /><path d="M10 6l3 -3l3 3l-3 3" fill="none" /><path d="M12 12l1.5 1.5" fill="none" /><path d="M14.5 17a2.5 2.5 0 0 0 2.5 -2.5" fill="none" /><path d="M15 21a6 6 0 0 0 6 -6" fill="none" />', 'ti-cyan'),
    dish: tablerLine('<path d="M20 4v8" /><path d="M16 4.5v7" /><path d="M12 5v16" /><path d="M8 5.5v5" /><path d="M4 6v4" /><path d="M20 8h-16" />'),
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
    vaultViewMode: 'grid'
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
    gameNoticeOk: document.getElementById('game-notice-ok')
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
  }

  function goToStage(stageNum) {
    closeScreenCoachOverlay();
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
      card.dataset.domainId = dom.id;

      card.innerHTML = `
        <div class="domain-icon">${dom.icon}</div>
        <h3>${dom.name}</h3>
        <p class="domain-desc">${dom.desc}</p>
        <div class="domain-meta-row">
          <span>&Delta;V: <strong class="text-amber">${dom.baseDeltaV} km/s</strong></span>
          <span>Transit: <strong>${dom.transitDurationSec}s</strong></span>
          <span>Return Shield: <strong class="${dom.requiresHeatShield ? 'text-crimson' : 'text-emerald'}">${dom.requiresHeatShield ? 'YES' : 'NO'}</strong></span>
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
      if (!rocket) buildIssues.push('Missing Launch Rocket: Select a Launch Vehicle in 1. Launch Segment.');
      if (!bus) buildIssues.push('Missing Space Bus: Select a Spacecraft Bus in 2. Space Segment.');
      if (!ground) buildIssues.push('Missing Ground Station: Select a Ground Network in 3. Ground Segment.');
    }

    if ((isAdv || rocket) && totalMass > maxMass) {
      buildIssues.push(
        isAdv
          ? `Mass Exceeded (${totalMass.toLocaleString()} / ${maxMass.toLocaleString()} kg): Increase the "Rocket Max Payload Mass" slider in 1. Launch Segment, or lower "Fuel Capacity" / sensors.`
          : `Mass Exceeded (${totalMass.toLocaleString()} / ${maxMass.toLocaleString()} kg): Upgrade to a heavier Launch Rocket in 1. Launch Segment or reduce Bus Sizing / sensors.`
      );
    }
    if ((isAdv || bus) && powerConsumed > powerGen) {
      buildIssues.push(
        isAdv
          ? `Insufficient Power (${powerConsumed} / ${powerGen} W): Increase the "Bus Solar/RTG Power" slider in 2. Space Segment, or unequip high-power sensors.`
          : `Insufficient Power (${powerConsumed} / ${powerGen} W): Select a higher-power Spacecraft Bus in 2. Space Segment or unequip high-power sensors.`
      );
    }
    if ((isAdv || bus) && volumeUsed > maxVolume) {
      buildIssues.push(
        isAdv
          ? `Bus Volume Full (${volumeUsed.toFixed(1)} / ${maxVolume.toFixed(1)} m³): Increase the "Spacecraft Bus Volume" slider in 2. Space Segment, or equip fewer sensors.`
          : `Bus Volume Full (${volumeUsed.toFixed(1)} / ${maxVolume.toFixed(1)} m³): Increase Bus Sizing in 2. Space Segment or equip fewer sensors.`
      );
    }
    if ((isAdv || rocket) && velocityDV < state.tempResources.reqVelocity) {
      buildIssues.push(
        isAdv
          ? `Not enough Delta-V (${velocityDV.toFixed(1)} / ${state.tempResources.reqVelocity.toFixed(1)} km/s): Increase "Base Rocket Velocity (ΔV)" slider or change fuel (e.g. Hydrolox/Methalox) in 1. Launch Segment.`
          : `Not enough Delta-V (${velocityDV.toFixed(1)} / ${state.tempResources.reqVelocity.toFixed(1)} km/s): Upgrade your Rocket or switch to Hydrolox/Methalox fuel in 1. Launch Segment.`
      );
    }
    if (!sandbox && totalCost > state.budget) {
      buildIssues.push(
        isAdv
          ? `Over Budget ($${totalCost.toLocaleString()} / $${state.budget.toLocaleString()}): Lower slider targets (Payload Mass, Delta-V, Power, or Reliability) or claim an Emergency Grant below.`
          : `Over Budget ($${totalCost.toLocaleString()} / $${state.budget.toLocaleString()}): Pick lower-cost hardware or claim an Emergency Grant below.`
      );
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
        titleEl.textContent = 'BUILD & VERIFY BLOCKED — FIX THESE ITEMS:';
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
          grantBtn.textContent = 'CLAIM EMERGENCY GRANT (+$150,000 | -8 REP)';
          grantBtn.addEventListener('click', () => {
            state.budget += 150000;
            state.reputation = Math.max(0, state.reputation - 8);
            playBeep(720);
            updatePermanentHud();
            calculateTempResources();
          });
          DOM.buildVerifyIssues.appendChild(grantBtn);
        }
      }
    }

    DOM.btnNextStage4.disabled = !isValid;
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
      updatePermanentHud();
    }

    state.flight = {
      segment: 'launch',
      progress: 0,
      running: true,
      paused: false,
      elapsedMs: 0,
      lastTickMs: performance.now(),
      milestonesDone: {},
      launchIntegrity: 100,
      spaceIntegrity: 100,
      groundIntegrity: 100,
      dataAccumulatedMB: 0,
      anomalyActive: false,
      activeAnomalyData: null,
      anomalyUrgentSeconds: 15,
      anomalyUrgentTimer: null
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
        '3. When flight finishes, click ENTER USER SEGMENT to refine and sell your data.',
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
        showInPageNotice('MISSION FAILURE: Atmospheric Re-entry burned up your biological samples because no Heat Shield was installed!', 'MISSION FAILURE');
      } else if (state.selectedDomain.requiresHeatShield && state.selections.heatShieldInstalled) {
        logFlightMessage('RE-ENTRY SUCCESS: PICA-X heat shield protected the biological sample return capsule during splashdown!', false, 'shield');
      }

      state.flight.segment = 'done';
      DOM.flightPhaseName.textContent = 'MISSION FLIGHT OPERATIONS COMPLETE';
      logFlightMessage('MISSION COMPLETED: Downlinked telemetry verified. Proceed to User Segment.', false, 'trophy');
      DOM.btnCompleteFlight.style.display = 'block';
      if (typeof tutorialOnFlightComplete === 'function') tutorialOnFlightComplete();
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
      const penalty = 300000;
      state.budget = Math.max(0, state.budget - penalty);
      updatePermanentHud();
      showInPageNotice(`UNADDRESSED LAUNCH FAILURE!\nPropellant valve rupture resulted in catastrophic vehicle explosion. You lost -$${penalty.toLocaleString()} in salvage fees and the mission immediately failed.`, 'LAUNCH FAILURE');
      goToStage(7);
    } else if (anomaly.seg === 'space') {
      state.flight.spaceIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      showInPageNotice(`UNADDRESSED SPACE FAILURE!\nSensors suffered electrical burnout. Zero data collected.`, 'SPACE SEGMENT FAILURE');
    } else if (anomaly.seg === 'ground') {
      state.flight.groundIntegrity = 0;
      state.flight.dataAccumulatedMB = 0;
      showInPageNotice(`UNADDRESSED GROUND FAILURE!\nTracking dish drifted completely out of line of sight. All data lost.`, 'GROUND SEGMENT FAILURE');
    }
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
      logFlightMessage(`ANOMALY RESOLVED: ${anomaly.seg.toUpperCase()} station stabilized the issue!`, false, 'check');
      DOM.anomalyAlertBox.style.display = 'none';
      state.flight.anomalyActive = false;
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
        : `${ICONS.check} Stored datasets retain 100% of their scientific value across cycles`;
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
    showInPageNotice(`L4 MASTER DATASET FORGED!\nSynthesized ${proj.items.length} datasets into 1 L4 Master Dataset worth $${proj.projectedVal.toLocaleString()} (immune to cycle degradation)!`, 'L4 SPLICING COMPLETE');
  }

  function sellDataToBuyer(buyerType) {
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
    }
    state.reputation = Math.max(0, Math.min(100, state.reputation + repDelta));

    playBeep(payout > 0 ? 1200 : 800);
    const flagshipNote = state.reputation >= 100 ? '\n100-Reputation Flagship Partner Bonus Active (+25% Payout & +$150k/Cycle)!' : '';
    showInPageNotice(`Data sold to ${buyerType.toUpperCase()}!\nCash Earned: $${payout.toLocaleString()}\nReputation Change: ${repDelta >= 0 ? '+' : ''}${repDelta}${flagshipNote}`, 'DATA SALE COMPLETE');

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
      if (!isInfiniteBudget()) {
        state.budget += 150000;
        state.reputation = Math.max(0, state.reputation - 8);
        updatePermanentHud();
        showInPageNotice('NASA Emergency Grant approved: +$150,000 added to budget. (-8 Reputation)');
      } else {
        showInPageNotice('Sandbox Mode already has ∞ Budget & ∞ Reputation!');
      }
    });

    DOM.btnLoanBank.addEventListener('click', () => {
      playBeep(880);
      state.budget += 250000;
      state.activeDebt += 275000;
      updatePermanentHud();
      showInPageNotice('Commercial Bank Loan approved: +$250,000 received. $275,000 debt added.');
    });

    DOM.btnPayDebt.addEventListener('click', () => {
      if (state.activeDebt <= 0) {
        showInPageNotice('You have no active debt.');
        return;
      }
      if (state.budget < state.activeDebt) {
        // partial pay
        const pay = state.budget;
        state.budget = 0;
        state.activeDebt -= pay;
        playBeep(900);
        showInPageNotice(`Partial debt payment of $${pay.toLocaleString()} processed. Remaining debt: $${state.activeDebt.toLocaleString()}.`);
      } else {
        state.budget -= state.activeDebt;
        state.activeDebt = 0;
        playBeep(1200);
        showInPageNotice('Debt fully paid off! Your credit standing is pristine.', 'DEBT CLEARED');
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
    { selector: '.resource-box.budget', text: 'Your total money to buy rockets, sensors & lab work.' },
    { selector: '.resource-box.rep', text: 'Reputation unlocks Tier 2 sensors & boosts data prices.' },
    { selector: '#btn-open-vault', text: 'View all science datasets you currently own.' },
    { selector: '#btn-open-settings', text: 'Change sound volume, text size, or spacecraft design mode.' },
    { selector: '#btn-return-menu', text: 'Go back to the Main Menu.' },
    { selector: '#trends-ticker', text: 'Live Market Trend! Click to lock/unlock bonus payouts.' },
    { selector: '#domain-grid', text: 'Pick where your mission goes (Earth, Planets, Sun, Deep Space, Life).' },
    { selector: '#btn-next-stage1', text: 'Continue to choose your science sensors.' },
    { selector: '#data-types-container', text: 'Pick what measurements & NASA sensors to fly.' },
    { selector: '#btn-next-stage2', text: 'Continue to review mission requirements.' },
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
    } catch (e) {}
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
      title: '5. OUTLINE REQUIREMENTS',
      text: 'Click OUTLINE REQUIREMENTS to review the physics and power limits for your mission.',
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

  function playCutsceneCue(sceneIdx) {
    if (!cutsceneSoundEnabled || masterVolume <= 0) return;
    try {
      initAudio();
      if (!audioCtx || audioCtx.state !== 'running') return;
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

  function startIntroCutscene() {
    if (!DOM.introCutscene || !DOM.cutsceneStage) return;
    const scenes = Array.from(DOM.cutsceneStage.querySelectorAll('.cutscene-scene'));
    if (scenes.length === 0) return;

    let masterTl = null;
    let fallbackTimer = null;
    let activeSceneIdx = 0;
    let justUnlockedByPointer = false;

    const updateSoundBtnLabel = () => {
      if (!DOM.btnCutsceneSound) return;
      DOM.btnCutsceneSound.textContent = cutsceneSoundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
    };

    const unlockAudioOnGesture = () => {
      try {
        initAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
          justUnlockedByPointer = true;
          setTimeout(() => { justUnlockedByPointer = false; }, 450);
          audioCtx.resume().then(() => {
            if (cutsceneSoundEnabled) playCutsceneCue(activeSceneIdx);
          }).catch(() => {});
        }
      } catch {}
    };
    unlockAudioOnGesture();
    document.addEventListener('pointerdown', unlockAudioOnGesture, { once: true });
    document.addEventListener('keydown', unlockAudioOnGesture, { once: true });

    if (DOM.btnCutsceneSound) {
      DOM.btnCutsceneSound.addEventListener('click', (e) => {
        e.stopPropagation();
        try { initAudio(); } catch {}
        // If pointerdown just unlocked AudioContext on this click, keep AUDIO: ON instead of toggling OFF
        if (justUnlockedByPointer || (audioCtx && audioCtx.state === 'suspended')) {
          justUnlockedByPointer = false;
          cutsceneSoundEnabled = true;
          updateSoundBtnLabel();
          if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => playCutsceneCue(activeSceneIdx)).catch(() => {});
          } else {
            playCutsceneCue(activeSceneIdx);
          }
          return;
        }
        cutsceneSoundEnabled = !cutsceneSoundEnabled;
        if (cutsceneSoundEnabled) {
          try { playCutsceneCue(activeSceneIdx); } catch {}
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

    if (window.gsap) {
      const g = window.gsap;
      g.set(scenes, { autoAlpha: 0, scale: 0.96 });
      masterTl = g.timeline({ onComplete: finishCutscene });

      // Scene 0: Orbital Target Lock
      masterTl
        .call(() => { setSceneUI(0); playCutsceneCue(0); })
        .to(scenes[0], { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
        .fromTo(scenes[0].querySelector('.cs-reticle'), { rotation: -120, scale: 1.7, opacity: 0 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.25, ease: 'expo.out' }, '<0.08')
        .to(scenes[0].querySelector('.cs-earth-body'), { scale: 1.06, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<0.1')
        .to(scenes[0].querySelector('.cs-planet-ringed'), { y: -14, x: -10, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<')
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

      // Scene 3: Rocket Liftoff & Orbital Arc
      masterTl
        .call(() => { setSceneUI(3); playCutsceneCue(3); })
        .to(scenes[3], { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .fromTo(scenes[3].querySelector('.cs-traj-arc'), { strokeDashoffset: 160, opacity: 0.2 }, { strokeDashoffset: 0, opacity: 1, duration: 2.1, ease: 'power1.inOut' }, '<0.1')
        .fromTo(scenes[3].querySelector('.cs-rocket-ship'), { y: 30, x: 0, rotation: 0 }, { y: -315, x: 520, rotation: 52, duration: 2.2, ease: 'power2.inOut' }, '<0.1')
        .to(scenes[3].querySelector('.cs-plume'), { scaleY: 1.5, opacity: 0.85, duration: 0.14, repeat: 14, yoyo: true }, '<')
        .to(scenes[3], { autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, '+=0.9');

      // Scene 4: Anomaly Shockwave, Shield & Downlink Stream
      masterTl
        .call(() => { setSceneUI(4); playCutsceneCue(4); })
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

  function init() {
    state.currentTrend = MARKET_TREND_POOLS[0];
    setTickerText(state.currentTrend.text);
    updatePermanentHud();
    renderStage1Domains();
    setupEventListeners();
    startIntroCutscene();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
