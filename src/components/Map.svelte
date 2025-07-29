<script lang="ts">
  import MapLibre from 'maplibre-gl';
  import { Protocol } from 'pmtiles';
  import type { StyleSpecification } from 'maplibre-gl';
  import { PUBLIC_BASE_PATH } from '$env/static/public';

  import AucklandPmtiles from '../data/auckland.pmtiles';
  import Bounds from '../data/bounds.json';
  import MapStyle from '../lib/style/rami';
  import Attribution from './Attribution.svelte';
  import { setContext, onMount } from 'svelte';

  class MapState {
    map: MapLibre.Map | null = $state(null);
    mapViewport: MapViewport | null = $state(null);
    mapConfig: MapConfig = $state({
      lang: 'en',
      bounds: Bounds,
      pmtiles: {
        auckland: AucklandPmtiles
      }
    });

    mapStyle: StyleSpecification = $derived(MapStyle.style(this.mapConfig));
    mapAttribution = $derived([
      ...new Set(
        Object.values(this.mapStyle.sources)
          .filter((src) => src.type != 'video' && src.type != 'image')
          .map((src) => src?.attribution?.split(', ') ?? null)
          .flat()
      )
    ]);

    initializeMap = (mapContainer: HTMLDivElement) => {
      const protocol = new Protocol();
      MapLibre.addProtocol('pmtiles', protocol.tile);

      this.map = new MapLibre.Map({
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
        bearing: -10,
        pitch: 45,

        zoom: 11,
        hash: true,
        style: this.mapStyle
      });
    };
  }
  let mapState = new MapState();
  let mapContainer: HTMLDivElement;
  setContext('mapState', mapState);
  
  let { children = null } = $props();

  onMount(() => {
    mapState.initializeMap(mapContainer);
  });
</script>

<div bind:this={mapContainer} class="h-full w-full">
  {@render children?.()}
  <Attribution />
</div>
