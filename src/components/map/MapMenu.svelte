<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';

  const mapState = getContext<() => MapState>('mapState')();
  let isOpen: boolean = $state(false);
  import mapStyles from '$lib/style';
  console.log(mapState.mapConfig.style.name);
</script>

{#snippet MapSquare(style: MapStyle, isActive: boolean)}
  <button
    class="btn btn-lg bg-primary btn-square relative aspect-square h-18 w-18 items-center justify-center rounded-lg border-0 p-0.5 !text-xs font-normal hover:cursor-pointer"
    onclick={() => (mapState.mapConfig.style = style)}
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
        <button class="btn btn-xs"><span class="icon-[lucide--download]"></span> Download POIs</button>
        <button class="btn btn-xs"><span class="icon-[bi--info-circle]"></span> Map Information</button>
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
