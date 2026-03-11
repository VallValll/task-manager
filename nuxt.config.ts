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
      title: 'Task-Manager',
      meta: [
        {
          name: 'description',
          content: 'Task-Manager - минималистичный менеджер задач на Nuxt 4. Данные хранятся в JSON Server.'
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
