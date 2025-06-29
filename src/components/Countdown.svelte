<script lang="ts">
  const { label, time }: { label: string; time: string } = $props();
  import NewZealandSvg from '$images/svg/new-zealand.svg?url';

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

<div
  class="bg-primary relative flex flex-col rounded-4xl px-6 py-8 text-white sm:min-h-[300px] sm:p-12"
>
  <div class="text-xl text-white">
    {label}
  </div>
  <div class="mt-4 flex sm:mt-8">
    <div>
      <div class="w-[50px] text-center text-3xl sm:w-[120px] sm:text-8xl">
        {days.toString().padStart(2, '0')}
      </div>
      <div class="text-center text-xs uppercase mt-5">days</div>
    </div>
    <div class="text-3xl sm:text-8xl">:</div>
    <div>
      <div class="w-[50px] text-center text-3xl sm:w-[120px] sm:text-8xl">
        {hours.toString().padStart(2, '0')}
      </div>
      <div class="text-center text-xs uppercase mt-5">hours</div>
    </div>
    <div class="text-3xl sm:text-8xl">:</div>
    <div>
      <div class="w-[50px] text-center text-3xl sm:w-[120px] sm:text-8xl">
        {minutes.toString().padStart(2, '0')}
      </div>
      <div class="text-center text-xs uppercase mt-5">minutes</div>
    </div>
    <div class="text-3xl sm:text-8xl">:</div>
    <div>
      <div class="w-[50px] text-center text-3xl sm:w-[120px] sm:text-8xl">
        {seconds.toString().padStart(2, '0')}
      </div>
      <div class="text-center text-xs uppercase mt-5">seconds</div>
    </div>
  </div>
  <div class="absolute top-0 right-0 flex h-full justify-center">
    <img src={NewZealandSvg} class="w-[80%]" alt="New Zealand" />
  </div>
</div>
