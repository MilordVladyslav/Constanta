<template>
  <div class="constanta-loading-skeleton-collapse">
    <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="stripe" />

    <div class="constanta-loading-skeleton-collapse__content">
      <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="title" />
      <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="icon" />
    </div>

    <const-loading-skeleton :light="props.light || !props.dark" :dark="props.dark" class="stripe" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
});
</script>
