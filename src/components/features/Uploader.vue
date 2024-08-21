<template>
  <div
    class="constanta-uploader"
    :class="[
      {
        light: props.light || !props.dark,
        dark: props.dark,

        large: !props.medium,
        medium: props.medium,
      },
      props.status,
    ]"
  >
    <form v-if="props.status === UPLOADER_STATUS.wait" ref="form">
      <label :for="id">
        <input
          type="file"
          :id="id"
          :multiple="props.multiple"
          :accept="props.accept.join(',')"
          @change="selectedFiles"
          @click="form?.reset()"
        />
      </label>
    </form>

    <template v-if="props.status">
      <const-spinner v-if="props.status === UPLOADER_STATUS.uploading" />
      <const-state-icons
        v-else-if="statuses[props.status].state"
        :icon="statuses[props.status].icon"
        :state="statuses[props.status].state"
      />
      <const-icons v-else :icon="statuses[props.status]?.icon" />

      <p class="constanta-uploader__title f-title-small m-top-5 m-bottom-2">{{ statuses[props.status].title }}</p>
    </template>

    <p v-if="!props.medium" class="constanta-uploader__description">
      <template v-if="props.accept?.length && !props.accept.some((a) => a === '*/*')">
        Use files like: {{ getExtension() }}.<br />
      </template>

      <template v-if="props.maxPerFileSize">
        The file size should not exceed {{ formatBytes(props.maxPerFileSize) }}<br />
      </template>

      <template v-if="props.maxTotalSize">
        The total files size should not exceed {{ formatBytes(props.maxTotalSize) }}<br />
      </template>

      <template v-if="props.text"> {{ props.text }}</template>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue';

import mime from 'mime';

import { STATE, UPLOADER_STATUS } from '@/interfaces/controllers.interface';

import { randomString, formatBytes } from '@/utils';

const id = randomString(8, 'aA#');

const statuses = {
  uploading: {
    title: 'Please wait, file is loading',
    icon: 'application-loading-loading',
    state: undefined,
  },
  successfully: {
    title: 'File uploaded successfully',
    icon: 'suggested-circle-signs-filled-check-circle',
    state: STATE.successful,
  },
  error: {
    title: 'File upload error, please try again',
    icon: 'suggested-circle-signs-filled-close-circle',
    state: STATE.error,
  },
  wait: {
    title: 'Click or drag file to this area to upload',
    icon: 'application-download-upload',
    state: undefined,
  },
};

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  medium: { type: Boolean, required: false },

  multiple: { type: Boolean, required: false },

  /**
   * @link List common mime types - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types;
   */
  accept: { type: Array as PropType<string[]>, required: false, default: () => ['*/*'] },

  /**
   * @link Get file size - https://www.gbmb.org/mb-to-bytes (use binary value)
   */
  maxTotalSize: { type: Number, required: false },
  maxPerFileSize: { type: Number, required: false },

  status: { type: String as PropType<UPLOADER_STATUS>, required: true },

  text: { type: String, required: false },
});

const emit = defineEmits<{
  (event: 'files', payload: FileList | null): void;
}>();

const form = ref<HTMLFormElement>();

const getExtension = (): string => {
  const array: string[] = [];

  props.accept.forEach((acc) => {
    const extension = mime.getExtension(acc);

    if (extension) array.push(extension);
  });

  return array.join(', ');
};

const selectedFiles = (e: Event): void => {
  const { files } = e.target as HTMLInputElement;

  if (!files?.length) return;

  let error = false;

  let totalSize = 0;

  for (let i = 0; i < files.length; i += 1) {
    if (props.maxPerFileSize && files!.item(i)!.size > props.maxPerFileSize) error = true;

    if (props.maxTotalSize && files!.item(i)!.size) totalSize += files!.item(i)!.size;

    if (props.accept[0] !== '*/*' && !props.accept.some((acc) => acc === files!.item(i)!.type)) error = true;
  }

  if (props.maxTotalSize && totalSize > props.maxTotalSize) return;

  if (error) return;

  emit('files', files);
};
</script>
