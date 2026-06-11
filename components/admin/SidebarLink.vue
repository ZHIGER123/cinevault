<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
    :class="isActive
      ? 'bg-primary/20 text-primary border border-primary/30'
      : 'text-gray-400 hover:text-white hover:bg-white/5'"
  >
    <span>{{ icon }}</span>
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ to: string; icon: string; label: string; exact?: boolean }>()
const route = useRoute()
const isActive = computed(() =>
  props.exact ? route.path === props.to : route.path.startsWith(props.to)
)
</script>