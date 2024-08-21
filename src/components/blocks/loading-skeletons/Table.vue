<template>
  <table
    class="constanta-table const-loading-skeleton-table"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
    }"
  >
    <thead>
      <tr :class="[props.options?.thead?.height || 'small']">
        <template v-for="(__, i) in columns" :key="i">
          <cell
            tag="th"
            :style="{ width: typeof __ === 'object' && __.width }"
            :show-column-title="props.showColumnTitle"
            :title="typeof __ === 'object' ? __.title : __"
            :light="props.light || !props.dark"
            :dark="props.dark"
            :height="props.options?.thead?.height || 'medium'"
          />
        </template>
      </tr>
    </thead>

    <tbody>
      <template v-for="(_, i) in rowCount" :key="i">
        <tr :class="[props.options?.tbody?.height || 'medium']">
          <template v-for="(__, i) in columns" :key="i">
            <cell
              tag="td"
              :light="props.light || !props.dark"
              :dark="props.dark"
              :height="props.options?.tbody?.height || 'medium'"
            />
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

import cell from './TableCell.vue';

import type { ConstantaLoadingSkeletionTableOptions } from '@/interfaces/controllers.interface';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },

  columns: { type: Array as PropType<Array<string | number | { title: string; width: string }>>, required: true },
  options: { type: Object as PropType<ConstantaLoadingSkeletionTableOptions>, required: false },
  rowCount: { type: Number, required: false, default: 10 },

  showColumnTitle: { type: Boolean, required: false },
});
</script>
