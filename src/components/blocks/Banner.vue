<template>
  <div
    class="constanta-banner"
    :class="[
      props.state,
      {
        light: props.light || !props.dark,
        dark: props.dark,
      },
    ]"
  >
    <const-state-icons
      v-if="icons[props.state]"
      class="constanta-banner__icon"
      :icon="icons[props.state]"
      :state="props.state"
    />

    <div class="constanta-banner__container">
      <div class="constanta-banner__container--content p-top-1" :class="{ 'm-bottom-3': slots.default }">
        <p class="constanta-banner__container--title" v-html="props.title" />
        <p class="constanta-banner__container--text" v-html="props.text" />
      </div>

      <slot />
    </div>

    <button v-if="showClose" class="constanta-banner__close" @click="emit('close')">
      <icons-commponent icon="close" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, useSlots } from 'vue';

import IconsCommponent from './Icons.vue';

import { STATE } from '@/interfaces/controllers.interface';

const icons = {
  default: 'infoInCircle',
  info: 'infoInCircle',
  error: 'closeInCircle',
  warning: 'warningInTriangle',
  successful: 'checkInCircle',
};

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  state: { type: String as PropType<STATE>, required: true },

  title: { type: String, required: false },
  text: { type: String, required: false },

  showClose: { type: Boolean, required: false },
});

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const slots = useSlots();
</script>
