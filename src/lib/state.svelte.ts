import MapLibre from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import type { Map, StyleSpecification } from 'maplibre-gl';
import { PUBLIC_BASE_ORIGIN, PUBLIC_BASE_PATH } from '$env/static/public';

import MapStyle, { defaultMapConfig } from './style';

const protocol = new Protocol();
MapLibre.addProtocol('pmtiles', protocol.tile);
const MapLibreMap = MapLibre.Map;

export class AppState {
  map: Map | null = $state(null);
  mapViewport: MapViewport | null = $state(null);
  mapConfig: MapConfig = $state(defaultMapConfig);

  mapStyle: StyleSpecification = $derived(MapStyle(this.mapConfig));
  mapAttribution = $derived(
    Object.values(this.mapStyle.sources).map((src) => src?.attribution ?? null)
  );

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
      center: [174.76479, -36.85125],
      pitch: 0,

      zoom: 14,
      hash: true,
      style: MapStyle(this.mapConfig)
    });
  };
}

let state = new AppState();

export default state;
