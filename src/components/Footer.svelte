<script lang="ts">
  import Link from '$components/Link.svelte';
  import Button from './Button.svelte';
</script>

<div class="px-2 pb-2">
  <div class="bg-primary grid rounded-4xl sm:grid-cols-2">
    <div class="flex flex-col space-y-4 p-8 text-white">
      <div class="text-lg">FOSS4G Auckland 2025</div>
      <div class="grid grid-cols-2 text-xs">
        <ul class="space-y-2">
          <li><Link href="/attend/call-for-papers">Call For Papers</Link></li>
          <li><Link href="/attend/register">Register</Link></li>
          <li><Link href="/program/outline">Program</Link></li>
          <li><Link href="/sponsorship">Sponsorship</Link></li>
          <li><Link href="/organisers">Organisers</Link></li>
        </ul>
        <ul class="space-y-2">
          <li><Link href="/attend/terms-and-conditions">Terms &amp; Conditions</Link></li>
          <li><Link href="/attend/code-of-conduct">Code Of Conduct</Link></li>
          <li><Link href="/attend/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div class="mt-8 text-xs">&copy; FOSS4G Oceania - All rights reserved</div>
    </div>
    <div class="bg-secondary text-primary space-y-4 rounded-4xl p-8">
      <div class="mb-2 text-sm uppercase">Stay Updated</div>
      <div class="text-xs">Subscribe for event updates</div>
      <Button
        href="https://mailchi.mp/foss4g/mailing-list"
        target="_blank"
        size="sm"
        color="primary"
        class="w-auto px-6"
      >
        Join our Mailing List
      </Button>
      <div class="pt-4 text-sm uppercase">Follow Us</div>
      <div class=" flex space-x-2 text-2xl uppercase">
        <Link href="https://www.facebook.com/foss4g2025/"
          ><span class="icon-[uil--facebook] block"></span></Link
        >
        <Link href="https://www.linkedin.com/showcase/foss4g/m"
          ><span class="icon-[uil--linkedin] block"></span></Link
        >
        <Link href="https://www.youtube.com/c/FOSS4G"
          ><span class="icon-[uil--youtube] block"></span></Link
        >
      </div>
    </div>
  </div>
</div>

<style>
</style>
