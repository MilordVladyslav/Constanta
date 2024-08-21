<template>
  <div
    v-if="props.file !== null"
    class="constanta-file-info"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
      disabled: props.disabled,
    }"
  >
    <div class="constanta-file-info__file-name">
      <icons class="file-icon" icon="application-file-outlined-file" />
      <p class="file-name">{{ props.file.name }}</p>
    </div>

    <div class="constanta-file-info__content">
      <p class="file-size">{{ formatBytes(props.file.size).toLowerCase() }}</p>

      <button
        v-if="!hideDeleteBtn"
        :disabled="props.disabled"
        class="constanta-btn-link red file-delete"
        @click="deleteFile"
      >
        <icons icon="application-trash-outlined" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';

import Icons from './Icons.vue';

import { formatBytes } from '@/utils';

const props = defineProps({
  light: { type: Boolean, required: false },
  dark: { type: Boolean, required: false },

  disabled: { type: Boolean, required: false },
  hideDeleteBtn: { type: Boolean, required: false },

  file: { type: [Object, null] as PropType<File | null>, required: true },
});

const emit = defineEmits(['delete']);

const deleteFile = (): void => {
  if (!props.disabled) emit('delete');
};
</script>
