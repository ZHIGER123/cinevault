export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  genres?: Genre[]
  runtime?: number
  tagline?: string
  status?: string
  revenue?: number
  budget?: number
}

export interface Genre {
  id: number
  name: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive'
  createdAt: string
  avatar?: string
}

export interface CustomMovie {
  id: string
  title: string
  description: string
  genre: string
  year: number
  rating: number
  featured: boolean
  createdAt: string
}

export interface DashboardStats {
  totalMovies: number
  totalUsers: number
  totalGenres: number
  monthlyViews: number
}