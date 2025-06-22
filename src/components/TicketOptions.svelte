<script lang="ts">
  const ticketOptions = [
    {
      title: 'Early Bird Pass',
      description: 'Limited Time Offer',
      price: '$299',
      cardClass: 'bg-success',
      buttonClass: 'bg-white'
    },
    {
      title: 'Standard Pass',
      description: 'Standard conference pass',
      price: '$399',
      cardClass: 'bg-white border-1 border-primary',
      buttonClass: 'bg-success'
    },
    {
      title: 'Sponsor Package',
      description: 'Includes donation to the conference',
      price: '$299',
      cardClass: 'bg-white border-1 border-primary',
      buttonClass: 'bg-success'
    }
  ];
</script>

<div class="divider divider-primary text-primary my-8 text-4xl">Ticket Options</div>

{#snippet ticketOption(tOption: (typeof ticketOptions)[0])}
  <div class={`card ${tOption.cardClass} rounded-2xl sm:p-6`}>
    <div class="mb-3 text-sm uppercase">
      {tOption.title}
    </div>
    <div class="mb-12 text-xs">
      {tOption.description}
    </div>
    <div class="text-2xl">
      {tOption.price}
    </div>
    <div class="mt-4">
      <div class={`btn rounded-full text-sm  font-normal ${tOption.buttonClass}`}>
        Get Your Ticket <span class="icon-[lucide--arrow-up-right] block"></span>
      </div>
    </div>
  </div>
{/snippet}
<div class="grid space-x-4 sm:grid-cols-3">
  {#each ticketOptions as tOption}
    {@render ticketOption(tOption)}
  {/each}
</div>
