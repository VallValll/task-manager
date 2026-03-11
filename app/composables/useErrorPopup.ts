import { ref } from 'vue';

const isOpen = ref(false);

export function useErrorPopup() {
  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    open,
    close
  };
}
