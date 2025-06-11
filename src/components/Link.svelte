<script lang="ts">
  import { PUBLIC_BASE_PATH } from '$env/static/public';
  const { href: origHref, children, ...props } = $props();

  const href = origHref.startsWith('/') ? `${PUBLIC_BASE_PATH}${origHref}` : origHref;
</script>

<a {href} {...props}>{@render children()}</a>
