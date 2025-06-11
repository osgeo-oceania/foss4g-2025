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
      url: '/schedule'
    },
    {
      label: 'Speakers',
      url: '/speakers'
    },
    {
      label: 'Tickets',
      url: '/tickets'
    },
    {
      label: 'Venue',
      url: '/venue'
    },
    {
      label: 'Organisers',
      url: '/organisers'
    }
  ];
</script>

<div class="navbar">
  <div class="navbar-start">FOSS4G</div>

  <div class="navbar-end">
    {#each menuItems as menuItem}
      <a
        aria-label={menuItem.label}
        href={menuItem.url}
        class="btn font-normal rounded-full"
        class:border-black={page.route.id === menuItem.url}>{menuItem.label}</a
      >
    {/each}
  </div>
</div>
