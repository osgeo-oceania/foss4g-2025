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
  aut: { logo: () => import('$images/logos/aut.png?enhanced'), level: LEVELS.VENUE },
  geocat: { logo: () => import('$images/logos/geocat.png?enhanced'), level: LEVELS.GOLD },
  linz: { logo: () => import('$images/logos/linz.png?enhanced'), level: LEVELS.GOLD },
  'newzealand-com': {
    logo: () => import('$images/logos/newzealand-com-shared-white.png?enhanced'),
    level: LEVELS.GOLD
  },
  'osgeo-oceania': { logo: () => import('$images/logos/osgeo-oceania.png?enhanced'), level: LEVELS.PARTNER },
  osgeo: { logo: () => import('$images/logos/osgeo.png?enhanced'), level: LEVELS.PARTNER },
  pgrsc: { logo: () => import('$images/logos/pgrsc.png?enhanced'), level: LEVELS.SUPPORTER },
  qfieldcloud: { logo: () => import('$images/logos/qfieldcloud.png?enhanced'), level: LEVELS.SILVER },
  sotm2025: { logo: () => import('$images/logos/sotm2025.png?enhanced'), level: LEVELS.SUPPORTER },
  sparkgeo: { logo: () => import('$images/logos/sparkgeo.png?enhanced'), level: LEVELS.SILVER + LEVELS.CHILDCARE },
  tomtom: { logo: () => import('$images/logos/tomtom.png?enhanced'), level: LEVELS.BRONZE },
  wdc: { logo: () => import('$images/logos/wdc.png?enhanced'), level: LEVELS.PARTNER }
};
