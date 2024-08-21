<template>
  <icons :icon="props.icon" :direction="props.direction" />
</template>

<script lang="ts" setup>
import Icons from './Icons.vue';

const props = defineProps({
  icon: { type: String, required: true },
  direction: { type: String, required: false, default: 'left' },
});
</script>
