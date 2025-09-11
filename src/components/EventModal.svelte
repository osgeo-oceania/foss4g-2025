<script lang="ts">
  import { marked } from 'marked';

  export let open: boolean = false;
  export let event: any = null;
  export let setIsOpen: (open: boolean) => void;

  let containerRef: HTMLDivElement;

  function toHours(duration: string) {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h${minutes}min`;
  }

  function markdownToHtml(text: string): string {
    if (!text) return '';
    return marked.parse(text, { 
      breaks: true,
      gfm: true 
    }) as string;
  }

  $: day = event?.date ? new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' }) : '';

  $: startTime = event?.date
    ? new Date(event.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';

  $: duration = event?.duration ? toHours(event.duration) : '';

  // Handle body overflow when modal opens/closes
  $: if (open) {
    document.body.style.overflow = 'hidden';
    containerRef?.scrollTo(0, 0);
  } else {
    document.body.style.overflow = 'auto';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleBackdropClick() {
    closeModal();
  }

</script>

{#if open && event}
  <!-- Modal backdrop -->
  <div
    class="fixed inset-0 z-50 flex justify-center"
    style="background: rgba(0, 0, 0, 0.5);"
    role="dialog"
    aria-modal="true"
    tabindex="0"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Escape' && closeModal()}
  >
    <!-- Modal container - centered in viewport -->
    <div class="flex h-full min-h-full justify-center bg-white" style="max-width:800px;">
      <!-- Modal content -->
      <div bind:this={containerRef} class="relative overflow-y-auto" role="document">
        <!-- Modal header and content -->
        <div class="p-6">
          <!-- Close button -->
          <button on:click={closeModal} aria-label="Close modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="width: 16px; height: 16px;"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <!-- Event title and details -->
          <div class="mb-6 pr-8">
            <h3 class="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl" id="modal-title">
              {event.title}
            </h3>

            <div class="mb-4 text-lg text-gray-600">
              {day}
              {startTime}
              ({duration}) in {event.room}
            </div>

            {#if event.abstract}
              <div class="mb-4 border-b border-gray-200 pb-4">
                <div class="prose prose-gray max-w-none">
                  {@html markdownToHtml(event.abstract)}
                </div>
              </div>
            {/if}

            {#if event?.description}
              <div class="mb-6">
                {#if open && event.logo}
                  <img
                    src={event.logo}
                    alt="Event logo"
                    class="mb-4 max-h-64 w-auto rounded-lg md:float-right md:ml-6 md:max-w-xs"
                  />
                {/if}
                <div class="prose prose-gray max-w-none">
                  {@html markdownToHtml(event.description)}
                </div>
              </div>
            {/if}

            {#if event.url}
              <a
                href={event.url}
                target="_blank"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline"
              >
                Open in pretalx
                <svg
                  class="ml-1"
                  style="width: 16px; height: 16px;"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            {/if}
          </div>

          <!-- Speakers section -->
          {#if (event.persons && event.persons.length > 0) || (event.speakers && event.speakers.length > 0)}
            <div class="border-t border-gray-200 pt-6">
              <h4 class="mb-4 text-xl font-semibold text-gray-900">Speakers</h4>
              <div class="space-y-6">
                {#each event.persons || event.speakers || [] as person}
                  <div class="flex space-x-4">
                    <!-- Speaker avatar -->
                    <div class="flex-shrink-0">
                      {#if person.avatar}
                        <img
                          class="rounded-full object-cover"
                          style="width: 64px; height: 64px;"
                          src={person.avatar}
                          alt={person.public_name || person.name}
                        />
                      {:else}
                        <div
                          class="flex items-center justify-center rounded-full bg-gray-300 text-gray-600"
                          style="width: 64px; height: 64px;"
                        >
                          <svg
                            style="width: 32px; height: 32px;"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      {/if}
                    </div>

                    <!-- Speaker info -->
                    <div class="flex-1">
                      <h5 class="font-medium text-gray-900">{person.public_name || person.name}</h5>
                      {#if person.biography}
                        <div class="mt-2 text-sm text-gray-600">
                          {@html markdownToHtml(person.biography)}
                        </div>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>

        <!-- Modal footer -->
        <div class="bg-gray-50 px-6 py-4">
          <button
            on:click={closeModal}
            class="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
