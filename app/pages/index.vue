<script setup lang="ts">
import { useMainStore } from '~/stores/useMainStore';

const mainStore = useMainStore();
</script>

<template>
  <section>
    <h1 class="px-4">Nuxt starter page</h1>
    <p>Counter: {{ mainStore.count }}</p>
    <button type="button" @click="mainStore.increment">Increment</button>
  </section>
</template>
