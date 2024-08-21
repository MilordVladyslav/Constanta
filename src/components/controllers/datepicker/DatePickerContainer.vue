<template>
  <div
    role="button"
    class="constanta-date-picker-container constanta-input constanta-controller cursor-pointer"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,

      large: (!props.medium && !props.small) || props.large,
      medium: props.medium,
      small: props.small,

      disabled: props.disabled,

      warning: changeControllerBorderColorForFeedback(props.warnings),
      errors: changeControllerBorderColorForFeedback(props.errors),
    }"
  >
    <template v-if="props.title || slots.title">
      <p v-if="props.title && !slots.title" class="constanta-controller--title" v-html="sanitize(props.title)" />

      <slot name="title" />
    </template>

    <div class="constanta-input__container">
      <slot name="left-side" />

      <div class="constanta-date-picker-container__values">
        <p :class="{ 'no-value': !props.value?.start }">
          {{ props.value?.start || props.placeholderDateFrom }}
        </p>

        <icons icon="swapRight" />

        <p :class="{ 'no-value': !props.value?.end }">
          {{ props.value?.end || props.placeholderDateTo }}
        </p>
      </div>

      <slot name="right-side" />

      <icons icon="application-calendar-outlined" />
    </div>

    <ControllerFeedback :errors="props.errors" :warnings="props.warnings" />
  </div>
</template>

<script lang="ts" setup>
import { useSlots, type PropType } from 'vue';

import sanitize from 'sanitize-html';

import ControllerFeedback from '@/components/blocks/ControllerFeedback.vue';
import Icons from '@/components/blocks/Icons.vue';

import { type SelectedDate } from '@/interfaces/controllers.interface';

import { changeControllerBorderColorForFeedback } from '@/utils';

const slots = useSlots();

const props = defineProps({
  value: { type: Object as PropType<SelectedDate>, required: false },

  bind: { type: Object, required: false },

  title: { type: String, required: false },

  placeholderDateFrom: { type: String, required: false, default: 'Date' },
  placeholderDateTo: { type: String, required: false, default: 'End date' },

  warnings: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },
  errors: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },

  // Statues
  disabled: { type: Boolean, required: false },

  // Styles
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  large: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },
  small: { type: Boolean, required: false },
});
</script>
