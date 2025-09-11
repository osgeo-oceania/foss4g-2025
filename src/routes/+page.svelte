<script lang="ts">
  import Foss4g2025Logo from '$images/svg/Landing-Logo.svg?raw';
  import TicketOptions from '$components/TicketOptions.svelte';
  import Countdown from '$components/Countdown.svelte';
  import Keynotes from '$components/Keynotes.svelte';
  import Rangitoto from '$images/svg/rangitoto.svg';
  import Heading from '$components/Heading.svelte';
  import Agenda from '$components/Agenda.svelte';
  import Link from '$components/Link.svelte';
  import Sponsors, { LEVELS as SPONSOR_LEVELS } from '$lib/sponsors';
  import Team from '$lib/organisers';
  import Button from '$components/Button.svelte';
  import Card from '$components/Card.svelte';
  import Video from '$components/Video.svelte';
  import News from '$lib/news';

  const whyAttends = [
    {
      number: '01',
      title: 'cutting-edge-insights',
      description:
        'Gain firsthand knowledge from top geo experts and pioneers shaping the industry.'
    },
    {
      number: '02',
      title: 'hands-on learning',
      description:
        'Participate in interactive workshops, live demos, and deep-dive sessions to sharpen your skills.'
    },
    {
      number: '03',
      title: 'exclusive networking',
      description:
        'Connect with geo leaders, startups, and fellow professionals at community events.'
    },
    {
      number: '04',
      title: 'innovation showcase',
      description:
        'Explore geo solutions, from emerging startups to tech giants redefining the future.'
    }
  ];
</script>

<svelte:head>
  <title>FOSS4G 2025</title>
</svelte:head>

