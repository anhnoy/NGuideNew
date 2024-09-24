export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/main.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  app: {
    head: {
      title: "nGuide",
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
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
