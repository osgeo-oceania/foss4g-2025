<script lang="ts">
  import Button from './Button.svelte';

  const ticketOptions = [
    {
      title: 'Standard Conference Ticket',
      description:
        'Includes full conference registration for Wednesday 19th, Thursday 20th and Friday 21st November as well as access to the icebreaker on Tuesday night.',
      price: '$950',
      currency: 'NZD',
      cardClass: 'bg-success',
      buttonClass: 'bg-white'
    },
    {
      title: 'Student/Retired Ticket',
      description:
        'For secondary and tertiary students at any institution, and for people who are no longer in paid work.',
      price: '$500',
      currency: 'NZD',
      cardClass: 'bg-white border-1 border-primary/50'
    },
    {
      title: 'Community Contributor',
      description:
        'For open source, open data or volunteer community contributors otherwise not supported by another organisation to attend.',
      price: '$500',
      currency: 'NZD',
      cardClass: 'bg-white border-1 border-primary/50'
    },
    {
      title: 'Workshops',
      description:
        'Register for up to 4 workshops from a selection of 44, being held Monday 17th and Tuesday 18th November over Morning and Afternoon sessions.',
      price: '$50',
      currency: 'NZD per workshop',
      cardClass: 'bg-white border-1 border-primary/50'
    }
  ];
</script>

{#snippet ticketOption(tOption: (typeof ticketOptions)[0])}
  <div
    class={`card ${tOption.cardClass} flex flex-col justify-between rounded-4xl p-6 sm:p-8 sm:py-10`}
  >
    <div class="flex grow justify-between sm:flex-col">
      <div>
        <div class="text-md mb-3 font-normal uppercase">
          {tOption.title}
        </div>
        <div class="text-sm sm:mb-12">
          {tOption.description}
        </div>
      </div>
      <div class="flex flex-1 items-end justify-end text-2xl sm:justify-normal">
        {tOption.price}
        <span class="text-lg">{tOption.currency}</span>
      </div>
    </div>
    <div class="mt-4 flex justify-end sm:justify-normal">
      <Button
        href="https://ti.to/osgeo-oceania/foss4g-2025"
        class={`text-sm ${tOption.buttonClass}`}
      >
        Get Your Ticket
      </Button>
    </div>
  </div>
{/snippet}
<div class="grid space-y-4 sm:grid-cols-3 sm:space-y-0 sm:space-x-4">
  {#each ticketOptions as tOption}
    {@render ticketOption(tOption)}
  {/each}
</div>
