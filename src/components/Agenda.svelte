<script lang="ts">
  interface AgendaItem {
    days: string;
    time: string;
    heading: string;
    description: string;
  }

  const agendaItems: AgendaItem[] = [
    {
      days: '1 & 2',
      time: '09:00 - 17:00',
      heading: 'Workshops',
      description:
        "Workshops will be held at the University of Tasmania's Sandy Bay campus. Classrooms are in the Social Sciences building. The registration and break area is in the Studio Theatre."
    },
    {
      days: '3 - 5',
      time: '09:00 - 17:00',
      heading: 'Conference',
      description:
        'Registration includes conference registration to presentations and talks, morning tea, lunch and afternoon tea for Wednesday 6th and Thursday 7th November. It also includes access to the Ice Breaker on Tuesday 5th November and the Community Day on Friday 8th November.'
    },
    {
      days: '6 & 7',
      time: '09:00 - 17:00',
      heading: 'Community Events',
      description:
        'Registration at the conference is not a prerequisite for participation in the Community Day. Participation in the Community Day is free of charge and all folks interested.'
    }
  ];
</script>

{#snippet agendaItemGrid(item: AgendaItem)}
  <div class="grid sm:grid-cols-12 pl-8 pr-12 py-4">
    <div class="sm:col-span-5 flex sm:flex-col justify-between sm:justify-center sm:text-2xl">
      <div>Days {item.days}</div>
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
