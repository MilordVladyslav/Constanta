<template>
  <div
    class="constanta-modal"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
    }"
    :style="{ zIndex: 1499 + (count || 1) }"
  >
    <div class="constanta-modal__content" v-click-outside="closeModal">
      <header class="constanta-modal__content--header">
        <button v-if="!props.disabledClose" class="close" @click="closeModal">
          <icons icon="suggested-signs-close" />
        </button>
      </header>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, inject, onMounted, onUnmounted, ref } from 'vue';

import Icons from './Icons.vue';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  disabledClose: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const count = inject<Ref<number>>('constantaModalCount');
const index = ref(0);

const closeModal = (e: KeyboardEvent | PointerEvent | MouseEvent): void => {
  if (e instanceof KeyboardEvent && e.code !== 'Escape') return;

  if (window.getSelection()?.toString()) return;

  if (!props.disabledClose && count?.value === index.value) emit('close');
};

onMounted(() => {
  window.addEventListener('keydown', closeModal);

  if (!count) {
    const code = `
      const constantaModalCount = ref(0);
      provide('constantaModalCount', constantaModalCount);
    `;

    const text = `[CONSTANTA] Please add the following piece of code to App.vue to track count of open dialogs: ${code}`;

    alert(text);
    console.error(text);

    return;
  }

  count.value += 1;
  index.value = count.value;
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeModal);

  if (count) count.value -= 1;
});
</script>
