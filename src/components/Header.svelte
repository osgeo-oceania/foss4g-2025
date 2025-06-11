<script lang="ts">
  import Link from '$components/Link.svelte';
  import { page } from '$app/state';

  $inspect(page);

  let menuItems = [
    {
      label: 'Home',
      url: '/'
    },
    {
      label: 'Schedule',
      url: '/program/outline'
    },
    {
      label: 'Speakers',
      url: '/speakers'
    },
    {
      label: 'Tickets',
      url: '/attend/register'
    },
    {
      label: 'Venue',
      url: '/attend/conference-venue'
    },
    {
      label: 'Organisers',
      url: '/organisers'
    }
  ];
</script>

<div class="navbar bg-white z-20">
  <div class="navbar-start">FOSS4G</div>

  <div class="navbar-end space-x-1">
    {#each menuItems as menuItem}
      <Link
        aria-label={menuItem.label}
        href={menuItem.url}
        class={`btn rounded-full text-base font-normal ${page.route.id === menuItem.url ? 'border-primary' : ''}`}
        >{menuItem.label}</Link
      >
    {/each}
  </div>
</div>
