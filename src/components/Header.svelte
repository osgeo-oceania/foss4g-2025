<script lang="ts">
  import Link from '$components/Link.svelte';
  import LogoText from '$images/svg/foss4g-2025-logo-text.svg';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);

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

<div class="navbar z-20 bg-white">
  <div class="navbar-start my-4">
    <Link href="/"><img src={LogoText} alt="FOSS4G Logo" class="max-w-[200px]" /></Link>
  </div>

  <div class="navbar-end space-x-1">
    <div class="hidden sm:flex">
      {#each menuItems as menuItem}
        <Link
          aria-label={menuItem.label}
          href={menuItem.url}
          class={`btn rounded-full text-base font-normal ${page.route.id === menuItem.url ? 'border-primary' : ''}`}
          >{menuItem.label}</Link
        >
      {/each}
    </div>
    <div class="flex sm:hidden">
      <div class="dropdown dropdown-end">
        <button
          class="btn bg-primary btn-square rounded"
          aria-label="menu"
          ontouchend={() => (isMenuOpen = !isMenuOpen)}
        >
          <span class="icon-[material-symbols-light--menu] h-12 w-12 bg-white"></span>
        </button>
        <ul
          class="menu dropdown-content bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow-sm"
          class:dropdown-open={isMenuOpen}
        >
          {#each menuItems as menuItem}
            <li>
              <Link
                aria-label={menuItem.label}
                href={menuItem.url}
                class={`text-base font-normal ${page.route.id === menuItem.url ? 'bg-primary text-white' : ''}`}
                >{menuItem.label}</Link
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
