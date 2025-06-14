import type { StyleSpecification } from 'maplibre-gl';
import AucklandPmtiles from '../data/auckland.pmtiles';
import Bounds from '../data/bounds.json';

export const defaultMapConfig: MapConfig = {
  lang: 'en',
  bounds: Bounds,
  pmtiles: {
    auckland: AucklandPmtiles
  },
  landcover: {
    ocean: {
      color: '#ADE0EB',
      classes: [-99]
    },
    'built-up': {
      color: '#e5e7eb',
      classes: [1, 5, 6]
    },
    water: {
      color: '#ADE0EB',
      classes: [20, 21, 22]
    },
    cropland: {
      color: '#fed7aa',
      classes: [30, 33]
    },
    grassland: {
      color: '#fde68a',
      classes: [40, 41, 43, 44]
    },
    forest: {
      color: '#a7f3d0',
      classes: [64, 68, 69, 71]
    },
    default: {
      color: '#fecdd3',
      classes: [-99]
    }
  }
};

export default function MapStyle(config: MapConfig): StyleSpecification {
  const name = [
    'case',
    ['has', `name:${config['lang']}`],
    ['get', `name:${config['lang']}`],
    ['in', ' / ', ['get', 'name']],
    config['lang'] == 'en'
      ? ['slice', ['get', 'name'], ['+', ['index-of', ' / ', ['get', 'name']], 3]]
      : ['slice', ['get', 'name'], 0, ['index-of', ' / ', ['get', 'name']]],
    ['get', 'name']
  ];

  // const landcoverFillColor = [
  // 	Object.entries(config.landcover)
  // 		.filter(([lcName]) => !['ocean', 'default'].includes(lcName))
  // 		.map(([lcName, lcStyle]) => [lcName, lcStyle.color])
  // ].flat(3);

  return {
    version: 8,
    projection: { type: 'globe' },
    sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
    glyphs: 'http://{base_url}/glyphs/{fontstack}/{range}.pbf',
    sources: {
      auckland: {
        type: 'vector',
        url: `pmtiles://${config.pmtiles.auckland}`,
        attribution:
          '<a href="https://www.linz.govt.nz/" target="_blank">LINZ</a>, <a href="https://www.aucklandcouncil.govt.nz/" target="_blank">Auckland Council</a>'
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': config.landcover.ocean.color
        }
      },
      {
        id: 'coastline',
        source: 'auckland',
        'source-layer': 'coastline',
        type: 'fill',
        paint: {
          'fill-color': '#ece7e4' // colour for land fill
        }
      },
      {
        id: 'alcohol-control-area',
        source: 'auckland',
        'source-layer': 'alcohol-control-area',
        type: 'fill',
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-color': 'red'
        }
      },
      {
        id: 'parks',
        source: 'auckland',
        'source-layer': 'parks',
        type: 'fill',
        paint: {
          'fill-color': '#c6eebe' // park fill
        }
      },
      // minor-roads outline
      {
        id: 'minor-roads',
        source: 'auckland',
        'source-layer': 'roads',
        type: 'line',
        filter: ['!', ['has', 'hway_num']],
        paint: {
          'line-color': '#d1d6e0',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, 1,   // width 1 at zoom 12
            18, 11    // width 11 at zoom 18
            ]
        }
      },
      // minor-roads fill
      {
        id: 'minor-roads',
        source: 'auckland',
        'source-layer': 'roads',
        type: 'line',
        filter: ['!', ['has', 'hway_num']],
        paint: {
          'line-color': '#fff',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, 0.5,   // width 0.5 at zoom 12
            18, 10    // width 10 at zoom 18
            ]
        }
      },
      // major-roads outline
      {
        id: 'major-roads-outline',
        source: 'auckland',
        'source-layer': 'roads',
        type: 'line',
        filter: ['has', 'hway_num'],
        paint: {
          'line-color': '#fff',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            6, 1.5,   // width 1.5 at zoom 6
            18, 11  // width 10 at zoom 18
            ]
        }
      },
      // major-roads fill
      {
        id: 'major-roads',
        source: 'auckland',
        'source-layer': 'roads',
        type: 'line',
        filter: ['has', 'hway_num'],
        paint: {
          'line-color': '#c4b7ab',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            6, 1,    // width 1 at zoom 6
            18, 9    // width 9 at zoom 18
          ]
        }
      },
      {
        id: 'buildings-fill',
        source: 'auckland',
        'source-layer': 'buildings',
        type: 'fill',
        minzoom: 13.5,
        paint: {
          'fill-color': '#ccc'
        }
      },
      // {
      // 	id: 'buildings-outline',
      // 	source: 'auckland',
      // 	'source-layer': 'buildings',
      // 	type: 'line',
      // 	paint: {
      // 		'line-color': '#ccc'
      // 	}
      // },
      {
        id: 'places-bay',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'Bay'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': 'darkblue',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      },
      {
        id: 'places-hill',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'Hill'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Regular']],
          'text-size': 10
        },
        paint: {
          'text-color': 'darkgreen',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      },
      {
        id: 'places-suburb',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'Suburb'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': '#222',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
          'text-halo-blur': 2
        }
      },
      {
        id: 'places-island',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'Island'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Regular']],
          'text-size': 12
        },
        paint: {
          'text-color': '#aaa',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      },
      {
        id: 'places-town',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'Town'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Bold']],
          'text-size': 14
        },
        paint: {
          'text-color': '#111',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      },
      {
        id: 'places-city',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'City'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Bold']],
          'text-size': 18
        },
        paint: {
          'text-color': '#111',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      }
    ]
  } as StyleSpecification;
}
