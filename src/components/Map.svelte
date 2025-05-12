<script lang="ts">
  import AppState from '$lib/state.svelte';
	import Attribution from './Attribution.svelte';
  import { onMount } from 'svelte';

  let mapContainer: HTMLDivElement;

  let { children = null } = $props();

  onMount(() => {
    AppState.initializeMap(mapContainer);
  });
</script>

<div bind:this={mapContainer} class="h-full w-full">
  {@render children?.()}
	<Attribution />
</div>
