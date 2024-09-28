import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  dir: {
    pages: 'pages',
    assets: 'core/assets',
    layouts: 'core/layouts',
    public: 'core/public',
    middleware: 'core/middleware',
  },
  components: {
    dirs: ['core/components']
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  plugins: ['~/core/plugins/vuetify.ts'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@sidebase/nuxt-auth',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  auth: {
    globalAppMiddleware: false,
    baseURL: process.env.API_URL,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'auth/login', method: 'post' },
        signOut: { path: 'auth/logout', method: 'post' },

        // signUp: { path: '/registration', method: 'post' },
        getSession: { path: '/page2', method: 'get'  }
      },
      pages: {
        login: '/',

      },
      token: {
        maxAgeInSeconds: 60 * 60 * 24,    // token expiration 1d
        signInResponseTokenPointer: process.env.TOKEN_POINTER,
      },
    },
    
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
