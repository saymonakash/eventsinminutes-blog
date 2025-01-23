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
  supabase:{
    redirect: false
  },
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
    baseURL: '/',
    head: {
      meta: [{ charset: 'utf-8' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo/Brand-logo.png' },
        { rel: 'icon', href: '/logo/Brand-logo.png' },
      ],
    },
  },
  site:{
    name: "Events In Minutes",
    title: "Events In Minutes - Your Event Planning Companion",
    description: "Plan your events effortlessly with Events In Minutes.",
    keywords: ["events", "planning", "event management"],
    openGraph: {
      type: "website",
      image: "/logo/Brand-logo.png",
      site_name: "Events In Minutes",
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
