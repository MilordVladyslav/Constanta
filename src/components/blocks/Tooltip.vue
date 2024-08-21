<template>
  <div
    ref="tooltip"
    role="tooltip"
    class="constanta-tooltip"
    :class="[
      theme,
      { show: show || (props.toggleMode && props.toggle), light: props.light || !props.dark, dark: props.dark },
    ]"
  >
    <div class="constanta-tooltip--arrow" data-popper-arrow />

    <div v-if="!props.toggleMode || (props.toggleMode && props.toggle)" class="constanta-tooltip__container">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref, computed, watch, onUnmounted, onMounted } from 'vue';

import { createPopper, type Instance, type Placement } from '@popperjs/core';

import { TOOLTIP_SIDE, TOOLTIP_PLACE, TOOLTIP_THEME } from '@/interfaces/tooltip.interface';

const showEvents = ['mousedown', 'mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  target: { type: Object as PropType<HTMLElement>, required: false },
  theme: { type: String as PropType<TOOLTIP_THEME>, required: false },
  toggle: { type: Boolean, default: true },
  toggleMode: { type: Boolean, required: false },
  position: {
    type: Object as PropType<{ side: TOOLTIP_SIDE; place: TOOLTIP_PLACE }>,
    default: { side: TOOLTIP_SIDE.right, place: TOOLTIP_PLACE.center },
    required: false,
  },
});

const emit = defineEmits<{
  (event: 'popper', payload: Instance | null): void;
}>();

const placement = computed<Placement>(() =>
  props.position.place === TOOLTIP_PLACE.center ? props.position.side : `${props.position.side}-${props.position.place}`
);

const tooltip = ref<HTMLElement>();
const instance = ref<Instance | null>(null);

const show = ref(false);
const arrowOffset = ref(12);

const getArrowSettings = (): void => {
  if (!props.target || !tooltip.value) return;

  const arrowSize = 12;

  const height = +getComputedStyle(props.target).getPropertyValue('height').split('px')[0];
  const width = +getComputedStyle(props.target).getPropertyValue('width').split('px')[0];

  if (
    ([TOOLTIP_SIDE.left, TOOLTIP_SIDE.right].includes(props.position.side) && height < arrowOffset.value) ||
    ([TOOLTIP_SIDE.top, TOOLTIP_SIDE.bottom].includes(props.position.side) && width < arrowOffset.value)
  ) {
    arrowOffset.value = arrowSize / 2;
  }
};

const init = () => {
  if (!props.target || !tooltip.value) return;

  instance.value?.destroy();

  getArrowSettings();

  instance.value = createPopper(props.target, tooltip.value, {
    placement: placement.value,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
      {
        name: 'arrow',
        options: {
          padding: arrowOffset.value,
        },
      },
    ],
  });

  if (!props.toggleMode) {
    showEvents.forEach((e) => props.target?.addEventListener(e, showTooltip));
    hideEvents.forEach((e) => props.target?.addEventListener(e, hideToolip));
  }

  emit('popper', instance.value);
};

const showTooltip = (): void => {
  show.value = true;

  instance.value?.setOptions((options) => ({
    ...options,
    modifiers: [...(options.modifiers ? options.modifiers : []), { name: 'eventListeners', enabled: true }],
  }));
};

const hideToolip = (): void => {
  show.value = false;

  instance.value?.setOptions((options) => ({
    ...options,
    modifiers: [...(options.modifiers ? options.modifiers : []), { name: 'eventListeners', enabled: false }],
  }));
};

watch(() => [props.target, props.position], init, { deep: true });

onMounted(() => {
  init();
});

onUnmounted(() => {
  if (!props.toggleMode) {
    showEvents.forEach((e) => props.target?.removeEventListener(e, showTooltip));
    hideEvents.forEach((e) => props.target?.removeEventListener(e, hideToolip));
  }

  instance.value?.destroy();

  emit('popper', null);
});
</script>
