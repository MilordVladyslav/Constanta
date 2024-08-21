<template>
  <div class="constanta-badge-status" :class="[{ light: props.light || !props.dark, dark: props.dark }, props.state]">
    <p v-if="!slots['default']">{{ props.value?.toString().trim() }}</p>

    <div v-else class="constanta-badge-status__slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, useSlots } from 'vue';

import { STATE } from '@/interfaces/controllers.interface';

const slots = useSlots();

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
  state: { type: String as PropType<STATE>, required: true },
  value: { type: String, required: false },
});
</script>
