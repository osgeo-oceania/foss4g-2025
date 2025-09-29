<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';

  const mapState = getContext<() => MapState>('mapState')();
  let isOpen: boolean = $state(false);
  import mapStyles from '$lib/style';
  import { Source } from 'three';

  const mapSources = [
    {
      name: 'Buildings',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/101290-nz-building-outlines/'
    },
    {
      name: 'Coastline',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/51153-nz-coastlines-and-islands-polygons-topo-150k/'
    },
    {
      name: 'Road Centrelines',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/50329-nz-road-centrelines-topo-150k/'
    },
    {
      name: 'Places',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/51681-nz-place-names-nzgb/'
    },
    {
      name: 'Suburbs & Localities',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/113764-nz-suburbs-and-localities/'
    },
    {
      name: 'Airports',
      source: 'LINZ',
      link: 'https://data.linz.govt.nz/layer/50237-nz-airport-polygons-topo-150k/'
    },
    {
      name: 'Parks',
      source: 'Auckland Council',
      link: 'https://data-aucklandcouncil.opendata.arcgis.com/datasets/3135043373ba48b7a9b5240370cb53ac_0/explore'
    },
    {
      name: 'Alcohol Control Area',
      source: 'Auckland Council',
      link: 'https://data-aucklandcouncil.opendata.arcgis.com/datasets/af300c4cc33b4dff8218394a1eeefe50_0/explore'
    },
    {
      name: 'Bus Routes',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::busservice?layer=2'
    },
    {
      name: 'Bus Stops',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::busservice?layer=0'
    },
    {
      name: 'Ferry Routes',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::ferryservice?layer=1'
    },
    {
      name: 'Ferry Stops',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::ferryservice?layer=1'
    },
    {
      name: 'Train Routes',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::trainservice?layer=1'
    },
    {
      name: 'Train Stations',
      source: 'Auckland Council',
      link: 'https://data-atgis.opendata.arcgis.com/datasets/ATgis::trainservice?layer=0'
    },
    {
      name: 'Arterial Roads',
      source: 'Auckland Council',
      link: 'https://www.arcgis.com/home/item.html?id=4673e8f3f20942d7a21cfcb36971e103'
    },
    {
      name: 'Unitary Plan Base Zone',
      source: 'Auckland Council',
      link: 'https://data-aucklandcouncil.opendata.arcgis.com/datasets/232d7b39839d4616bcbfc0509e26d9b3_0/explore'
    }
  ];
</script>

