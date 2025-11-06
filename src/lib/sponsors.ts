export const LEVELS = {
  PLATINUM: 0,
  GOLD: 1,
  SILVER: 2,
  BRONZE: 3,
  VENUE: 4,
  PARTNER: 5,
  SUPPORTER: 6,
  CHILDCARE: 10,
  WOMEN_IN_GEOSPATIAL_BREAKFAST: 11
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
  isprs: {
    name: 'ISPRS',
    logo: () => import('$images/logos/isprs.png?enhanced'),
    link: 'https://www.isprs.org/',
    level: LEVELS.SUPPORTER
  },
  qfieldcloud: {
    name: 'QFieldCloud',
    logo: () => import('$images/logos/qfieldcloud.png?enhanced'),
    link: 'https://qfield.cloud/',
    level: LEVELS.SILVER
  },
  sparkgeo: {
    name: 'SparkGEO',
    logo: () => import('$images/logos/sparkgeo.png?enhanced'),
    link: 'https://sparkgeo.com/',
    level: LEVELS.SILVER
  },
  sparkgeochildcare: {
    name: 'SparkGEO-Childcare',
    logo: () => import('$images/logos/sparkgeo.png?enhanced'),
    link: 'https://sparkgeo.com/',
    level: LEVELS.CHILDCARE
  },
  sotm2025: {
    name: 'SOTM2025',
    logo: () => import('$images/logos/sotm2025.png?enhanced'),
    link: 'https://2025.stateofthemap.org/',
    level: LEVELS.SUPPORTER
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
  geosolutions: {
    name: 'GeoSolutions',
    logo: () => import('$images/logos/geosolutions.png?enhanced'),
    link: 'https://www.geosolutionsgroup.com/',
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
  },
  qgisau: {
    name: 'QGIS Australia',
    logo: () => import('$images/logos/qgisau.png?enhanced'),
    link: 'https://qgis-australia.org/',
    level: LEVELS.SUPPORTER
  },
  aws: {
    name: 'AWS',
    logo: () => import('$images/logos/aws-logo.png?enhanced'),
    link: 'https://aws.amazon.com/',
    level: LEVELS.GOLD
  },
  devseed: {
    name: 'Development Seed',
    logo: () => import('$images/logos/devseed.png?enhanced'),
    link: 'https://developmentseed.org/',
    level: LEVELS.SILVER
  },
  spc: {
    name: 'SPC',
    logo: () => import('$images/logos/spc.png?enhanced'),
    link: 'https://www.spc.int/',
    level: LEVELS.GOLD
  },
  dep: {
    name: 'Digital Earth Pacific',
    logo: () => import('$images/logos/dep.png?enhanced'),
    link: 'https://digitalearthpacific.org/',
    level: LEVELS.GOLD
  },
  spcwis: {
    name: 'SPC',
    logo: () => import('$images/logos/spc.png?enhanced'),
    link: 'https://www.spc.int/',
    level: LEVELS.WOMEN_IN_GEOSPATIAL_BREAKFAST
  },
  depwis: {
    name: 'Digital Earth Pacific',
    logo: () => import('$images/logos/dep.png?enhanced'),
    link: 'https://digitalearthpacific.org/',
    level: LEVELS.WOMEN_IN_GEOSPATIAL_BREAKFAST
  },
  gaia3d: {
    name: 'Gaia3D',
    logo: () => import('$images/logos/gaia3d.png?enhanced'),
    link: 'https://www.gaia3d.com/eng',
    level: LEVELS.SILVER
  },
  geoscience_australia: {
    name: 'GeoScience Australia',
    logo: () => import('$images/logos/geoscience-australia.png?enhanced'),
    link: 'https://www.ga.gov.au/',
    level: LEVELS.SILVER
  },
  cng: {
    name: 'CNG / Source.coop',
    logo: () => import('$images/logos/cng.png?enhanced'),
    link: 'https://cloudnativegeo.org/',
    level: LEVELS.SILVER
  },
  terria: {
    name: 'Terria',
    logo: () => import('$images/logos/terria.png?enhanced'),
    link: 'https://terria.io/',
    level: LEVELS.SILVER
  },
  arkedgespace: {
    name: 'ArkEdge Space',
    logo: () => import('$images/logos/arkedgespace.png?enhanced'),
    link: 'https://arkedgespace.com/en',
    level: LEVELS.SILVER
  },
  reearth: {
    name: 'Re:Earth',
    logo: () => import('$images/logos/reearth.png?enhanced'),
    link: 'https://reearth.io/home',
    level: LEVELS.PLATINUM
  }
};
