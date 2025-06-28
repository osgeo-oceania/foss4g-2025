<script lang="ts">
  interface HeadingProps {
    children: any;
    class?: string;
    size?: 'sm' | 'md' | 'lg';
  }

  const { children, class: className, size = 'lg' }: HeadingProps = $props();
</script>

<!-- TODO make this use header components -->
<div
  class={`text-primary mb-4 text-center font-serif sm:mb-8 sm:text-left ${size === 'sm' ? 'text-xl sm:text-2xl' : size === 'md' ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl'} ${className}`}
>
  {@render children()}
</div>
