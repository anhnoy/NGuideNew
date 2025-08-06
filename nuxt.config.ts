export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    // Private keys (only available on server-side)
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    public: {
      // Public configuration (exposed to client-side)
      apiBaseUrl: process.env.VITE_ENV_POINT_URL,
      socketUrl: process.env.VITE_ENV_POINT_SOCKET_URL,
      exchangeUrl: process.env.EXCHANGE,
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/main.scss",
    "@mdi/font/css/materialdesignicons.min.css",
    "~/assets/css/SpoqaHanSansNeo.css", // Local Spoqa Han Sans CSS
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    [
      "@nuxtjs/sitemap",
      {
        hostname: "https://autontour.com",
        exclude: ["/admin/**"],
        gzip: true,
        defaults: {
          changefreq: "daily",
          priority: 0.8,
          lastmod: new Date(),
        },
        sitemaps: {
          pages: {
            include: ["/**"],
            exclude: ["/admin/**"],
          },
        },
        xslColumns: [
          { label: "URL", width: "50%" },
          { label: "Last Modified", select: "sitemap:lastmod", width: "25%" },
          { label: "Priority", select: "sitemap:priority", width: "12.5%" },
          {
            label: "Change Frequency",
            select: "sitemap:changefreq",
            width: "12.5%",
          },
        ],
        url: "https://autontour.com",
      },
    ],
  ],

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
          href: "https://autontour.com/assets/images/Logo_AutonTour.png?v2",
          // href: "https://autontour.com/_nuxt/auto.kPZ2-dC2.svg",
        },
      ],

      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&region=KR&language=ko&libraries=places`,
          async: true,
          defer: true,
        },
        {
          // src: "https://www.googletagmanager.com/gtag/js?id=G-5WDB10QV76",
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
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  }
});
