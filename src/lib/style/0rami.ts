import type { StyleSpecification } from 'maplibre-gl';
import Pois from '$data/pois.json';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PUBLIC_BASE_PATH } from '$env/static/public';
import SkyTowerGlb from '$data/sky-tower.glb';
import TreesLocations from '$data/notable-trees.json';
import IndoorAUT from '$data/aut-indoor.json';
import type { MapScene } from '@dvt3d/maplibre-three-plugin';

export default {
  name: 'rami',
  style: (config: MapConfig): StyleSpecification => {
    return {
      version: 8,
      sprite: 'http://{base_url}/sprite/sprite',
      glyphs: 'http://{base_url}/glyphs/{fontstack}/{range}.pbf',
      sources: {
        aut: {
          type: 'geojson',
          data: IndoorAUT
        },
        pois: {
          type: 'geojson',
          data: Pois
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
        // {
        //   id: 'buildings-fill',
        //   source: 'auckland',
        //   'source-layer': 'buildings',
        //   type: 'fill',
        //   minzoom: 13,
        //   paint: {
        //     'fill-color': '#e3dcd9'
        //   }
        // },
        {
          id: 'venue-extrusion',
          source: 'auckland',
          'source-layer': 'buildings-selected',
          type: 'fill-extrusion',
          minzoom: 12,
          filter: ['==', ['get', 'type'], 'venue'],
          paint: {
            'fill-extrusion-color': '#3a7a7f',
            'fill-extrusion-opacity': 0.2,
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-vertical-gradient': true
          }
        },
        {
          id: 'venue-indoor',
          source: 'aut',
          type: 'line',
          minzoom: 12,
          paint: {
            'line-color': 'black'
          }
        },
        {
          id: 'buildings-selected-extrusion',
          source: 'auckland',
          'source-layer': 'buildings-selected',
          type: 'fill-extrusion',
          minzoom: 12,
          filter: ['all', ['!=', ['get', 'type'], 'venue'], ['!=', ['get', 'type'], 'attraction']],
          paint: {
            'fill-extrusion-color': [
              'case',
              ['==', ['get', 'type'], 'lodging'],
              'red',
              ['==', ['get', 'type'], 'venue'],
              '#3a7a7f',
              ['==', ['get', 'type'], 'attraction'],
              'green',
              'black'
            ],
            'fill-extrusion-opacity': [
              'interpolate',
              ['exponential', 2],
              ['zoom'],
              13,
              0,
              16,
              0.85
            ],
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-vertical-gradient': true
          }
        },
        {
          id: 'buildings-extrusion',
          source: 'auckland',
          'source-layer': 'buildings',
          type: 'fill-extrusion',
          minzoom: 12,
          paint: {
            'fill-extrusion-color': 'white',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-vertical-gradient': false,
            'fill-extrusion-opacity': ['interpolate', ['linear'], ['zoom'], 13, 0, 16, 0.5]
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
        // {
        //   id: 'routes-ferry',
        //   source: 'auckland',
        //   'source-layer': 'routes',
        //   filter: ['==', ['get', 'type'], 'ferry'],
        //   type: 'line',
        //   minzoom: 10,
        //   paint: {
        //     'line-color': '#1B2430'
        //   }
        // },
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
            'text-field': ["get", "name"],
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
          filter: ['all', ['==', ['get', 'type'], 'park'], ['>', ['get', 'area'], 0.01]],
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
            'text-field': ["get", "name"],
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
            'text-field': ["get", "name"],
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
            'text-field': ["get", "name"],
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
            'text-field': ["get", "name"],
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
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'text-field': ["get", "name"],
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
          id: 'train-stops',
          source: 'auckland',
          'source-layer': 'stops',
          filter: ['==', ['get', 'type'], 'train'],
          type: 'symbol',
          layout: {
            'icon-image': 'train',
            'icon-size': 0.18,
            'text-anchor': 'left',
            'text-justify': 'left',
            'text-offset': [1, 0],
            'text-field': [
              'step',
              ['zoom'],
              '',
              12,
              ['slice', ['get', 'name'], 0, ['-', ['length', ['get', 'name']], 16]]
            ],
            'text-font': ['literal', ['BellTopo Sans Regular']],
            'text-size': 12
          },
          paint: {
            'text-color': '#3a7a7f',
            'text-halo-color': '#fff',
            'text-halo-width': 1
          }
        },
        {
          id: 'pois-lodging',
          source: 'pois',
          type: 'symbol',
          minzoom: 13,
          filter: ['==', ['get', 'type'], 'lodging'],
          layout: {
            'icon-image': ['get', 'type'],
            'icon-size': 0.2,
            'text-anchor': 'left',
            'text-offset': [1, 0],
            'text-field': ['step', ['zoom'], '', 15, ["get", "name"]],
            'text-font': ['literal', ['BellTopo Sans Regular']],
            'text-size': 12
          },
          paint: {
            'text-color': '#f95d5d',
            'text-halo-color': '#fff',
            'text-halo-width': 1
          }
        },
        {
          id: 'pois-attraction',
          source: 'pois',
          type: 'symbol',
          minzoom: 13,
          filter: ['all', ['==', ['get', 'type'], 'attraction']],
          layout: {
            'icon-image': ['get', 'type'],
            'icon-size': 0.25,
            'icon-anchor': 'bottom',
            'text-anchor': 'top',
            'text-offset': [0, 0.25],
            'text-field': ['step', ['zoom'], '', 13, ["get", "name"]],
            'text-font': ['literal', ['BellTopo Sans Regular']],
            'text-size': 12
          },
          paint: {
            'text-color': '#569b61',
            'text-halo-color': '#fff',
            'text-halo-width': 1
          }
        },
        {
          id: 'pois-event',
          source: 'pois',
          type: 'symbol',
          minzoom: 13,
          filter: ['all', ['==', ['get', 'type'], 'event']],
          layout: {
            'icon-image': ['get', 'type'],
            'icon-size': 0.25,
            'icon-anchor': 'right',
            'text-anchor': 'left',
            'text-allow-overlap': true,
            'text-justify': 'left',
            'text-offset': [0.25, 0],
            'text-field': [
              'step',
              ['zoom'],
              '',
              14,
              [
                'format',
                ['get', 'name'],
                '\n',
                {},
                ['get', 'place'],
                {
                  'text-font': ['literal', ['BellTopo Sans Italic']]
                }
              ]
            ],
            'text-font': ['literal', ['BellTopo Sans Regular']],
            'text-size': 11
          },
          paint: {
            'text-color': 'purple',
            'text-halo-color': '#fff',
            'text-halo-width': 1
          }
        },
        {
          id: 'pois-venue',
          source: 'pois',
          type: 'symbol',
          minzoom: 11,
          filter: ['==', ['get', 'type'], 'venue'],
          layout: {
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'icon-image': 'pin',
            'icon-anchor': 'bottom',
            'icon-size': 0.25,
            'icon-offset': [0, -40],
            'text-offset': [0, 0.2],
            'text-font': ['literal', ['BellTopo Sans Bold']],
            'text-anchor': 'top',
            'text-size': 13
          },
          paint: {
            'text-halo-color': '#fff',
            'text-halo-width': 2,
            'text-halo-blur': 1
          }
        }
      ]
    } as StyleSpecification;
  },
  beforeAdd: (map: maplibregl.Map, mapScene: MapScene) => {
    // if (!map.getLayer('sky-tower'))
    //   map.addLayer({
    //     id: 'sky-tower',
    //     type: 'custom',
    //     renderingMode: '3d', // The layer MUST be marked as 3D in order to get the proper depth buffer with globe depths in it.
    //     onAdd(map, gl) {
    //       this.camera = new THREE.Camera();
    //       this.scene = new THREE.Scene();
    //       // create two three.js lights to illuminate the model
    //       const directionalLight = new THREE.DirectionalLight(0xffffff);
    //       directionalLight.position.set(0, -70, 100).normalize();
    //       this.scene.add(directionalLight);
    //       const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    //       directionalLight2.position.set(0, 70, 100).normalize();
    //       this.scene.add(directionalLight2);
    //       // use the three.js GLTF loader to add the 3D model to the three.js scene
    //       const loader = new GLTFLoader();
    //       loader.load(SkyTowerGlb, (gltf) => {
    //         this.scene.add(gltf.scene);
    //       });
    //       this.map = map;
    //       // use the MapLibre GL JS map canvas for three.js
    //       this.renderer = new THREE.WebGLRenderer({
    //         canvas: map.getCanvas(),
    //         context: gl,
    //         antialias: true
    //       });
    //       this.renderer.autoClear = false;
    //     },
    //     render(gl, args) {
    //       // parameters to ensure the model is georeferenced correctly on the map
    //       const modelOrigin = [174.762182, -36.848453];
    //       const modelAltitude = 20;
    //       // Make the object ~10s of km tall to make it visible at planetary scale.
    //       const scaling = 1.6;
    //       // We can use this API to get the correct model matrix.
    //       // It will work regardless of current projection.
    //       // See MapLibre source code, file "mercator_transform.ts" or "vertical_perspective_transform.ts".
    //       const modelMatrix = map.transform.getMatrixForModel(modelOrigin, modelAltitude);
    //       const m = new THREE.Matrix4().fromArray(args.defaultProjectionData.mainMatrix);
    //       const l = new THREE.Matrix4()
    //         .fromArray(modelMatrix)
    //         .scale(new THREE.Vector3(scaling, scaling, scaling));
    //       this.camera.projectionMatrix = m.multiply(l);
    //       this.renderer.resetState();
    //       this.renderer.render(this.scene, this.camera);
    //       this.map.triggerRepaint();
    //     }
    //   });
  }
};
