export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/main.scss",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/SpoqaHanSansNeo.css", // Local Spoqa Han Sans CSS
  ],

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@pinia/nuxt"],

  build: {
    transpile: ["vuetify", "v-calendar"],
  },

  app: {
    head: {
      title: "Auto&Tour",
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
        // {
        //   rel: "stylesheet",
        //   href: "https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css",
        //   type: "text/css",
        // },
        {
          rel: "icon",
          type: "image/png",
          href: "https://autontour.com/assets/images/Logo_AutonTour.png",
          // href: "https://autontour.com/_nuxt/auto.kPZ2-dC2.svg",
        },
      ],

      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&region=KR&language=ko`,
          async: true,
          defer: true,
        },
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-ZBVBVHNZQM",
          async: true,
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZBVBVHNZQM');
          `,
          type: "text/javascript",
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
