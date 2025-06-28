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
</script>

<Link
  {href}
  {target}
  class="btn btn-block btn-{color} rounded-full border-none {size === 'sm'
    ? 'btn-sm text-sm'
    : 'btn-lg py-4 '} min-w-fit font-normal whitespace-nowrap shadow-none {className}"
>
  {@render children()}
  <span class="icon-[lucide--arrow-up-right] block"></span>
</Link>
