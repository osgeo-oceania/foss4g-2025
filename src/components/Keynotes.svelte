<script lang="ts">
  import keynotes from '$lib/keynotes';
</script>

{#snippet keynoteGrid(keynote: (typeof keynotes)[keyof typeof keynotes], i: number)}
  <div
    class="grid h-[240px] grid-cols-2 sm:h-[300px]"
    class:reverse-grid={i % 2 == 0}
    class:sm:reverse-grid={i % 4 >= 2}
  >
    <div class="flex p-2 text-white sm:flex">
      <div class="bg-primary flex h-full flex-1 flex-col rounded-4xl p-4">
        <div class="flex-shrink text-xl">{keynote.name}</div>
        <div class="flex-shrink text-xs">{keynote.title}</div>
        <hr class="border-t border-white my-2 h-[1px]" />
        <div class="flex-grow text-xs">texto</div>
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
        </div>
      {/await}
    </div>
  </div>
{/snippet}

<div class="grid grid-cols-1 sm:grid-cols-2">
  {#each Object.values(keynotes) as keynote, i}
    {@render keynoteGrid(keynote, i)}
  {/each}
</div>

<style>
  @media (min-width: 640px) {
    .sm\:reverse-grid {
      direction: rtl;
    }
    .sm\:reverse-grid > * {
      direction: ltr;
    }
  }
  @media (max-width: 639px) {
    .reverse-grid {
      direction: rtl;
    }
    .reverse-grid > * {
      direction: ltr;
    }
  }

  .harmonized-logo {
    filter: grayscale(100%);
  }
</style>
