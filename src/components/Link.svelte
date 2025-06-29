<script lang="ts">
  //
  // this is a custom <a> component to prepend the link with the base path
  // (useful for when app is deployed on github pages with a subfolder ie
  // osgeo-oceania.github.io/foss4g-2025/)
  //

  import { PUBLIC_BASE_PATH } from '$env/static/public';
  const { href: origHref, children, ...props } = $props();

  const href = origHref.startsWith('/') ? `${PUBLIC_BASE_PATH}${origHref}` : origHref;
</script>

<a {href} {...props}>
  {@render children()}
</a>
