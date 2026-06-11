<template>
  <div class="relative" ref="container">
    <div class="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/20 focus-within:border-white/50 transition-all">
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input
        v-model="query"
        @input="onSearch"
        type="text"
        placeholder="Поиск фильмов..."
        class="bg-transparent text-white text-sm outline-none w-40 placeholder-gray-400"
      />
    </div>

    <!-- Результаты -->
    <Transition name="fade">
      <div v-if="results.length > 0 && query"
        class="absolute top-10 right-0 w-72 bg-surface-secondary border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
        <NuxtLink
          v-for="movie in results.slice(0, 5)" :key="movie.id"
          :to="`/movies/${movie.id}`"
          @click="clear"
          class="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
            :alt="movie.title"
            class="w-8 h-12 object-cover rounded"
          />
          <div v-else class="w-8 h-12 bg-surface-tertiary rounded flex items-center justify-center text-xs text-gray-500">?</div>
          <div>
            <p class="text-sm font-medium text-white">{{ movie.title }}</p>
            <p class="text-xs text-gray-400">{{ movie.release_date?.slice(0, 4) }}</p>
          </div>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const store = useMoviesStore()
const query = ref('')
const results = computed(() => store.searchResults)

const onSearch = useDebounceFn(async () => {
  await store.searchMovies(query.value)
}, 400)

const clear = () => {
  query.value = ''
  store.searchResults = []
}
</script>