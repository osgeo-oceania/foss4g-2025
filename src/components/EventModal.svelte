<script lang="ts">
  import { marked } from 'marked';

  export let open = false;
  export let event: any = null;
  export let setIsOpen: (open: boolean) => void;

  let modalContainer: HTMLDivElement;

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
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    style="background-color: rgba(0, 0, 0, 0.75);"
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
    <div
      bind:this={modalContainer}
      class="relative max-h-full w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl"
    >
      <!-- Header with close button -->
      <div class="flex items-start justify-between border-b border-gray-200 p-6">
        <div class="flex-1 pr-8">
          <h2 id="modal-title" class="mb-2 text-2xl font-bold text-gray-900">
            {event.title}
          </h2>
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            {#if event.start}
              <span>{formatTime(event.start)}</span>
            {/if}
            {#if event.duration}
              <span>• {formatDuration(event.duration)}</span>
            {/if}
            {#if event.room}
              <span>• {event.room}</span>
            {/if}
          </div>
        </div>
        <button
          on:click={closeModal}
          class="p-2 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            />
          </svg>
        </button>
      </div>

      <!-- Content area with scroll -->
      <div class="overflow-y-auto" style="max-height: calc(80vh - 140px);">
        <div class="space-y-6 p-6">
          <!-- Track badge -->
          {#if event.track}
            <div class="flex items-center">
              <span
                class="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
                style="background-color: #1f4182;"
              >
                {event.track}
              </span>
            </div>
          {/if}

          <!-- Abstract -->
          {#if event.abstract}
            <div class="prose prose-gray max-w-none">
              {@html renderMarkdown(event.abstract)}
            </div>
          {/if}

          <!-- Description -->
          {#if event.description}
            <div class="prose prose-gray max-w-none">
              {@html renderMarkdown(event.description)}
            </div>
          {/if}

          <!-- Speakers -->
          {#if event.persons && event.persons.length > 0}
            <div class="border-t border-gray-200 pt-6">
              <h3 class="mb-4 text-lg font-semibold text-gray-900">
                {event.persons.length === 1 ? 'Speaker' : 'Speakers'}
              </h3>
              <div class="space-y-4">
                {#each event.persons as person}
                  <div class="flex items-start space-x-4">
                    {#if person.avatar}
                      <img
                        src={person.avatar}
                        alt={person.name || person.public_name || 'Speaker'}
                        class="h-16 w-16 flex-shrink-0 rounded-full object-cover"
                      />
                    {:else}
                      <div
                        class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-200"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="text-gray-400"
                        >
                          <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          />
                        </svg>
                      </div>
                    {/if}
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-900">
                        {person.name || person.public_name || 'Unknown Speaker'}
                      </h4>
                      {#if person.biography}
                        <div class="prose prose-sm prose-gray mt-2 max-w-none">
                          {@html renderMarkdown(person.biography)}
                        </div>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- External link -->
          {#if event.url}
            <div class="border-t border-gray-200 pt-6">
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center font-medium text-blue-600 hover:text-blue-700"
              >
                View on pretalx
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="ml-1">
                  <path
                    d="M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v4.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H8a.5.5 0 0 0 0-1H3.5z"
                  />
                  <path
                    d="M9 1a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.354 7.354a.5.5 0 1 1-.708-.708L13.293 2H9.5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </a>
            </div>
          {/if}
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
        <div class="flex justify-end">
          <button
            on:click={closeModal}
            class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
