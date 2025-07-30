<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import MapStyles from '../../lib/style';
  import { getContext } from 'svelte';

  const mapState = getContext<() => MapState>('mapState')();
</script>

{#if mapState.map}
  <div
    class="absolute bottom-1 left-1 flex space-x-1 rounded-lg bg-white/80 p-1 sm:bottom-4 sm:left-4"
  >
    {#each MapStyles as MapStyle}
      <div class="">
        <div
          class:bg-secondary={MapStyle.name === mapState.mapConfig.style.name}
          class:border-white={MapStyle.name === mapState.mapConfig.style.name}
          class="btn btn-lg btn-square aspect-square items-center justify-center rounded-lg !text-xs font-normal hover:cursor-pointer"
          onclick={() => (mapState.mapConfig.style = MapStyle)}
        >
          {MapStyle.name}
        </div>
      </div>
    {/each}
  </div>
{/if}
