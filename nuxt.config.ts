export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/main.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@pinia/nuxt"],

  build: {
    transpile: ["vuetify", "v-calendar"],
  },

  app: {
    head: {
      title: "autontour",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap",
          rel: "stylesheet",
        },
        {
          rel: "stylesheet",
          href: "//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css",
          type: "text/css",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "https://autontour.com/_nuxt/auto.kPZ2-dC2.svg",
        },
      ],

      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&region=KR&language=ko`,
          async: true,
          defer: true,
        },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    optimizeDeps: {
      include: ['dom-to-image', 'pdf-lib']
    },
    build: {
      target: 'esnext',
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