{#if News.length > 0}
  <div class="bg-primary/90 mb-6 flex items-center gap-4 rounded-xl px-4 py-3 text-white">
    <span class="hidden whitespace-nowrap sm:inline">{News[0].date}</span>
    <span class="hidden whitespace-nowrap sm:inline">|</span>
    <Link
      href={News[0].link}
      target="_blank"
      class="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {News[0].title}
    </Link>
    <div class="flex-shrink-0">
      <Link
        href={News[0].link}
        target="_blank"
        class="flex items-center gap-1 text-xs whitespace-nowrap"
      >
        Read more
        <span class="icon-[lucide--external-link] inline-block h-4 w-4"></span>
      </Link>
    </div>
  </div>
{/if}

<!-- Hero -->
<main class="m:space-y-12 mb-8 space-y-12 sm:space-y-16">
  <div class="hero flex">
    <div
      class="hero-content bg-secondary relative w-full flex-col rounded-4xl px-6 py-8 sm:min-h-[500px] sm:px-10 sm:py-12"
    >
      <div
        class="[&_path]:!fill-primary absolute right-0 bottom-0 -z-10 h-72 w-72 sm:h-96 sm:w-96 sm:pr-8 sm:pb-8 [&_svg]:max-h-72 [&_svg]:max-w-72 [&_svg]:sm:max-h-96 [&_svg]:sm:max-w-96"
      >
        {@html Foss4g2025Logo}
        <div
          class="to-secondary/90 from-secondary/30 absolute inset-0 rounded-4xl bg-gradient-to-b sm:from-transparent"
        ></div>
      </div>
      <div
        class="flex w-full flex-shrink flex-col justify-between font-serif text-sm sm:flex-row sm:space-y-4"
      >
        <div class="uppercase">November 17-23, 2025</div>
        <div>Tāmaki Makaurau, Aotearoa New Zealand</div>
      </div>
      <div class="w-full flex-grow space-y-4">
        <div class="font-serif text-4xl leading-tight text-white sm:text-7xl">
          FOSS4G<br />Auckland 2025
        </div>
        <div class="text-md font-serif text-white sm:w-[85%]">
          FOSS4G stands for Free and Open Source Software for Geospatial, a conference series hosted
          in partnership with OSGeo. FOSS4G brings open source geospatial users, software
          developers, decision makers and researchers together from around the world
        </div>
        <div class="flex flex-row gap-4 pt-4 sm:w-[240px]">
          <Button href="/attend/register">Buy tickets</Button>
          <Button href="/program/schedule">View schedule</Button>
        </div>
      </div>
    </div>
  </div>

  <!-- Sponsor Grid -->
  <div class="flex flex-wrap justify-center gap-4 sm:gap-8">
    {#each Object.values(Sponsors)
      .filter((sponsor) => sponsor.level < 5)
      .sort((a, b) => a.level - b.level) as sponsor}
      {#await sponsor.logo() then module}
        <div class="flex w-1/3 items-center justify-center px-4 sm:w-1/5 sm:px-8">
          <div class="max-w-full">
            <a href={sponsor.link} aria-label="sponsor link" target="_blank">
              <enhanced:img
                src={module.default}
                alt={sponsor.name}
                class="max-h-16 w-auto sm:max-h-20"
              />
            </a>
          </div>
        </div>
      {/await}
    {/each}
  </div>

  <!-- Cards -->

  <div class="grid grid-cols-1 space-y-4 pb-4 sm:grid-cols-2 sm:space-y-0 sm:space-x-4">
    <!--
    <div class="card bg-secondary rounded-4xl">
      <div class="card-body space-y-2 p-8">
        <div class="text-3xl">Speakers</div>
        <div class="flex space-x-2">
          <div class="items-center justify-center">
            <div class="btn btn-circle m-2">
              <span class="icon-[lucide--arrow-up-right] block h-5 w-5"></span>
            </div>
          </div>
          <div>
            Hear from geospatial leaders, researchers, and developers who are defining the future of
            open source geospatial.
          </div>
        </div>
        <div class="flex flex-grow flex-row flex-wrap items-end justify-between">
          <div class="avatar-group -space-x-5">
            {#each Object.values(Team).slice(0, 4) as person}
              {#await person.photo() then module}
                <div class="avatar border-0">
                  <div class="aspect-square w-12 rounded-full">
                    <enhanced:img src={module.default} alt={person.name} />
                  </div>
                </div>
              {/await}
            {/each}
            <div class="avatar avatar-placeholder border-0">
              <div class="bg-neutral text-neutral-content w-12">
                <span>+99</span>
              </div>
            </div>
          </div>
          <div>
            <Link href="/speakers" class="btn bg-secondary border-primary rounded-full"
              >and more <span class="icon-[lucide--arrow-up-right] block"></span></Link
            >
          </div>
        </div>
      </div>
    </div>
-->

    <Card
      title="Workshops are now on Sale"
      color="secondary"
      button={{ href: 'https://ti.to/osgeo-oceania/foss4g-2025', text: 'Register for Workshops' }}
    >
      <div>
        <p>
          At $50 NZD per workshop this is the most cost efective and valuable training you will ever
          undertake!
        </p>

        <br />
        <p>Register for up to 4 from a selection of 44 workshops...</p>

        <br />
        <ul class="list-disc pl-4">
          <li>Monday Morning: choose 1 from 11 available.</li>
          <li>Monday Afternoon: choose 1 from 11 available.</li>
          <li>Tuesday Morning: choose 1 from 11 available.</li>
          <li>Tuesday Afternoon: choose 1 from 11 available.</li>
        </ul>
      </div>
    </Card>

    <div class="flex flex-col-reverse sm:flex-col sm:gap-y-4">
      <Card title="Tāmaki Makaurau Auckland" color="primary">
        <div>
          These are the Māori names given to Auckland. They speak of our diverse landscapes,
          beautiful harbours, and fertile soils. They speak of the coming together of different iwi
          (tribes) to meet and trade.
        </div>
      </Card>
      <Card title="Our Conference Venue" color="secondary">
        <div>
          FOSS4G 2025 is proudly supported by Auckland University of Technology's School of Future
          Environments.<br />Located in the heart of Auckland City, the
          <a
            href="https://use.mazemap.com/#v=1&campusid=103&zlevel=1&center=174.765877,-36.853388&zoom=17.6"
            target="_blank">AUT City Campus</a
          > is within minutes of the central business district, has excellent public transport and accommodation
          options.
        </div>
      </Card>
    </div>
  </div>

  <div>
    <Video src="https://www.youtube-nocookie.com/embed/HNxqnUhL-yM?si=Z5-6exzf98KhoHZy" />
  </div>

  <Heading>Agenda</Heading>

  <Agenda />

  <div class="max-w-full py-8 sm:py-12">
    <img src={Rangitoto} alt="Rangitoto" />
  </div>

  <Heading>Keynote Speakers</Heading>

  <Keynotes />

  {#snippet whyAttendGrid(reason: (typeof whyAttends)[0], i: number)}
    <div class="flex h-full w-full flex-1 py-1 text-white sm:p-2">
      <div class="bg-primary h-full min-h-[240px] w-full overflow-clip rounded-4xl px-8 py-8">
        <div class="pb-4 text-sm font-normal uppercase">{reason.title}</div>
        <div
          class="grid h-full grid-cols-2"
          class:reverse-grid={i % 2 == 1}
          class:sm:reverse-grid={i % 4 >= 2}
        >
          <div class="relative text-9xl font-medium">
            <div class="text-secondary absolute -bottom-[20%]">
              {reason.number}
              <div class="from-primary absolute inset-0 bg-gradient-to-t to-transparent"></div>
            </div>
          </div>
          <div class="-mt-[20%] mb-[20%] flex items-end justify-end text-sm">
            {reason.description}
          </div>
        </div>
      </div>
    </div>
  {/snippet}

  <Heading class="mt-16 sm:mt-28">Why Attend?</Heading>

  <div class="grid gap-2 pt-4 pb-8 sm:grid-cols-2 sm:gap-2 sm:pt-4 sm:pb-8">
    {#each whyAttends as whyAttend, i}
      {@render whyAttendGrid(whyAttend, i)}
    {/each}
  </div>

  <Heading class="mt-16 sm:mt-28">Register Now</Heading>

  <Countdown label="Conference starts in:" time="2025-11-17T09:00:00+12:00" />

  <Heading size="sm" class="mt-8 sm:mt-14">Ticket Options</Heading>

  <TicketOptions />

  {#snippet sponsorLevel(
    title: string,
    level: (typeof SPONSOR_LEVELS)[keyof typeof SPONSOR_LEVELS]
  )}
    {@const sponsorsAtLevel = Object.values(Sponsors).filter((sponsor) => sponsor.level == level)}

    {#if sponsorsAtLevel.length > 0}
      <div class="flex flex-col gap-2 sm:gap-6">
        <h3 class="text-center !font-serif !text-lg uppercase">
          {title.charAt(0).toUpperCase()}{title.replace(/_/g, ' ').slice(1).toLowerCase()} Sponsors
        </h3>

        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {#each sponsorsAtLevel as sponsorAtLevel}
            {#await sponsorAtLevel.logo() then module}
              <div class="flex items-center justify-center px-6 sm:max-w-60 sm:px-10">
                <a href={sponsorAtLevel.link} aria-label="sponsor link" target="_blank">
                  <enhanced:img
                    src={module.default}
                    alt={sponsorAtLevel.name}
                    class="max-h-16 w-auto max-w-40 sm:max-h-20 sm:max-w-60"
                  /></a
                >
              </div>
            {/await}
          {/each}
        </div>
      </div>
    {/if}
  {/snippet}

  <div class="flex flex-col gap-8 sm:gap-16">
    {#each Object.entries(SPONSOR_LEVELS) as [title, level]}
      {@render sponsorLevel(title, level)}
    {/each}
  </div>
</main>

<style>
  .harmonized-logo {
    filter: grayscale(100%) sepia(100%) hue-rotate(180deg);
  }
  @media (max-width: 640px) {
    .reverse-grid {
      direction: rtl;
    }
    .reverse-grid > * {
      direction: ltr;
    }
  }
  @media (min-width: 641px) {
    .sm\:reverse-grid {
      direction: rtl;
    }
    .sm\:reverse-grid > * {
      direction: ltr;
    }
  }
</style>
