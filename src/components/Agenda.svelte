<script lang="ts">
  interface AgendaItem {
    days: string;
    time: string;
    heading: string;
    description: string;
  }

  const agendaItems: AgendaItem[] = [
    {
      days: 'Mon 17 & Tue 18 Nov',
      time: '09:00 - 17:00',
      heading: 'Workshops',
      description:
        "Workshops will be held at AUT City Campus in the heart of the Auckland central business district. Classrooms are in the WF building. The registration and break area will also be in the WF Buidling."
    },
    {
      days: 'Wed 19 - Fri 21 Nov',
      time: '09:00 - 17:00',
      heading: 'Conference',
      description:
        'Conference sessions will be held at AUT City Campus in the heart of the Auckland central business district.  All sessions will be held in the WG building. The registration, exhibition and break areas will also be in the WG Buidling.'
    },
    {
      days: 'Sat 22 & Sun 23 Nov',
      time: '09:00 - 17:00',
      heading: 'Community Events',
      description:
        'Registration at the conference is not a prerequisite for participation in the Community Day (including Code Sprints). Participation in the Community Day is free of charge and we welcome all folks interested.'
    }
  ];
</script>

{#snippet agendaItemGrid(item: AgendaItem)}
  <div class="grid sm:grid-cols-12 pl-8 pr-12 py-4">
    <div class="sm:col-span-5 flex sm:flex-col justify-between sm:justify-center sm:text-2xl">
      <div>{item.days}</div>
      <div>{item.time}</div>
    </div>
    <div class="sm:col-span-7">
      <div class="mb-2 text-2xl">{item.heading}</div>
      <p class="text-sm pr-8">
        {item.description}
      </p>
    </div>
  </div>
{/snippet}

<div class="grid divide-y">
  {#each agendaItems as agendaItem}
    {@render agendaItemGrid(agendaItem)}
  {/each}
</div>
