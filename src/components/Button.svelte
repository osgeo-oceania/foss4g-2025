<script lang="ts">
  import Link from './Link.svelte';

  interface Props {
    children: any;
    href: string;
    target?: string;
    size?: 'sm' | 'lg';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    class?: string;
  }

  const {
    children,
    href,
    target = '_self',
    size = 'lg',
    color = 'success',
    class: className = ''
  }: Props = $props();

  // Check if a custom background class is provided
  const hasCustomBg = className.includes('bg-');
  const hoverStyle = hasCustomBg ? 'hover:!shadow-sm' : 'hover:!bg-success hover:!shadow-sm';
</script>

<Link
  {href}
  {target}
  class="btn btn-block btn-{color} rounded-full border-none {size === 'sm'
    ? 'btn-sm text-sm'
    : 'btn-lg py-4 '} min-w-fit font-normal whitespace-nowrap shadow-none {hoverStyle} hover:translate-x-0.5 hover:-translate-y-0.5 transition-all duration-100 ease-out {className}"
>
  {@render children()}
  <span class="icon-[lucide--arrow-up-right] block"></span>
</Link>
