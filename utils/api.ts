const config = useRuntimeConfig()

const BASE_URL = config.public.tmdbBaseUrl
const TOKEN = config.tmdbToken || config.public.tmdbToken

async function tmdbFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  url.searchParams.set('language', 'ru-RU')

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: TOKEN,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

export const tmdbApi = {
  getTrending: () => tmdbFetch<TMDBResponse<Movie>>('/trending/movie/week'),
  getPopular: (page = '1') => tmdbFetch<TMDBResponse<Movie>>('/movie/popular', { page }),
  getTopRated: (page = '1') => tmdbFetch<TMDBResponse<Movie>>('/movie/top_rated', { page }),
  getMovieById: (id: string) => tmdbFetch<Movie>(`/movie/${id}`),
  searchMovies: (query: string, page = '1') =>
    tmdbFetch<TMDBResponse<Movie>>('/search/movie', { query, page }),
  getGenres: () => tmdbFetch<{ genres: Genre[] }>('/genre/movie/list'),
  getByGenre: (genreId: string, page = '1') =>
    tmdbFetch<TMDBResponse<Movie>>('/discover/movie', { with_genres: genreId, page }),
}

// Нужно добавить импорты в начало файла:
import type { Movie, Genre, TMDBResponse } from '~/types'