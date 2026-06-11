<template>
  <div v-if="store.currentMovie" class="min-h-screen">
    <!-- Backdrop -->
    <div class="relative h-96 overflow-hidden">
      <img
        v-if="movie.backdrop_path"
        :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        :alt="movie.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-surface to-black/40"/>
    </div>

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 pb-16">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Poster -->
        <div class="flex-shrink-0">
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
            :alt="movie.title"
            class="w-48 rounded-xl shadow-2xl"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 pt-36 md:pt-8">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ movie.title }}</h1>
          <p v-if="movie.tagline" class="text-primary italic mb-4">{{ movie.tagline }}</p>

          <div class="flex flex-wrap items-center gap-4 mb-6">
            <span class="flex items-center gap-1 text-gold text-xl font-bold">
              ★ {{ movie.vote_average.toFixed(1) }}
            </span>
            <span class="text-gray-400">{{ movie.release_date?.slice(0, 4) }}</span>
            <span v-if="movie.runtime" class="text-gray-400">{{ movie.runtime }} мин</span>
          </div>

          <!-- Genres -->
          <div v-if="movie.genres" class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="genre in movie.genres" :key="genre.id"
              class="px-3 py-1 bg-surface-secondary rounded-full text-sm text-gray-300 border border-white/10"
            >{{ genre.name }}</span>
          </div>

          <p class="text-gray-300 leading-relaxed mb-8">{{ movie.overview }}</p>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div v-if="movie.budget" class="bg-surface-secondary rounded-xl p-4">
              <p class="text-gray-400 mb-1">Бюджет</p>
              <p class="text-white font-semibold">${{ (movie.budget / 1e6).toFixed(0) }}M</p>
            </div>
            <div v-if="movie.revenue" class="bg-surface-secondary rounded-xl p-4">
              <p class="text-gray-400 mb-1">Сборы</p>
              <p class="text-white font-semibold">${{ (movie.revenue / 1e6).toFixed(0) }}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"/>
      <p class="text-gray-400">Загрузка...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const store = useMoviesStore()
const movie = computed(() => store.currentMovie!)

await store.fetchMovieById(route.params.id as string)

useSeoMeta({
  title: () => `${movie.value?.title} — CineVault`,
  description: () => movie.value?.overview,
})
</script>