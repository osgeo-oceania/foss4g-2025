import MapLibre from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import type { Map } from 'maplibre-gl';
import { PUBLIC_BASE_ORIGIN, PUBLIC_BASE_PATH } from '$env/static/public';
import AucklandPmtiles from "../data/auckland.pmtiles";

import type { MapConfig, MapViewport } from './types';
import MapStyle from './style';

const protocol = new Protocol();
MapLibre.addProtocol('pmtiles', protocol.tile);
const MapLibreMap = MapLibre.Map;

export class AppState {
	map: Map | null = $state(null);
	mapViewport: MapViewport | null = $state(null);
	mapConfig: MapConfig = $state({
		lang: 'en',
		pmtiles: {
			auckland: AucklandPmtiles
		},
		landcover: {
			ocean: {
				color: 'lightblue',
				classes: [-99]
			},
			'built-up': {
				color: 'red',
				classes: [1, 5, 6]
			},
			water: {
				color: 'blue',
				classes: [20, 21, 22]
			},
			cropland: {
				color: 'yellow',
				classes: [30, 33]
			},
			grassland: {
				color: 'orange',
				classes: [40, 41, 43, 44]
			},
			forest: {
				color: 'green',
				classes: [64, 68, 69, 71]
			},
			default: {
				color: 'white',
				classes: [-99]
			}
		}
	});

	initializeMap = (mapContainer: HTMLDivElement) => {
		this.map = new MapLibreMap({
			container: mapContainer,
			transformCameraUpdate: ({ bearing, center, elevation, pitch, roll, zoom }) => {
				this.mapViewport = { bearing, center, elevation, pitch, roll, zoom };
				return this.mapViewport;
			},
			transformRequest: (url) => {
				return {
					url: url.replace('http://{base_url}/', `${PUBLIC_BASE_ORIGIN}${PUBLIC_BASE_PATH}`)
				};
			},
			attributionControl: false, // TODO add custom control
			center: [174.789, -36.8734],
			pitch: 0,

			zoom: 8.48,
			hash: true,
			style: MapStyle(this.mapConfig)
		});
	};
}

let state = new AppState();

export default state;
