<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';

  const mapState = getContext<() => MapState>('mapState')();
  import mapStyles from '$lib/style';
  console.log(mapState.mapConfig.style.name)
</script>

{#snippet MapSquare(style: MapStyle, isActive: bool)}
  <button
    class="btn btn-lg bg-primary btn-square relative aspect-square h-18 w-18 items-center justify-center rounded-lg border-0 p-0.5 !text-xs font-normal hover:cursor-pointer"
    onclick={() => (mapState.mapConfig.style = style)}
  >
    <enhanced:img src={style.image} class={'h-full w-full overflow-clip rounded-md'} />
    <div
      class="text-shadow absolute bottom-0 left-0 z-50 flex w-full items-center justify-center gap-x-0.5 pb-0.5"
    >
      {#if isActive}
        <span class="icon-[tabler--stack] text-primary -ml-1 h-4 w-4"></span>
      {/if}
      <span class="font-sans text-[11px]">{isActive ? 'Layers' : style.name}</span>
    </div>
  </button>
{/snippet}

<div class="group absolute bottom-1 left-1 rounded-md sm:bottom-4 sm:left-4">
  <div
    class="invisible absolute bottom-0 left-0 z-10 flex max-h-0 max-w-0 flex-col-reverse overflow-hidden rounded-lg border-4 border-transparent shadow-lg transition-all duration-300 ease-out group-hover:visible group-hover:max-h-[300px] group-hover:max-w-[340px] group-hover:border-white group-hover:bg-white"
  >
    <div class="flex gap-x-0.5">
      {@render MapSquare(mapState.mapConfig.style, true)}
      {#each mapStyles as mapStyle}
        {#if mapStyle.name != mapState.mapConfig.style.name}
          {@render MapSquare(mapStyle, false)}
        {/if}
      {/each}
    </div>
    <div class="flex flex-col overflow-visible whitespace-nowrap">
      <div class="border-b-primary border-b font-serif text-sm">FOSS4G 2025 Auckland Map</div>
      <div class="py-1 text-xs whitespace-nowrap italic">&quot;100% Free and Open Source&quot; <span class="not-italic">(i)</span></div>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 z-50 border-4 border-transparent">
    {@render MapSquare(mapState.mapConfig.style, true)}
  </div>
</div>
