import MapLibre from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import type { Map, StyleSpecification } from 'maplibre-gl';
import { PUBLIC_BASE_PATH } from '$env/static/public';

import MapStyle, { defaultMapConfig } from './style';

const protocol = new Protocol();
MapLibre.addProtocol('pmtiles', protocol.tile);
const MapLibreMap = MapLibre.Map;

export class AppState {
  map: Map | null = $state(null);
  mapViewport: MapViewport | null = $state(null);
  mapConfig: MapConfig = $state(defaultMapConfig);

  mapStyle: StyleSpecification = $derived(MapStyle(this.mapConfig));
  mapAttribution = $derived([
    ...new Set(
      Object.values(this.mapStyle.sources)
        .filter((src) => src.type != 'video' && src.type != 'image')
        .map((src) => src?.attribution?.split(', ') ?? null)
        .flat()
    )
  ]);

  initializeMap = (mapContainer: HTMLDivElement) => {
    this.map = new MapLibreMap({
      container: mapContainer,
      transformCameraUpdate: ({ bearing, center, elevation, pitch, roll, zoom }) => {
        this.mapViewport = { bearing, center, elevation, pitch, roll, zoom };
        return this.mapViewport;
      },
      transformRequest: (url) => {
        return {
          url: url.replace('http://{base_url}/', `${window.location.origin}${PUBLIC_BASE_PATH}/`)
        };
      },
      maxPitch: 70,
      attributionControl: false, // TODO add custom control
      center: [174.7668, -36.85775],
      bearing: 172.4,
      pitch: 70,

      zoom: 14,
      hash: true,
      style: this.mapStyle
    });
  };
}

let state = new AppState();

export default state;
