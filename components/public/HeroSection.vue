
<template>
  <section v-if="movie" class="relative h-screen flex items-end">
    <!-- Backdrop -->
    <div class="absolute inset-0 overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
        :alt="movie.title"
        class="w-full h-full object-cover"
      />
      <!-- Gradients -->
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"/>
      <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"/>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
      <div class="max-w-2xl animate-slide-up">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-primary text-sm font-semibold uppercase tracking-wider">🔥 Сейчас в тренде</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {{ movie.title }}
        </h1>
        <p class="text-gray-300 text-lg mb-6 line-clamp-3">
          {{ movie.overview }}
        </p>
        <div class="flex items-center gap-4 mb-8">
          <span class="flex items-center gap-1 text-gold font-semibold">
            ★ {{ movie.vote_average.toFixed(1) }}
          </span>
          <span class="text-gray-400">{{ movie.release_date?.slice(0, 4) }}</span>
        </div>
        <div class="flex gap-4">
          <NuxtLink :to="`/movies/${movie.id}`" class="btn-primary flex items-center gap-2">
            ▶ Подробнее
          </NuxtLink>
          <button class="btn-ghost">+ В список</button>
        </div>
      </div>
    </div>
  </section>

  <!-- Skeleton loader -->
  <section v-else class="relative h-screen bg-surface-secondary animate-pulse"/>
</template>

<script setup lang="ts">
import type { Movie } from '~/types'
defineProps<{ movie: Movie | null }>()
</script>