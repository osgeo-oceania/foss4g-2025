<script lang="ts">
  import { onMount } from 'svelte';
  import DayView from './DayView.svelte';

  let allDaysData = [];
  let days = [];
  let activeDay = 0;
  let loading = true;
  let error = '';

  const dayTitleMap = {
    '2025-11-17': 'Monday 17th (Workshops)',
    '2025-11-18': 'Tuesday 18th (Workshops)',
    '2025-11-19': 'Wednesday 19th (Conference)',
    '2025-11-20': 'Thursday 20th (Conference)',
    '2025-11-21': 'Friday 21st (Conference)'
  };

  function getToday() {
    const today = new Date();
    const yyyy = today.getFullYear().toString();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onMount(async () => {
    try {
      const response = await fetch(
        'https://talks.osgeo.org/foss4g-2025/schedule/export/schedule.json'
      );
      const data = await response.json();
      console.log('API Response:', data);
      const fetchedDays = data.schedule.conference.days;

      allDaysData = fetchedDays;
      const today = getToday();
      let todayIndex = fetchedDays.findIndex((day) => day.date === today);

      // If today is not found in the fetched days, default to 0
      todayIndex = todayIndex === -1 ? 0 : todayIndex;

      days = fetchedDays.map((day) => dayTitleMap[day.date] || day.date);
      activeDay = todayIndex;
      loading = false;
    } catch (err) {
      console.error('Error fetching data:', err);
      error = 'Error fetching program, please try again later.';
      loading = false;
    }
  });

  function setActiveDayAndScroll(index) {
    activeDay = index;
    // Scroll to top of schedule
    const target = document.getElementById('schedule-top');
    target?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
</script>

<div class="container mx-auto" id="schedule-top">
  <section class="prose-base mx-auto mt-8 max-w-none rounded-lg bg-gray-50 py-4">
    {#if error}
      <div class="flex h-64 items-center justify-center font-mono text-4xl text-red-700">
        {error}
      </div>
    {:else if loading}
      <div class="flex h-64 items-center justify-center font-mono text-xl font-light">
        Loading program...
      </div>
    {:else}
      <div class="sticky top-0 z-20 h-10 overflow-x-auto overflow-y-visible bg-gray-50 md:px-4">
        <div class="mx-auto flex w-fit justify-around whitespace-nowrap">
          {#each days as day, index}
            <button
              on:click={() => setActiveDayAndScroll(index)}
              class="-mb-px inline-flex h-10 cursor-pointer items-center border-b-2 bg-transparent px-4 text-center text-sm whitespace-nowrap text-gray-700 hover:border-gray-400 focus:outline-none xl:text-base {activeDay ===
              index
                ? 'border-blue-950 font-bold text-gray-800'
                : 'border-transparent text-gray-700'}"
            >
              {day}
            </button>
          {/each}
        </div>
      </div>

      {#if allDaysData[activeDay]}
        <div class="px-4">
          <DayView day={allDaysData[activeDay]} />
        </div>
      {/if}
    {/if}
  </section>
</div>
