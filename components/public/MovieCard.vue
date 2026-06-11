<template>
  <NuxtLink :to="`/movies/${movie.id}`" class="group block">
    <div class="relative overflow-hidden rounded-xl bg-surface-secondary card-hover cursor-pointer">
      <!-- Постер -->
      <div class="aspect-[2/3] relative">
        <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-surface-tertiary flex items-center justify-center">
          <span class="text-gray-600 text-4xl">🎬</span>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

        <!-- Rating badge -->
        <div class="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
          <span class="text-gold text-xs">★</span>
          <span class="text-white text-xs font-medium">{{ movie.vote_average.toFixed(1) }}</span>
        </div>
      </div>

      <!-- Info -->
      <div class="p-3">
        <h3 class="text-white font-semibold text-sm truncate">{{ movie.title }}</h3>
        <p class="text-gray-400 text-xs mt-0.5">{{ movie.release_date?.slice(0, 4) }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Movie } from '~/types'

defineProps<{ movie: Movie }>()
</script>