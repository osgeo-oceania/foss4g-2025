<script lang="ts">
  import Link from '$components/Link.svelte';
  import Button from './Button.svelte';
</script>

<div class="px-2 pb-8">
  <div class="bg-primary grid rounded-4xl sm:grid-cols-2">
    <div class="flex flex-col space-y-6 p-6 sm:p-12 text-white">
      <div class="text-xl">FOSS4G Auckland 2025</div>
      <div class="grid grid-cols-2">
        <ul class="space-y-3">
          <li><Link href="/attend/call-for-papers">Call For Papers</Link></li>
          <li><Link href="/attend/register">Register</Link></li>
          <li><Link href="/program/outline">Program</Link></li>
          <li><Link href="/sponsorship">Sponsorship</Link></li>
          <li><Link href="/organisers">Organisers</Link></li>
        </ul>
        <ul class="space-y-3">
          <li><Link href="/attend/terms-and-conditions">Terms &amp; Conditions</Link></li>
          <li><Link href="/attend/code-of-conduct">Code Of Conduct</Link></li>
          <li><Link href="/attend/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div class="mt-8 text-xs">&copy; FOSS4G Oceania - All rights reserved</div>
    </div>
    <div class="bg-secondary text-primary space-y-4 rounded-4xl p-6 sm:p-12">
      <div class="text-md mb-2 uppercase">Stay Updated</div>
      <div class="text-sm">Subscribe for event updates</div>
      <Link
        href="https://mailchi.mp/foss4g/mailing-list"
        target="_blank"
        class="btn btn-block rounded-full border-none btn-sm text-sm min-w-fit font-light whitespace-nowrap shadow-none w-auto px-8 py-6 bg-primary text-white hover:bg-success hover:text-primary transition-all duration-200"
      >
        Join our Mailing List
        <span class="icon-[lucide--arrow-up-right] block"></span>
      </Link>
      <div class="text-md pt-8 uppercase">Follow Us</div>
      <div class=" flex space-x-2 text-2xl uppercase">
        <Link href="https://www.facebook.com/foss4g2025/"
          ><span class="icon-[uil--facebook] block"></span></Link
        >
        <Link href="https://www.linkedin.com/company/foss4g2025/"
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
