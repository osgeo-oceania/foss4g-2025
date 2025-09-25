<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';
  import WaveImg from '$images/map-overview.png?enhanced';

  const mapState = getContext<() => MapState>('mapState')();
</script>

  <div
    class="absolute bottom-1 left-1 z-50 rounded-lg sm:bottom-4 sm:left-4"
  >
    <div
      class="btn btn-lg border-0 w-18 h-18 bg-primary btn-square p-0.5 aspect-square items-center justify-center rounded-lg !text-xs font-normal hover:cursor-pointer"
    >
      <enhanced:img src={WaveImg} class={'rounded-md overflow-clip w-full h-full'} />
      <div class="absolute w-full bottom-0 left-0 flex items-center justify-left pl-1 text-shadow pb-0.5 gap-x-0.5">
        <span class="icon-[tabler--stack] text-primary w-4 h-4"></span>
        <span class="font-sans text-[11px]">Layers</span>
      </div>
    </div>
  </div>
