<script module lang="ts">
  import { PUBLIC_BASE_PATH } from '$env/static/public';

  import 'maplibre-gl/dist/maplibre-gl.css';
  import type { StyleSpecification } from 'maplibre-gl';
  import MapLibre from 'maplibre-gl';
  import MapStyles from '../../lib/style';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons';
  import * as MTP from '@dvt3d/maplibre-three-plugin';
  import { Protocol } from 'pmtiles';

  import AucklandPmtiles from '../../data/auckland.pmtiles';

  import Bounds from '../../data/bounds.json';

  export class MapState {
    map: MapLibre.Map | null = $state(null);
    mapScene: MTP.MapScene | null = $state(null);
    mapConfig: MapConfig = $state({
      lang: 'en',
      bounds: Bounds,
      style: MapStyles[0] as MapStyle,
      pmtiles: {
        auckland: AucklandPmtiles
      }
    });
    isPreloading: boolean = $state(true);

    mapStyle: StyleSpecification = $derived(this.mapConfig.style.style(this.mapConfig));
    markers: MapLibre.Marker[] = $state([]);

    initializeMap = (mapContainer: HTMLDivElement) => {
      const protocol = new Protocol();
      MapLibre.addProtocol('pmtiles', protocol.tile);

      this.map = new MapLibre.Map({
        container: mapContainer,

        transformRequest: (url) => {
          return {
            url: url.replace('http://{base_url}/', `${window.location.origin}${PUBLIC_BASE_PATH}/`)
          };
        },
        maxPitch: 70,
        attributionControl: false,
        center: [174.766349, -36.849812],
        pitch: 38,
        cancelPendingTileRequestsWhileZooming: false,
        minZoom: 10,
        zoom: 12,
        hash: false,
        style: this.mapStyle
      });

      this.mapScene = new MTP.MapScene(this.map);
      this.mapScene.addLight(new THREE.AmbientLight())

      this.map.once('idle', () => {
        this.map?.flyTo({
          center: [174.766358, -36.852899],
          zoom: 17,
          pitch: 0,
          duration: 10500,
          easing: (x) => 1 - Math.pow(1 - x, 3)
        });
        this.isPreloading = false;
      });

      $effect(() => {
        if (!this.isPreloading && this.map) {
          if ('beforeAdd' in this.mapConfig.style) {
            setTimeout(() => {
              this.mapConfig.style.beforeAdd(this.map);
            }, 0);
          }
          this.map.setStyle(this.mapStyle);
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
  <Attribution />
  <StyleSwitcher />
  {#if mapState.isPreloading}
    <div
      class="loading loading-spinner absolute top-1/2 left-1/2 z-50 w-16 -translate-x-1/2 -translate-y-1/2 transform"
    ></div>
  {/if}
  {@render children?.()}
</div>
