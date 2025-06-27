<script lang="ts">
  import keynotes from '$lib/keynotes';
</script>

{#snippet keynoteGrid(keynote: (typeof keynotes)[keyof typeof keynotes], i: number)}
  <div class="grid h-[240px] sm:h-[300px] sm:grid-cols-2" class:reverse-grid={i % 4 >= 2}>
    <div class="hidden p-2 text-white sm:flex">
      <div class="bg-primary flex h-full flex-1 flex-col rounded-4xl p-4">
        <div class="flex-grow text-xl">{keynote.name}</div>
        <div class="flex-shrink text-xs">president,<br />{keynote.name} inc</div>
      </div>
    </div>
    <div class="relative h-full flex-1 p-2">
      {#await keynote.photo() then photo}
        <enhanced:img
          class="harmonized-logo h-full w-full rounded-4xl object-cover"
          src={photo.default}
          alt={keynote.name}
        />
        <div class="absolute inset-2 overflow-clip rounded-4xl">
          <div
            class="bg-secondary absolute inset-0 flex flex-col opacity-30 mix-blend-multiply"
          ></div>
          <div class="text-primary absolute z-10 flex h-full w-full flex-col justify-end sm:hidden">
            <div class=" bg-white/80 p-1">
              <div class="">{keynote.name}</div>
              <div class="flex-shrink text-xs">president, {keynote.name} inc</div>
            </div>
          </div>
        </div>
      {/await}
    </div>
  </div>
{/snippet}

<div class="grid grid-cols-2">
  {#each Object.values(keynotes) as keynote, i}
    {#if i < 4}
      {@render keynoteGrid(keynote, i)}
    {/if}
  {/each}
</div>

<style>
  .reverse-grid {
    direction: rtl;
  }

  .reverse-grid > * {
    direction: ltr;
  }
  .harmonized-logo {
    filter: grayscale(100%);
  }
</style>
