<template>
  <div
    class="constanta-collapse"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
      disabled: props.disabled,
      show: showContent,
    }"
  >
    <header role="button" :class="{ show: showContent }" class="constanta-collapse__header" @click="toggleShow">
      <slot name="header-icon" />

      <div class="constanta-collapse__header--text">
        <p v-if="props.title" class="title" v-html="sanitize(props.title)" />
        <p v-if="props.caption" class="caption" v-html="sanitize(props.caption)" />
      </div>

      <icons class="constanta-collapse__header--icon" :icon="showContent ? 'minus' : 'plus'" />
    </header>

    <div v-if="showContent" class="constanta-collapse__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import Icons from './Icons.vue';

import sanitize from 'sanitize-html';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },

  title: { type: String, required: false },
  caption: { type: String, required: false },

  disabled: { type: Boolean, required: false },

  open: { type: Boolean, required: false },

  modelValue: { type: Boolean, required: false, default: undefined },
});

const emit = defineEmits<{
  (event: 'toggleShow', payload: boolean): void;
  (event: 'update:modelValue', payload: boolean): void;
}>();

const show = ref(false);

const showContent = computed(
  () => (props.modelValue || (show.value && props.modelValue === undefined)) && !props.disabled
);

const toggleShow = (): void => {
  if (!props.disabled) {
    show.value = !show.value;

    emit('toggleShow', show.value);

    if (props.modelValue !== undefined) emit('update:modelValue', !props.modelValue);
  }
};

onMounted(() => {
  if (props.open && !props.disabled) show.value = true;
});
</script>
