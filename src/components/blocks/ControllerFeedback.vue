<template>
  <ul
    v-if="Array.isArray(props.warnings) && props.warnings.length"
    class="constanta-controller-controller-feedback warnings"
  >
    <template v-for="(msg, i) in props.warnings" :key="i">
      <li>
        <p>{{ msg }}</p>
      </li>
    </template>
  </ul>

  <ul v-if="Array.isArray(props.errors) && props.errors.length" class="constanta-controller-controller-feedback errors">
    <template v-for="(msg, i) in props.errors" :key="i">
      <li>
        <p>{{ msg }}</p>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue';

const props = defineProps({
  errors: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },
  warnings: { type: [Array, Boolean] as PropType<string[] | boolean>, required: false },
});
</script>
