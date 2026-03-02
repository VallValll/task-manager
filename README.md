# Task Manager (Nuxt + Pinia)

Минималистичный менеджер задач на Nuxt 4. Данные хранятся в JSON Server.

**Функциональность**
- Добавление, удаление и отметка задач как выполненных
- Фильтры: `all / active / completed`
- Загрузка через `useFetch`, последующие мутации через `$fetch`
- Центрированный попап ошибки с оверлеем

**Технологии**
- Nuxt 4, Vue 3, Pinia
- Tailwind CSS + SCSS
- JSON Server для мок‑API

**Требования**
- Node.js 18+
- npm (или pnpm/yarn/bun)

## Быстрый старт

1. Установить зависимости:
```bash
npm install
```

2. Запустить JSON Server (API на `http://localhost:3010`):
```bash
npm run json-server
```

3. Запустить приложение:
```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

## Конфигурация API

Базовый URL задаётся в `nuxt.config.ts`:
```ts
runtimeConfig: {
  public: {
    apiBase: 'http://localhost:3010'
  }
}
```

## Скрипты

- `npm run dev` — dev‑сервер Nuxt
- `npm run build` — production‑сборка
- `npm run preview` — предпросмотр production‑сборки
- `npm run json-server` — запуск мок‑API
- `npm run lint` — линтеры (ESLint + Stylelint)
- `npm run format` — Prettier

## Структура проекта

- `app/components/Todo` — UI и логика компонентов задач
- `app/composables/useTodos.ts` — запросы к API и вычисления
- `app/composables/useErrorPopup.ts` — управление попапом ошибки
- `app/stores/todoStore.ts` — Pinia store
- `npm-scripts/test-server/db.json` — данные JSON Server

