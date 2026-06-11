import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  // Имитация авторизации
  const FAKE_CREDENTIALS = {
    email: 'admin@cinevault.com',
    password: 'admin123',
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800)) // имитация запроса

    if (email === FAKE_CREDENTIALS.email && password === FAKE_CREDENTIALS.password) {
      user.value = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
      }
      // Сохраняем в localStorage
      if (process.client) {
        localStorage.setItem('cv_user', JSON.stringify(user.value))
      }
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem('cv_user')
    }
    navigateTo('/admin/login')
  }

  const restoreSession = () => {
    if (process.client) {
      const saved = localStorage.getItem('cv_user')
      if (saved) {
        user.value = JSON.parse(saved)
      }
    }
  }

  return { user, isAuthenticated, login, logout, restoreSession }
})