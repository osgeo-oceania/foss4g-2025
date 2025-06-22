<script lang="ts">
  import Link from '$components/Link.svelte';
</script>

<div class="px-2 pb-2">
  <div class="bg-primary reverse-grid mt-8 grid rounded-2xl sm:grid-cols-2">
    <div class="flex flex-col space-y-4 p-8 text-white">
      <div class="text-lg">FOSS4G Auckland 2025</div>
      <div class="grid grid-cols-2 text-xs">
        <ul class="space-y-2">
          <li><Link href="/agenda">Agenda</Link></li>
          <li><Link href="/speakers">Speakers</Link></li>
          <li><Link href="/register">Register</Link></li>
          <li><Link href="/venue">Venue</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
        </ul>
        <ul class="space-y-2">
          <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/cookie-policy">Cookie Policy</Link></li>
        </ul>
      </div>
      <div class="mt-8 text-xs">&copy; FOSS4G Oceania - All rights reserved</div>
    </div>
    <div class="bg-secondary text-primary space-y-4 rounded-2xl p-8">
      <div class="mb-2 text-sm uppercase">Stay Updated</div>
      <div class="text-xs">Subscribe for event updates</div>
      <div class="">
        <input type="text" placeholder="email" class="bg-secondary input input-primary" />
      </div>
      <button class="btn bg-primary btn-sm rounded-full border-0 px-6 font-normal text-white"
        >Stay updated</button
      >
      <div class="pt-4 text-sm uppercase">Follow Us</div>
      <div class=" text-2xl space-x-2 uppercase flex">
        <Link href="https://facebook.com"><span class="block icon-[uil--facebook]"></span></Link>
        <Link href="https://linkedin.com"><span class="block icon-[uil--linkedin]"></span></Link>
        <Link href="https://instagram.com"><span class="block icon-[uil--instagram]"></span></Link>
        <Link href="https://youtube.com"><span class="block icon-[uil--youtube]"></span></Link>
      </div>
    </div>
  </div>
</div>

<style>
  .reverse-grid {
    direction: rtl;
  }
  .reverse-grid > * {
    direction: ltr;
  }
</style>
