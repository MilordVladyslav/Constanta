<template>
  <div
    class="constanta-avatar"
    :class="{
      'default-icon': !props.title && !props.photo,
      light: props.light || !props.dark,
      dark: props.dark,

      small: props.small,
      medium: props.medium,
      large: props.large,
    }"
  >
    <icons v-if="!props.title && !props.photo" icon="application-user-user" />

    <img v-else-if="!props.title && props.photo" :src="props.photo" :alt="alt" />

    <p v-else-if="props.title && !props.photo">{{ String(props.title).trim().charAt(0).toUpperCase() }}</p>
  </div>
</template>

<script lang="ts" setup>
import Icons from './Icons.vue';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  small: { type: Boolean, required: false },
  medium: { type: Boolean, required: false },
  large: { type: Boolean, required: false },

  title: { type: String, required: false },

  photo: { type: String, required: false },
  alt: { type: String, required: false, default: 'Avatar' },
});
</script>
