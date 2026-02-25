import { onMounted, onUnmounted, ref } from 'vue';

import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '~/constants/breakpoints';

interface UseViewportOptions {
  debounceTime?: number;
}

export function useViewport(options: UseViewportOptions = {}) {
  const { debounceTime = 250 } = options;

  const width = ref(0);
  const height = ref(0);
  const isMobile = ref(false);
  const isTablet = ref(false);
  const isDesktop = ref(false);

  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  const updateViewport = () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
      isMobile.value = width.value < MOBILE_BREAKPOINT;
      isTablet.value = width.value >= MOBILE_BREAKPOINT && width.value < TABLET_BREAKPOINT;
      isDesktop.value = width.value >= TABLET_BREAKPOINT;
    }, debounceTime);
  };

  onMounted(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateViewport);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  });

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  };
}
