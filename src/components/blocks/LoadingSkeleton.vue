<template>
  <component
    :is="variant ? readyComponents[variant] : props.tag"
    :light="props.light || !props.dark"
    :dark="props.dark"
    :class="[
      props.variant,
      {
        light: props.light || !props.dark,
        dark: props.dark,
        'big-border-radius': props.bigBorderRadius,
        'constanta-loading-skeleton': !readyComponents[variant || ''],
      },
    ]"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { markRaw, type PropType } from 'vue';

import button from './loading-skeletons/Button.vue';
import collaplse from './loading-skeletons/Collaplse.vue';
import input from './loading-skeletons/Input.vue';
import table from './loading-skeletons/Table.vue';

import type { ConstantaLoadingSkeletionVariant } from '@/interfaces/controllers.interface';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },

  tag: { type: String, default: 'div' },
  variant: { type: String as PropType<ConstantaLoadingSkeletionVariant>, required: false },
  bigBorderRadius: { type: Boolean, required: false },
});

const readyComponents: { [x: string]: any } = {
  table: markRaw(table),
  input: markRaw(input),
  button: markRaw(button),
  collapse: markRaw(collaplse),
  // switch - from class;
  // photo - from class;
  // btn-link - from class;
  // 16x16 - from class;
  // 32x32 - from class;
};
</script>
