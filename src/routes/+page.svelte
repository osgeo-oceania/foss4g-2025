<script lang="ts">
  import Foss4g2025Logo from '$images/svg/foss4g-2025-logo.svg?raw';
  import TicketOptions from '$components/TicketOptions.svelte';
  import Countdown from '$components/Countdown.svelte';
  import Keynotes from '$components/Keynotes.svelte';
  import Rangitoto from '$images/svg/rangitoto.svg';
  import Divider from '$components/Divider.svelte';
  import Agenda from '$components/Agenda.svelte';
  import Link from '$components/Link.svelte';
  import Sponsors, { LEVELS as SPONSOR_LEVELS } from '$lib/sponsors';
  import Team from '$lib/organisers';

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

<!-- Hero -->
<main class="my-4 space-y-5">
  <div class="hero flex">
    <div class="hero-content bg-secondary relative min-h-[500px] w-full flex-col rounded-2xl p-8">
      <div
        class="[&_path]:!fill-primary absolute right-0 bottom-0 -z-10 h-72 w-72 pr-8 pb-8 sm:h-86 sm:w-86"
      >
        {@html Foss4g2025Logo}
      </div>
      <div
        class="flex w-full flex-shrink flex-col justify-between text-sm sm:flex-row sm:space-y-4"
      >
        <div>November 17-23, 2025</div>
        <div>Tāmaki Makaurau, Aotearoa New Zealand</div>
      </div>
      <div class="w-full flex-grow space-y-8">
        <div class="font-serif text-2xl text-white sm:text-7xl">FOSS4G<br />Auckland 2025</div>
        <div class="sm:text-primary max-w-[400px] text-sm text-white">
          FOSS4G stands for Free and Open Source Software for Geospatial, a conference series hosted
          in partnership with OSGeo. FOSS4G brings open source geospatial users, software
          developers, decision makers and researchers together from around the world
        </div>
        <div class="sm:w-[240px]">
          <Link
            class="btn btn-block btn-success btn-lg rounded-full py-4 font-normal"
            href="/attend/register"
            >Early Bird Tickets <span class="icon-[lucide--arrow-up-right] block"></span>
          </Link>
        </div>
      </div>
    </div>
  </div>

  <!-- Sponsor Grid -->

  <div class="my-6 grid grid-cols-3 space-y-1 sm:grid-cols-5 sm:space-y-3">
    {#each Object.values(Sponsors)
      .filter((sponsor) => sponsor.level < 5)
      .sort((a, b) => a.level - b.level) as sponsor}
      {#await sponsor.logo() then module}
        <div class="flex items-center justify-center px-4 sm:px-8">
          <div class="">
            <enhanced:img src={module.default} alt={sponsor.name} />
          </div>
        </div>
      {/await}
    {/each}
  </div>

  <!-- Cards -->


  <div class="grid grid-cols-1 space-y-4 pb-4 sm:grid-cols-2 sm:space-y-0 sm:space-x-4">

<!--
    <div class="card bg-secondary rounded-2xl">
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

    <div class="card bg-secondary rounded-2xl">
      <div class="card-body space-y-2 p-8">
        <div class="text-3xl">Call For Papers</div>
        <div class="flex space-x-2">
          <div>
            Presentations and Workshops are the beating heart of the FOSS4G conference. They offer a platform for experts to share ground-breaking research, innovative ideas, and practical solutions. By attending presentations, attendees gain valuable insights into the latest developments in the FOSS4G arena, learn from leading professionals, and spark inspiration for attendees’ own work. They also foster discussion and debate, allowing attendees to connect with colleagues, ask questions, and exchange perspectives, propelling the entire FOSS4G community forward.
          </div>
        </div>
        <div class="sm:w-[240px]">
          <Link
            class="btn btn-block btn-success btn-lg rounded-full py-4 font-normal"
            href="/attend/call-for-papers"
            >Submit a Paper <span class="icon-[lucide--arrow-up-right] block"></span>
          </Link>
        </div>
      </div>
    </div>


    <div class="flex flex-col-reverse gap-y-4 sm:flex-col">
      <div class="card bg-secondary rounded-2xl">
        <div class="card-body space-y-2 p-8">
          <div class="text-3xl">Tāmaki Makaurau Auckland</div>
          <div>
            These are the Māori names given to Auckland. They speak of our diverse landscapes,
            beautiful harbours, and fertile soils. They speak of the coming together of different
            iwi (tribes) to meet and trade.
          </div>
        </div>
      </div>
      <div class="card bg-primary rounded-2xl">
        <div class="card-body text-primary-content space-y-2 p-8">
          <div class="text-3xl">Community Events</div>
          <div>
            Workshops are a great way to get practical experience in a hands-on session, guided by
            expert practitioners developers.
          </div>
        </div>
      </div>
    </div>
  </div>

  <Divider>Conference Agenda</Divider>

  <Agenda />

  <div class="max-w-full">
    <img src={Rangitoto} alt="Rangitoto" />
  </div>

<!--
<Divider>Keynote Speakers</Divider>

  <Keynotes />
-->

  {#snippet whyAttendGrid(reason: (typeof whyAttends)[0], i: number)}
    <div class="flex h-full w-full flex-1 p-2 text-white">
      <div class="bg-primary h-full min-h-[160px] w-full overflow-clip rounded-2xl p-4">
        <div class="pb-4 text-xs uppercase">{reason.title}</div>
        <div
          class="grid h-full grid-cols-2"
          class:reverse-grid={i % 2 == 1}
          class:sm:reverse-grid={i % 4 >= 2}
        >
          <div class="relative text-9xl">
            <div class="text-secondary absolute -bottom-[20%]">
              {reason.number}
              <div class="from-primary absolute inset-0 bg-gradient-to-t to-transparent"></div>
            </div>
          </div>
          <div class="text-xs">{reason.description}</div>
        </div>
      </div>
    </div>
  {/snippet}

  <Divider>Why Attend?</Divider>

  <div class="grid sm:grid-cols-2">
    {#each whyAttends as whyAttend, i}
      {@render whyAttendGrid(whyAttend, i)}
    {/each}
  </div>

  <Divider>Register Now</Divider>

  <Countdown label="Early Bird Pricing ends in:" time="2025-06-28T00:00:00" />

  <Divider>Ticket Options</Divider>

  <TicketOptions />

  {#snippet sponsorLevel(
    title: string,
    level: (typeof SPONSOR_LEVELS)[keyof typeof SPONSOR_LEVELS]
  )}
    {@const sponsorsAtLevel = Object.values(Sponsors).filter((sponsor) => sponsor.level == level)}

    {#if sponsorsAtLevel.length > 0}
      <div class="flex flex-col space-y-2 sm:space-y-0">
        <Divider>{title.charAt(0).toUpperCase()}{title.slice(1).toLowerCase()} Sponsors</Divider>

        <div class="flex items-center justify-center flex-wrap space-y-6 sm:space-y-0">
          {#each sponsorsAtLevel as sponsorAtLevel}
            {#await sponsorAtLevel.logo() then module}
              <div class="flex items-center justify-center px-4 sm:max-w-60 sm:px-8">
                <enhanced:img
                  src={module.default}
                  alt={sponsorAtLevel.name}
                  class="max-h-20 w-auto"
                />
              </div>
            {/await}
          {/each}
        </div>
      </div>
    {/if}
  {/snippet}

  <div class="flex flex-col space-y-2">
    {#each Object.entries(SPONSOR_LEVELS) as [title, level]}
      {@render sponsorLevel(title, level)}
    {/each}
  </div>
</main>

<!-- FOSS4G stands for Free and Open Source Software for Geospatial, a conference
series hosted in partnership with [OSGeo](https://www.osgeo.org/). FOSS4G
brings open source geospatial users, software developers, decision makers and
researchers together from around the world

# Welcome to Auckland, the gateway to the South Pacific

**_Tēnā koutou katoa (Greetings to all of you)_**

The passionate geospatial community of OSGeo Oceania extends a warm invitation to the global FOSS4G conference in Auckland, New Zealand in 2025. We envision Auckland as the stage for a vibrant gathering that fosters collaboration and celebrates innovation in the exciting world of Free and Open Source Software for Geospatial (FOSS4G). Our Pacific family is a warm and welcoming group and it’s exciting to have this opportunity to share our place with the global FOSS4G community.

**A Commitment to Openness and Inclusion:**

We are dedicated to creating an inclusive and welcoming environment for everyone at FOSS4G 2025. At this conference, we believe in hosting an environment where everyone feels welcome to participate and contribute. We celebrate diversity of thought, background, and experience, recognizing it enriches our discussions and leads to groundbreaking solutions. We'll provide a platform for diverse voices to be heard, offer resources to ensure accessibility, and cultivate a respectful atmosphere. We have a history of doing this for our Oceania conference series and continue to improve our work that supports diversity, equity and inclusion.

**Join Us in Shaping the Future of Open Geospatial**

We believe Auckland offers the perfect environment to host a successful and impactful FOSS4G conference in 2025. Our experienced team is dedicated to providing exceptional logistical support, innovative technological
solutions, and a warm Kiwi welcome. Let's work together to make FOSS4G 2025 in Auckland a landmark event, accelerating the adoption and advancement of open geospatial solutions around the world!

**_Kia Kaha, Kia Maia, Kia Ora! (Be strong, be brave, be well!)_**

The Auckland FOSS4G 2025 Conference Organising Committee -->

<!-- {/* <KeynoteSpeakers /> */} -->

<!-- <hr class="my-8" /> -->

<!-- # Our sponsors and partners -->

<!-- <SponsorshipLevels /> -->

<!-- <InlineMap bottom /> -->
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
