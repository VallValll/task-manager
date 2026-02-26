// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  css: ['@/assets/styles/tailwind.css', '@/assets/styles/main.scss'],
  tailwindcss: {
    cssPath: false,
    configPath: 'tailwind.config.cjs'
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/variables" as *;
            @use "@/assets/styles/functions" as *;
            @use "@/assets/styles/mixins" as *;
          `
        }
      }
    }
  },
  app: {
    head: {
      title: 'Nuxt Template',
      meta: [
        {
          name: 'description',
          content: 'A starter project for Nuxt'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3010'
    }
  }
});
