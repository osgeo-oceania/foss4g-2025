<script lang="ts">
  import AppState from '$lib/state.svelte';
</script>

<div class="absolute right-0 bottom-0 z-50 rounded-tl bg-white px-1 pt-0.5 text-xs wrap">
  <div class="inline-block">map data &copy;</div>
  <div class="inline-block space-x-0.5">
    {#each AppState.mapAttribution as attribution}
      <div class="inline-block">{@html attribution}</div>
    {/each}
  </div>
</div>
