<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import EventModal from './EventModal.svelte';

  // API Configuration
  const SCHEDULE_API_URL = 'https://talks.osgeo.org/foss4g-2025/schedule/export/schedule.json';

  // Component State
  let loading = true;
  let error = '';
  let conference: any = null;
  let days: any[] = [];
  let activeDay = 0;
  let selectedEvent: any = null;
  let modalOpen = false;

  // Track colors by event type/track
  const trackColors = {
    Talk: '#1f4182',
    Workshop: '#ef8427',
    Keynote: '#aa1456',
    Panel: '#6ac2ea',
    'Lightning Talk': '#fab919',
    Break: '#16a34a',
    Lunch: '#16a34a',
    'Community Day Event': '#ea4ced',
    default: '#6b7280'
  };

  // View options
  let viewMode: 'grid' | 'list' = 'grid';
  let selectedRoom: string | null = null;

  // Utility Functions
  function formatTime(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
  }

  function formatDuration(duration: string): string {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  }

  function getTrackColor(track: string): string {
    return trackColors[track as keyof typeof trackColors] || trackColors.default;
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric'
    });
  }

  function openEventModal(event: any) {
    selectedEvent = event;
    modalOpen = true;
  }

  function getRoomsForDay(day: any): string[] {
    return Object.keys(day.rooms || {});
  }

  function getEventsForRoom(day: any, roomName: string): any[] {
    return day.rooms?.[roomName] || [];
  }

  // Data Fetching
  onMount(async () => {
    try {
      const response = await fetch(SCHEDULE_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch schedule: ${response.status}`);
      }

      const data = await response.json();
      conference = data.schedule.conference;
      days = conference.days;

      // Set active day to today or first day
      const today = new Date().toISOString().split('T')[0];
      const todayIndex = days.findIndex((day: any) => day.date === today);
      activeDay = todayIndex >= 0 ? todayIndex : 0;

      loading = false;
    } catch (err) {
      console.error('Error fetching schedule:', err);
      error = 'Failed to load schedule. Please try again later.';
      loading = false;
    }
  });

  $: activeRooms = days[activeDay] ? getRoomsForDay(days[activeDay]) : [];
  $: filteredRooms = selectedRoom ? [selectedRoom] : activeRooms;
</script>

<div class="mx-auto w-full max-w-7xl p-2 sm:p-4">
  {#if loading}
    <div class="flex min-h-96 items-center justify-center">
      <div class="text-center">
        <div
          class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"
        ></div>
        <p class="text-gray-600">Loading conference schedule...</p>
      </div>
    </div>
  {:else if error}
    <div class="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <div class="mb-2 text-lg font-medium text-red-600">Error Loading Schedule</div>
      <p class="text-red-800">{error}</p>
    </div>
  {:else if conference && days.length > 0}
    <!-- Conference Header -->
    <div class="mb-6 px-2 text-center sm:mb-8">
      <h1 class="mb-2 text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
        {conference.title}
      </h1>
      <p class="text-sm text-gray-600 sm:text-base">
        {formatDate(conference.start)} - {formatDate(conference.end)}
      </p>
    </div>

    <!-- Controls -->
    <div
      class="mb-4 gap-4 space-y-4 sm:mb-6 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:space-y-0"
    >
      <!-- Day Navigation -->
      <div class="flex flex-wrap justify-center gap-1 sm:justify-start sm:gap-2">
        {#each days as day, index}
          <button
            on:click={() => {
              activeDay = index;
              selectedRoom = null;
            }}
            class="rounded-lg border px-2 py-1 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm {activeDay ===
            index
              ? 'bg-secondary text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'}"
          >
            <span class="hidden sm:inline">{formatDate(day.date)}</span>
            <span class="sm:hidden"
              >{new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric'
              })}</span
            >
          </button>
        {/each}
      </div>

      <!-- View Controls -->
      <div class="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
        <!-- Room Filter -->
        <select
          bind:value={selectedRoom}
          class="flex-1 rounded-lg border border-gray-300 px-2 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:flex-none sm:px-3"
        >
          <option value={null}>All Rooms</option>
          {#each activeRooms as room}
            <option value={room}>{room.length > 20 ? room.substring(0, 20) + '...' : room}</option>
          {/each}
        </select>

        <!-- View Mode Toggle -->
        <div class="flex flex-1 overflow-hidden rounded-lg border border-gray-300 sm:flex-none">
          <button
            on:click={() => (viewMode = 'grid')}
            class="flex-1 px-2 py-2 text-xs sm:px-3 sm:text-sm {viewMode === 'grid'
              ? 'bg-secondary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'}"
          >
            Grid
          </button>
          <button
            on:click={() => (viewMode = 'list')}
            class="flex-1 px-2 py-2 text-xs sm:px-3 sm:text-sm {viewMode === 'list'
              ? 'bg-secondary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'}"
          >
            List
          </button>
        </div>
      </div>
    </div>

    <!-- Schedule Content -->
    {#if viewMode === 'grid'}
      <!-- Grid View with Fixed Time Column -->
      <div class="flex">
        <!-- Fixed Time Column -->
        <div class="flex-shrink-0">
          <!-- Time Header Spacer -->
          <div class="mb-2 h-12 sm:mb-4 sm:h-16"></div>

          <!-- Time Slots -->
          {#if days[activeDay]}
            {@const dayData = days[activeDay]}
            {@const allEvents = Object.values(dayData.rooms).flat()}
            {@const timeSlots = [...new Set(allEvents.map((event: any) => event.start))].sort()}

            {#each timeSlots as timeSlot}
              <div class="mb-1 flex h-20 items-start py-1 sm:mb-2 sm:h-24 sm:py-2">
                <div
                  class="sticky left-0 w-16 bg-white pr-2 text-right text-xs text-gray-600 sm:w-20 sm:pr-4 sm:text-sm"
                >
                  <span class="hidden sm:inline">{formatTime(timeSlot)}</span>
                  <span class="sm:hidden">{timeSlot.substring(0, 5)}</span>
                </div>
              </div>
            {/each}
          {/if}
        </div>

        <!-- Scrollable Content Area -->
        <div class="flex-1 overflow-x-auto">
          <div class="min-w-max">
            <!-- Room Headers -->
            <div class="mb-2 flex gap-2 sm:mb-4 sm:gap-4">
              {#each filteredRooms as room}
                <div class="min-w-48 flex-shrink-0 sm:min-w-64">
                  <div
                    class="flex h-12 items-center justify-center truncate rounded-lg bg-gray-100 p-2 text-xs font-semibold text-gray-900 sm:h-16 sm:p-3 sm:text-sm"
                    title={room}
                  >
                    <span class="hidden sm:inline">{room}</span>
                    <span class="sm:hidden"
                      >{room.length > 12 ? room.substring(0, 12) + '...' : room}</span
                    >
                  </div>
                </div>
              {/each}
            </div>

            <!-- Time-based Grid Content -->
            {#if days[activeDay]}
              {@const dayData = days[activeDay]}
              {@const allEvents = Object.values(dayData.rooms).flat()}
              {@const timeSlots = [...new Set(allEvents.map((event: any) => event.start))].sort()}

              {#each timeSlots as timeSlot}
                <div class="mb-1 flex min-h-20 gap-2 sm:mb-2 sm:min-h-24 sm:gap-4">
                  <!-- Room Columns -->
                  {#each filteredRooms as room}
                    {#each [getEventsForRoom(dayData, room).filter((event: any) => event.start === timeSlot)] as roomEvents}
                      <div class="w-48 flex-shrink-0 sm:w-64">
                        {#if roomEvents.length > 0}
                          {#each roomEvents as event}
                            <button
                              on:click={() => openEventModal(event)}
                              class="mb-1 w-full overflow-hidden rounded-lg border-l-4 p-2 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg sm:p-3"
                              style="border-left-color: {getTrackColor(
                                event.track
                              )}; background: linear-gradient(135deg, {getTrackColor(
                                event.track
                              )}08 0%, {getTrackColor(
                                event.track
                              )}15 100%); backdrop-filter: blur(10px);"
                            >
                              <div
                                class="mb-1 line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm"
                              >
                                {event.title}
                              </div>
                              <div class="mb-1 text-xs font-medium text-gray-600">
                                <span class="hidden sm:inline"
                                  >{formatTime(event.start)} • {formatDuration(
                                    event.duration
                                  )}</span
                                >
                                <span class="sm:hidden">{formatDuration(event.duration)}</span>
                              </div>
                              {#if event.persons && event.persons.length > 0}
                                <div class="hidden truncate text-xs text-gray-500 sm:block">
                                  {event.persons
                                    .map((p: any) => p.name || p.public_name)
                                    .join(', ')}
                                </div>
                              {/if}
                              {#if event.track}
                                <div
                                  class="mt-1 inline-block rounded-full px-2 py-1 text-xs font-bold text-white shadow-sm sm:mt-2"
                                  style="background-color: {getTrackColor(event.track)};"
                                >
                                  <span class="hidden sm:inline">{event.track}</span>
                                  <span class="sm:hidden">{event.track.substring(0, 8)}</span>
                                </div>
                              {/if}
                            </button>
                          {/each}
                        {:else}
                          <!-- Empty time slot -->
                          <div class="h-16 w-full sm:h-20"></div>
                        {/if}
                      </div>
                    {/each}
                  {/each}
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    {:else}
      <!-- List View -->
      <div class="space-y-4">
        {#if days[activeDay]}
          {@const dayData = days[activeDay]}
          {@const allEvents = Object.values(dayData.rooms)
            .flat()
            .sort((a: any, b: any) => a.start.localeCompare(b.start))}

          {#each allEvents as event}
            {#if !selectedRoom || event.room === selectedRoom}
              <button
                on:click={() => openEventModal(event)}
                class="w-full rounded-lg border border-gray-200 bg-white p-3 text-left transition-shadow hover:shadow-lg sm:p-6"
              >
                <div
                  class="mb-2 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div class="flex-1">
                    <h3
                      class="mb-1 line-clamp-2 text-base font-semibold text-gray-900 sm:mb-2 sm:text-xl"
                    >
                      {event.title}
                    </h3>
                    <div
                      class="flex flex-col gap-1 text-xs text-gray-600 sm:flex-row sm:items-center sm:gap-4 sm:text-sm"
                    >
                      <span>{formatTime(event.start)} • {formatDuration(event.duration)}</span>
                      <span class="truncate">{event.room}</span>
                    </div>
                  </div>
                  {#if event.track}
                    <div
                      class="flex-shrink-0 self-start rounded-full px-2 py-1 text-xs font-medium text-white sm:px-3"
                      style="background-color: {getTrackColor(event.track)}"
                    >
                      {event.track}
                    </div>
                  {/if}
                </div>

                {#if event.persons && event.persons.length > 0}
                  <div class="mb-2 truncate text-xs text-gray-600 sm:mb-3 sm:text-sm">
                    Speakers: {event.persons.map((p) => p.name || p.public_name).join(', ')}
                  </div>
                {/if}

                {#if event.abstract}
                  <div class="line-clamp-2 text-xs text-gray-700 sm:line-clamp-3 sm:text-sm">
                    {event.abstract.substring(0, 150)}{event.abstract.length > 150 ? '...' : ''}
                  </div>
                {/if}
              </button>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
  {/if}
</div>

<!-- Event Modal -->
<EventModal open={modalOpen} event={selectedEvent} setIsOpen={(open) => (modalOpen = open)} />
