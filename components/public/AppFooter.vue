<template>
  <footer class="bg-surface-secondary border-t border-white/5 mt-20">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-1 mb-4">
            <span class="text-primary font-bold text-xl">CINE</span>
            <span class="text-white font-bold text-xl">VAULT</span>
          </div>
          <p class="text-gray-400 text-sm">Лучший каталог фильмов с рейтингами и рецензиями.</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Навигация</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-white text-sm transition-colors">Главная</NuxtLink></li>
            <li><NuxtLink to="/movies" class="text-gray-400 hover:text-white text-sm transition-colors">Каталог</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-gray-400 hover:text-white text-sm transition-colors">О нас</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Данные</h4>
          <p class="text-gray-400 text-sm">Данные предоставлены <a href="https://www.themoviedb.org" target="_blank" class="text-primary hover:underline">TMDB</a></p>
        </div>
      </div>
      <div class="border-t border-white/5 pt-8 text-center">
        <p class="text-gray-500 text-sm">© 2025 CineVault. Учебный проект.</p>
      </div>
    </div>
  </footer>
</template>