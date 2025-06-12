<script lang="ts">
  import Header from '$components/Header.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="mx-auto flex min-h-screen max-w-4xl flex-col">
  <Header />
  <div class="px-2">{@render children()}</div>
</div>
