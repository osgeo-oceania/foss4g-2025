export const LEVELS = {
  PLATINUM: 0,
  GOLD: 1,
  SILVER: 2,
  BRONZE: 3,
  VENUE: 4,
  PARTNER: 5,
  SUPPORTER: 6,
  CHILDCARE: 10,
};

export default {
  aut: {
    name: 'AUT',
    logo: () => import('$images/logos/aut.png?enhanced'),
    link: 'https://www.aut.ac.nz/',
    level: LEVELS.VENUE
  },
  geocat: {
    name: 'GeoCAT',
    logo: () => import('$images/logos/geocat.png?enhanced'),
    link: 'https://www.geocat.net/',
    level: LEVELS.GOLD
  },
  linz: {
    name: 'LINZ',
    logo: () => import('$images/logos/linz.png?enhanced'),
    link: 'https://www.linz.govt.nz/',
    level: LEVELS.GOLD
  },
  'newzealand-com': {
    name: 'newzealand.com',
    logo: () => import('$images/logos/newzealand-com-shared-white.png?enhanced'),
    link: 'https://www.newzealand.com/',
    level: LEVELS.GOLD
  },
  'osgeo-oceania': {
    name: 'OSGeo Oceania',
    logo: () => import('$images/logos/osgeo-oceania.png?enhanced'),
    link: 'https://osgeo-oceania.org/',
    level: LEVELS.PARTNER
  },
  osgeo: {
    name: 'OSGeo',
    logo: () => import('$images/logos/osgeo.png?enhanced'),
    link: 'https://www.osgeo.org/',
    level: LEVELS.PARTNER
  },
  pgrsc: {
    name: 'PGRSC',
    logo: () => import('$images/logos/pgrsc.png?enhanced'),
    link: 'https://pgrsc.org/',
    level: LEVELS.SUPPORTER
  },
  qfieldcloud: {
    name: 'QFieldCloud',
    logo: () => import('$images/logos/qfieldcloud.png?enhanced'),
    link: 'https://qfield.cloud/',
    level: LEVELS.SILVER
  },
  sotm2025: {
    name: 'SOTM2025',
    logo: () => import('$images/logos/sotm2025.png?enhanced'),
    link: 'https://2025.stateofthemap.org/',
    level: LEVELS.SUPPORTER
  },
  sparkgeo: {
    name: 'SparkGEO',
    logo: () => import('$images/logos/sparkgeo.png?enhanced'),
    link: 'https://sparkgeo.com/',
    level: LEVELS.SILVER + LEVELS.CHILDCARE
  },
  tomtom: {
    name: 'TomTom',
    logo: () => import('$images/logos/tomtom.png?enhanced'),
    link: 'https://www.tomtom.com/',
    level: LEVELS.BRONZE
  },
  auspatious: {
    name: 'Auspatious',
    logo: () => import('$images/logos/auspatious.png?enhanced'),
    link: 'https://auspatious.com/',
    level: LEVELS.BRONZE
  },
  wdc: {
    name: 'WDC',
    logo: () => import('$images/logos/wdc.png?enhanced'),
    link: 'https://geospatial.whanganui.govt.nz/',
    level: LEVELS.PARTNER
  },
  gscience: {
    name: 'Geoscience Society of NZ',
    logo: () => import('$images/logos/gsnz.gif?enhanced'),
    link: 'https://confer.eventsair.com/gsnz-2025/',
    level: LEVELS.SUPPORTER
  },
  surveyspatial: {
    name: 'Survey & Spatial NZ',
    logo: () => import('$images/logos/survey-and-spatial-nz.png?enhanced'),
    link: 'https://www.surveyspatialnzconference.org/',
    level: LEVELS.SUPPORTER
  }
};
