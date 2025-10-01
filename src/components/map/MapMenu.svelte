<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';
  import poisGeojson from '$data/pois.json';

  import fileSaver from 'file-saver';
  import tokml from 'tokml';

  const poisTransformed = {
    type: 'FeatureCollection',
    features: poisGeojson.features
      .filter((feat) => feat.properties.type != 'lodging')
      .map((feat) => ({
        ...feat,
        properties: {
          name:
            feat.properties.type == 'event'
              ? `${feat.properties.name} - ${feat.properties.event} on ${feat.properties.date}`
              : feat.properties.name
        }
      }))
  };

  const mapState = getContext<() => MapState>('mapState')();
  let isOpen: boolean = $state(false);
  import mapStyles from '$lib/style';

  const software = [
    {
      name: 'GDAL',
      category: 'processing',
      link: 'https://gdal.org/'
    },
    {
      name: 'QGIS',
      category: 'processing',
      link: 'https://qgis.org/'
    },
    {
      name: 'planetiler',
      category: 'processing',
      link: 'https://github.com/onthegomap/planetiler'
    },
    { name: 'rasterio', category: 'processing', link: 'https://rasterio.readthedocs.io/' },
    { name: 'geopandas', category: 'processing', link: 'https://geopandas.org/' },
    {
      name: 'exactextract',
      category: 'processing',
      link: 'https://github.com/isciences/exactextract'
    },
    { name: 'MapLibre', category: 'visualization', link: 'https://maplibre.org' },
    { name: 'Svelte', category: 'visualization', link: 'https://svelte.dev/' },
    { name: 'PMTiles', category: 'visualization', link: 'https://docs.protomaps.com/' },
    { name: 'three.js', category: 'visualization', link: 'https://threejs.org/' }
  ];

  const sourceCode = [
    {
      name: 'MapLibre Svelte Component',
      link: 'https://github.com/rami-dv/foss4g-2025/blob/main/src/components/map/Map.svelte'
    },
    {
      name: 'MapLibre Streets Style',
      link: 'https://github.com/rami-dv/foss4g-2025/blob/main/src/lib/style/streets.ts'
    },
    {
      name: 'Calculate building heights with LINZ building footprints, DEM and DSM, using GDAL and exactextract',
      link: 'https://github.com/rami-dv/foss4g-2025/blob/main/src/scripts/buildings.py'
    },
    {
      name: 'Planetiler config for vector tile building from LINZ & Auckland Council data',
      link: 'https://github.com/rami-dv/foss4g-2025/blob/main/src/scripts/config/planetiler.yml'
    }
  ];

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


      name: 'Unitary Plan Base',
      source: 'Auckland Council',
      link: 'https://data-aucklandcouncil.opendata.arcgis.com/datasets/232d7b39839d4616bcbfc0509e26d9b3_0/explore'
    },
    {
      name: 'Notable Trees',
      source: 'Auckland Council',
      link: 'https://data-aucklandcouncil.opendata.arcgis.com/datasets/notable-trees-overlay'
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

<div class="group absolute bottom-1 left-1 rounded-md sm:bottom-2 sm:left-2">
  <div
    class="invisible absolute bottom-0 left-0 z-10 flex max-h-0 max-w-0 flex-col-reverse overflow-hidden rounded-lg border-4 border-transparent shadow-lg transition-all duration-300 ease-out sm:border-8"
    class:visible={isOpen}
    class:max-h-96={isOpen}
    class:max-w-96={isOpen}
    class:border-white={isOpen}
    class:bg-white={isOpen}
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
        <label class="btn btn-xs font-normal" for="poisModal"
          ><span class="icon-[lucide--download]"></span> Download POIs</label
        >
        <label class="btn btn-xs font-normal" for="mapInfoModal"
          ><span class="icon-[bi--info-circle]"></span> About the Map</label
        >
      </div>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 z-50 border-4 border-transparent sm:border-8"
    ontouchend={() => (isOpen = true)}
    onmouseover={() => (isOpen = true)}
    onfocusout={() => (isOpen = false)}
  >
    {@render MapSquare(mapState.mapConfig.style, true)}
  </div>
</div>

<!-- POIs modal -->
<input type="checkbox" id="poisModal" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box max-h-[60vh] max-w-96">
    <div class="flex items-center border-b border-b-black font-serif text-lg">
      Download Map POIs
    </div>
    <div class="mt-2 text-xs">
      Click the buttons below to download the Points of Interest (POIs) of the conference, including
      the conference venue, events, and activities.
    </div>
    <div class="my-4 flex justify-center gap-x-2">
      <button
        class="btn btn-xs font-normal"
        onclick={() => {
          const kmlString = tokml(poisTransformed);

          const blob = new Blob([kmlString], { type: 'application/vnd.google-earth.kml+xml' });
          fileSaver.saveAs(blob, 'foss4g2025.kml');
        }}><span class="icon-[lucide--download]"></span> Download KML</button
      >
      <button class="btn btn-xs font-normal" onclick={() => window.alert('Sorry, we ran out of shapefiles!')}
        ><span class="icon-[lucide--download]"></span> Download SHP</button
      >
    </div>
    <div class="modal-action mt-2">
      <label for="poisModal" class="btn btn-sm">Close!</label>
    </div>
  </div>
  <label class="modal-backdrop font-normal" for="poisModal">Close</label>
</div>

<!-- Map Info modal -->
<input type="checkbox" id="mapInfoModal" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box max-h-[60vh] max-w-96">
    <div class="flex items-center border-b border-b-black font-serif text-lg">Map Information</div>
    <div class="flex w-full flex-col">
      <div class="divider divider-start text-base">
        <span class="icon-[gis--satellite-earth] -mr-2 ml-1 h-10 w-10"></span>Data Sources
      </div>
      <div class="card bg-base-300 rounded-box grid p-2">
        <div>
          <div class="text-sm">LINZ (Land Information New Zealand)</div>
          <div class="ml-2 flex flex-wrap">
            {#each mapSources.filter((source) => source.source == 'LINZ') as mapSource}
              <a
                class="mr-2 block items-center sm:mr-0 sm:w-36"
                target="_blank"
                href={mapSource.link}
              >
                <span class="underline text-xs">{mapSource.name}</span>
                <span class="icon-[lucide--external-link] ml-0.5"></span></a
              >
            {/each}
          </div>
        </div>
        <div>
          <div class="mt-2 text-base">Auckland Council</div>
          <div class="ml-2 flex flex-wrap">
            {#each mapSources.filter((source) => source.source == 'Auckland Council') as mapSource}
              <a
                class="mr-2 block items-center sm:mr-0 sm:w-36"
                target="_blank"
                href={mapSource.link}
              >
                <span class="underline text-xs">{mapSource.name}</span>
                <span class="icon-[lucide--external-link] ml-0.5"></span></a
              >
            {/each}
          </div>
        </div>
        <div>
          <div class="mt-2 text-base">3D Models</div>
          <div class="ml-2 flex flex-wrap">
            <a
              href="https://www.printables.com/model/402895-auckland-sky-tower-new-zealand"
              class="mr-2 block items-center sm:mr-0 sm:w-36"
              target="_blank"
              ><span class="underline text-xs">Sky Tower</span>
              <span class="icon-[lucide--external-link] ml-0.5"></span></a
            >
            <a
              href="https://free3d.com/3d-model/low_poly_tree-816203.html"
              class="mr-2 block items-center sm:mr-0 sm:w-36"
              target="_blank"
              ><span class="underline text-xs">Tree</span>
              <span class="icon-[lucide--external-link] ml-0.5"></span></a
            >
          </div>
        </div>
        <div>
          <div class="mt-2 text-base">0% OpenStreetMap Data</div>
        </div>
      </div>
      <div class="divider divider-start text-base">
        <span class="icon-[gis--split-line] -mr-2 ml-1 h-10 w-10"></span>Software
      </div>
      <div class="card bg-base-300 rounded-box grid p-2">
        <div class="text-base">Data Processing</div>
        <div class="ml-2 flex flex-wrap">
          {#each software.filter((software) => software.category == 'processing') as software_}
            <a
              href={software_.link}
              class="mr-2 block items-center sm:mr-0 sm:w-36"
              target="_blank"
              ><span class="underline text-xs">{software_.name}</span>
              <span class="icon-[lucide--external-link] ml-0.5"></span></a
            >
          {/each}
        </div>

        <div class="mt-2 text-base">Visualization</div>
        <div class="ml-2 flex flex-wrap">
          {#each software.filter((software) => software.category == 'visualization') as software_}
            <a
              href={software_.link}
              class="mr-2 block items-center sm:mr-0 sm:w-36"
              target="_blank"
              ><span class="underline text-xs">{software_.name}</span>
              <span class="icon-[lucide--external-link] ml-0.5"></span></a
            >
          {/each}
        </div>
      </div>
      <div class="divider divider-start text-base">
        <span class="icon-[tabler--source-code] -mr-2 ml-1 h-10 w-10"></span> Source Code
      </div>
      <div class="card bg-base-300 rounded-box grid p-2">
        {#each sourceCode as sourceCode_}
          <div class="">
            •
            <a href={sourceCode_.link} class="" target="_blank"
              ><span class="underline text-xs">{sourceCode_.name}</span>
              <span class="icon-[lucide--external-link] ml-0.5"></span></a
            >
          </div>
        {/each}
      </div>
    </div>
    <div class="modal-action">
      <label for="mapInfoModal" class="btn btn-sm">close</label>
    </div>
  </div>
  <label class="modal-backdrop" for="mapInfoModal">Close</label>
</div>