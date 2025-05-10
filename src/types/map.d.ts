import type { LngLat } from 'maplibre-gl';

declare global {
	export type LandcoverType =
		| 'ocean'
		| 'default'
		| 'built-up'
		| 'water'
		| 'cropland'
		| 'grassland'
		| 'forest';

	export interface LandcoverStyle {
		color: string;
		pattern?: string;
		classes: number[];
	}

	export interface MapConfig {
		lang: 'en' | 'mi';
		pmtiles: {
			[sourceName: string]: string;
		};
		bounds: {
			[type in 'mapdata' | 'viewport']: number[];
		};
		landcover: {
			[type in LandcoverType]: LandcoverStyle;
		};
	}

	export interface MapViewport {
		bearing: number;
		center: LngLat;
		elevation: number;
		pitch: number;
		roll: number;
		zoom: number;
	}
}

export {};