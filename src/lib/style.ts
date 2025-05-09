import type { StyleSpecification } from 'maplibre-gl';
import type { MapConfig } from './types';

export default function MapStyle(config: MapConfig): StyleSpecification {
	const name = [
		'case',
		['has', `name:${config['lang']}`],
		['get', `name:${config['lang']}`],
		['in', ' / ', ['get', 'name']],
		config['lang'] == 'en'
			? ['slice', ['get', 'name'], 0, ['index-of', ' / ', ['get', 'name']]]
			: ['slice', ['get', 'name'], ['+', ['index-of', ' / ', ['get', 'name']], 3]],
		['get', 'name']
	];

	const landcoverFillColor = [
		Object.entries(config.landcover)
			.filter(([lcName]) => !['ocean', 'default'].includes(lcName))
			.map(([lcName, lcStyle]) => [lcName, lcStyle.color])
	].flat(3);

	console.log(config);

	return {
		version: 8,
		projection: { type: 'globe' },
		sprite: 'https://protomaps.github.io/basemaps-assets/sprites/v4/light',
		glyphs: '{base_url}/glyphs/{fontstack}/{range}.pbf',
		sources: {
			auckland: {
				type: 'vector',
				url: `pmtiles://${config.pmtiles.auckland}`
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
					'fill-color': '#fff'
				}
			},
			{
				id: 'minor-roads',
				source: 'auckland',
				'source-layer': 'roads',
				type: 'line',
				filter: ['!', ['has', 'hway_num']],
				paint: {
					'line-color': 'black',
          'line-width': 1
				}
			},
			{
				id: 'major-roads',
				source: 'auckland',
				'source-layer': 'roads',
				type: 'line',
				filter: ['has', 'hway_num'],
				paint: {
					'line-color': 'black',
          'line-width': 2
				}
			},
      {
        id: 'buildings-fill',
        source: 'auckland',
        "source-layer": 'buildings',
        type: 'fill',
        paint: {
          'fill-color': '#eee',
        }
      },
      {
        id: 'buildings-outline',
        source: 'auckland',
        "source-layer": 'buildings',
        type: 'line',
        paint: {
          'line-color': '#ccc',
        }
      }
		]
	} as StyleSpecification;
}
