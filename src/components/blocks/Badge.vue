<template>
  <div
    class="constanta-badge"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
      disabled: props.disabled,
      'no-value': !hasValue,
    }"
  >
    <p v-if="hasValue">{{ props.value }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
  value: { type: String, required: false, default: null },
  disabled: { type: Boolean, required: false },
});

const hasValue = computed(() => props.value !== null && props.value.toString().trim()?.length);
</script>
