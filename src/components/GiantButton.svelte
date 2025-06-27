<script lang="ts">
  const { children, href } = $props();
</script>

<div class="flex items-center justify-center">
  <div class="hidden items-center -space-x-3 sm:flex [&>span]:h-10 [&>span]:w-10">
    <span class="icon-[material-symbols-light--keyboard-double-arrow-right-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-right-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-right-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-right-rounded]"></span>
  </div>
  <a {href} target="_blank" class="btn btn-lg btn-success rounded-full border-none shadow-none"
    >{@render children()}</a
  >
  <div class="hidden items-center -space-x-3 sm:flex [&>span]:h-10 [&>span]:w-10">
    <span class="icon-[material-symbols-light--keyboard-double-arrow-left-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-left-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-left-rounded]"></span>
    <span class="icon-[material-symbols-light--keyboard-double-arrow-left-rounded]"></span>
  </div>
</div>
