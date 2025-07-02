<script>
  import { onMount } from 'svelte';

  let threshold = 400;

  let showButton = false;

  function handleScroll() {
    showButton = document.body.scrollTop > threshold;
  }

  function scrollToTop() {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMount(() => {
    document.body.addEventListener('scroll', handleScroll);
    return () => document.body.removeEventListener('scroll', handleScroll);
  });
</script>

<button
  id="scroll-to-top"
  class="scroll-to-top bg-secondary text-primary {showButton ? 'active' : 'hidden'}"
  on:click={scrollToTop}
  aria-label="Scroll to top"
>
  <span class="icon-[lucide--arrow-up]"></span>
</button>

<style>
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 1.5rem;
    z-index: 1000;
    transition: opacity 0.2s;
  }
  .scroll-to-top:hover {
    opacity: 1;
  }
  .active {
    opacity: 0.9;
  }
  .hidden {
    opacity: 0.7;
  }
</style>
