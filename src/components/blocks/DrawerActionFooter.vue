<template>
  <footer
    class="constanta-drawer-action-footer"
    :class="{
      light: props.light || !props.dark,
      dark: props.dark,
    }"
  >
    <button class="constanta-btn border secondary medium w-full" @click="emit('cancel')">
      {{ props.cancelBtnText }}
    </button>

    <button class="constanta-btn fill secondary medium w-full" @click="emit('action')">
      {{ props.actionBtnText }}
    </button>
  </footer>
</template>

<script lang="ts" setup>
const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  cancelBtnText: { type: String, required: false, default: 'Cancel' },
  actionBtnText: { type: String, required: false, default: 'Save' },
});

const emit = defineEmits<{
  (event: 'cancel'): void;
  (event: 'action'): void;
}>();
</script>
