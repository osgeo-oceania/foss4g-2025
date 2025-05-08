<script lang="ts">
	import AppState from '$lib/state.svelte';
	import { onMount } from 'svelte';

	let mapContainer: HTMLDivElement;

	let { children = null } = $props();

	onMount(() => {
		AppState.initializeMap(mapContainer);
	});
</script>

<div bind:this={mapContainer} class="w-full h-full">
	{@render children?.()}
</div>
