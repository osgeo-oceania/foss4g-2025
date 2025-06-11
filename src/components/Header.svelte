<script lang="ts">
  import { page } from '$app/state';

  $inspect(page)

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

<div class="navbar">
  <div class="navbar-start">FOSS4G</div>

  <div class="navbar-end space-x-1">
    {#each menuItems as menuItem}
      <a
        aria-label={menuItem.label}
        href={menuItem.url}
        class="btn font-normal rounded-full text-base"
        class:border-black={page.route.id === menuItem.url}>{menuItem.label}</a
      >
    {/each}
  </div>
</div>
