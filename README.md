# 🎬 CineVault

Современный каталог фильмов на Nuxt 3 с публичным сайтом и административной панелью.

## Технологии
- **Nuxt 3** (Vue 3 + TypeScript)
- **Pinia** — управление состоянием
- **TailwindCSS** — стилизация
- **TMDB API** — данные о фильмах
- **Chart.js** — аналитика

## Запуск проекта

1. Клонировать репозиторий:
```bash
   git clone https://github.com/ТВОЙ_НИК/cinevault.git
   cd cinevault
```

2. Установить зависимости:
```bash
   npm install
```

3. Создать `.env` файл:
```bash
   cp .env.example .env
   # Вставить свой TMDB токен
```

4. Запустить dev-сервер:
```bash
   npm run dev
```

5. Открыть [http://localhost:3000](http://localhost:3000)

## Доступы в Админку

- URL: `/admin/login`
- Email: `admin@cinevault.com`
- Пароль: `admin123`

## Структура

- `/` — публичный сайт (главная, каталог, страница фильма, о нас)
- `/admin` — административная панель (dashboard, фильмы CRUD, жанры, пользователи, аналитика)