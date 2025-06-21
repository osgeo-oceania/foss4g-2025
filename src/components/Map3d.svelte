<script lang="ts">
  import {
    COORDINATE_SYSTEM,
    Deck,
    _GlobeView,
    OrthographicView,
    OrbitView,
    MapView
  } from '@deck.gl/core';
  import { Tile3DLayer, TileLayer } from '@deck.gl/geo-layers';
  import { BitmapLayer } from 'deck.gl';
  import { Matrix4 } from 'math.gl';
  import { I3SLoader } from '@loaders.gl/i3s';
  import { onMount } from 'svelte';

  const dataUrl =
    'https://tiles.arcgis.com/tiles/n4yPwebTjJCmXB6W/arcgis/rest/services/A6334_Auckland_NZTM2000/SceneServer/layers/0';
  let map3dContainer: HTMLDivElement;

  onMount(() => {
    //const dataCenterEPSG2193 = [1758528.944394019, 2961017.0593078234, 11.746076949013514];
    // const modelMatrix = new Matrix4()
    //   //.translate([-dataCenterEPSG2193[0] / 2, -dataCenterEPSG2193[1] / 2, 0])
    //   .scale([0.00001, 0.00001, 1]);
    const coordinateSystem = COORDINATE_SYSTEM.METER_OFFSETS;
    const target = [0, 0, 0];

    const deckInstance = new Deck({
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
          coordinateOrigin: [1758528.944394019, 2961017.0593078234],
          // modelMatrix: modelMatrix,
          onTileLoad: (tile) => {
            console.log('tile', tile);
          },
          onTilesetLoad: (tileset) => {
            // Recenter to cover the tileset
            console.log(tileset);

            // const { cartographicCenter, zoom } = tileset;
            // deckInstance.setProps({
            //   initialViewState: {
            //     target: cartographicCenter,
            //     zoom: zoom,
            //   }
            // });
            // const [longitude, latitude, z] = tileset.cartographicCenter ?? [0,0,0];

            // deckInstance.setProps({
            //   viewState: {
            //     longitude: longitude * 180 / Math.PI,
            //     latitude: longitude * 180 / Math.PI,
            //     zoom: 4
            //   }
            // });
          },
          coordinateSystem: coordinateSystem
        })
      ]
    });
  });
</script>

<div bind:this={map3dContainer} class="absolute top-0 left-0 h-full w-full"></div>
