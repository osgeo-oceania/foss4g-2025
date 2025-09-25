<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';
  import WaveImg from '$images/map-overview.png?enhanced';

  const mapState = getContext<() => MapState>('mapState')();
</script>

<div class="absolute bottom-1 left-1 z-50 rounded-lg sm:bottom-4 sm:left-4">
  <div class="absolute"></div>
  <div
    class="btn btn-lg bg-primary btn-square aspect-square h-18 w-18 items-center justify-center rounded-lg border-0 p-0.5 !text-xs font-normal hover:cursor-pointer"
  >
    <enhanced:img src={WaveImg} class={'h-full w-full overflow-clip rounded-md'} />
    <div
      class="justify-left text-shadow absolute bottom-0 left-0 flex w-full items-center gap-x-0.5 pb-0.5 pl-1"
    >
      <span class="icon-[tabler--stack] text-primary h-4 w-4"></span>
      <span class="font-sans text-[11px]">Layers</span>
    </div>
  </div>
</div>
