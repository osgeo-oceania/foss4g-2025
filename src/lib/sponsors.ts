export const LEVELS = {
  PLATINUM: 0,
  GOLD: 1,
  SILVER: 2,
  BRONZE: 3,
  PARTNER: 4,
  SUPPORTER: 5,
  CHILDCARE: 10,
  VENUE: 100
};

export default {
  aut: { logo: import('$images/logos/aut.png'), level: LEVELS.VENUE },
  geocat: { logo: import('$images/logos/geocat.png'), level: LEVELS.GOLD },
  linz: { logo: import('$images/logos/linz.png'), level: LEVELS.GOLD },
  'newzealand-com': {
    logo: import('$images/logos/newzealand-com-shared-white.png'),
    level: LEVELS.GOLD
  },
  'osgeo-oceania': { logo: import('$images/logos/osgeo-oceania.png'), level: LEVELS.PARTNER },
  osgeo: { logo: import('$images/logos/osgeo.png'), level: LEVELS.PARTNER },
  pgrsc: { logo: import('$images/logos/pgrsc.png'), level: LEVELS.SUPPORTER },
  qfieldcloud: { logo: import('$images/logos/qfieldcloud.png'), level: LEVELS.SILVER },
  sotm2025: { logo: import('$images/logos/sotm2025.png'), level: LEVELS.SUPPORTER },
  sparkgeo: { logo: import('$images/logos/sparkgeo.png'), level: LEVELS.SILVER + LEVELS.CHILDCARE },
  tomtom: { logo: import('$images/logos/tomtom.png'), level: LEVELS.BRONZE },
  wdc: { logo: import('$images/logos/wdc.png'), level: LEVELS.PARTNER }
};
