<template>
  <const-loading-skeleton
    class="const-loading-skeleton-button background"
    :light="props.light || !props.dark"
    :dark="props.dark"
  >
    <const-loading-skeleton class="title w-full" :light="props.light || !props.dark" :dark="props.dark" />
  </const-loading-skeleton>
</template>

<script lang="ts" setup>
const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
});
</script>
