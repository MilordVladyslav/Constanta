<template>
  <modal class="constanta-alert-modal" :dark="props.dark" :light="props.light || !props.dark" @close="emit('close')">
    <div
      class="constanta-alert-modal__container"
      :class="{
        light: props.light || !props.dark,
        dark: props.dark,
      }"
    >
      <!-- <const-state-icons class="constanta-alert-modal__icon" :icon="props.state" /> -->

      <div class="constanta-alert-modal__content">
        <h1 class="font-style-title-medium m-bottom-2" v-html="sanitize(props.title)" />

        <p v-if="!slots['default']" class="constanta-alert-modal__content--text" v-html="sanitize(props.text)" />

        <slot v-else />

        <div class="constanta-alert-modal__content--actions m-top-6">
          <button
            class="constanta-btn ghost primary small"
            :class="{
              light: props.light || !props.dark,
              dark: props.dark,
            }"
            v-html="sanitize(props.cancelBtnText)"
            @click="emit('close')"
          />
          <button
            class="constanta-btn fill small"
            :class="[
              applyBtnColor,
              {
                light: props.light || !props.dark,
                dark: props.dark,
              },
            ]"
            v-html="sanitize(props.applyBtnText)"
            @click="emit('apply')"
          />
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts" setup>
import { type PropType, computed, useSlots } from 'vue';

import Modal from './Modal.vue';

import sanitize from 'sanitize-html';

import { STATE } from '@/interfaces/controllers.interface';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  title: { type: String, required: true },
  text: { type: String, required: false, default: '' },

  state: { type: String as PropType<STATE>, required: false, default: STATE.default },

  cancelBtnText: { type: String, required: false, default: 'Cancel' },
  applyBtnText: { type: String, required: false, default: 'Apply' },
});

const emit = defineEmits<{
  (event: 'close'): void;
  (event: 'apply'): void;
}>();

const slots = useSlots();

const applyBtnColor = computed(() => {
  switch (props.state) {
    case STATE.info:
    case STATE.successful:
      return 'secondary';
    case STATE.default:
    default:
      return 'primary';
    case STATE.error:
    case STATE.warning:
      return 'cta';
  }
});
</script>
