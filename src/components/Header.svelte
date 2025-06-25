<script lang="ts">
  import Link from '$components/Link.svelte';
  import LogoText from '$images/svg/foss4g-2025-logo-banner-lores.svg';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);

  let menuItems = [
    {
      label: 'Call For Papers',
      url: '/attend/call-for-papers'
    },
    {
      label: 'Attend',
      url: '/program/outline',
      subMenu: [
        {
          label: 'Register',
          url: '/attend/register'
        },
        {
          label: 'Travel Grant Program',
          url: '/attend/travel-grant-program'
        },
        {
          label: 'Conference Venue',
          url: '/attend/conference-venue'
        },
        {
          label: 'Travel Guide',
          url: '/attend/nz-travel-guide'
        },
        {
          label: 'Adventure Guide',
          url: '/attend/nz-adventures'
        },
        {
          label: 'Entry into New Zealand',
          url: '/attend/travelling-to-nz'
        },
        {
          label: 'Terms and Conditions',
          url: '/attend/terms-and-conditions'
        },
        {
          label: 'Code of Conduct',
          url: '/attend/code-of-conduct'
        },
        {
          label: 'Privacy Policy',
          url: '/attend/privacy-policy'
        }
      ]
    },
    {
      label: 'Program',
      url: '/speakers',
      subMenu: [
        {
          label: 'Outline',
          url: '/program/outline'
        }
      ]
    },
    {
      label: 'Sponsorship',
      url: '/sponsorship'
    },
    {
      label: 'Organisers',
      url: '/organisers'
    }
  ];
</script>

<div
  class="navbar border-primary/50 z-20 h-[30px] rounded-b-lg border-r-1 border-b-1 border-l-1 bg-white px-4"
>
  <div class="navbar-start my-4 w-auto">
    <Link href="/"><img src={LogoText} alt="FOSS4G Logo" class="max-w-[200px]" /></Link>
  </div>

  <div class="navbar-end flex-1">
    <!-- desktop menu -->
    <div class="hidden space-x-2 sm:flex">
      {#each menuItems as menuItem}
        {#if menuItem.subMenu}
          <div class="dropdown dropdown-hover">
            <div tabindex="0" role="button" class="btn btn-sm rounded-full text-sm font-normal">
              {menuItem.label}{#if menuItem.subMenu}
                <span class="icon-[material-symbols-light--arrow-drop-down] -mx-1 h-5 w-5"></span>
              {/if}
            </div>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              {#each menuItem.subMenu as subItem}
                <li>
                  <Link
                    aria-label={subItem.label}
                    href={subItem.url}
                    class={`btn btn-sm btn-ghost text-left text-sm font-normal`}
                    >{subItem.label}
                  </Link>
                </li>
              {/each}
            </ul>
          </div>
        {:else}
          <Link
            aria-label={menuItem.label}
            href={menuItem.url}
            class={`btn btn-sm rounded-full text-sm font-normal ${page.route.id === menuItem.url ? 'border-primary' : ''}`}
            >{menuItem.label}
          </Link>
        {/if}
      {/each}
    </div>
    <!-- mobile menu -->
    <div class="flex sm:hidden">
      <div class="dropdown dropdown-end">
        <button
          class="btn bg-primary btn-square rounded"
          aria-label="menu"
          ontouchmove={() => {
            isMenuOpen = !isMenuOpen;
          }}
        >
          <span class="icon-[material-symbols-light--menu] h-12 w-12 bg-white"></span>
        </button>
        <ul
          class="menu dropdown-content bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow-sm min-w-[240px] {isMenuOpen ? 'dropdown-open' : ''}"
        >
          {#each menuItems as menuItem}
            <li>
              <Link
                aria-label={menuItem.label}
                href={menuItem.url}
                class={`text-sm font-normal ${menuItem.subMenu ? 'underline font-bold': ''}`}
                >{menuItem.label}</Link
              >
            </li>
            {#if menuItem.subMenu}
              {#each menuItem.subMenu as subMenuItem}
                <li>
                  <Link
                    aria-label={subMenuItem.label}
                    href={subMenuItem.url}
                    class={`text-sm font-normal ml-5`}
                    >{subMenuItem.label}</Link
                  >
                </li>
              {/each}
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
