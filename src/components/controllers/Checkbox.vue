<template>
  <label
    :for="id"
    class="constanta-checkbox constanta-controller"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
      medium: props.medium,
      disabled: props.disabled,
      checked: props.modelValue,
      indeterminate: props.indeterminate,
      focus: inputInFocus,
    }"
  >
    <input
      :id="id"
      :name="props.name"
      type="checkbox"
      :disabled="props.disabled"
      :value="props.modelValue"
      @input="updateModelValue"
      @focus="inputStatus('focus', $event)"
      @blur="inputStatus('blur', $event)"
    />

    <span class="checkbox__container">
      <span class="checkbox">
        <icons v-if="modelValue" icon="suggested-signs-check" />
      </span>
    </span>

    <template v-if="props.title || slots.title">
      <span v-if="props.title && !slots.title" class="constanta-checkbox--title" v-html="sanitize(props.title)" />

      <slot name="title"></slot>
    </template>
  </label>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

import sanitize from 'sanitize-html';

import Icons from '../blocks/Icons.vue';

import { randomString } from '@/utils';

type InputAction = 'focus' | 'blur';

const slots = useSlots();

const props = defineProps({
  disabled: { type: Boolean, required: false },
  indeterminate: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },

  modelValue: { type: Boolean, required: false },

  title: { type: String, required: false },
  name: { type: String, required: false },

  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: InputAction, value: FocusEvent): void;
}>();

const id = randomString(8, 'aA#');

const inputInFocus = ref(false);

const inputStatus = (status: InputAction, event: FocusEvent): void => {
  inputInFocus.value = status === 'focus';

  emit(status, event);
};

const updateModelValue = (): void => {
  if (!props.disabled) return emit('update:modelValue', !props.modelValue);
};
</script>
