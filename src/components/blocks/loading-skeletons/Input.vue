<template>
  <div class="constanta-loading-skeleton-input">
    <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="title" />

    <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="input">
      <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="value" />
    </const-loading-skeleton>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
});
</script>
