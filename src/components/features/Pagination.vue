<template>
  <div
    v-if="totalPages"
    class="constanta-pagination"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
    }"
  >
    <button class="arrow perv" :disabled="statuses.disabledChunkPrev || props.disabled" @click="prevChunk">
      <direction-icons icon="doubleArrow" />
    </button>

    <button class="arrow perv" :disabled="statuses.disabledPrev || props.disabled" @click="prev">
      <direction-icons icon="chevron" />
    </button>

    <div class="constanta-pagination__pages">
      <template v-if="statuses.showFirstPage">
        <button class="page" :disabled="props.disabled" @click="changeCurrentPage(1)">1</button>

        <div class="dots" :class="{ disabled: props.disabled }">
          <Icons :icon="dotsIcon" />
        </div>
      </template>

      <template v-if="pagePrevChunk !== null">
        <button class="page" :disabled="props.disabled" @click="changeCurrentPage(pagePrevChunk)">
          {{ pagePrevChunk }}
        </button>
      </template>

      <template v-for="(p, i) in getChunk" :key="i">
        <button
          class="page"
          :disabled="props.disabled"
          :class="{ active: currentPage === p }"
          @click="changeCurrentPage(p)"
        >
          {{ p }}
        </button>
      </template>

      <template v-if="pageNextChunk !== null">
        <button class="page" :disabled="props.disabled" @click="changeCurrentPage(pageNextChunk)">
          {{ pageNextChunk }}
        </button>
      </template>

      <template v-if="statuses.showLastPage">
        <div class="dots" :class="{ disabled: props.disabled }">
          <Icons :icon="dotsIcon" />
        </div>

        <button class="page" :disabled="props.disabled" @click="changeCurrentPage(totalPages)">
          {{ totalPages }}
        </button>
      </template>
    </div>

    <button class="arrow next" :disabled="statuses.disabledNext || props.disabled" @click="next">
      <direction-icons direction="right" icon="chevron" />
    </button>

    <button class="arrow next" :disabled="statuses.disabledChunkNext || props.disabled" @click="nextChunk">
      <direction-icons direction="right" icon="doubleArrow" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, reactive } from 'vue';

import DirectionIcons from '../blocks/DirectionIcons.vue';
import Icons from '../blocks/Icons.vue';

import type { ConstantaPaginationOptions } from '@/interfaces/controllers.interface';

const dotsIcon = 'application-dot-menu-ellipsis';

const props = defineProps({
  modelValue: { type: [Number, String], reqruied: true, default: 0 },
  perPage: { type: [Number, String], reqruied: true },
  records: { type: [Number, String], reqruied: true },
  options: { type: Object as PropType<ConstantaPaginationOptions>, required: false },
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'update:modelValue', payload: number | null): void;
}>();

const currentPage = computed(() => {
  const page = Number(props.modelValue);

  return Number.isNaN(page) ? 0 : page;
});

const chunks = computed(() => {
  if (totalPages.value === null) return [];

  const array = Array.from({ length: totalPages.value }, (_, i) => i + 1);

  const result = [];

  for (let i = 0; i < array.length; i += chunkSize.value) {
    result.push(array.slice(i, i + chunkSize.value));
  }

  return result;
});

const chunkSize = computed(() => props.options?.chunkSize || 3);

const getChunk = computed(() => chunks.value.find((a) => a.some((p) => p === currentPage.value))!);
const getIndexChunk = computed(() => chunks.value.findIndex((a) => a.some((v) => v === currentPage.value)));

const totalPages = computed(() =>
  props.records && props.perPage ? Math.ceil(Number(props.records) / Number(props.perPage)) : 0
);

const statuses = reactive({
  showFirstPage: computed(() => !getChunk.value?.some((v) => v === 1)),
  showLastPage: computed(() => !getChunk.value?.some((v) => v === totalPages.value)),
  disabledChunkPrev: computed(() => chunks.value[0]?.some((v) => v === currentPage.value)),
  disabledPrev: computed(() => currentPage.value === 1),
  disabledNext: computed(() => currentPage.value === totalPages.value),
  disabledChunkNext: computed(() => chunks.value[chunks.value?.length - 1]?.some((v) => v === currentPage.value)),
});

const pagePrevChunk = computed(() => {
  if (!statuses.disabledChunkPrev && getIndexChunk.value > 0) {
    const array = chunks.value[getIndexChunk.value - 1];
    const lastArrayElement = array?.length - 1;
    const value = array[lastArrayElement];

    return value === 1 ? null : value;
  }

  return null;
});

const pageNextChunk = computed(() => {
  if (!statuses.disabledChunkNext && getIndexChunk.value < chunks.value?.length - 1) {
    const array = chunks.value[getIndexChunk.value + 1];
    const value = array[0];

    return value === totalPages.value ? null : value;
  }

  return null;
});

/**
 * Pagination controllers
 */

const changeCurrentPage = (page: number | null): void => {
  if (!props.disabled) emit('update:modelValue', page);
};

const prevChunk = (): void => {
  if (props.disabled) return;

  if (!statuses.disabledChunkPrev && getIndexChunk.value > 0) {
    const value = chunks.value[getIndexChunk.value - 1][0];

    emit('update:modelValue', value);
  }
};

const prev = (): void => {
  if (statuses.disabledPrev || props.disabled) return;

  emit('update:modelValue', currentPage.value - 1);
};

const next = (): void => {
  if (statuses.disabledNext || props.disabled) return;

  emit('update:modelValue', currentPage.value + 1);
};

const nextChunk = (): void => {
  if (props.disabled) return;

  if (!statuses.disabledChunkNext && getIndexChunk.value < chunks.value?.length - 1) {
    const value = chunks.value[getIndexChunk.value + 1][0];

    emit('update:modelValue', value);
  }
};
</script>
