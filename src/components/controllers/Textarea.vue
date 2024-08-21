<template>
  <div
    class="constanta-textarea constanta-controller"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,

      large: !props.medium,
      medium: props.medium,

      focus: inputInFocus,
      disabled: props.disabled,

      warning: changeControllerBorderColorForFeedback(props.warnings),
      errors: changeControllerBorderColorForFeedback(props.errors),
    }"
  >
    <label :for="id">
      <template v-if="props.title || slots.title">
        <p v-if="props.title && !slots.title" class="constanta-controller--title" v-html="sanitize(props.title)" />

        <slot name="title"></slot>
      </template>

      <textarea
        ref="textareaEl"
        :id="id"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="props.modelValue"
        @input="input"
        @focus="inputStatus('focus', $event)"
        @blur="inputStatus('blur', $event)"
      />
    </label>

    <ControllerFeedback :errors="props.errors" :warnings="props.warnings" />
  </div>
</template>

<script lang="ts" setup>
import { type PropType, onMounted, ref, useSlots } from 'vue';

import autosize from 'autosize';
import sanitize from 'sanitize-html';

import ControllerFeedback from '../blocks/ControllerFeedback.vue';

import { randomString, changeControllerBorderColorForFeedback } from '@/utils';

type InputAction = 'focus' | 'blur';

const id = randomString(8, 'aA#');

const slots = useSlots();

const props = defineProps({
  autosize: { type: Boolean, required: false },

  modelValue: { type: [String, Number], required: true },

  bind: { type: Object, required: false },

  title: { type: String, required: false },
  placeholder: { type: String, required: false, default: 'Placeholder' },

  warnings: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },
  errors: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },

  // Statues
  disabled: { type: Boolean, required: false },

  // Styles
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
  (event: InputAction, value: FocusEvent): void;
}>();

const textareaEl = ref<HTMLTextAreaElement>();

const inputInFocus = ref(false);

const inputStatus = (status: InputAction, event: FocusEvent): void => {
  inputInFocus.value = status === 'focus';

  emit(status, event);
};

const input = (e: Event): void => {
  if (!props.disabled) emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
};

onMounted(() => {
  if (props.autosize && textareaEl.value) autosize(textareaEl.value);
});
</script>
