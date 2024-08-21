<template>
  <div
    class="constanta-divider"
    :class="{
      dark: props.dark,
      light: props.light || !props.dark,
    }"
  >
    <hr
      v-if="props.center || props.right"
      class="w-full"
      :class="{
        dark: props.dark,
        light: props.light || !props.dark,
      }"
    />

    <template v-if="props.title">
      <p class="w-s-nw" v-html="sanitize(props.title)" />

      <hr
        v-if="!props.right"
        class="w-full"
        :class="{
          dark: props.dark,
          light: props.light || !props.dark,
        }"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import sanitize from 'sanitize-html';

const props = defineProps({
  dark: { type: Boolean, required: false },
  light: { type: Boolean, required: false },

  title: { type: String, required: false },

  left: { type: Boolean, required: false },
  center: { type: Boolean, required: false },
  right: { type: Boolean, required: false },
});
</script>
