<template>
  <transition name="error-overlay">
    <div v-if="isOpen" class="error-overlay" @click="close">
      <transition name="error-modal">
        <div class="error-modal" role="dialog" aria-modal="true" @click.stop>
          <div class="error-modal__text">Упс! Что-то пошло не так</div>
          <button class="error-modal__button" type="button" @click="close">Закрыть</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useErrorPopup } from '~/composables/useErrorPopup';

const { isOpen, close } = useErrorPopup();
</script>
