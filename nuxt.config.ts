// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/css/navigation-desktop.css',
    '~/css/home.css',
    '~/css/font-family.css',
    '~/css/custom.css',
    '~/css/search.css',
    '~/css/search-custom.css',    
    '~/css/vip.core.css',
    '~/css/insurtech.css',
    '~/css/swiper.css' ,
    'primevue/resources/themes/lara-light-blue/theme.css',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.min.css' ,
    'primeicons/primeicons.css',
    '~/css/theme-custom.css',
    'primeflex/primeflex.css' 
  ],
  build: {
		transpile: ["primevue"]
	},
  components: true,
  ssr: false,
  runtimeConfig: {
    public: {
      enviroment: {
        dev: {
          host: 'http://localhost',
        },
        prod: {
          host: 'https://quintaldaspecas.com.br',
        },
      },
      apiUrl: '/backend/public/api/',
      csrf: '/backend/public/sanctum/csrf-cookie',
    }
  }
})