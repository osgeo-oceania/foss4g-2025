<script>
  export let title = '';
  export let description = '';
</script>

<svelte:head>
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
</svelte:head>

<main class="prose max-w-full px-2">
  <slot />
</main>
