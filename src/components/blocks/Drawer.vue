<template>
  <div
    class="constanta-drawer"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
    }"
  >
    <header v-if="!slots.header" class="constanta-drawer__header">
      <p class="font-style-title-medium">{{ props.title }}</p>

      <button class="constanta-drawer__header--close" @click="emit('close')">
        <icons icon="suggested-signs-close" />
      </button>
    </header>

    <slot v-else name="header" />

    <slot name="content-header" />

    <perfect-scrollbar
      ref="ps"
      :options="{ wheelPropagation: false }"
      class="constanta-drawer__content"
      :class="{ light: props.light || !props.dark, dark: props.dark }"
    >
      <slot />
    </perfect-scrollbar>

    <slot name="content-footer" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, useSlots } from 'vue';

import type { PerfectScrollbar } from 'vue3-perfect-scrollbar';

import Icons from './Icons.vue';

const slots = useSlots();

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  title: { type: String, required: false },
});

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'perfect-scrollbar', payload: PerfectScrollbar): void;
}>();

const ps = ref<PerfectScrollbar | null>(null);

onMounted(() => {
  if (ps.value) emit('perfect-scrollbar', ps.value);
});
</script>
