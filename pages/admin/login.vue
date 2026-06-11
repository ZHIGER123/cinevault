<template>
  <div class="min-h-screen bg-surface flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-primary font-bold text-3xl">CINE</span>
          <span class="text-white font-bold text-3xl">VAULT</span>
        </div>
        <p class="text-gray-400">Войдите в панель управления</p>
      </div>

      <div class="glass rounded-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-gray-400 text-sm mb-2">Email</label>
            <input v-model="email" type="email" required
              placeholder="admin@cinevault.com"
              class="w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"/>
          </div>
          <div>
            <label class="block text-gray-400 text-sm mb-2">Пароль</label>
            <input v-model="password" type="password" required
              placeholder="admin123"
              class="w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"/>
          </div>

          <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>

          <button type="submit" :disabled="loading"
            class="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70">
            <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
            {{ loading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <div class="mt-6 p-4 bg-surface-tertiary rounded-lg">
          <p class="text-gray-400 text-xs text-center">Тестовые данные:</p>
          <p class="text-gray-300 text-xs text-center mt-1">admin@cinevault.com / admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  const ok = await authStore.login(email.value, password.value)
  loading.value = false
  if (ok) {
    navigateTo('/admin')
  } else {
    error.value = 'Неверный email или пароль'
  }
}
</script>