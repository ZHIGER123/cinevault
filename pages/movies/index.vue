<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
    <h1 class="text-3xl font-bold text-white mb-8">Каталог фильмов</h1>

    <!-- Фильтры -->
    <div class="flex flex-wrap gap-3 mb-8">
      <button
        v-for="genre in store.genres.slice(0, 10)" :key="genre.id"
        @click="selectedGenre = selectedGenre === genre.id ? null : genre.id"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
        :class="selectedGenre === genre.id
          ? 'bg-primary text-white'
          : 'bg-surface-secondary text-gray-400 hover:text-white border border-white/10'"
      >
        {{ genre.name }}
      </button>
    </div>

    <!-- Сетка фильмов -->
    <div v-if="store.isLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="i in 10" :key="i" class="skeleton aspect-[2/3] rounded-xl"/>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </div>

    <!-- Пагинация -->
    <div class="flex justify-center gap-3 mt-12">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
      >← Назад</button>
      <span class="flex items-center px-4 text-gray-400">Страница {{ page }}</span>
      <button @click="nextPage" class="btn-ghost">Далее →</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useMoviesStore()
const page = ref(1)
const selectedGenre = ref<number | null>(null)
const movies = ref(store.popular)

const loadMovies = async () => {
  if (selectedGenre.value) {
    const { tmdbApi } = await import('~/utils/api')
    const data = await tmdbApi.getByGenre(String(selectedGenre.value), String(page.value))
    movies.value = data.results
  } else {
    await store.fetchPopular(page.value)
    movies.value = store.popular
  }
}

watch([page, selectedGenre], loadMovies, { immediate: true })

const nextPage = () => { page.value++; window.scrollTo(0, 0) }
const prevPage = () => { if (page.value > 1) { page.value--; window.scrollTo(0, 0) } }

onMounted(() => store.fetchGenres())

useSeoMeta({ title: 'Каталог фильмов — CineVault' })
</script>