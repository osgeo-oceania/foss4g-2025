import type { StyleSpecification } from 'maplibre-gl';
import AucklandPmtiles from '../../data/auckland.pmtiles';
import Bounds from '../../data/bounds.json';

export const defaultMapConfig: MapConfig = {
  lang: 'en',
  bounds: Bounds,
  pmtiles: {
    auckland: AucklandPmtiles
  },
  landcover: {
    ocean: {
      color: '#79bbf5',
      classes: [-99]
    },
    'built-up': {
      color: '#e5e7eb',
      classes: [1, 5, 6]
    },
    water: {
      color: '#79bbf5',
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
    terrain: { source: 'dem-terrain', exaggeration: 1.5 },
    sources: {
      auckland: {
        type: 'vector',
        url: `pmtiles://${config.pmtiles.auckland}`,
        attribution:
          '<a href="https://www.linz.govt.nz/" target="_blank">LINZ</a>, <a href="https://www.aucklandcouncil.govt.nz/" target="_blank">Auckland Council</a>'
      },
      "dem-terrain": {
        type: 'raster-dem',
        maxzoom: 12,
        tiles: [
          'https://basemaps.linz.govt.nz/v1/tiles/elevation/WebMercatorQuad/{z}/{x}/{y}.png?api=d01jyfz7gm9zw4kvew5a1zsmk6w&pipeline=terrain-rgb'
        ]
      },
      "dem-hillshade": {
        type: 'raster-dem',
        maxzoom: 13,
        tiles: [
          'https://basemaps.linz.govt.nz/v1/tiles/elevation/WebMercatorQuad/{z}/{x}/{y}.png?api=d01jyfz7gm9zw4kvew5a1zsmk6w&pipeline=terrain-rgb'
        ]
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
        'source-layer': 'areas',
        type: 'fill',
        filter: ['==', ['get', 'type'], 'alcohol-control-area'],
        layout: {
          visibility: 'none'
        },
        paint: {
          'fill-color': 'red',
          'fill-opacity': 0.2
        }
      },
      {
        id: 'hillshade',
        source: 'dem-hillshade',
        type: 'hillshade',
        paint: {
          'hillshade-method': 'combined'
        }
      },
      {
        id: 'parks',
        source: 'auckland',
        'source-layer': 'areas',
        type: 'fill',
        filter: ['==', ['get', 'type'], 'park'],
        paint: {
          'fill-color': '#8EEA64', // park fill
          'fill-opacity': 0.5
        }
      },

      //
      // roads
      //
      // minor-roads outline
      {
        id: 'minor-roads-outline',
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
            12,
            1, // width 1 at zoom 12
            18,
            11 // width 11 at zoom 18
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
            12,
            0.5, // width 0.5 at zoom 12
            18,
            10 // width 10 at zoom 18
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
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': '#d1d6e0',
          'line-width': [
            'interpolate',
            ['exponential',1.5],
            ['zoom'],
            3,
            1.3, // width 1.3 at zoom 3
            18,
            23 // width 23 at zoom 18
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
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'white',
          'line-width': [
            'interpolate',
            ['exponential',1.5],
            ['zoom'],
            3,
            0.8, // width 0.8 at zoom 3
            18,
            22 // width 22 at zoom 18
          ]
        }
      },
      //
      // buildings
      //
      {
        id: 'buildings-fill',
        source: 'auckland',
        'source-layer': 'buildings',
        type: 'fill',
        minzoom: 12,
        paint: {
          'fill-color': '#e3dcd9'
        }
      },
      {
        id: 'buildings-extrusion',
        source: 'auckland',
        'source-layer': 'buildings',
        type: 'fill-extrusion',
        minzoom: 12,
        paint: {
          'fill-extrusion-color': '#e3dcd9',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-vertical-gradient': true,
          'fill-extrusion-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12, 0, // no extrusion opacity at zoom 12
            16, 0.5 // 50% extrusion opacity at zoom 16
          ]
        }
      },

      //
      // routes
      //
      {
        id: 'routes-bus',
        source: 'auckland',
        'source-layer': 'routes',
        filter: ['==', ['get', 'type'], 'bus'],
        type: 'line',
        minzoom: 12,
        layout: {
          visibility: 'none'
        },
        paint: {
          'line-color': 'black'
        }
      },
      {
        id: 'routes-ferry',
        source: 'auckland',
        'source-layer': 'routes',
        filter: ['==', ['get', 'type'], 'ferry'],
        type: 'line',
        minzoom: 12,
        paint: {
          'line-color': '#2795F6',
          'line-dasharray': [4, 2] // 4px dash, 2px gap
        }
      },
      {
        id: 'routes-train',
        source: 'auckland',
        'source-layer': 'routes',

        filter: ['all', ['==', ['get', 'type'], 'train'], ['!=', ['get', 'number'], 'HUIA']],
        type: 'line',
        minzoom: 12,
        paint: {
          'line-width': 2,
          'line-color': [
            'case',
            ['==', ['get', 'number'], 'STH'], // red line for Southern Line
            '#ee3a31',
            ['==', ['get', 'number'], 'WEST'], // green line for Western Line
            '#8bc750',
            ['==', ['get', 'number'], 'ONE'], // blue line for Onehunga Line
            '#00b1ee',
            ['==', ['get', 'number'], 'EAST'], // yellow line for Eastern Line
            '#fcb52d',
            'black'
          ],
          'line-offset': [
            'case',
            ['==', ['get', 'number'], 'STH'],
            2,
            ['==', ['get', 'number'], 'WEST'],
            -2,
            ['==', ['get', 'number'], 'ONE'],
            4,
            ['==', ['get', 'number'], 'EAST'],
            -4,
            0
          ]
        }
      },
      //
      // places labels
      //
      {
        id: 'places-bay',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        minzoom: 13,
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
        id: 'places-park',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        minzoom: 10,
        filter: ['==', ['get', 'type'], 'park'],
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['literal', ['BellTopo Sans Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': 'green',
          'text-halo-color': '#fff',
          'text-halo-width': 1
        }
      },

      {
        id: 'places-hill',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        filter: ['==', ['get', 'type'], 'hill'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Regular']],
          'text-size': 10,
          visibility: 'none'
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
        minzoom: 12,
        filter: ['==', ['get', 'type'], 'suburb'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Italic']],
          'text-size': 10,
          'text-max-width': 7
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
        filter: ['==', ['get', 'type'], 'island'],
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
        filter: ['==', ['get', 'type'], 'town'],
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
        maxzoom: 14, // set a max zoom level
        filter: ['==', ['get', 'type'], 'city'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['BellTopo Sans Bold']], // DIN Pro Medium or a Roboto Medium
          'text-size': 20 // used to be 18
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