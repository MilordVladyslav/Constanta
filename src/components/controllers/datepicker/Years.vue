<template>
  <div
    class="constanta-date-picker__years"
    :class="{
      dark: props.dark,
      light: props.light || !props.dark,
    }"
  >
    <perfect-scrollbar class="constanta-date-picker__years--container" :options="{ wheelPropagation: false }">
      <template v-for="y in years" :key="y">
        <button
          class="constanta-date-picker__years--year"
          :class="{ 'current-year': new Date().getFullYear() === y, selected: props.selectedYear === y }"
          @click="emit('select', y)"
        >
          {{ y }}
        </button>
      </template>
    </perfect-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  maxYear: { type: Number, required: true },
  selectedYear: { type: Number, required: true },
});

const emit = defineEmits<{
  (event: 'select', year: number): void;
}>();

const years = ref<number[]>([]);

onBeforeMount(() => {
  const startYear = 1970;

  years.value = Array.from({ length: props.maxYear - startYear + 1 }, (_, i) => i + startYear).reverse();
});
</script>
