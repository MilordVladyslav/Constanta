<template>
  <div
    class="constanta-calendar"
    :class="{
      dark: props.dark,
      light: props.light || !props.dark,
    }"
  >
    <header v-if="showMonthAndYear" class="constanta-calendar__header">
      <p class="constanta-calendar__header--title">
        {{ props.selectedMonth.toLocaleString(props.localeISO, { month: 'long' }) }}
        {{ props.selectedMonth.getFullYear() }}
      </p>
    </header>

    <div class="constanta-calendar__container">
      <template v-for="d in weekdays" :key="d">
        <p class="constanta-calendar--weekday-title">{{ d }}</p>
      </template>

      <template v-for="d in remainderDaysFromPreviousMonth" :key="d.getTime()">
        <button
          v-if="!hideDaysFromAnotherMonth"
          class="constanta-calendar--day from-previous from-another-month"
          :class="{
            selected: thisDayWasSelected(d),
          }"
          @click="emit('update:modelValue', d)"
        >
          {{ d.toLocaleString(props.localeISO, { day: '2-digit' }) }}
        </button>

        <p class="constanta-calendar--day plug" v-else></p>
      </template>

      <template v-for="d in days" :key="d.getTime()">
        <button
          class="constanta-calendar--day"
          :class="{
            today: d.getTime() === today.getTime(),
            selected: thisDayWasSelected(d),
            'in-selcted-range': thisDateInSlectedRange(d),
            'start-range': d.getTime() === props.modelValue.start?.getTime() && !!props.modelValue.end,
            'end-range': d.getTime() === props.modelValue.end?.getTime(),
          }"
          @click="emit('update:modelValue', d)"
        >
          {{ d.toLocaleString(props.localeISO, { day: '2-digit' }) }}
        </button>
      </template>

      <template v-for="d in remainderDaysFromNextMonth" :key="d.getTime()">
        <button
          v-if="!hideDaysFromAnotherMonth"
          class="constanta-calendar--day from-next from-another-month"
          :class="{
            selected: thisDayWasSelected(d),
          }"
          @click="emit('update:modelValue', d)"
        >
          {{ d.toLocaleString(props.localeISO, { day: '2-digit' }) }}
        </button>

        <p class="constanta-calendar--day plug" v-else></p>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount, type PropType } from 'vue';

import type { SelectedDate } from '@/interfaces/controllers.interface';

const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0);

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  showMonthAndYear: { type: Boolean, default: false },
  hideDaysFromAnotherMonth: { type: Boolean, default: false },
  localeISO: { type: String, required: true },
  selectedMonth: { type: Date, required: true },
  modelValue: { type: Object as PropType<SelectedDate>, required: true },
});

const emit = defineEmits<{
  (event: 'update:modelValue', payload: Date): void;
}>();

const firstDay = computed(() =>
  new Date(props.selectedMonth.getFullYear(), props.selectedMonth.getMonth(), 1).getDay()
);
const lastDay = computed(() =>
  new Date(props.selectedMonth.getFullYear(), props.selectedMonth.getMonth() + 1, 0).getDate()
);

const remainderDaysFromPreviousMonth = computed(() => {
  const daysFromPreviousMonth: Date[] = [];

  // if current month is january, get the days from -1 year and last month (december) in other case just get the last month day
  const lastMonth =
    today.getMonth() === 0
      ? new Date(props.selectedMonth.getFullYear() - 1, 12, 0)
      : new Date(props.selectedMonth.getFullYear(), props.selectedMonth.getMonth(), 0);

  // handling corner case if first day of january is sunday. In case of it getDay() returns 0 as sunday in JS is 0 day and additional correction needed.
  const correction = firstDay.value === 0 ? 6 : firstDay.value - 1;

  for (let i = lastMonth.getDate(); i > lastMonth.getDate() - correction; i--) {
    daysFromPreviousMonth.unshift(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), i));
  }

  return daysFromPreviousMonth;
});

const days = computed(() =>
  Array.from(
    { length: lastDay.value },
    (_, i) => new Date(props.selectedMonth.getFullYear(), props.selectedMonth.getMonth(), i + 1)
  )
);

const remainderDaysFromNextMonth = computed(() => {
  const daysFromNextMonth: Date[] = [];
  const countDaysToFill = 42 - (remainderDaysFromPreviousMonth.value.length + days.value.length);

  //   const rightSideShift = props.multiBoard ? 2 : 1;
  for (let i = 1; i <= countDaysToFill; i++) {
    // if next month is the first of the new calendar year, then increment year on 1, set first month and fill out the lack places in the end with the days of the first month
    if (props.selectedMonth.getMonth() + 1 > 12) {
      daysFromNextMonth.push(new Date(props.selectedMonth.getFullYear() + 1, 0, i));
      // in other case just fill out lack places with days of the next month
    } else {
      daysFromNextMonth.push(new Date(props.selectedMonth.getFullYear(), props.selectedMonth.getMonth() + 1, i));
    }
  }

  return daysFromNextMonth;
});

const weekdays = ref<string[]>();

const thisDayWasSelected = (d: Date): boolean =>
  d.getTime() === props.modelValue.start?.getTime() || d.getTime() === props.modelValue.end?.getTime();

const thisDateInSlectedRange = (date: Date): boolean => {
  if (!props.modelValue.start || !props.modelValue.end) return false;

  const selectedDate = {
    start: new Date(props.modelValue.start).getTime(),
    end: new Date(props.modelValue.end).getTime(),
  };

  const thisDate = new Date(date.getTime()).getTime();

  return thisDate > selectedDate.start && thisDate < selectedDate.end;
};

const generateWeekdays = () => {
  const orderWeekday = [1, 2, 3, 4, 5, 6, 0];

  const firstSevenDays = Array.from({ length: 7 }, (_, i) => new Date(today.getFullYear(), today.getMonth(), i + 1));

  firstSevenDays.sort((a, b) => orderWeekday.indexOf(a.getDay()) - orderWeekday.indexOf(b.getDay()));

  weekdays.value = firstSevenDays.map((d) => d.toLocaleString(props.localeISO, { weekday: 'short' }));
};

onBeforeMount(() => {
  generateWeekdays();
});
</script>
