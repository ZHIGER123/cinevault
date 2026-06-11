<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="text-primary font-bold text-2xl tracking-tight">CINE</span>
          <span class="text-white font-bold text-2xl tracking-tight">VAULT</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
          <NuxtLink to="/movies" class="nav-link">Фильмы</NuxtLink>
          <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
        </div>

        <!-- Right side -->
        <div class="flex items-center gap-4">
          <SearchBar class="hidden md:block" />
          <NuxtLink to="/admin" class="btn-primary text-sm hidden md:block">
            Админ
          </NuxtLink>
          <!-- Mobile menu button -->
          <button @click="menuOpen = !menuOpen" class="md:hidden text-white p-1">
            <span class="block w-6 h-0.5 bg-white mb-1 transition-all" :class="menuOpen ? 'rotate-45 translate-y-1.5' : ''"/>
            <span class="block w-6 h-0.5 bg-white mb-1 transition-all" :class="menuOpen ? 'opacity-0' : ''"/>
            <span class="block w-6 h-0.5 bg-white transition-all" :class="menuOpen ? '-rotate-45 -translate-y-1.5' : ''"/>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition name="slide-down">
        <div v-if="menuOpen" class="md:hidden pb-4 space-y-2">
          <NuxtLink to="/" class="block nav-link py-2" @click="menuOpen = false">Главная</NuxtLink>
          <NuxtLink to="/movies" class="block nav-link py-2" @click="menuOpen = false">Фильмы</NuxtLink>
          <NuxtLink to="/about" class="block nav-link py-2" @click="menuOpen = false">О нас</NuxtLink>
          <NuxtLink to="/admin" class="block btn-primary text-sm text-center mt-2" @click="menuOpen = false">Админ</NuxtLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuOpen = ref(false)
const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 20
  })
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm;
}
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>