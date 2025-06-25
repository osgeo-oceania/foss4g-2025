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
  aut: { name: 'AUT', logo: () => import('$images/logos/aut.png?enhanced'), level: LEVELS.VENUE },
  geocat: {
    name: 'GeoCAT',
    logo: () => import('$images/logos/geocat.png?enhanced'),
    level: LEVELS.GOLD
  },
  linz: { name: 'LINZ', logo: () => import('$images/logos/linz.png?enhanced'), level: LEVELS.GOLD },
  'newzealand-com': {
    name: 'newzealand.com',
    logo: () => import('$images/logos/newzealand-com-shared-white.png?enhanced'),
    level: LEVELS.GOLD
  },
  'osgeo-oceania': {
    name: 'OSGeo Oceania',
    logo: () => import('$images/logos/osgeo-oceania.png?enhanced'),
    level: LEVELS.PARTNER
  },
  osgeo: {
    name: 'OSGeo',
    logo: () => import('$images/logos/osgeo.png?enhanced'),
    level: LEVELS.PARTNER
  },
  pgrsc: {
    name: 'PGRSC',
    logo: () => import('$images/logos/pgrsc.png?enhanced'),
    level: LEVELS.SUPPORTER
  },
  qfieldcloud: {
    name: 'QFieldCloud',
    logo: () => import('$images/logos/qfieldcloud.png?enhanced'),
    level: LEVELS.SILVER
  },
  sparkgeo: {
    name: 'SparkGeo',
    logo: () => import('$images/logos/sparkgeo.png?enhanced'),
    level: LEVELS.SILVER
  },
  sparkgeocc: {
    name: 'SparkGeo',
    logo: () => import('$images/logos/sparkgeo.png?enhanced'),
    level: LEVELS.CHILDCARE
  },
  sotm2025: {
    name: 'SOTM2025',
    logo: () => import('$images/logos/sotm2025.png?enhanced'),
    level: LEVELS.SUPPORTER
  },
  tomtom: {
    name: 'TomTom',
    logo: () => import('$images/logos/tomtom.png?enhanced'),
    level: LEVELS.BRONZE
  },
  wdc: { name: 'WDC', logo: () => import('$images/logos/wdc.png?enhanced'), level: LEVELS.PARTNER }
};
