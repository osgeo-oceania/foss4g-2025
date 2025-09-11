<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import EventModal from './EventModal.svelte';

  // API Configuration
  const SCHEDULE_API_URL = 'https://talks.osgeo.org/foss4g-2025/schedule/export/schedule.json';
  const CACHE_KEY = 'foss4g-2025-schedule-cache';
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Component State
  let loading = true;
  let error = '';
  let conference: any = null;
  let version: any = null;
  let days: any[] = [];
  let activeDay = 0;
  let selectedEvent: any = null;
  let modalOpen = false;
  let isReloading = false;
  let selectedRoomInfo: any = null;
  let roomModalOpen = false;

  // Default fallback colors
  const fallbackTrackColors = {
    Talk: '#1f4182',
    Workshop: '#ef8427',
    Keynote: '#aa1456',
    Panel: '#6ac2ea',
    'Lightning talk': '#fab919',
    Break: '#16a34a',
    Lunch: '#16a34a',
    'Community Day Event': '#ea4ced',
    default: '#6b7280'
  };

  // View options
  let viewMode: 'grid' | 'list' = 'grid';
  let selectedRoom: string | null = null;
  let searchQuery = '';

  // Cache Functions
  function getCachedData(): any | null {
    if (typeof window === 'undefined') return null;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error reading cache:', err);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }

  function setCachedData(data: any): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheEntry = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
    } catch (err) {
      console.error('Error setting cache:', err);
    }
  }

  function clearCache(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CACHE_KEY);
  }

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
    // First try to get color from API tracks data
    if (conference?.tracks) {
      const trackData = conference.tracks.find((t: any) => t.name === track);
      if (trackData?.color) {
        return trackData.color;
      }
    }

    // Fall back to hardcoded colors
    return (
      fallbackTrackColors[track as keyof typeof fallbackTrackColors] || fallbackTrackColors.default
    );
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
  
  function openRoomModal(roomName: string) {
    if (conference?.rooms) {
      const roomInfo = conference.rooms.find((r: any) => r.name === roomName);
      if (roomInfo) {
        selectedRoomInfo = roomInfo;
        roomModalOpen = true;
      }
    }
  }

  function getRoomsForDay(day: any): string[] {
    return Object.keys(day.rooms || {});
  }

  function getEventsForRoom(day: any, roomName: string): any[] {
    return day.rooms?.[roomName] || [];
  }

  // Search functionality
  function searchEvents(events: any[], query: string): any[] {
    if (!query.trim()) return events;

    const searchTerm = query.toLowerCase().trim();

    return events.filter((event: any) => {
      // Search in title
      if (event.title && event.title.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // Search in abstract
      if (event.abstract && event.abstract.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // Search in description
      if (event.description && event.description.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // Search in track
      if (event.track && event.track.toLowerCase().includes(searchTerm)) {
        return true;
      }

      // Search in speakers
      if (event.persons && event.persons.length > 0) {
        return event.persons.some((person: any) => {
          const name = person.name || person.public_name || '';
          const biography = person.biography || '';
          return (
            name.toLowerCase().includes(searchTerm) || biography.toLowerCase().includes(searchTerm)
          );
        });
      }

      return false;
    });
  }

  // Data Fetching Functions
  async function loadScheduleData(forceRefresh = false): Promise<void> {
    loading = true;
    error = '';

    try {
      // Check cache first unless forcing refresh
      if (!forceRefresh) {
        const cachedData = getCachedData();
        if (cachedData) {
          conference = cachedData.conference;
          version = cachedData.version;
          days = cachedData.days;

          // Set active day to today or first day
          const today = new Date().toISOString().split('T')[0];
          const todayIndex = days.findIndex((day: any) => day.date === today);
          activeDay = todayIndex >= 0 ? todayIndex : 0;

          loading = false;
          return;
        }
      }

      // Fetch fresh data from API
      const response = await fetch(SCHEDULE_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch schedule: ${response.status}`);
      }

      const data = await response.json();
      conference = data.schedule.conference;
      days = conference.days;
      version = data.schedule.version;

      // Cache the data
      setCachedData({ version, conference, days });

      // Set active day to today or first day
      const today = new Date().toISOString().split('T')[0];
      const todayIndex = days.findIndex((day: any) => day.date === today);
      activeDay = todayIndex >= 0 ? todayIndex : 0;

      loading = false;
    } catch (err) {
      console.error('Error fetching schedule:', err);
      error = 'Failed to load schedule. Please try again later.';
      loading = false;
    } finally {
      isReloading = false;
    }
  }

  async function reloadSchedule(): Promise<void> {
    isReloading = true;
    clearCache();
    await loadScheduleData(true);
  }

  // Data Fetching
  onMount(() => {
    loadScheduleData();
  });

  $: activeRooms = days[activeDay] ? getRoomsForDay(days[activeDay]) : [];
  $: filteredRooms = selectedRoom ? [selectedRoom] : activeRooms;
</script>

<div class="full-width m-4 bg-gray-100 p-2 sm:p-4">
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
        {#if version}
          <span class="ml-2 text-xs text-gray-500">(ver {version})</span>
        {/if}
      </p>
    </div>

    <!-- Search Bar and Reload Button -->
    <div class="mb-6 px-2">
      <div class="mx-auto max-w-md">
        <div class="flex items-center gap-3">
          <div class="relative flex-1">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="Search speakers, topics, or tracks..."
              class="w-full rounded-xl border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {#if searchQuery}
              <button
                on:click={() => (searchQuery = '')}
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                title="Clear search"
                aria-label="Clear search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="text-gray-400 hover:text-gray-600"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            {/if}
          </div>
        </div>

        {#if searchQuery}
          <div class="mt-2 text-center text-xs text-gray-500">
            Searching for "{searchQuery}"
          </div>
        {/if}

        {#if isReloading}
          <div class="mt-2 text-center text-xs text-blue-600">Refreshing schedule data...</div>
        {/if}
      </div>
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
        <!-- Reload Button -->
        <button
          on:click={reloadSchedule}
          disabled={isReloading || loading}
          class="flex-shrink-0 rounded-xl border border-gray-300 bg-white p-3 text-gray-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          title="Reload schedule data"
          aria-label="Reload schedule data"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="{isReloading ? 'animate-spin' : ''} text-gray-600"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>
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
          <div class="mb-2 h-12 sm:mb-2 sm:h-16"></div>

          <!-- Time Slots -->
          {#if days[activeDay]}
            {@const dayData = days[activeDay]}
            {@const allEvents = Object.values(dayData.rooms).flat()}
            {@const filteredEvents = searchEvents(allEvents, searchQuery)}
            {@const timeSlots = [
              ...new Set(filteredEvents.map((event: any) => event.start))
            ].sort()}

            {#each timeSlots as timeSlot}
              <div class="mb-1 flex min-h-28 items-start py-1 sm:mb-4 sm:min-h-40 sm:py-3">
                <div
                  class="sticky left-0 w-16 pr-2 text-right text-xs text-gray-600 sm:w-20 sm:pr-3 sm:text-sm"
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
                  <button
                    on:click={() => openRoomModal(room)}
                    class="flex h-12 w-full items-center justify-center truncate rounded-lg bg-gray-100 p-2 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-200 focus:bg-gray-200 focus:outline-none sm:h-16 sm:p-3 sm:text-sm"
                    title="Click for room information: {room}"
                  >
                    <span class="hidden sm:inline">{room}</span>
                    <span class="sm:hidden"
                      >{room.length > 12 ? room.substring(0, 12) + '...' : room}</span
                    >
                  </button>
                </div>
              {/each}
            </div>

            <!-- Time-based Grid Content -->
            {#if days[activeDay]}
              {@const dayData = days[activeDay]}
              {@const allEvents = Object.values(dayData.rooms).flat()}
              {@const filteredEvents = searchEvents(allEvents, searchQuery)}
              {@const timeSlots = [
                ...new Set(filteredEvents.map((event: any) => event.start))
              ].sort()}

              {#each timeSlots as timeSlot}
                <div class="mb-1 flex min-h-20 gap-2 sm:mb-4 sm:min-h-24 sm:gap-4">
                  <!-- Room Columns -->
                  {#each filteredRooms as room}
                    {#each [getEventsForRoom(dayData, room).filter((event: any) => event.start === timeSlot && filteredEvents.includes(event))] as roomEvents}
                      <div class="w-48 flex-shrink-0 sm:w-64">
                        {#if roomEvents.length > 0}
                          {#each roomEvents as event}
                            <button
                              on:click={() => openEventModal(event)}
                              class="flex min-h-28 w-full flex-col place-content-between overflow-hidden rounded-lg border-l-4 p-2 text-left shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg sm:min-h-40 sm:p-3"
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
                                <div class="hidden items-center gap-2 sm:flex">
                                  <!-- Speaker avatars -->
                                  <div class="flex -space-x-1">
                                    {#each event.persons.slice(0, 3) as person, index}
                                      {#if person.avatar}
                                        <img
                                          src={person.avatar}
                                          alt={person.name || person.public_name || 'Speaker'}
                                          class="not-prose h-4 w-4 rounded-full border border-white shadow-sm"
                                          style="z-index: {10 - index}"
                                          title={person.name || person.public_name}
                                        />
                                      {:else}
                                        <div
                                          class="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-gray-300 shadow-sm"
                                          style="z-index: {10 - index}"
                                          title={person.name || person.public_name}
                                        >
                                          <svg
                                            width="8"
                                            height="8"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            class="text-gray-500"
                                          >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                          </svg>
                                        </div>
                                      {/if}
                                    {/each}
                                    {#if event.persons.length > 3}
                                      <div
                                        class="flex h-4 w-4 items-center justify-center rounded-full border border-white bg-gray-400 text-xs font-bold text-white shadow-sm"
                                        style="z-index: 7; font-size: 8px;"
                                        title="+{event.persons.length - 3} more speakers"
                                      >
                                        +{event.persons.length - 3}
                                      </div>
                                    {/if}
                                  </div>
                                  <div class="min-w-0 flex-1 truncate text-xs text-gray-500">
                                    {event.persons
                                      .map((p: any) => p.name || p.public_name)
                                      .join(', ')}
                                  </div>
                                </div>
                              {/if}
                              {#if event.track}
                                <div>
                                  <div
                                    class="mt-1 inline-block rounded-full px-2 py-1 text-xs font-bold text-white shadow-sm sm:mt-2"
                                    style="background-color: {getTrackColor(event.track)};"
                                  >
                                    <span class="hidden sm:inline">{event.track}</span>
                                    <span class="sm:hidden">{event.track.substring(0, 8)}</span>
                                  </div>
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
      <!-- Enhanced List View -->
      <div class="space-y-6">
        {#if days[activeDay]}
          {@const dayData = days[activeDay]}
          {@const allEvents = Object.values(dayData.rooms).flat()}
          {@const filteredEvents = searchEvents(allEvents, searchQuery)}
          {@const sortedEvents = filteredEvents
            .filter((event: any) => !selectedRoom || event.room === selectedRoom)
            .sort((a: any, b: any) => a.start.localeCompare(b.start))}

          {#each sortedEvents as event}
            <div class="group">
              <button
                on:click={() => openEventModal(event)}
                class="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                style="background: linear-gradient(135deg, {getTrackColor(
                  event.track
                )}03 0%, {getTrackColor(event.track)}08 100%);"
              >
                <!-- Gradient header bar -->
                <div
                  class="h-1 w-full"
                  style="background: linear-gradient(90deg, {getTrackColor(
                    event.track
                  )}, {getTrackColor(event.track)}80);"
                ></div>

                <div class="p-6">
                  <!-- Header with track badge -->
                  <div class="mb-4 flex items-start justify-between gap-4">
                    <div class="min-w-0 flex-1">
                      <!-- Track badge -->
                      {#if event.track}
                        <div class="mb-3">
                          <span
                            class="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
                            style="background: {getTrackColor(event.track)};"
                          >
                            <div class="mr-2 h-2 w-2 rounded-full bg-white/80"></div>
                            {event.track}
                          </span>
                        </div>
                      {/if}

                      <!-- Title -->
                      <h3
                        class="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-800"
                      >
                        {event.title}
                      </h3>

                      <!-- Event details with icons -->
                      <div class="mb-4 flex flex-wrap gap-6 text-gray-600">
                        <div class="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            class="text-blue-600"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12,6 12,12 16,14" />
                          </svg>
                          <span class="text-sm font-medium">{formatTime(event.start)}</span>
                        </div>

                        <div class="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            class="text-green-600"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span class="text-sm font-medium">{formatDuration(event.duration)}</span>
                        </div>

                        <div class="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            class="text-purple-600"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span
                            on:click|stopPropagation={() => openRoomModal(event.room)}
                            on:keydown|stopPropagation={(e) => e.key === 'Enter' && openRoomModal(event.room)}
                            class="truncate text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline cursor-pointer"
                            title="Click for room information"
                            tabindex="0"
                            role="button"
                          >
                            {event.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Arrow indicator -->
                    <div
                      class="flex-shrink-0 rounded-full bg-gray-100 p-2 transition-colors group-hover:bg-gray-200"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        class="text-gray-600"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>

                  <!-- Speakers -->
                  {#if event.persons && event.persons.length > 0}
                    <div class="mb-4">
                      <div class="mb-3 flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="text-orange-600"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span class="text-sm font-semibold text-gray-700">
                          {event.persons.length === 1 ? 'Speaker' : 'Speakers'}
                        </span>
                      </div>
                      <div class="flex items-center gap-3">
                        <!-- Speaker avatars -->
                        <div class="flex -space-x-2">
                          {#each event.persons.slice(0, 4) as person, index}
                            {#if person.avatar}
                              <img
                                src={person.avatar}
                                alt={person.name || person.public_name || 'Speaker'}
                                class="not-prose h-8 w-8 rounded-full border-2 border-white shadow-lg"
                                style="z-index: {10 - index}"
                                title={person.name || person.public_name}
                              />
                            {:else}
                              <div
                                class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 shadow-lg"
                                style="z-index: {10 - index}"
                                title={person.name || person.public_name}
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  class="text-gray-500"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx="12" cy="7" r="4" />
                                </svg>
                              </div>
                            {/if}
                          {/each}
                          {#if event.persons.length > 4}
                            <div
                              class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-500 text-xs font-bold text-white shadow-lg"
                              style="z-index: 6"
                              title="+{event.persons.length - 4} more speakers"
                            >
                              +{event.persons.length - 4}
                            </div>
                          {/if}
                        </div>
                        <div class="flex-1 text-sm font-medium text-gray-600">
                          {event.persons.map((p: any) => p.name || p.public_name).join(', ')}
                        </div>
                      </div>
                    </div>
                  {/if}

                  <!-- Abstract -->
                  {#if event.abstract}
                    <div class="border-t border-gray-100 pt-4">
                      <div class="mb-2 flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="text-indigo-600"
                        >
                          <path
                            d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                          />
                          <polyline points="14,2 14,8 20,8" />
                        </svg>
                        <span class="text-sm font-semibold text-gray-700">Abstract</span>
                      </div>
                      <div class="line-clamp-3 text-sm leading-relaxed text-gray-700">
                        {event.abstract.substring(0, 200)}{event.abstract.length > 200 ? '...' : ''}
                      </div>
                    </div>
                  {/if}
                </div>
              </button>
            </div>
          {/each}
        {/if}
      </div>
    {/if}
  {/if}
</div>

<!-- Event Modal -->
<EventModal 
  open={modalOpen} 
  event={selectedEvent} 
  setIsOpen={(open) => (modalOpen = open)}
  openRoomModal={openRoomModal}
/>

<!-- Room Modal -->
{#if roomModalOpen && selectedRoomInfo}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-xl bg-white shadow-xl">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 p-4">
        <h3 class="text-lg font-semibold text-gray-900">{selectedRoomInfo.name}</h3>
        <button
          on:click={() => (roomModalOpen = false)}
          class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close room information"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-4">
        {#if selectedRoomInfo.description}
          <div class="prose prose-sm max-w-none text-gray-700">
            {@html marked(selectedRoomInfo.description)}
          </div>
        {:else}
          <p class="text-gray-500">No additional information available for this room.</p>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  :global(.full-width) {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
</style>
