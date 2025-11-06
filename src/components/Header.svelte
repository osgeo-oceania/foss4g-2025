<script lang="ts">
  import Link from '$components/Link.svelte';
  import LogoText from '$images/svg/Nav-Logo.svg';
  import { page } from '$app/state';

  let isMenuOpen = $state(false);
  $effect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  });

  let menuItems = [
    {
      label: 'Register',
      url: '/attend/register'
    },
    {
      label: 'About',
      url: '/organisers',
      subMenu: [
        {
          label: 'News',
          url: '/news'
        },
        {
          label: 'About FOSS4G',
          url: '/about/foss4g'
        },
        {
          label: 'Organisers',
          url: '/organisers'
        },
        {
          label: 'Our Logo',
          url: '/about/logo'
        },
        {
          label: 'Volunteering',
          url: '/attend/volunteering'
        },
        {
          label: 'Code of Conduct',
          url: '/attend/code-of-conduct'
        },
        {
          label: 'Privacy Policy',
          url: '/attend/privacy-policy'
        },
        {
          label: 'Terms and Conditions',
          url: '/attend/terms-and-conditions'
        }
      ]
    },
    {
      label: 'Attend',
      url: '/attend/register',
      subMenu: [
        {
          label: 'Register',
          url: '/attend/register'
        },
        {
          label: 'Entry into New Zealand',
          url: '/attend/travelling-to-nz'
        },
        {
          label: 'Transport Information',
          url: '/attend/transport'
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
          label: 'Accommodation',
          url: '/attend/accommodation'
        },
        {
          label: 'Travel Grant Program',
          url: '/attend/travel-grant-program'
        }
      ]
    },
    {
      label: 'Program',
      url: '/program/outline',
      subMenu: [
        {
          label: 'Schedule',
          url: '/program/schedule'
        },
        {
          label: 'Workshops',
          url: '/program/workshops'
        },
        {
          label: 'Outline',
          url: '/program/outline'
        },
        {
          label: 'Events',
          url: '/program/events'
        },
        {
          label: 'B2B Event',
          url: '/program/b2b-event'
        },
        {
          label: 'Community Events and Code Sprints',
          url: '/program/community-day'
        }
      ]
    },
    {
      label: 'Sponsorship',
      url: '/sponsorship'
    }
  ];
</script>

<div
  class:sm:scale-75={page.route.id == '/map'}
  class="navbar border-primary/10 sticky top-0 z-20 h-16 rounded-lg border-b-1 bg-white px-4 py-2 sm:relative sm:top-auto sm:h-22 sm:border-none sm:py-6"
>
  <div class="navbar-start z-20 my-4 w-auto">
    <Link href="/"><img src={LogoText} alt="FOSS4G Logo" class="-ml-3.5 max-w-[220px]" /></Link>
  </div>

  <div class="navbar-end flex-1 overflow-hidden sm:overflow-visible">
    <!-- desktop menu -->
    <div class="hidden space-x-2 sm:flex">
      {#each menuItems as menuItem}
        {#if menuItem.subMenu}
          <div class="dropdown dropdown-hover">
            <div
              tabindex="0"
              role="button"
              class={` hover:bg-success hover:text-primary flex items-center rounded-full border px-4 py-2 text-sm  font-light whitespace-nowrap transition-all duration-200 hover:cursor-pointer ${page.route.id === menuItem.url || menuItem.subMenu.some((subItem) => page.route.id === subItem.url) ? 'border-primary/50' : 'border-transparent'}`}
            >
              {menuItem.label}{#if menuItem.subMenu}
                <span class="icon-[material-symbols-light--arrow-drop-down] -mx-1 h-5 w-5"></span>
              {/if}
            </div>
            <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul
              tabindex="0"
              class="dropdown-content menu bg-primary rounded-box border-primary/50 left-1/2 z-1 -translate-x-1/2 border p-2 text-white shadow-lg"
            >
              {#each menuItem.subMenu as subItem}
                <li>
                  <Link
                    aria-label={subItem.label}
                    href={subItem.url}
                    class={`hover:bg-success hover:text-primary px-4 py-2 text-left text-sm font-light whitespace-nowrap transition-all duration-200 hover:border-none`}
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
            class={` hover:bg-success hover:text-primary rounded-full border px-4 py-2 text-sm font-light whitespace-nowrap transition-all duration-200 ${page.route.id === menuItem.url ? 'border-primary/50' : 'border-transparent'}`}
            >{menuItem.label}
          </Link>
        {/if}
      {/each}
    </div>
    <!-- mobile menu -->
    <div class="flex sm:hidden">
      <div class="relative">
        <button
          class="btn bg-secondary btn-square relative z-20 rounded border-none"
          aria-label="menu"
          onclick={() => {
            isMenuOpen = !isMenuOpen;
          }}
        >
          <span
            class="{isMenuOpen
              ? 'icon-[material-symbols-light--close]'
              : 'icon-[material-symbols-light--menu]'} h-12 w-12 bg-white"
          ></span>
        </button>
        {#if isMenuOpen}
          <div class="fixed inset-0 z-10 mt-16 overflow-y-auto bg-white">
            <ul class="menu max-w-lg p-8 pt-4">
              {#each menuItems as menuItem}
                <li class="mt-2">
                  <Link
                    aria-label={menuItem.label}
                    href={menuItem.url}
                    class={`text-lg font-light ${menuItem.subMenu ? 'font-bold' : ''}`}
                    onclick={() => {
                      isMenuOpen = false;
                    }}>{menuItem.label}</Link
                  >
                </li>
                {#if menuItem.subMenu}
                  {#each menuItem.subMenu as subMenuItem}
                    <li class="ml-8">
                      <Link
                        aria-label={subMenuItem.label}
                        href={subMenuItem.url}
                        class={`text-base font-light text-slate-600`}
                        onclick={() => {
                          isMenuOpen = false;
                        }}>{subMenuItem.label}</Link
                      >
                    </li>
                  {/each}
                {/if}
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
