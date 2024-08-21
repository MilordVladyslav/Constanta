<template>
  <component class="constanta-loading-skeleton-table-cell" :class="props.height" :is="props.tag">
    <template v-if="props.title">
      <p class="constanta-loading-skeleton-table-cell--title">
        {{ props.title }}
        <const-loading-skeleton v-if="!props.showColumnTitle" tag="span" />
      </p>
    </template>

    <const-loading-skeleton
      v-else
      :light="props.light || !props.dark"
      :dark="props.dark"
      :style="{ maxWidth: `${r}%` }"
    />
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import random from 'lodash.random';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },

  title: { type: [String, Number], required: false },
  showColumnTitle: { type: Boolean, required: false },

  tag: { type: String, required: true },
  height: { type: String as PropType<'large' | 'medium' | 'small'>, required: true },
});

const r = random(45, 100);
</script>
