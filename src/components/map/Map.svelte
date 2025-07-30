<script module lang="ts">
  import { PUBLIC_BASE_PATH } from '$env/static/public';

  import type { StyleSpecification } from 'maplibre-gl';
  import MapLibre from 'maplibre-gl';
  import MapStyles from '../../lib/style';
  import { Protocol } from 'pmtiles';

  import AucklandPmtiles from '../../data/auckland.pmtiles';
  import Bounds from '../../data/bounds.json';

  export class MapState {
    map: MapLibre.Map | null = $state(null);
    mapViewport: MapViewport | null = $state(null);
    mapConfig: MapConfig = $state({
      lang: 'en',
      bounds: Bounds,
      style: MapStyles[0] as MapStyle,
      pmtiles: {
        auckland: AucklandPmtiles
      }
    });

    mapStyle: StyleSpecification = $derived(this.mapConfig.style.style(this.mapConfig));

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

      $effect(() => {
        if (this.mapStyle) {
          this.map?.setStyle(this.mapStyle);
        }
      });
    };
  }
</script>

<script lang="ts">
  import Attribution from './Attribution.svelte';
  import { setContext, onMount } from 'svelte';
  import StyleSwitcher from './StyleSwitcher.svelte';

  let mapContainer: HTMLDivElement;
  let mapState = new MapState();
  setContext<() => MapState>('mapState', () => mapState);

  let { children = null } = $props();

  onMount(() => {
    mapState.initializeMap(mapContainer);
  });
</script>

<div bind:this={mapContainer} class="h-full w-full">
  {@render children?.()}
  <Attribution />
  <StyleSwitcher />
</div>
