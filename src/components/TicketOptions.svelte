<script lang="ts">
  import Link from './Link.svelte';

  const ticketOptions = [
    {
      title: 'Early Bird Pass',
      description: 'Limited Time Offer',
      price: '$700',
      cardClass: 'bg-success',
      buttonClass: 'bg-white'
    },
    {
      title: 'Student/Retired Pass',
      description: 'For secondary and tertiary students at any institution, and for people who are no longer in paid work.',
      price: '$500',
      cardClass: 'bg-white border-1 border-primary',
      buttonClass: 'bg-success'
    },
    {
      title: 'Community Contributor',
      description: 'For open source, open data or volunteer community contributors otherwise not supported by another organisation to attend.',
      price: '$500',
      cardClass: 'bg-white border-1 border-primary',
      buttonClass: 'bg-success'
    }
  ];
</script>

{#snippet ticketOption(tOption: (typeof ticketOptions)[0])}
  <div class={`card ${tOption.cardClass} rounded-2xl p-6`}>
    <div class="flex sm:flex-col">
      <div>
        <div class="mb-3 text-sm uppercase">
          {tOption.title}
        </div>
        <div class="text-xs sm:mb-12">
          {tOption.description}
        </div>
      </div>
      <div class="flex flex-1 justify-end text-2xl sm:justify-normal">
        {tOption.price}
      </div>
    </div>
    <div class="mt-4 flex justify-end sm:justify-normal">
      <Link href="/attend/register" class={`btn rounded-full text-sm  font-normal ${tOption.buttonClass}`}>
        Get Your Ticket <span class="icon-[lucide--arrow-up-right] block"></span>
      </Link>
    </div>
  </div>
{/snippet}
<div class="grid space-y-4 sm:grid-cols-3 sm:space-y-0 sm:space-x-4">
  {#each ticketOptions as tOption}
    {@render ticketOption(tOption)}
  {/each}
</div>
