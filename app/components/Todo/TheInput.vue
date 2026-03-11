<template>
  <div class="input-wrap">
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="input"
      :class="{ error: !!error }"
      :disabled="isSubmitting"
      @input="onInput"
      @keydown.enter.prevent="emit('submit')"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  error: string;
  isSubmitting: boolean;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'submit'): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
