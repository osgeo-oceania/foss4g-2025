<script lang="ts">
  const { label, time }: { label: string; time: string } = $props();
  import NewZealandSvg from '$images/svg/new-zealand.svg?url'

  let currentTime = $state(new Date());
  const targetTime = new Date(time);

  setInterval(() => {
    currentTime = new Date();
  });

  const diff = $derived(targetTime.getTime() - currentTime.getTime());
  const days = $derived(Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = $derived(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = $derived(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = $derived(Math.floor((diff % (1000 * 60)) / 1000));
</script>

<div class="relative bg-primary flex sm:min-h-[300px] flex-col rounded-2xl p-6 sm:p-12 text-white">
  <div class="text-xs text-white">
    {label}
  </div>
  <div class="flex mt-4 sm:mt-8">
    <div>
      <div class="sm:text-8xl text-3xl text-center sm:w-[120px] w-[50px]">{days.toString().padStart(2, '0')}</div>
      <div class="text-center text-xs">days</div>
    </div>
    <div class="sm:text-8xl text-3xl">:</div>
    <div>
      <div class="sm:text-8xl text-3xl text-center sm:w-[120px] w-[50px]">{hours.toString().padStart(2, '0')}</div>
      <div class="text-center text-xs">hours</div>
    </div>
    <div class="sm:text-8xl text-3xl">:</div>
    <div>
      <div class="sm:text-8xl text-3xl text-center sm:w-[120px] w-[50px]">{minutes.toString().padStart(2, '0')}</div>
      <div class="text-center text-xs">minutes</div>
    </div>
    <div class="sm:text-8xl text-3xl">:</div>
    <div>
      <div class="sm:text-8xl text-3xl text-center sm:w-[120px] w-[50px]">{seconds.toString().padStart(2, '0')}</div>
      <div class="text-center text-xs">seconds</div>
    </div>
  </div>
  <div class="flex justify-center absolute right-0 top-0 h-full">
    <img src={NewZealandSvg} class="w-[80%]"/>
  </div>
</div>
