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
  class={`text-primary my-8 font-serif ${size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-4xl' : 'text-6xl'} ${className}`}
>
  {@render children()}
</div>
