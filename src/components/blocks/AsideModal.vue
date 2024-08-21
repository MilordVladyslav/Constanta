<template>
  <div class="constanta-aside-modal">
    <Drawer
      v-click-outside="closeModal"
      :dark="props.dark"
      :light="props.light || !props.dark"
      :title="props.title"
      @close="closeModal"
    >
      <template v-if="slots['header']" #header>
        <slot name="header" />
      </template>

      <template v-if="slots['content-header']" #content-header>
        <slot name="content-header" />
      </template>

      <slot />

      <template v-if="slots['content-footer']" #content-footer>
        <slot name="content-footer" />
      </template>
    </Drawer>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref, useSlots, type Ref } from 'vue';

import Drawer from './Drawer.vue';

const slots = useSlots();

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  title: { type: String, required: false },
});

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const count = inject<Ref<number>>('constantaModalCount');
const index = ref(0);

const closeModal = (): void => {
  if (window.getSelection()?.toString()) return;

  if (count?.value === index.value) emit('close');
};

onMounted(() => {
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
  if (count) count.value -= 1;
});
</script>
