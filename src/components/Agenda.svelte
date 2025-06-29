<script lang="ts">
  import Button from './Button.svelte';
  
  interface AgendaItem {
    days: string;
    time: string;
    heading: string;
    description: string;
  }

  const agendaItems: AgendaItem[] = [
    {
      days: 'Mon 17, Tue 18 Nov',
      time: '09:00 - 17:00',
      heading: 'Workshops',
      description:
        'Workshops will be held at AUT City Campus in the heart of the Auckland central business district. Classrooms are in the WF building. The registration and break area will also be in the WF building.'
    },
    {
      days: 'Wed 19 to Fri 21 Nov',
      time: '09:00 - 17:00',
      heading: 'Conference',
      description:
        'Conference sessions will be held at AUT City Campus in the heart of the Auckland central business district.  All sessions will be held in the WG building. The registration, exhibition and break areas will also be in the WG building.'
    },
    {
      days: 'Sat 22, Sun 23 Nov',
      time: '09:00 - 17:00',
      heading: 'Community Events',
      description:
        'Registration at the conference is not a prerequisite for participation in the Community Day (including Code Sprints). Participation in the Community Day is free of charge and we welcome all folks interested.'
    }
  ];
</script>

{#snippet agendaItemGrid(item: AgendaItem)}
  <div class="grid py-4 pr-0 pl-2 sm:grid-cols-12 sm:py-8 sm:pr-8 sm:pl-8">
    <div class="flex justify-between sm:col-span-5 sm:flex-col sm:justify-start sm:text-2xl">
      <div>{item.days}</div>
      <div class="text-secondary">{item.time}</div>
    </div>
    <div class="sm:col-span-7">
      <div class="mb-4 text-2xl">{item.heading}</div>
      <p class="pr-0 text-sm">
        {item.description}
      </p>
    </div>
  </div>
{/snippet}

<div class="bg-primary/5 grid rounded-4xl p-4 sm:px-8 sm:py-12">
  {#each agendaItems as agendaItem}
    {@render agendaItemGrid(agendaItem)}
  {/each}
  
  <div class="flex justify-end pt-4 sm:pt-8 pr-0">
    <Button href="/program/outline" class="w-[240px]">View Detailed Program</Button>
  </div>
</div>
