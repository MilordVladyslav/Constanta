<template>
  <div class="test">
    <const-collapse title="first">
      <p>Lorem.</p>
      <const-collapse title="second">
        <p>Lorem, ipsum.</p>
        <const-collapse title="three">
          <p>Lorem, ipsum dolor.</p>
        </const-collapse>
      </const-collapse>
    </const-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const target = ref<HTMLElement>();

const v = ref(false);
const v2 = ref(true);
</script>

<style lang="scss">
.test {
  display: flex;
  align-items: center;
  justify-content: center;

  margin: auto;

  height: 100vh;

  max-width: 400px;
}
</style>
