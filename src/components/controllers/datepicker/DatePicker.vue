<template>
  <div
    class="constanta-date-picker"
    :class="{
      dark: props.dark,
      light: props.light || !props.dark,
      vertical: $props.vertical,
    }"
  >
    <header class="constanta-date-picker__header">
      <template v-if="showYears">
        <button class="constanta-btn-link gray medium" @click="showYears = false">
          <DirectionIcons icon="chevron" />
          Back to days
        </button>
      </template>
      <template v-else>
        <p class="constanta-date-picker__header--title">Select year</p>
        <button class="constanta-btn-link medium" @click="showYears = !showYears">
          {{ selectedMonth.getFullYear() }}
          <DirectionIcons icon="chevron" direction="bottom" />
        </button>
      </template>
    </header>

    <div class="constanta-date-picker__month-select">
      <button class="constanta-date-picker__month-select--controller" @click="prevMonth(selectedMonth)">
        <DirectionIcons icon="chevron" />
      </button>

      <button class="constanta-date-picker__month-select--month">
        {{ selectedMonth.toLocaleString(props.localeISO, { month: 'long' }) }}
      </button>

      <button class="constanta-date-picker__month-select--controller" @click="nextMonth(selectedMonth)">
        <DirectionIcons icon="chevron" direction="right" />
      </button>
    </div>

    <div class="constanta-date-picker__calendar m-bottom-1">
      <Years
        v-show="showYears"
        :dark="props.dark"
        :light="props.light || !props.dark"
        :maxYear="props.maxYear"
        :selectedYear="selectedMonth.getFullYear()"
        @select="selectYear"
      />

      <template v-for="(_, i) in props.cellsAmount" :key="i">
        <Calendar
          :dark="props.dark"
          :light="props.light || !props.dark"
          :showMonthAndYear="props.cellsAmount > 1"
          :hideDaysFromAnotherMonth="props.cellsAmount > 1"
          :selectedMonth="new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + i, selectedMonth.getDay())"
          :localeISO="props.localeISO"
          :modelValue="props.modelValue"
          @update:modelValue="selectDay"
        />
      </template>
    </div>

    <footer v-if="!(props.cellsAmount > 1) || props.hideToday" class="constanta-date-picker__footer">
      <button class="constanta-btn-link medium" @click="selectedMonth = new Date()">Today</button>
    </footer>

    <slot name="footer" />
  </div>
</template>

<script lang="ts" setup>
import { ref, type PropType, onBeforeMount } from 'vue';

import DirectionIcons from '../../blocks/DirectionIcons.vue';

import Calendar from './Calendar.vue';
import Years from './Years.vue';

import type { SelectedDate } from '@/interfaces/controllers.interface';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  vertical: { type: Boolean, required: false },

  hideToday: { type: Boolean, required: false },
  range: { type: Boolean, required: false },
  cellsAmount: { type: Number, required: false, default: 1 },
  maxYear: { type: Number, required: false, default: new Date().getFullYear() },
  localeISO: { type: String, required: false, default: 'en' },
  modelValue: { type: Object as PropType<SelectedDate>, required: true },
});

const emit = defineEmits<{
  (event: 'update:modelValue', payload: SelectedDate): void;
}>();

const selectedMonth = ref(new Date());
const showYears = ref(false);

const prevMonth = (month: Date): void => {
  selectedMonth.value = new Date(month.getFullYear(), month.getMonth() - 1);
};

const nextMonth = (month: Date): void => {
  selectedMonth.value = new Date(month.getFullYear(), month.getMonth() + 1);
};

const selectYear = (year: number): void => {
  selectedMonth.value = new Date(year, selectedMonth.value.getMonth());

  showYears.value = false;
};

const selectDay = (day: Date): void => {
  if (!props.range) return emit('update:modelValue', { start: day, end: null });

  if ((props.modelValue.start && props.modelValue.end) || !props.modelValue.start) {
    return emit('update:modelValue', { start: day, end: null });
  }

  if (day.getTime() > new Date(props.modelValue.start).getTime()) {
    emit('update:modelValue', { start: props.modelValue.start, end: day });
  } else emit('update:modelValue', { start: day, end: props.modelValue.start });
};

onBeforeMount(() => {
  if (props.modelValue.start) {
    selectedMonth.value = props.modelValue.start;
  }
});
</script>
