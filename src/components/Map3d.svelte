<script lang="ts">
  import {
    COORDINATE_SYSTEM,
    Deck,
    MapView
  } from '@deck.gl/core';
  import { Tile3DLayer, TileLayer } from '@deck.gl/geo-layers';
  import { I3SLoader } from '@loaders.gl/i3s';
  import { onMount } from 'svelte';

  const dataUrl =
    'https://tiles.arcgis.com/tiles/n4yPwebTjJCmXB6W/arcgis/rest/services/A6334_Auckland_NZTM2000/SceneServer/layers/0';
  let map3dContainer: HTMLDivElement;

  onMount(() => {
    const coordinateSystem = COORDINATE_SYSTEM.METER_OFFSETS;

    const deck = new Deck({
      parent: map3dContainer,
      initialViewState: {
        longitude: 0,
        latitude: 0,
        zoom: -5,
        minZoom: -200,
        maxZoom: 200
      },
      views: new MapView({
        id: '3d',
        controller: true,
        fovy: 180,
        orthographic: false
      }),
      controller: true,
      layers: [
        // new TileLayer({
        //   data: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        //   tileSize: 256,
        //   renderSubLayers: (props) => {
        //     const {
        //       // @ts-ignore
        //       bbox: { west, south, east, north }
        //     } = props.tile;

        //     return new BitmapLayer(props, {
        //       data: undefined,
        //       image: props.data,
        //       bounds: [west, south, east, north]
        //     });
        //   }
        // }),
        new Tile3DLayer({
          data: dataUrl,
          // @ts-ignore
          loader: I3SLoader,
          loadOptions: {
            i3s: { useCompressedTextures: false, coordinateSystem: coordinateSystem }
          },
          onTileLoad: (tile) => {
            console.log(tile);
          },
          onTilesetLoad: (tileset) => {
            console.log(tileset);
          },
          coordinateSystem: coordinateSystem
        })
      ]
    });
  });
</script>

<div bind:this={map3dContainer} class="absolute top-0 left-0 h-full w-full"></div>
