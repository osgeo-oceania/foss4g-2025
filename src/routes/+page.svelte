<script lang="ts">
  import Foss4g2025Logo from '$images/svg/foss4g-2025-logo.svg?raw';
  import Agenda from '$components/Agenda.svelte';
  import Sponsors from '$lib/sponsors';
  import Team from '$lib/team';
</script>

<!-- Hero -->

<div class="hero flex">
  <div class="hero-content bg-secondary relative min-h-[500px] w-full flex-col rounded-2xl p-8">
    <div class="[&_path]:!fill-primary absolute right-0 bottom-0 -z-10 h-86 w-86 pr-8 pb-8">
      {@html Foss4g2025Logo}
    </div>
    <div class="flex w-full flex-shrink flex-row justify-between space-y-4">
      <div>November 17-23, 2025</div>
      <div>Tāmaki Makaurau, Aotearoa New Zealand</div>
    </div>
    <div class="w-full flex-grow space-y-8">
      <div class="text-7xl text-white">FOSS4G<br />Auckland 2025</div>
      <div class="text-primary max-w-[400px]">
        FOSS4G stands for Free and Open Source Software for Geospatial, a conference series hosted
        in partnership with OSGeo. FOSS4G brings open source geospatial users, software developers,
        decision makers and researchers together from around the world
      </div>
      <div class="w-[240px]">
        <a
          class="btn btn-block btn-success btn-lg rounded-full py-4 font-normal"
          href="/attend/register"
          >Early Bird Tickets <span class="icon-[lucide--arrow-up-right] block"></span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Sponsor Grid -->

<div class="my-6 grid grid-cols-3 sm:grid-cols-6">
  {#each Object.values(Sponsors)
    .sort((a, b) => a.level - b.level)
    .slice(0, 6) as sponsor}
    {#await sponsor.logo() then module}
      <div class="flex items-center justify-center px-4 sm:px-8">
        <div class="harmonized-logo">
          <enhanced:img src={module.default} alt={sponsor.name} />
        </div>
      </div>
    {/await}
  {/each}
</div>

<!-- Cards -->

<div class="grid grid-cols-1 sm:grid-cols-2 sm:space-x-4 space-y-4 sm:space-y-0 pb-4">
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
          <a href="/speakers" class="btn bg-secondary border-primary rounded-full"
            >and more <span class="icon-[lucide--arrow-up-right] block"></span></a
          >
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col-reverse sm:flex-col gap-y-4">
    <div class="card bg-secondary rounded-2xl">
      <div class="card-body space-y-2 p-8">
        <div class="text-3xl">Auckland</div>
        <div>
          nipaluna / Hobart, nestled on the southeastern coast of lutruwita / Tasmania, Australia,
          is a charming city known for its rich history and breathtaking natural surroundings.
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

<Agenda />
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
</style>
