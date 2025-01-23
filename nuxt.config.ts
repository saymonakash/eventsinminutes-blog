export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: true,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/supabase",
    "@nuxtjs/seo",
    "@vite-pwa/nuxt",
  ],
  auth: {
    // Doc: https://auth.nuxtjs.org/getting-started/options
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/",
    },
    strategies: {
      local: false,
      auth0: {
        domain: "TENANT.auth0.com",
        client_id: "CLIENT_ID",
      },
    },
  },
  proxy: {},
  tailwindcss: {
    exposeConfig: true,
  },
  image: {
    dir: "assets/images/",
    provider: "ipx",
    presets: {
      default: {
        modifiers: {
          format: "webp",
          quality: 80,
        },
      },
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  seo: {
    baseURL: "https://www.eventsinminutes.com",
    name: "Events In Minutes",
    title: "Events In Minutes - Your Event Planning Companion",
    templateTitle: "%name% || %title%",
    description: "Plan your events effortlessly with Events In Minutes.",
    canonical: "auto",
    isForcedTrailingSlash: false,
    keywords: ["events", "planning", "event management"],
    openGraph: {
      type: "website",
      image: "https://www.eventsinminutes.com/og-image.jpg",
      site_name: "Events In Minutes",
    },
    twitter: {
      card: "summary_large_image",
      site: "@eventsinminutes",
      creator: "@eventsinminutes",
    },
  },
  components: {
    global: true,
    dirs: ["@/components"],
  },
  css: ["@/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    routeRules: {
      "/_nuxt/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
    },
    prerender: {
      routes: ["/post"], // Define static routes for SSG
    },
  },
  vite: {
    cacheDir: ".vite-cache",
  },
  pwa: {
    registerType: "autoUpdate",
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.example\.com\/.*$/,
          handler: "CacheFirst",
          options: {
            cacheName: "api-cache",
            expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
          },
        },
      ],
    },
  },
});
