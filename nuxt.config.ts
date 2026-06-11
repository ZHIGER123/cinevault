export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },

  runtimeConfig: {
    tmdbToken: process.env.NUXT_TMDB_TOKEN,
    public: {
      tmdbBaseUrl: process.env.NUXT_PUBLIC_TMDB_BASE_URL,
      tmdbImageUrl: process.env.NUXT_PUBLIC_TMDB_IMAGE_URL,
    },
  },

  image: {
    domains: ['image.tmdb.org'],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'CineVault',
      meta: [
        { name: 'description', content: 'The ultimate movie catalog' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
}) 