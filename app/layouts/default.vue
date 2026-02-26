<script setup lang="ts">
import TheHeader from '~/components/TheHeader/TheHeader.vue';
</script>

<template>
  <div class="layout">
    <TheHeader />
    <main class="layout__main">
      <slot />
    </main>
  </div>
</template>
