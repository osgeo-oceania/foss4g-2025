<script lang="ts">
  let { src = null } = $props();
</script>

<div class="video-container">
  <iframe
    title="YouTube video player"
    {src}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

<style>
  .video-container {
    position: relative;
    padding-bottom: 57%; /* 16:9 aspect ratio */
    padding-top: 25px;
    height: 0;
    border-radius: 25px;
    overflow: hidden;
    z-index: 1;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
