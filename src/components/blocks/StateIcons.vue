<template>
  <icons :icon="props.icon" class="constanta-state-icon" :class="props.state" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import Icons from './Icons.vue';

import { STATE } from '@/interfaces/controllers.interface';

const props = defineProps({
  icon: { type: String, required: true },
  state: { type: String as PropType<STATE | string>, required: false, default: STATE.default },
});
</script>
