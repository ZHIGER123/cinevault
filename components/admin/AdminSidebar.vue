<template>
  <aside class="w-64 min-h-screen bg-surface-secondary border-r border-white/5 flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b border-white/5">
      <div class="flex items-center gap-2">
        <span class="text-primary font-bold text-lg">CINE</span>
        <span class="text-white font-bold text-lg">VAULT</span>
        <span class="text-xs text-gray-500 ml-1">Admin</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
      <SidebarLink to="/admin" icon="📊" label="Dashboard" :exact="true"/>
      <SidebarLink to="/admin/movies" icon="🎬" label="Фильмы"/>
      <SidebarLink to="/admin/genres" icon="🏷️" label="Жанры"/>
      <SidebarLink to="/admin/users" icon="👥" label="Пользователи"/>
      <SidebarLink to="/admin/analytics" icon="📈" label="Аналитика"/>
    </nav>

    <!-- User info -->
    <div class="p-4 border-t border-white/5">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
          {{ authStore.user?.name?.[0] || 'A' }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-sm font-medium truncate">{{ authStore.user?.name }}</p>
          <p class="text-gray-400 text-xs truncate">{{ authStore.user?.email }}</p>
        </div>
      </div>
      <button @click="authStore.logout()" class="w-full text-left text-gray-400 hover:text-white text-sm transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
        Выйти
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const authStore = useAuthStore()