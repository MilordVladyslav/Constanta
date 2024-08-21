<template>
  <component :is="props.tag" class="constanta-tag" :class="[state, { medium: props.medium, large: !props.medium }]">
    <template v-if="slots['default']">
      <slot />
    </template>

    <span v-else-if="props.value" v-html="sanitize(props.value)" />

    <button v-if="props.canDelete" @click="emits('delete')">
      <icons icon="suggested-signs-close" />
    </button>
  </component>
</template>

<script lang="ts" setup>
import { useSlots, type PropType } from 'vue';

import sanitize from 'sanitize-html';

import Icons from './Icons.vue';

import { TAG_STATE } from '@/interfaces/controllers.interface';

const slots = useSlots();

const props = defineProps({
  tag: { type: String, required: false, default: 'div' },
  state: { type: String as PropType<TAG_STATE>, required: false, default: 'gray' },
  medium: { type: Boolean, required: false },

  value: { type: String, required: false },

  canDelete: { type: Boolean, required: false },
});

const emits = defineEmits<{
  (event: 'delete'): void;
}>();
</script>
