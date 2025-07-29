import type { StyleSpecification } from 'maplibre-gl';
import AucklandPmtiles from '../data/auckland.pmtiles';
import Bounds from '../../data/bounds.json';

export const defaultMapConfig: MapConfig = {
  lang: 'en',
  bounds: Bounds,
  pmtiles: {
    auckland: AucklandPmtiles
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
    terrain: { source: 'dem-terrain', exaggeration: 2 },
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
          'background-color': "#79bbf5"
        }
      },
      {
        id: 'coastline',
        source: 'auckland',
        'source-layer': 'coastline',
        type: 'fill',
        paint: {
          'fill-color': '#F2F2F2',
          'fill-opacity': 1
        }
      },
      // {
      //   id: 'coastline-border',
      //   source: 'auckland',
      //   'source-layer': 'coastline',
      //   type: 'line',
      //   paint: {
      //     'line-color': '#79BAC9',
      //     'line-width': [
      //       'interpolate',
      //       ['linear'],
      //       ['zoom'],
      //       12,
      //       5, // width 1 at zoom 12
      //       18,
      //       10 // width 11 at zoom 18
      //     ],
      //     'line-opacity': 1
      //   }
      // },

      // {
      //   id: 'alcohol-control-area',
      //   source: 'auckland',
      //   'source-layer': 'areas',
      //   type: 'fill',
      //   filter: ['==', ['get', 'type'], 'alcohol-control-area'],
      //   layout: {
      //     visibility: 'none'
      //   },
      //   paint: {
      //     'fill-color': 'red',
      //     'fill-opacity': 0.2
      //   }
      // },
      {
        id: 'hillshade',
        source: 'dem-hillshade',
        type: 'hillshade',
        paint: {
          'hillshade-method': 'combined',
          'hillshade-shadow-color': '#F2F2F2',
          'hillshade-highlight-color': '#1B2430',
          'hillshade-accent-color': '#F2F2F2'
        }
      },
      {
        id: 'parks',
        source: 'auckland',
        'source-layer': 'areas',
        type: 'fill',
        filter: ['==', ['get', 'type'], 'park'],
        paint: {
          'fill-color': '#88F15E', // park fill
          'fill-opacity': 0.2
        }
      },

      //
      // roads
      //
      // minor-roads outline
      // {
      //   id: 'minor-roads-outline',
      //   source: 'auckland',
      //   'source-layer': 'roads',
      //   type: 'line',
      //   minzoom: 16,
      //   filter: ['!', ['has', 'hway_num']],
      //   paint: {
      //     'line-color': '#8D9197',
      //     'line-opacity': 1,
      //     'line-width': [
      //       'interpolate',
      //       ['linear'],
      //       ['zoom'],
      //       12,
      //       0.5, // width 1 at zoom 12
      //       18,
      //       2 // width 11 at zoom 18
      //     ]
      //   }
      // },
      // // minor-roads fill
      {
        id: 'minor-roads',
        source: 'auckland',
        'source-layer': 'roads',
        type: 'line',
        minzoom: 14,
        filter: ['!', ['has', 'hway_num']],
        paint: {
          'line-color': '#8D9197',
          'line-opacity': 1,
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            14,
            0.25,
            16,
            1,
            18,
            4
          ]
        }
      },
      // // major-roads fill
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
          'line-color': '#8D9197',
          'line-opacity': 1,
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            12,
            0.5,
            14,
            1,
            18,
            2
          ]
        }
      },

      //
      // buildings
      //
      // {
      //   id: 'buildings-fill',
      //   source: 'auckland',
      //   'source-layer': 'buildings',
      //   type: 'fill',
      //   minzoom: 12,
      //   paint: {
      //     'fill-color': '#fff'
      //   }
      // },
      // {
      //   id: 'buildings-extrusion',
      //   source: 'auckland',
      //   'source-layer': 'buildings',
      //   type: 'fill-extrusion',
      //   minzoom: 12,
      //   paint: {
      //     'fill-extrusion-color': '#fff',
      //     'fill-extrusion-height': ['get', 'height'],
      //     'fill-extrusion-vertical-gradient': true,
      //     'fill-extrusion-opacity': 0.8
      //   }
      // },

      //
      // routes
      //
      // {
      //   id: 'routes-bus',
      //   source: 'auckland',
      //   'source-layer': 'routes',
      //   filter: ['==', ['get', 'type'], 'bus'],
      //   type: 'line',
      //   minzoom: 10,
      //   layout: {
      //     visibility: 'none'
      //   },
      //   paint: {
      //     'line-color': 'black',
      //     'line-width': 0.5,
      //     'line-dasharray': [4, 4]
      //   }
      // },
      {
        id: 'routes-ferry',
        source: 'auckland',
        'source-layer': 'routes',
        filter: ['==', ['get', 'type'], 'ferry'],
        type: 'line',
        minzoom: 12,
        paint: {
          'line-color': '#1B2430',
          'line-width': 0.5,
          'line-dasharray': [4, 4]
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
          'line-width': 1,
          'line-color': [
            'case',
            ['==', ['get', 'number'], 'STH'],
            '#ee3a31',
            ['==', ['get', 'number'], 'WEST'],
            '#8bc750',
            ['==', ['get', 'number'], 'ONE'],
            '#00b1ee',
            ['==', ['get', 'number'], 'EAST'],
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
          'text-font': ['literal', ['Arvo Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#F2F2F2',
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
          'text-font': ['literal', ['Arvo Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#D9EED1',
          'text-halo-width': 0
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
          'text-font': ['literal', ['Arvo Italic']],
          'text-size': 10,
          visibility: 'none'
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#F2F2F2',
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
          'text-font': ['literal', ['Arvo Regular']],
          'text-size': 10,
          'text-max-width': 7
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#F2F2F2',
          'text-halo-width': 1,
          // 'text-halo-blur': 2
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
          'text-font': ['literal', ['Arvo Italic']],
          'text-size': 10
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#57A9BB',
          'text-halo-width': 0
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
          'text-font': ['literal', ['Arvo Regular']],
          'text-size': 16
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#F2F2F2',
          'text-halo-width': 1
        }
      },
      {
        id: 'places-city',
        source: 'auckland',
        'source-layer': 'places',
        type: 'symbol',
        maxzoom: 18, // set a max zoom level
        filter: ['==', ['get', 'type'], 'city'],
        layout: {
          'text-field': name,
          'text-font': ['literal', ['Arvo Regular']],
          'text-size': 20 // used to be 18
        },
        paint: {
          'text-color': '#1B2430',
          'text-halo-color': '#F2F2F2',
          'text-halo-width': 1
        }
      }
    ]
  } as StyleSpecification;
}
