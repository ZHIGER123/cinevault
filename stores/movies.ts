import { defineStore } from 'pinia'
import type { Movie, Genre, CustomMovie } from '~/types'

export const useMoviesStore = defineStore('movies', () => {
  // Состояние
  const trending = ref<Movie[]>([])
  const popular = ref<Movie[]>([])
  const topRated = ref<Movie[]>([])
  const currentMovie = ref<Movie | null>(null)
  const genres = ref<Genre[]>([])
  const searchResults = ref<Movie[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Кастомные фильмы (для CRUD в админке)
  const customMovies = ref<CustomMovie[]>([])

  // Геттеры
  const featuredMovie = computed(() => trending.value[0] || null)

  // Действия
  const fetchTrending = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { tmdbApi } = await import('~/utils/api')
      const data = await tmdbApi.getTrending()
      trending.value = data.results
    } catch (e) {
      error.value = 'Не удалось загрузить фильмы'
    } finally {
      isLoading.value = false
    }
  }

  const fetchPopular = async (page = 1) => {
    isLoading.value = true
    try {
      const { tmdbApi } = await import('~/utils/api')
      const data = await tmdbApi.getPopular(String(page))
      popular.value = data.results
    } catch (e) {
      error.value = 'Ошибка загрузки'
    } finally {
      isLoading.value = false
    }
  }

  const fetchMovieById = async (id: string) => {
    isLoading.value = true
    try {
      const { tmdbApi } = await import('~/utils/api')
      currentMovie.value = await tmdbApi.getMovieById(id)
    } finally {
      isLoading.value = false
    }
  }

  const searchMovies = async (query: string) => {
    if (!query.trim()) { searchResults.value = []; return }
    isLoading.value = true
    try {
      const { tmdbApi } = await import('~/utils/api')
      const data = await tmdbApi.searchMovies(query)
      searchResults.value = data.results
    } finally {
      isLoading.value = false
    }
  }

  const fetchGenres = async () => {
    const { tmdbApi } = await import('~/utils/api')
    const data = await tmdbApi.getGenres()
    genres.value = data.genres
  }

  // CRUD для кастомных фильмов (хранятся в localStorage)
  const loadCustomMovies = () => {
    if (process.client) {
      const saved = localStorage.getItem('cv_custom_movies')
      customMovies.value = saved ? JSON.parse(saved) : []
    }
  }

  const saveCustomMovies = () => {
    if (process.client) {
      localStorage.setItem('cv_custom_movies', JSON.stringify(customMovies.value))
    }
  }

  const addCustomMovie = (movie: Omit<CustomMovie, 'id' | 'createdAt'>) => {
    const newMovie: CustomMovie = {
      ...movie,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    customMovies.value.unshift(newMovie)
    saveCustomMovies()
  }

  const updateCustomMovie = (id: string, updates: Partial<CustomMovie>) => {
    const idx = customMovies.value.findIndex(m => m.id === id)
    if (idx !== -1) {
      customMovies.value[idx] = { ...customMovies.value[idx], ...updates }
      saveCustomMovies()
    }
  }

  const deleteCustomMovie = (id: string) => {
    customMovies.value = customMovies.value.filter(m => m.id !== id)
    saveCustomMovies()
  }

  return {
    trending, popular, topRated, currentMovie, genres,
    searchResults, isLoading, error, customMovies, featuredMovie,
    fetchTrending, fetchPopular, fetchMovieById, searchMovies,
    fetchGenres, loadCustomMovies, addCustomMovie, updateCustomMovie, deleteCustomMovie,
  }
})