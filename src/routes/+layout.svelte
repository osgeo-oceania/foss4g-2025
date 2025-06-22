<script lang="ts">
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<div class="mx-auto flex min-h-screen max-w-4xl flex-col">
  <Header />
  <div class="px-2 space-y-5">{@render children()}</div>
  <Footer />
</div>
