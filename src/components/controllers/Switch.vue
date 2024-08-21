<template>
  <label
    :for="id"
    class="constanta-switch constanta-controller"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
      medium: props.medium,

      dirty: isSwitchDirty,

      checked: props.modelValue,

      disabled: props.disabled,
      loading: props.loading,
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

    <span class="circle__container">
      <span class="circle">
        <const-spinner v-if="props.loading" />
      </span>
    </span>

    <template v-if="props.title || slots.title">
      <span v-if="props.title && !slots.title" class="constanta-switch--title" v-html="sanitize(props.title)" />

      <slot name="title" />
    </template>
  </label>
</template>

<script lang="ts" setup>
import { watch, ref, useSlots, onUnmounted } from 'vue';

import sanitize from 'sanitize-html';

import { randomString } from '@/utils';

type InputAction = 'focus' | 'blur';

const slots = useSlots();

const props = defineProps({
  modelValue: { type: Boolean, required: false },

  name: { type: String, required: false },
  title: { type: String, required: false },

  loading: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },

  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: InputAction, value: FocusEvent): void;
}>();

const id = randomString(8, 'aA#');

const isSwitchDirty = ref(false);

const inputInFocus = ref(false);

const inputStatus = (status: InputAction, event: FocusEvent): void => {
  inputInFocus.value = status === 'focus';

  emit(status, event);
};

const updateModelValue = (): void => {
  if (props.disabled || props.loading) return;

  emit('update:modelValue', !props.modelValue);
};

const watchStopHandle = watch(
  () => props.modelValue,
  () => {
    isSwitchDirty.value = true;

    watchStopHandle();
  }
);

onUnmounted(() => {
  watchStopHandle();
});
</script>
