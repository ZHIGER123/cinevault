<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white">Управление фильмами</h1>
      <button @click="openModal(null)" class="btn-primary flex items-center gap-2">
        + Добавить
      </button>
    </div>

    <!-- Table -->
    <div class="glass rounded-xl overflow-hidden">
      <table class="w-full">
        <thead class="border-b border-white/10">
          <tr class="text-left">
            <th class="p-4 text-gray-400 text-sm font-medium">Название</th>
            <th class="p-4 text-gray-400 text-sm font-medium">Жанр</th>
            <th class="p-4 text-gray-400 text-sm font-medium">Год</th>
            <th class="p-4 text-gray-400 text-sm font-medium">Рейтинг</th>
            <th class="p-4 text-gray-400 text-sm font-medium">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-if="moviesStore.customMovies.length === 0">
            <td colspan="5" class="py-12 text-center text-gray-500">
              <div class="text-4xl mb-3">🎬</div>
              <p>Нет добавленных фильмов. Добавьте первый!</p>
            </td>
          </tr>
          <tr v-for="movie in moviesStore.customMovies" :key="movie.id"
            class="hover:bg-white/2 transition-colors">
            <td class="p-4 text-white text-sm font-medium">{{ movie.title }}</td>
            <td class="p-4 text-gray-400 text-sm">{{ movie.genre }}</td>
            <td class="p-4 text-gray-400 text-sm">{{ movie.year }}</td>
            <td class="p-4">
              <span class="text-gold text-sm">★ {{ movie.rating }}</span>
            </td>
            <td class="p-4">
              <div class="flex gap-2">
                <button @click="openModal(movie)"
                  class="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
                  Изменить
                </button>
                <button @click="confirmDelete(movie.id)"
                  class="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors">
                  Удалить
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div class="bg-surface-secondary border border-white/10 rounded-2xl p-6 w-full max-w-md">
            <h3 class="text-xl font-bold text-white mb-6">
              {{ editingId ? 'Редактировать' : 'Добавить' }} фильм
            </h3>
            <form @submit.prevent="saveMovie" class="space-y-4">
              <input v-model="form.title" placeholder="Название" required
                class="input-field"/>
              <input v-model="form.genre" placeholder="Жанр" required class="input-field"/>
              <input v-model.number="form.year" type="number" placeholder="Год" required
                class="input-field"/>
              <input v-model.number="form.rating" type="number" step="0.1" min="0" max="10"
                placeholder="Рейтинг (0-10)" required class="input-field"/>
              <textarea v-model="form.description" placeholder="Описание" rows="3"
                class="input-field resize-none"/>
              <div class="flex gap-3 pt-2">
                <button type="button" @click="showModal = false" class="btn-ghost flex-1">Отмена</button>
                <button type="submit" class="btn-primary flex-1">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { CustomMovie } from '~/types'

definePageMeta({ middleware: 'auth', layout: 'admin' })

const moviesStore = useMoviesStore()
const showModal = ref(false)
const editingId = ref<string | null>(null)
const form = reactive({ title: '', genre: '', year: new Date().getFullYear(), rating: 7.0, description: '' })

onMounted(() => moviesStore.loadCustomMovies())

const openModal = (movie: CustomMovie | null) => {
  if (movie) {
    editingId.value = movie.id
    Object.assign(form, { title: movie.title, genre: movie.genre, year: movie.year, rating: movie.rating, description: movie.description })
  } else {
    editingId.value = null
    Object.assign(form, { title: '', genre: '', year: new Date().getFullYear(), rating: 7.0, description: '' })
  }
  showModal.value = true
}

const saveMovie = () => {
  if (editingId.value) {
    moviesStore.updateCustomMovie(editingId.value, { ...form })
  } else {
    moviesStore.addCustomMovie({ ...form, featured: false })
  }
  showModal.value = false
}

const confirmDelete = (id: string) => {
  if (confirm('Удалить этот фильм?')) {
    moviesStore.deleteCustomMovie(id)
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors placeholder-gray-500 text-sm;
}
</style>