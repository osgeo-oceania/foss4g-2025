<script lang="ts">
  import Header from '$components/Header.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="mx-auto max-w-4xl">
  <Header />
  {@render children()}
</div>
