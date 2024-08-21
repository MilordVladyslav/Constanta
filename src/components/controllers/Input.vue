<template>
  <div
    class="constanta-input constanta-controller"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,

      large: (!props.medium && !props.small) || props.large,
      medium: props.medium,
      small: props.small,

      focus: inputInFocus,
      disabled: props.disabled,

      warning: changeControllerBorderColorForFeedback(props.warnings),
      errors: changeControllerBorderColorForFeedback(props.errors),
    }"
  >
    <label :for="id">
      <template v-if="props.title || slots.title">
        <p v-if="props.title && !slots.title" class="constanta-controller--title" v-html="sanitize(props.title)" />

        <slot name="title" />
      </template>

      <div class="constanta-input__container" :class="{ 'type-number': props.type === 'number' }">
        <slot name="left-side" />

        <input
          v-bind="bind"
          ref="inputEl"
          :id="id"
          :type="inputType"
          :placeholder="props.placeholder"
          :disabled="props.disabled"
          :value="props.modelValue"
          @input="input"
          @keydown="keyboardEvent('keydown', $event)"
          @keyup="keyboardEvent('keyup', $event)"
          @keypress="keyboardEvent('keypress', $event)"
          @keyup.enter="keyboardEvent('keyup.enter', $event)"
          @focus="inputStatus('focus', $event)"
          @blur="inputStatus('blur', $event)"
        />

        <slot name="right-side" />

        <template v-if="props.type === 'password'">
          <button class="constanta-input__show-password" @click="toggleShowPassword">
            <icons :icon="showPassword ? 'eyeClose' : 'eyeOpen'" />
          </button>
        </template>

        <template v-if="props.type === 'number'">
          <div class="constanta-input__number-arrows">
            <button class="number-arrow" :disabled="props.disabled" @click="modelValuePlusMinus('plus')">
              <icons icon="chevron" direction="top" />
            </button>
            <button class="number-arrow" :disabled="props.disabled" @click="modelValuePlusMinus('minus')">
              <icons icon="chevron" direction="bottom" />
            </button>
          </div>
        </template>
      </div>
    </label>

    <ControllerFeedback :errors="props.errors" :warnings="props.warnings" />
  </div>
</template>

<script lang="ts" setup>
import { type PropType, onMounted, ref, useSlots } from 'vue';

import sanitize from 'sanitize-html';

import ControllerFeedback from '../blocks/ControllerFeedback.vue';
import Icons from '../blocks/DirectionIcons.vue';

import { randomString, changeControllerBorderColorForFeedback } from '@/utils';

type InputAction = 'focus' | 'blur';
type KeyboardEvents = 'keydown' | 'keypress' | 'keyup' | 'keyup.enter';

const slots = useSlots();

const id = randomString(8, 'aA#');

const props = defineProps({
  modelValue: { type: [String, Number], required: false },

  bind: { type: Object, required: false },

  focus: { type: Boolean, required: false },
  onlyNumber: { type: Boolean, required: false },

  title: { type: String, required: false },
  type: { type: String, required: false, default: 'text' },
  placeholder: { type: String, required: false, default: 'Placeholder' },

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

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
  (event: InputAction, value: FocusEvent): void;
  (event: KeyboardEvents, value: KeyboardEvent): void;
}>();

const inputEl = ref<HTMLInputElement>();
const inputType = ref('text');
const inputInFocus = ref(false);
const showPassword = ref(false);

const inputStatus = (status: InputAction, event: FocusEvent): void => {
  inputInFocus.value = status === 'focus';

  emit(status, event);
};

const input = (e: Event) => {
  if (!props.disabled) emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const keyboardEvent = (key: KeyboardEvents, e: KeyboardEvent) => {
  if (props.disabled) return e.preventDefault();

  if (props.type === 'number') {
    const availableKeys = [
      '.',
      ',',
      'Enter',
      'Backspace',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ];

    if (Number.isNaN(Number(e.key))) if (!availableKeys.includes(e.key)) return e.preventDefault();
  }

  emit(key, e);

  return true;
};

const modelValuePlusMinus = (action: 'plus' | 'minus') => {
  let value = Number(props.modelValue);

  const valueIsNumber = typeof value === 'number' && !Number.isNaN(value);

  if (!props.disabled && valueIsNumber) emit('update:modelValue', action === 'plus' ? (value += 1) : (value -= 1));
};

const toggleShowPassword = (): void => {
  showPassword.value = !showPassword.value;

  inputType.value = showPassword.value ? 'text' : 'password';
};

onMounted(() => {
  inputType.value = props.type;

  if (props.focus && !props.disabled) inputEl.value?.focus();
});
</script>
