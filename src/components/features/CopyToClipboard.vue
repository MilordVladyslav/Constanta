<template>
  <button ref="copy" class="constanta-copy-to-clipboard" :class="{ 'clear-style': !!slots['default'] }">
    <icons v-if="!slots['default']" icon="editor-copy-outlined" />

    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, useSlots } from 'vue';

import Clipboard from 'clipboard';

import Icons from '../blocks/Icons.vue';

const slots = useSlots();

const props = defineProps({
  value: { type: [String, Number], required: true },
});

const copy = ref<HTMLButtonElement>();

const clipboard = ref<Clipboard>();

const initClipboard = (): void => {
  clipboard.value = new Clipboard(copy.value!, { text: () => String(props.value) });

  clipboard.value.on('success', (e: Clipboard.Event) => {
    // showTooltip.value = true;

    // setTimeout(() => {
    //   showTooltip.value = false;
    // }, 1000);

    e.clearSelection();
  });

  // TODO: add error msg
  // this.clipboard.on('error', () => { });
};

onMounted(() => {
  initClipboard();
});

onUnmounted(() => {
  clipboard.value?.destroy();
});
</script>
