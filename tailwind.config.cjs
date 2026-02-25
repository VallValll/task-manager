/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/composables/**/*.{js,ts}',
    './app/plugins/**/*.{js,ts}',
    './app/utils/**/*.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
