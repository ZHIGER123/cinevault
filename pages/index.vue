<template>
  <div>
    <!-- Hero -->
    <HeroSection :movie="store.featuredMovie" />

    <!-- Trending section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-white mb-6">🔥 В тренде</h2>
      <div v-if="store.isLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="i in 6" :key="i" class="skeleton aspect-[2/3] rounded-xl"/>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MovieCard v-for="movie in store.trending.slice(0, 6)" :key="movie.id" :movie="movie"/>
      </div>
    </section>

    <!-- Popular section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-white">⭐ Популярное</h2>
        <NuxtLink to="/movies" class="text-primary hover:text-primary-light text-sm transition-colors">
          Смотреть все →
        </NuxtLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <MovieCard v-for="movie in store.popular.slice(0, 6)" :key="movie.id" :movie="movie"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const store = useMoviesStore()

onMounted(async () => {
  await Promise.all([store.fetchTrending(), store.fetchPopular()])
})

useSeoMeta({
  title: 'CineVault — Лучший каталог фильмов',
  description: 'Откройте для себя лучшие фильмы с рейтингами и рецензиями',
})
</script>