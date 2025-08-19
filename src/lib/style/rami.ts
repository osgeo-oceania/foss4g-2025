import type { StyleSpecification } from 'maplibre-gl';
import PoiContent from '$data/pois';

export default {
  name: 'rami',
  style: (config: MapConfig): StyleSpecification => {
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

    return {
      version: 8,
      sprite: 'http://{base_url}/sprite/sprite',
      glyphs: 'http://{base_url}/glyphs/{fontstack}/{range}.pbf',
      sources: {
        pois: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: PoiContent.map((poi) => poi.feature)
          }
        },
        auckland: {
          type: 'vector',
          url: `pmtiles://${config.pmtiles.auckland}`,
          attribution:
            '<a href="https://www.linz.govt.nz/" target="_blank">LINZ</a>, <a href="https://www.aucklandcouncil.govt.nz/" target="_blank">Auckland Council</a>'
        },
        'dem-terrain': {
          type: 'raster-dem',
          maxzoom: 12,
          tiles: [
            'https://basemaps.linz.govt.nz/v1/tiles/elevation/WebMercatorQuad/{z}/{x}/{y}.png?api=d01jyfz7gm9zw4kvew5a1zsmk6w&pipeline=terrain-rgb'
          ]
        },
        'dem-hillshade': {
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
            'background-color': '#4795A3'
          }
        },
        {
          id: 'ocean',
          type: 'background',
          paint: {
            'background-pattern': 'ocean'
          }
        },
        {
          id: 'bg-overlay',
          type: 'background',
          paint: {
            'background-color': '#fff',
            'background-opacity': 0.3
          }
        },
        {
          id: 'coastline-glow',
          source: 'auckland',
          'source-layer': 'coastline',
          type: 'line',
          paint: {
            'line-color': '#fff',
            'line-opacity': 0.8,
            'line-width': 3,
            'line-blur': 10
          },
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
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
          id: 'landuse',
          source: 'auckland',
          'source-layer': 'landuse',
          type: 'fill',
          paint: {
            // 'fill-opacity': [
            //   "case",
            //   ['in', 'Residential', ['get', 'zone']],
            //   1, 0
            // ],
            'fill-color': [
              'case',
              [
                'any',
                ['in', 'Business - Town Centre Zone', ['get', 'zone']],
                ['in', 'Business - City Centre Zone', ['get', 'zone']],
                ['in', 'Business - Metropolitan Centre Zone', ['get', 'zone']],
                ['in', 'Business - Local Centre Zone', ['get', 'zone']],
                ['in', 'Business - General Business Zone', ['get', 'zone']]
              ],
              '#f2f2d3',
              ['in', 'Open Space', ['get', 'zone']],
              '#c6eebe',
              ['in', 'Hospital', ['get', 'zone']],
              '#f5d5d5',
              ['in', 'Airport', ['get', 'zone']],
              '#cfcfcf',
              'transparent'
            ]
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

        // {
        //   id: 'parks',
        //   source: 'auckland',
        //   'source-layer': 'areas',
        //   type: 'fill',
        //   filter: ['==', ['get', 'type'], 'park'],
        //   paint: {
        //     'fill-color': '#c6eebe', // park fill
        //     'fill-opacity': 0.5
        //   }
        // },

        //
        // roads
        //
        // minor-roads outline
        // {
        //   id: 'minor-roads-outline',
        //   source: 'auckland',
        //   'source-layer': 'roads',
        //   type: 'line',
        //   filter: ['!', ['has', 'hway_num']],
        //   paint: {
        //     'line-color': '#d1d6e0',
        //     'line-width': [
        //       'interpolate',
        //       ['linear'],
        //       ['zoom'],
        //       12,
        //       1, // width 1 at zoom 12
        //       18,
        //       11 // width 11 at zoom 18
        //     ]
        //   }
        // },
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
              6 // width 10 at zoom 18
            ]
          }
        },
        // major-roads fill
        // {
        //   id: 'major-roads',
        //   source: 'auckland',
        //   'source-layer': 'roads',
        //   type: 'line',
        //   filter: ['has', 'hway_num'],
        //   layout: {
        //     'line-cap': 'round',
        //     'line-join': 'round'
        //   },
        //   paint: {
        //     'line-color': 'white',
        //     'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 14, 4]
        //   }
        // },
        {
          id: 'arterial-roads',
          source: 'auckland',
          'source-layer': 'roads-arterial',
          type: 'line',
          paint: {
            'line-color': '#fff',
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              12,
              1, // width 0.5 at zoom 12
              18,
              10 // width 10 at zoom 18
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
          minzoom: 13,
          paint: {
            'fill-color': '#e3dcd9'
          }
        },
        {
          id: 'buildings-selected-extrusion',
          source: 'auckland',
          'source-layer': 'buildings-selected',
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': [
              'case',
              ['==', ['get', 'type'], 'lodging'],
              'red',
              ['==', ['get', 'type'], 'venue'],
              'yellow',
              ['==', ['get', 'type'], 'attraction'],
              'green',
              'black'
            ],
            'fill-extrusion-opacity': 0.5,
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-vertical-gradient': true
          }
        },
        {
          id: 'buildings-extrusion',
          source: 'auckland',
          'source-layer': 'buildings',
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#e3dcd9',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-vertical-gradient': true,
            'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 12, 0, 16, 0.45]
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
          minzoom: 10,
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
          minzoom: 10,
          paint: {
            'line-color': '#1B2430'
          }
        },
        {
          id: 'routes-train',
          source: 'auckland',
          'source-layer': 'routes',

          filter: ['all', ['==', ['get', 'type'], 'train'], ['!=', ['get', 'number'], 'HUIA']],
          type: 'line',
          minzoom: 10,
          paint: {
            'line-width': 2,
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
          filter: [
            'all',
            ['==', ['get', 'type'], 'suburb'],
            ['!=', ['get', 'name'], 'Auckland Central']
          ],
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
          maxzoom: 13, // set a max zoom level
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
        },
        {
          id: 'pois-lodging',
          source: 'pois',
          type: 'symbol',
          filter: ['==', ['get', 'type'], 'lodging'],
          layout: {
            'icon-image': ['get', 'type'],
            'icon-size': 0.25,
            'text-anchor': 'left',
            'text-offset': [1, 0],
            'text-field': ["step", ["zoom"], "", 14, name],
            'text-font': ['literal', ['BellTopo Sans Regular']],
            'text-size': 12
          },
          paint: {
            'text-color': '#f95d5d',
            'text-halo-color': '#fff',
            'text-halo-width': 1
          }
        }
      ]
    } as StyleSpecification;
  }
};
