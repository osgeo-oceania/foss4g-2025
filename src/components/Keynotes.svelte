<script lang="ts">
  import keynotes from '$lib/keynotes';
</script>

{#snippet keynoteGrid(keynote: (typeof keynotes)[keyof typeof keynotes], i: number)}
  <div class="grid min-h-[300px] sm:grid-cols-2" class:reverse-grid={i % 4 >= 2}>
    <div class="bg-primary m-1 hidden flex-1 flex-col rounded-2xl p-4 text-white sm:flex">
      <div class="flex-grow text-xl">{keynote.name}</div>
      <div class="flex-shrink text-xs">president,<br />{keynote.name} inc</div>
    </div>
    <div class="relative flex-1 p-1">
      {#await keynote.photo() then photo}
        <enhanced:img
          class="harmonized-logo h-full w-full rounded-2xl object-cover"
          src={photo.default}
          alt={keynote.name}
        />
        <div class="absolute inset-1 overflow-clip rounded-2xl">
          <div
            class="bg-secondary absolute inset-0 flex flex-col opacity-30 mix-blend-multiply"
          ></div>
          <div class="absolute w-full flex z-10 h-full flex-col justify-end text-black sm:hidden">
            <div class=" bg-white/80  p-1">
              <div class="">{keynote.name}</div>
              <div class="flex-shrink text-xs">president, {keynote.name} inc</div>
            </div>
          </div>
        </div>
      {/await}
    </div>
  </div>
{/snippet}

<div class="divider divider-start divider-primary text-2xl">Keynote Speakers</div>

<div class="grid grid-cols-2 space-y-2">
  {#each Object.values(keynotes) as keynote, i}
    {@render keynoteGrid(keynote, i)}
  {/each}
</div>

<style>
  .reverse-grid {
    direction: rtl; /* Right to left */
  }

  .reverse-grid > * {
    direction: ltr; /* Reset content direction */
  }
  .harmonized-logo {
    filter: grayscale(100%);
  }
</style>
