<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Footer from '$components/Footer.svelte';
  import Header from '$components/Header.svelte';
  import Scroller from '$components/Scroller.svelte';
  import '../app.css';

  let { children } = $props();

  // Force scroll to top after navigation
  afterNavigate(({ to, type }) => {
    // Skip if it's a hash change or popstate (back/forward)
    if (to?.url.hash || type === 'popstate') return;

    document.body.scrollTop = 0;
  });
</script>

<svelte:head>
  <title>FOSS4G 2025 Auckland</title>
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-5xl flex-col gap-8">
  <Header />
  <div class="px-2">{@render children()}</div>
  <Footer />
  <Scroller />
</div>
