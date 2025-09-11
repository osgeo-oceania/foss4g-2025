<script lang="ts">
  import EventModal from './EventModal.svelte';

  export let day;

  let modalOpen = false;
  let selectedEvent = null;

  const INTERVAL_HEIGHT = 32;

  const EVENT_COLORS = {
    Workshop: '#ef8427',
    Ceremony: '#4ca57b',
    Keynote: '#aa1456',
    Talk: '#1f4182',
    Panel: '#6ac2ea',
    'Lightning talk': '#fab919',
    'Associated Event': '#9a5bd7',
    'Community Day Event': '#ea4ced',
    Mapathon: '#d62e2e',
    lunch: '#16a34a',
    Break: '#AC75EF',
    default: 'rgb(23 37 84)'
  };

  const noEventsMap = {
    '2025-11-17': 'No workshops today',
    '2025-11-18': 'No events today',
    '2025-11-19': 'No events today',
    '2025-11-20': 'No events today',
    '2025-11-21': 'No events today'
  };

  function getBackgroundColor(type: string) {
    return (type && EVENT_COLORS[type]) || EVENT_COLORS.default;
  }

  // Convert time to minutes for easy calculations
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Decide interval based on event duration and gap to next event
  function decideInterval(duration) {
    if (duration < 0.125) return 1;
    if (duration < 1) return 5;
    if (duration < 2) return 10;
    return 30;
  }

  function toAmPm(minute) {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${
      minutes === 0 ? '00' : minutes.toString().padStart(2, '0')
    } ${ampm}`;
  }

  function toHours(duration) {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h${minutes}min`;
  }

  function parseDays(day) {
    let eventsByRoomAndDate = {};

    Object.keys(day.rooms).forEach((roomName) => {
      day.rooms[roomName].forEach((event) => {
        // Add room to event
        event.room = roomName;

        let time = '';

        if (event.date !== undefined) {
          time = event.date.split('T')[1];
        }

        if (event.start !== null) {
          time = event.start;
        }

        // Extract hours and minutes from the string
        const [hours, minutes] = time.split(':').map(Number);

        // Determine AM or PM
        const isPm = hours >= 12;
        const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12AM

        // Format the hours and minutes with AM/PM
        const amPmTime = `${adjustedHours}:${String(minutes).padStart(2, '0')} ${
          isPm ? 'PM' : 'AM'
        }`;

        if (!eventsByRoomAndDate[roomName]) {
          eventsByRoomAndDate[roomName] = {};
        }

        if (!eventsByRoomAndDate[roomName][amPmTime]) {
          eventsByRoomAndDate[roomName][amPmTime] = event;
        }
      });
    });

    const events = Object.values(day['rooms']).reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);

    let intervalOverride = null;

    // Update dates for 2025
    if (day.date === '2025-11-19') {
      events.push({
        id: 99998,
        start: '16:50',
        duration: '0:30',
        title: 'Fake event to fix calendar between lightning talks and dinner'
      });
      events.push({
        id: 99999,
        start: '17:00',
        duration: '2:00',
        title: 'Fake event to fix calendar between lightning talks and dinner'
      });
    }

    if (day.date === '2025-11-17') intervalOverride = 30;

    events.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

    const intervals = [];

    for (let i = 0; i < events.length; i++) {
      const startTime = timeToMinutes(events[i].start) / 60;
      const duration = timeToMinutes(events[i].duration) / 60;
      let endTime =
        i === events.length - 1 ? startTime + duration : timeToMinutes(events[i + 1].start) / 60;

      const intervalSize = intervalOverride ?? decideInterval(duration);

      // Check if the interval already exists
      if (
        !intervals.some(
          (interval) => interval.startTime === startTime && interval.endTime === endTime
        )
      ) {
        if (startTime !== endTime)
          intervals.push({
            startTime,
            endTime,
            timeSlotInterval: intervalSize
          });
      }

      if (i === events.length - 1) {
        intervals.push({
          startTime: endTime,
          endTime: endTime + (intervalSize / 60) * 2,
          timeSlotInterval: intervalSize
        });
      }
    }

    const mergedIntervals = [];
    let currentInterval = null;

    for (const interval of intervals) {
      if (currentInterval === null) {
        currentInterval = interval;
      } else {
        if (
          currentInterval.timeSlotInterval === interval.timeSlotInterval &&
          currentInterval.endTime === interval.startTime
        ) {
          currentInterval.endTime = interval.endTime;
        } else {
          mergedIntervals.push(currentInterval);
          currentInterval = interval;
        }
      }
    }

    // push the last interval if there is one
    if (currentInterval !== null) {
      mergedIntervals.push(currentInterval);
    }

    // Generate time slots for each period
    const timeSlots = mergedIntervals.flatMap(({ startTime, endTime, timeSlotInterval }) => {
      const totalMinutes = (endTime - startTime) * 60;
      return Array.from({ length: totalMinutes / timeSlotInterval }, (_, i) => ({
        time: Math.round(startTime * 60 + i * timeSlotInterval),
        interval: timeSlotInterval
      }));
    });

    return { timeSlots, events: eventsByRoomAndDate };
  }

  $: ({ events, timeSlots } = parseDays(day));

  const overriddenRoomNames = {
    'Hobart CBD and Surrounds': 'Other'
  };

  const roomWidths = {
    'University of Tasmania Studio Theatre': 160,
    'Hobart CBD and Surrounds': 150,
    Atrium: 150
  };

  function openEventModal(event) {
    selectedEvent = event;
    modalOpen = true;
  }
