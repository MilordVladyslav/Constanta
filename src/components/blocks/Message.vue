<template>
  <div class="constanta-message" :class="[state, { light: props.light || !props.dark, dark: props.dark }]">
    <!-- <const-state-icons :icon="state" /> -->
    <p>{{ props.text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';

import { STATE } from '@/interfaces/controllers.interface';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },
  text: { type: String, required: true },
  state: { type: String as PropType<STATE>, required: true },
});
</script>
