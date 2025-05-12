<script lang="ts">
  import AppState from '$lib/state.svelte';
  console.log(AppState.mapAttribution);
</script>

<div class="absolute right-0 bottom-0 z-50 bg-white text-xs px-1 pt-0.5 rounded-tl">
  {#each AppState.mapAttribution as attribution}
    <div>&copy; {@html attribution}</div>
  {/each}
</div>
