<template>
  <div class="max-w-4xl mx-auto px-4 pt-28 pb-16">
    <h1 class="text-4xl font-bold text-white mb-6">О CineVault</h1>
    <div class="glass rounded-2xl p-8 mb-8">
      <p class="text-gray-300 text-lg leading-relaxed mb-6">
        CineVault — это современный каталог фильмов, созданный для любителей кино.
        Мы предоставляем актуальную информацию о фильмах, рейтинги и рецензии.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-6 bg-surface-tertiary rounded-xl">
          <div class="text-4xl font-bold text-primary mb-2">10K+</div>
          <div class="text-gray-400">Фильмов в базе</div>
        </div>
        <div class="text-center p-6 bg-surface-tertiary rounded-xl">
          <div class="text-4xl font-bold text-primary mb-2">500K+</div>
          <div class="text-gray-400">Пользователей</div>
        </div>
        <div class="text-center p-6 bg-surface-tertiary rounded-xl">
          <div class="text-4xl font-bold text-primary mb-2">50+</div>
          <div class="text-gray-400">Жанров</div>
        </div>
      </div>
    </div>

    <!-- Форма обратной связи -->
    <div class="glass rounded-2xl p-8">
      <h2 class="text-2xl font-bold text-white mb-6">Связаться с нами</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block text-gray-400 text-sm mb-2">Имя</label>
          <input v-model="form.name" type="text" required
            class="w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"/>
        </div>
        <div>
          <label class="block text-gray-400 text-sm mb-2">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors"/>
        </div>
        <div>
          <label class="block text-gray-400 text-sm mb-2">Сообщение</label>
          <textarea v-model="form.message" rows="4" required
            class="w-full bg-surface-tertiary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none transition-colors resize-none"/>
        </div>
        <button type="submit" class="btn-primary">
          {{ sent ? '✓ Отправлено!' : 'Отправить' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({ name: '', email: '', message: '' })
const sent = ref(false)

const submitForm = async () => {
  await new Promise(r => setTimeout(r, 500))
  sent.value = true
  setTimeout(() => { sent.value = false; Object.assign(form, { name: '', email: '', message: '' }) }, 3000)
}

useSeoMeta({ title: 'О нас — CineVault' })
</script>