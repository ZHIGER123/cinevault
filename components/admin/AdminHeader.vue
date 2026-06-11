<template>
  <header class="bg-surface-secondary border-b border-white/5 px-6 py-4">
    <div class="flex items-center justify-between">
      <h2 class="text-white font-semibold">{{ pageTitle }}</h2>
      <div class="flex items-center gap-3">
        <NuxtLink to="/" target="_blank"
          class="text-gray-400 hover:text-white text-sm transition-colors">
          ↗ Перейти на сайт
        </NuxtLink>
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          {{ authStore.user?.name?.[0] || 'A' }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const route = useRoute()

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/movies': 'Фильмы',
  '/admin/genres': 'Жанры',
  '/admin/users': 'Пользователи',
  '/admin/analytics': 'Аналитика',
}

const pageTitle = computed(() => pageTitles[route.path] || 'Admin')
</script>