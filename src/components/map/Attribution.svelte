<script lang="ts">
  import { MapState } from '$components/map/Map.svelte';
  import { getContext } from 'svelte';

  const mapState = getContext<() => MapState>('mapState')();
  const mapAttribution = $derived([
      ...new Set(
        Object.values(mapState.mapStyle.sources)
          .filter((src) => src.type != 'video' && src.type != 'image')
          .map((src) => src?.attribution?.split(', ') ?? null)
          .flat()
      )
    ]);
</script>

<div class="absolute right-0 bottom-0 z-30 rounded-tl bg-white px-1 pt-0.5 text-xs wrap">
  <div class="inline-block">map data &copy;</div>
  <div class="inline-block space-x-0.5">
    {#each mapAttribution as attribution}
      <div class="inline-block">{@html attribution}</div>
    {/each}
  </div>
</div>
