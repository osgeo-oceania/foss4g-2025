<script lang="ts">
  import AppState from '$lib/state.svelte';
  console.log(AppState.mapAttribution);
</script>

<div class="absolute right-0 bottom-0 z-50 rounded-tl bg-white px-1 pt-0.5 text-xs">
  {#each AppState.mapAttribution as attribution}
    <div>&copy; {@html attribution}</div>
  {/each}
</div>