{#snippet MapSquare(style: MapStyle, isActive: boolean)}
  <button
    class="btn btn-lg bg-primary btn-square relative aspect-square h-18 w-18 items-center justify-center rounded-lg border-0 p-0.5 !text-xs font-normal hover:cursor-pointer"
    onclick={() => {
      if (style.name != 'Streets') {
        mapState.isLoading = true;

        const bgSourceLoaded = (e) => {
          if (e.isSourceLoaded && e.sourceId == 'bg') {
            mapState.isLoading = false;
            mapState.map?.off('sourcedata', bgSourceLoaded);
          }
        };
        mapState.map?.on('sourcedata', bgSourceLoaded);
        mapState.map?.once('move', () => (mapState.isPreloading = false));
      }

      mapState.mapConfig.style = style;
    }}
  >
    <enhanced:img src={style.image} class={'h-full w-full overflow-clip rounded-md'} />
    <div
      class="text-shadow absolute bottom-0 left-0 z-50 flex w-full items-center justify-center gap-x-0.5 pb-0.5"
      class:text-shadow-md={style.textColor == 'white'}
      class:text-shadow-black={style.textColor == 'white'}
      style={`color: ${style.textColor}`}
    >
      {#if isActive}
        <span class="icon-[tabler--stack] text-primary -ml-1 h-4 w-4"></span>
      {/if}
      <span class="font-sans text-[11px]">{isActive ? 'Layers' : style.name}</span>
    </div>
  </button>
{/snippet}

<div
  class="group absolute bottom-1 left-1 rounded-md sm:bottom-2 sm:left-2"
  onmouseleave={(e) => {
    console.log('leave');
    isOpen = false;
  }}
  onmouseout={(e) => {
    console.log('out');
  }}
>
  <div
    class="invisible absolute bottom-0 left-0 z-10 flex max-h-0 max-w-0 flex-col-reverse overflow-hidden rounded-lg border-4 border-transparent shadow-lg transition-all duration-300 ease-out sm:border-8"
    class:visible={isOpen}
    class:max-h-96={isOpen}
    class:max-w-96={isOpen}
    class:border-white={isOpen}
    class:bg-white={isOpen}
    onmouseleave={(e) => {
      console.log('leave');
      isOpen = false;
    }}
  >
    <div class="flex gap-x-1 sm:gap-x-2">
      {@render MapSquare(mapState.mapConfig.style, true)}
      {#each mapStyles as mapStyle}
        {#if mapStyle.name != mapState.mapConfig.style.name}
          {@render MapSquare(mapStyle, false)}
        {/if}
      {/each}
    </div>
    <div class="mb-2 flex flex-col overflow-visible whitespace-nowrap">
      <div class="-mb-1 font-serif text-sm">FOSS4G 2025 Auckland Map</div>
      <div class="border-b-primary border-b py-1 text-xs whitespace-nowrap italic">
        &quot;100% Free and Open Source&quot;
      </div>
      <div class="pt-2">
        <label class="btn btn-xs" for="poisModal"
          ><span class="icon-[lucide--download]"></span> Download POIs</label
        >
        <label class="btn btn-xs" for="mapInfoModal"
          ><span class="icon-[bi--info-circle]"></span> About the Map</label
        >
      </div>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 z-50 border-4 border-transparent sm:border-8"
    ontouchend={() => (isOpen = true)}
    onmouseover={() => (isOpen = true)}
  >
    {@render MapSquare(mapState.mapConfig.style, true)}
  </div>
</div>

<!-- POIs modal -->
<input type="checkbox" id="poisModal" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">This modal works with a hidden checkbox!</p>
    <div class="modal-action">
      <label for="poisModal" class="btn">Close!</label>
    </div>
  </div>
</div>

<!-- Map Info modal -->
<input type="checkbox" id="mapInfoModal" class="modal-toggle" checked />
<div class="modal" role="dialog">
  <div class="modal-box max-w-96">
    <div class="flex items-center border-b border-b-black font-serif text-lg">Map Information</div>
    <div class="flex w-full flex-col">
      <div class="divider divider-start text-base">
        <span class="icon-[gis--satellite-earth] -mr-2 ml-1 h-10 w-10"></span>Data Sources
      </div>
      <div class="card bg-base-300 rounded-box grid p-2">
        <div>
          <div class="text-base">LINZ (Land Information New Zealand)</div>
          <div class="flex flex-wrap ml-2">
            {#each mapSources.filter((source) => source.source == 'LINZ') as mapSource}
              <a class="inline-flex items-center sm:w-36 mr-2 sm:mr-0" href={mapSource.link}>
                <span class="underline">{mapSource.name}</span>
                <span class="icon-[lucide--external-link] ml-0.5"></span></a
              >
            {/each}
          </div>
        </div>
        <div>
          <div class="mt-2 text-base">Auckland Council</div>
          <div class="flex flex-wrap ml-2">
            {#each mapSources.filter((source) => source.source == 'Auckland Council') as mapSource}
              <a class="inline-flex items-center sm:w-36 mr-2 sm:mr-0" href={mapSource.link}>
                <span class="underline">{mapSource.name}</span>
                <span class="icon-[lucide--external-link] ml-0.5"></span></a
              >
            {/each}
          </div>
        </div>
        <div>
          <div class="text-base mt-2">0% OpenStreetMap Data</div></div>
      </div>
      <div class="divider divider-start text-base">
        <span class="icon-[gis--split-line] -mr-2 ml-1 h-10 w-10"></span> Data Processing
      </div>
      <div class="card bg-base-300 rounded-box grid h-20">content</div>
      <div class="divider divider-start text-base">Source Code</div>
    </div>
    <div class="modal-action">
      <label for="mapInfoModal" class="btn btn-sm">close</label>
    </div>
  </div>
</div>

<a href="https://data.linz.govt.nz/layer/101290-nz-building-outlines/">buildings</a>
