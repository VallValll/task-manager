<template>
  <picture v-bind="attributes">
    <!-- Mobile version with different images -->
    <template v-if="resolvedMode === 'mobile'">
      <source
        v-if="webp"
        :srcset="baseDir + srcMobileWebp"
        type="image/webp"
        :media="`(max-width: ${desktopSize}px)`"
      />
      <source
        :srcset="baseDir + srcMobile"
        :type="mimeType"
        :media="`(max-width: ${desktopSize}px)`"
      />
      <source
        v-if="webp"
        :srcset="baseDir + srcsetWebp"
        type="image/webp"
        :media="`(min-width: ${desktopSize + 1}px)`"
      />
      <source
        v-if="retina"
        :srcset="baseDir + srcset"
        :type="mimeType"
        :media="`(min-width: ${desktopSize + 1}px)`"
      />
      <img
        :src="baseDir + src"
        :alt="alt"
        :decoding="decoding"
        :width="imgWidth"
        :height="imgHeight"
      />
    </template>

    <!-- Only desktop version (empty for mobile) -->
    <template v-else-if="resolvedMode === 'onlyDesktop'">
      <source
        :media="`(max-width: ${desktopSize}px)`"
        srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      />
      <source
        v-if="webp"
        :srcset="baseDir + srcsetWebp"
        type="image/webp"
        :media="`(min-width: ${desktopSize + 1}px)`"
      />
      <source
        v-if="retina"
        :srcset="baseDir + srcset"
        :media="`(min-width: ${desktopSize + 1}px)`"
      />
      <img
        :src="baseDir + src"
        :alt="alt"
        :decoding="decoding"
        :width="imgWidth"
        :height="imgHeight"
      />
    </template>

    <!-- Only mobile version (empty for desktop) -->
    <template v-else-if="resolvedMode === 'onlyMobile'">
      <source
        :media="`(min-width: ${desktopSize + 1}px)`"
        srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      />
      <source
        v-if="webp"
        :srcset="baseDir + srcMobileWebp"
        type="image/webp"
        :media="`(max-width: ${desktopSize}px)`"
      />
      <source
        :srcset="baseDir + srcMobile"
        :type="mimeType"
        :media="`(max-width: ${desktopSize}px)`"
      />
      <img
        :src="baseDir + srcMobileImg"
        :alt="alt"
        :decoding="decoding"
        :width="imgWidth"
        :height="imgHeight"
      />
    </template>

    <!-- Default version -->
    <template v-else>
      <source v-if="webp" :srcset="baseDir + srcsetWebp" type="image/webp" />
      <source v-if="retina" :srcset="baseDir + srcset" />
      <img
        :src="baseDir + src"
        :alt="alt"
        :decoding="decoding"
        :width="imgWidth"
        :height="imgHeight"
      />
    </template>
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { HTMLAttributes } from 'vue';

import { TABLET_BREAKPOINT } from '~/constants/breakpoints';

type PictureMode = 'default' | 'mobile' | 'onlyDesktop' | 'onlyMobile';

interface Props {
  path: string;
  ext: string;
  alt?: string;
  mime?: string;
  decoding?: 'async' | 'auto' | 'sync';
  width?: string | number | null;
  height?: string | number | null;
  retina?: boolean;
  webp?: boolean;
  mode?: PictureMode;
  mobile?: boolean;
  onlyDesktop?: boolean;
  onlyMobile?: boolean;
  attributes?: HTMLAttributes;
  baseDir?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  mime: undefined,
  decoding: 'async',
  width: null,
  height: null,
  retina: false,
  webp: false,
  mode: undefined,
  mobile: false,
  onlyDesktop: false,
  onlyMobile: false,
  attributes: () => ({}),
  baseDir: import.meta.env.BASE_URL
});

const desktopSize = TABLET_BREAKPOINT;

const resolvedMode = computed<PictureMode>(() => {
  if (props.mode) {
    return props.mode;
  }

  const activeLegacyModes = [props.mobile, props.onlyDesktop, props.onlyMobile].filter(
    Boolean
  ).length;
  if (import.meta.dev && activeLegacyModes > 1) {
    // eslint-disable-next-line no-console
    console.warn('[VPicture] Conflicting props: use a single mode prop.');
  }

  if (props.onlyDesktop) return 'onlyDesktop';
  if (props.onlyMobile) return 'onlyMobile';
  if (props.mobile) return 'mobile';
  return 'default';
});

const mimeType = computed(() => {
  if (props.mime) return props.mime;

  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml'
  };

  return mimeMap[props.ext.toLowerCase()] || 'image/jpeg';
});

const src = computed(() => `${props.path}.${props.ext}`);

const srcset = computed(() =>
  props.retina
    ? `${props.path}.${props.ext}, ${props.path}@2x.${props.ext} 2x`
    : `${props.path}.${props.ext}`
);

const srcsetWebp = computed(() =>
  props.retina ? `${props.path}.webp, ${props.path}@2x.webp 2x` : `${props.path}.webp`
);

const srcMobile = computed(() => {
  return props.retina
    ? `${props.path}-mobile.${props.ext}, ${props.path}-mobile@2x.${props.ext} 2x`
    : `${props.path}-mobile.${props.ext}`;
});

const srcMobileWebp = computed(() => {
  return props.retina
    ? `${props.path}-mobile.webp, ${props.path}-mobile@2x.webp 2x`
    : `${props.path}-mobile.webp`;
});

const srcMobileImg = computed(() => `${props.path}-mobile.${props.ext}`);
const imgWidth = computed(() => props.width ?? undefined);
const imgHeight = computed(() => props.height ?? undefined);
</script>
