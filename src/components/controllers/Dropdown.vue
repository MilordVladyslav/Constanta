<template>
  <div
    class="constanta-dropdown constanta-controller"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,

      disabled: props.disabled,

      large: (!props.medium && !props.small) || props.large,
      medium: props.medium,
      small: props.small,

      open: isDropdownOpen,
      warning: changeControllerBorderColorForFeedback(props.warnings),
      errors: changeControllerBorderColorForFeedback(props.errors),

      'has-value': props.value,
    }"
    v-click-outside="clickOutside"
  >
    <template v-if="props.title || slots.title">
      <p
        v-if="props.title && !slots.title"
        class="constanta-controller--title"
        v-html="sanitize(props.title.toString())"
      />

      <slot name="title" />
    </template>

    <div
      v-if="slots.container"
      ref="container"
      class="constanta-dropdown__custom-container"
      @click="toggleShowDropdown"
    >
      <slot name="container" :toggle="isDropdownOpen" />
    </div>

    <button v-else ref="container" class="constanta-dropdown__container" @click="toggleShowDropdown">
      <slot name="container-left-side" />

      <span
        class="w-full constanta-dropdown__container--value"
        v-html="props.value ? sanitize(String(props.value)) : sanitize(String(props.placeholder))"
      />

      <slot name="container-right-side" />

      <direction-icons
        class="constanta-dropdown__container--icon"
        icon="chevron"
        :direction="isDropdownOpen ? 'top' : 'bottom'"
      />
    </button>

    <ControllerFeedback :errors="props.errors" :warnings="props.warnings" />

    <!-- BEGIN LIST -->
    <div
      ref="list"
      v-show="isDropdownOpen"
      class="constanta-dropdown-list__container"
      :class="{ 'hide-dropdown-list-styles': slots.list }"
      :style="{ minWidth: props.options?.list?.minWidth, maxWidth: props.options?.list?.maxWidth }"
    >
      <template v-if="slots.list">
        <slot name="list" />
      </template>

      <template v-else>
        <div v-if="slots['list-header']" class="constanta-dropdown-list__header">
          <slot name="list-header" />
        </div>

        <perfect-scrollbar
          tag="ul"
          class="constanta-dropdown-list"
          :class="{
            'has-footer': slots.footer,
            'has-header': slots.header,
            light: props.light || !props.dark,
            dark: props.dark,
          }"
          :options="psOptions"
          @click="closeDropdownList"
        >
          <slot />
        </perfect-scrollbar>

        <div v-if="slots['list-footer']" class="constanta-dropdown-list__footer">
          <slot name="list-footer" />
        </div>
      </template>
    </div>
    <!-- END LIST -->
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref, useSlots, onMounted } from 'vue';

import { createPopper, type Instance } from '@popperjs/core';

import sanitize from 'sanitize-html';

import ControllerFeedback from '../blocks/ControllerFeedback.vue';
import DirectionIcons from '../blocks/DirectionIcons.vue';

import type { ConstantaDropdownOptions } from '@/interfaces/controllers.interface';

import { changeControllerBorderColorForFeedback } from '@/utils';

const psOptions = {
  wheelPropagation: false,
};

const slots = useSlots();

const props = defineProps({
  title: { type: [String, Number], required: false },
  value: { type: [String, Number], required: false },
  placeholder: { type: [String, Number], required: false, default: 'Placeholder' },

  warnings: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },
  errors: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },

  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  disabled: { type: Boolean, required: false },

  multiselect: { type: Boolean, required: false },

  large: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },
  small: { type: Boolean, required: false },

  options: { type: Object as PropType<ConstantaDropdownOptions>, required: false },
});

const isDropdownOpen = ref(false);

const popper = ref<Instance>();

const container = ref<HTMLDivElement>();
const list = ref<HTMLDivElement>();

const clickOutside = (): void => {
  toogleDropdownList(false);
};

const toggleShowDropdown = (): void => {
  if (props.disabled) return;

  toogleDropdownList(!isDropdownOpen.value);
};

const closeDropdownList = (): void => {
  if (!props.multiselect) toogleDropdownList(false);
};

const toogleDropdownList = (status: boolean): void => {
  isDropdownOpen.value = status;

  popper.value?.update();
};

onMounted(() => {
  if (container.value && list.value) {
    popper.value = createPopper(container.value, list.value, {
      placement: props.options?.snap === 'right' ? 'bottom-end' : 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    });
  } else {
    console.warn('[CONSTANTA] Popper was not created!');
  }
});
</script>
