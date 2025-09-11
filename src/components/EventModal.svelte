<script lang="ts">
  import { marked } from 'marked';

  export let open = false;
  export let event: any = null;
  export let setIsOpen: (open: boolean) => void;

  let modalContainer: HTMLDivElement;

  // Track colors by event type/track - matching BetterSchedule
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

  function getTrackColor(track: string): string {
    return trackColors[track as keyof typeof trackColors] || trackColors.default;
  }

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

  function renderMarkdown(text: string): string {
    if (!text) return '';
    return marked.parse(text, { breaks: true, gfm: true }) as string;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  // Lock body scroll when modal is open
  $: if (typeof document !== 'undefined') {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open && event}
  <!-- Backdrop with blur and animation -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
    style="background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)); backdrop-filter: blur(8px);"
    on:click={handleBackdropClick}
    on:keydown={(e) => {
      if (e.code == 'Escape') {
        closeModal();
      }
    }}
    tabindex="0"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Modal with enhanced styling and animations -->
    <div
      bind:this={modalContainer}
      class="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
      style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 1)); backdrop-filter: blur(20px);"
      on:click={(e) => e.stopPropagation()}
    >
      <!-- Gradient header with track color -->
      <div
        class="relative overflow-hidden"
        style="background: linear-gradient(135deg, {getTrackColor(event.track)}15, {getTrackColor(event.track)}25);"
      >
        <!-- Decorative background pattern -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-32 h-32 rounded-full" style="background: {getTrackColor(event.track)};"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 rounded-full" style="background: {getTrackColor(event.track)};"></div>
        </div>
        
        <div class="relative flex items-start justify-between p-8">
          <div class="flex-1 pr-8">
            <!-- Track badge -->
            {#if event.track}
              <div class="mb-4">
                <span
                  class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
                  style="background: {getTrackColor(event.track)};"
                >
                  <div class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  {event.track}
                </span>
              </div>
            {/if}

            <!-- Title with gradient text -->
            <h2 id="modal-title" class="mb-4 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
              {event.title}
            </h2>

            <!-- Event details with icons -->
            <div class="flex flex-wrap gap-6 text-gray-700">
              {#if event.start}
                <div class="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span class="font-medium">{formatTime(event.start)}</span>
                </div>
              {/if}
              {#if event.duration}
                <div class="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span class="font-medium">{formatDuration(event.duration)}</span>
                </div>
              {/if}
              {#if event.room}
                <div class="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-purple-600">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span class="font-medium">{event.room}</span>
                </div>
              {/if}
            </div>
          </div>

          <!-- Enhanced close button -->
          <button
            on:click={closeModal}
            class="p-3 text-gray-500 bg-white/80 hover:bg-white rounded-full transition-all duration-200 hover:shadow-lg hover:scale-110"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content area with enhanced styling -->
      <div class="overflow-y-auto" style="max-height: calc(90vh - 200px);">
        <div class="p-8 space-y-8">
          <!-- Abstract with enhanced typography -->
          {#if event.abstract}
            <div class="prose prose-lg prose-gray max-w-none">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  Abstract
                </h3>
                {@html renderMarkdown(event.abstract)}
              </div>
            </div>
          {/if}

          <!-- Description -->
          {#if event.description}
            <div class="prose prose-lg prose-gray max-w-none">
              {@html renderMarkdown(event.description)}
            </div>
          {/if}

          <!-- Speakers with enhanced cards -->
          {#if event.persons && event.persons.length > 0}
            <div class="border-t border-gray-200 pt-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div class="w-1 h-8 rounded-full" style="background: {getTrackColor(event.track)};"></div>
                {event.persons.length === 1 ? 'Speaker' : 'Speakers'}
              </h3>
              
              <div class="grid gap-6 sm:grid-cols-2">
                {#each event.persons as person}
                  <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div class="flex items-start gap-4">
                      {#if person.avatar}
                        <img
                          src={person.avatar}
                          alt={person.name || person.public_name || 'Speaker'}
                          class="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white"
                        />
                      {:else}
                        <div class="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-500">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                        </div>
                      {/if}
                      <div class="flex-1 min-w-0">
                        <h4 class="text-lg font-bold text-gray-900 mb-2">
                          {person.name || person.public_name || 'Unknown Speaker'}
                        </h4>
                        {#if person.biography}
                          <div class="prose prose-sm prose-gray max-w-none">
                            {@html renderMarkdown(person.biography)}
                          </div>
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- External link with enhanced styling -->
          {#if event.url}
            <div class="border-t border-gray-200 pt-8">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15,3 21,3 21,9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  View on Pretalx
                </a>
              </div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Enhanced footer -->
      <div class="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Press <kbd class="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd> to close
          </div>
          <button
            on:click={closeModal}
            class="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}