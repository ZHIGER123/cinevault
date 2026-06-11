<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-8">Dashboard</h1>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label"
        class="glass rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <span class="text-2xl">{{ stat.icon }}</span>
          <span class="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+{{ stat.growth }}%</span>
        </div>
        <div class="text-3xl font-bold text-white mb-1">{{ stat.value }}</div>
        <div class="text-gray-400 text-sm">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Recent movies table -->
    <div class="glass rounded-xl p-6">
      <h2 class="text-lg font-semibold text-white mb-4">Последние фильмы</h2>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-white/10">
              <th class="pb-3 text-gray-400 text-sm font-medium">Название</th>
              <th class="pb-3 text-gray-400 text-sm font-medium">Год</th>
              <th class="pb-3 text-gray-400 text-sm font-medium">Рейтинг</th>
              <th class="pb-3 text-gray-400 text-sm font-medium">Статус</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="movie in moviesStore.trending.slice(0, 5)" :key="movie.id"
              class="hover:bg-white/2 transition-colors">
              <td class="py-3 text-white text-sm">{{ movie.title }}</td>
              <td class="py-3 text-gray-400 text-sm">{{ movie.release_date?.slice(0,4) }}</td>
              <td class="py-3">
                <span class="text-gold text-sm font-medium">★ {{ movie.vote_average.toFixed(1) }}</span>
              </td>
              <td class="py-3">
                <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Активен</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth', layout: 'admin' })

const moviesStore = useMoviesStore()

const stats = [
  { icon: '🎬', label: 'Всего фильмов', value: '10,482', growth: 12 },
  { icon: '👥', label: 'Пользователей', value: '48,291', growth: 8 },
  { icon: '🏷️', label: 'Жанров', value: '19', growth: 5 },
  { icon: '👁️', label: 'Просмотров/день', value: '12.4K', growth: 23 },
]

onMounted(() => moviesStore.fetchTrending())
</script>