</script>

<table
  class="not-prose m-0 w-full border-separate"
  style="display: block;
    overflow-x: auto;
    white-space: nowrap;"
  cellpadding="0"
  cellspacing="0"
>
  <thead>
    <tr class="z-20 border-b bg-gray-50" style="height: {INTERVAL_HEIGHT}px">
      <th class="w-[75px] min-w-[75px] border-b px-1 py-2"></th>
      {#each Object.keys(day.rooms) as roomName, index}
        <th
          class="min-w-[150px] border-b px-1 py-2 text-sm font-bold text-gray-800"
          style="width: {roomWidths[roomName] ? `${roomWidths[roomName]}px` : ''}"
        >
          {overriddenRoomNames[roomName] || roomName}
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#if timeSlots.length === 0}
      <tr>
        <td colspan={Object.keys(day.rooms).length + 1} class="text-center text-xl">
          {noEventsMap[day.date] || 'No events'}
        </td>
      </tr>
    {/if}
    {#each timeSlots as { time, interval }}
      <tr style="height: {INTERVAL_HEIGHT}px">
        {#if time % 15 === 0}
          <td class="border-t p-0 pr-1 text-right align-top">
            {toAmPm(time)}
          </td>
        {:else}
          <td />
        {/if}

        {#each Object.keys(events) as roomName, index}
          {@const event = events?.[roomName]?.[toAmPm(time)]}
          <td class="{time % 15 === 0 ? 'border-t' : ''} relative">
            {#if event}
              <!-- EventCard component inline -->
              <div
                on:click={() => openEventModal(event)}
                on:keydown={(e) => e.key === 'Enter' && openEventModal(event)}
                class="absolute z-10 cursor-pointer overflow-hidden rounded-md border border-solid bg-white"
                style="
                  top: 0px;
                  height: {Math.max(
                  INTERVAL_HEIGHT * 2 - 5,
                  (timeToMinutes(event.duration) / interval) * INTERVAL_HEIGHT - 5
                )}px;
                  width: 95%;
                  margin-top: 2px;
                  user-select: none;
                  color: white;
                  border-color: rgb(229 231 235);
                "
                tabindex="0"
                role="button"
              >
                {#if event.id > 0}
                  <div
                    class="flex flex-nowrap items-center justify-center rounded-t px-2 py-1 text-xs text-white"
                    style="background-color: {getBackgroundColor(event.track)}"
                  >
                    <span class="flex-1 flex-grow font-bold">{toAmPm(time)}</span>
                    <!-- {#if event.room}
                      <span class="flex-1 flex-grow-[3] text-center font-medium">
                        {event.room}
                      </span>
                    {/if} -->
                    <span class="flex-1 flex-grow text-right">
                      {toHours(event.duration)}
                    </span>
                  </div>
                  <div class="xl:text-xsm mb-2 px-2 pt-2 text-xs text-gray-900">
                    {event.title}
                  </div>

                  <!-- {#if event?.abstract}
                    <div class="prose m-0 max-w-none p-2 pt-0 text-xs leading-5 text-gray-600">
                      {@html event.abstract.replace(/\n/g, '<br>')}
                    </div>
                  {/if} -->

                  {#if event.persons && event.persons.length > 0}
                    <div class="xl:text-xsm mb-2 px-2 pt-2 text-xs text-gray-900">
                      {event.persons.map((person) => person.public_name).join(', ')}
                    </div>
                  {/if}
                  <div
                    class="absolute right-0 bottom-0 px-2 py-[6px] text-xs font-bold"
                    style="color: {getBackgroundColor(event.track)}"
                  >
                    {event.track}
                  </div>
                {:else}
                  <span>{event.title}</span>
                {/if}
              </div>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<EventModal open={modalOpen} event={selectedEvent} setIsOpen={(open) => (modalOpen = open)} />
