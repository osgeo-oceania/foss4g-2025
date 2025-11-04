import type { LngLat, StyleSpecification } from 'maplibre-gl';
import type { Picture } from 'imagetools-core';

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

  export interface MapStyle {
    name: string;
    image: Picture;
    style: (config: MapConfig) => StyleSpecification
  }

  export interface MapConfig {
    lang: 'en' | 'mi';
    style: MapStyle;
    pmtiles: {
      [sourceName: string]: string;
    };
    bounds: {
      [type in 'mapdata' | 'viewport']: number[];
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
