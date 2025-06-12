<script lang="ts">
  import Header from '$components/Header.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="flex flex-col mx-auto max-w-4xl min-h-screen px-2">
  <Header />
  {@render children()}
</div>
