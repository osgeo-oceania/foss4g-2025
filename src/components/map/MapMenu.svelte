<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';
  import WaveImg from '$images/map-overview.png?enhanced';

  const mapState = getContext<() => MapState>('mapState')();
</script>

{#snippet square(img: Picture)}
  <div
    class="btn btn-lg bg-primary btn-square aspect-square h-18 w-18 items-center justify-center rounded-lg border-0 p-0.5 !text-xs font-normal hover:cursor-pointer"
  >
    <enhanced:img src={img} class={'h-full w-full overflow-clip rounded-md'} />
    <div
      class="justify-left text-shadow absolute bottom-0 left-0 flex w-full items-center gap-x-0.5 pb-0.5 pl-1"
    >
      <span class="icon-[tabler--stack] text-primary h-4 w-4"></span>
      <span class="font-sans text-[11px]">Layers</span>
    </div>
  </div>
{/snippet}

<div class="group absolute bottom-1 left-1 z-50 rounded-md sm:bottom-4 sm:left-4">
  <div
    class="absolute group-hover:border-white border-transparent bottom-0 left-0 z-10 border-4 invisible flex flex-col-reverse max-h-[9999px] max-w-0 overflow-hidden rounded-lg transition-[max-width] duration-300 ease-out group-hover:visible group-hover:max-h-[9999px] group-hover:max-w-[300px] group-hover:bg-white"
  >
    <div class="flex gap-x-0.5">
      {@render square(WaveImg)}
      {@render square(WaveImg)}
      {@render square(WaveImg)}
    </div>
    <div class="flex">
      omg
    </div>
  </div>
  <div class="absolute bottom-0 left-0 z-50 border-4 border-transparent">
    {@render square(WaveImg)}
  </div>
</div>
