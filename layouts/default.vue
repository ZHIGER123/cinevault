<template>
  <div class="min-h-screen bg-surface flex flex-col">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>