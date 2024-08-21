<template>
  <label
    :for="id"
    class="constanta-radio constanta-controller"
    :class="{
      dark: props.dark,
      light: props.light || !props.dark,

      focus: inputInFocus,
      medium: props.medium,

      checked: checked,

      disabled: props.disabled,
    }"
  >
    <input
      :id="id"
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="checked"
      :disabled="props.disabled"
      @input="updateModelValue"
      @focus="inputStatus('focus', $event)"
      @blur="inputStatus('blur', $event)"
    />

    <span class="circle__container">
      <span class="circle" />
    </span>

    <template v-if="props.title || slots.title">
      <span v-if="props.title && !slots.title" class="constanta-radio--title" v-html="sanitize(props.title)" />

      <slot name="title"></slot>
    </template>
  </label>
</template>

<script lang="ts" setup>
import { ref, computed, useSlots } from 'vue';

import sanitize from 'sanitize-html';

import { randomString } from '@/utils';

type InputAction = 'focus' | 'blur';

const slots = useSlots();

const props = defineProps({
  disabled: { type: Boolean, required: false, default: false },
  medium: { type: Boolean, required: false },

  modelValue: { type: [Object, Boolean, String, Number], required: true },
  value: { type: [Object, Boolean, String, Number], required: true },

  title: { type: String, required: false },
  name: { type: String, required: false },

  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: object | boolean | string | number): void;
  (event: InputAction, value: FocusEvent): void;
}>();

const checked = computed(() => props.modelValue === props.value);

const id = randomString(8, 'aA#');

const inputInFocus = ref(false);

const inputStatus = (status: InputAction, event: FocusEvent): void => {
  inputInFocus.value = status === 'focus';

  emit(status, event);
};

const updateModelValue = (): void => {
  if (!props.disabled) return emit('update:modelValue', props.value);
};
</script>
