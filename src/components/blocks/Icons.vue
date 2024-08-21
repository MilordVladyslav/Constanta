<template>
  <component :class="{ [`constanta-icon-diraction ${props.direction}`]: props.direction }" :is="icon" />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, inject, onBeforeMount, ref } from 'vue';

const props = defineProps({
  icon: { type: String, required: true },
  direction: { type: String, required: false },
});

const aliases = ref<Record<string, string>>({
  asc: 'editor-sort-sort-ascending',
  check: 'suggested-signs-check',
  checkInCircle: 'suggested-circle-signs-filled-check-circle',
  chevron: 'directional-chevrone-left',
  clear: 'editor-clear-filters',
  clearFilter: 'editor-clear-filters',
  close: 'suggested-signs-close',
  closeInCircle: 'suggested-circle-signs-filled-close-circle',
  delete: 'editor-delete-outlined',
  desc: 'editor-sort-sort-descending',
  disconnect: 'application-link-disconnect',
  doubleArrow: 'directional-double-arrow-double-left',
  download: 'application-download-download',
  edit: 'editor-edit-outlined',
  errorOutlined: 'suggested-stop-outlined',
  eyeClose: 'application-eye-two-tone-eye-invisible',
  eyeOpen: 'application-eye-outlined-eye',
  infoInCircle: 'suggested-circle-signs-filled-info-circle',
  link: 'application-link-link',
  minus: 'suggested-signs-minus',
  plus: 'suggested-signs-plus',
  plusInSquare: 'suggested-square-signs-outlined-plus-square',
  reload: 'application-reload-sync-reload',
  remove: 'editor-delete-outlined',
  save: 'application-save-outlined',
  search: 'application-search',
  successfulOutlined: 'suggested-circle-signs-outlined-check-circle',
  swap: 'directional-swap-swap',
  swapLeft: 'directional-swap-swap-left',
  swapRight: 'directional-swap-swap-right',
  trash: 'editor-delete-outlined',
  upload: 'application-download-upload',
  warningInTriangle: 'suggested-warning-filled',
  warningOutlined: 'suggested-warning-outlined',
});

const constantaIconAlias = inject<Record<string, string>>('constantaIconAlias');

const icon = computed(() => {
  const path = aliases.value[props.icon] || props.icon;

  if (!path) return;

  return defineAsyncComponent(() => import(`../../assets/icons/${path}.svg`));
});

onBeforeMount(() => {
  if (constantaIconAlias) aliases.value = { ...aliases.value, ...constantaIconAlias };
});
</script>
