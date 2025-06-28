<script lang="ts">
  import Button from './Button.svelte';

  interface HeadingProps {
    children: any;
    class?: string;
    title?: string;
    color?: 'primary' | 'secondary';
    button?: {
      href: string;
      text: string;
    };
  }

  const { children, class: className, button, title, color = 'secondary' }: HeadingProps = $props();
</script>

<div class={`card bg-${color} mb-4 rounded-4xl sm:mb-0 ${className}`}>
  <div
    class={`card-body flex flex-col justify-between px-6 py-8 sm:px-8 sm:py-10 text-${color}-content gap-4`}
  >
    <div class={`flex flex-col gap-4 font-${color === 'primary' ? 'light' : 'normal'}`}>
      <div class="text-3xl font-light">{title}</div>
      {@render children()}
    </div>
    {#if button}
      <div class="sm:w-[240px]">
        <Button href={button.href}>{button.text}</Button>
      </div>
    {/if}
  </div>
</div>
