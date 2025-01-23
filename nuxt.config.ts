export default defineNuxtConfig({
  // General Configuration
  compatibilityDate: '2024-11-01',

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  ssr: true,

  // Devtools Configuration
  devtools: { enabled: false },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // Modules Configuration
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@nuxtjs/seo',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
  ],

  // TailwindCSS Configuration
  tailwindcss: {
    exposeConfig: true,
  },

  // Image Configuration
  image: {
    dir: 'assets/images/',
    provider: 'ipx',
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 80,
        },
      },
    },
  },

  // Application Configuration
  app: {
    baseURL: '/',
    head: {
      meta: [{ charset: 'utf-8' }],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/android-chrome-512x512.png',
        },
      ],
    },
  },

  // Site Configuration
  site: {
    name: 'Events In Minutes',
    title: 'Events In Minutes - Your Event Planning Companion',
    description: 'Plan your events effortlessly with Events In Minutes.',
    keywords: ['events', 'planning', 'event management'],
    openGraph: {
      type: 'website',
      image: '/logo/Brand-logo.png',
      site_name: 'Events In Minutes',
    },
  },

  // SEO Configuration
  seo: {
    baseURL: 'https://www.eventsinminutes.com',
    name: 'Events In Minutes',
    title: 'Events In Minutes - Your Event Planning Companion',
    templateTitle: '%name% || %title%',
    description: 'Plan your events effortlessly with Events In Minutes.',
    canonical: 'auto',
    isForcedTrailingSlash: false,
    keywords: ['events', 'planning', 'event management'],
    openGraph: {
      type: 'website',
      image: 'https://www.eventsinminutes.com/og-image.jpg',
      site_name: 'Events In Minutes',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@eventsinminutes',
      creator: '@eventsinminutes',
    },
  },

  // Components Configuration
  components: {
    global: true,
    dirs: ['@/components'],
  },

  // CSS Configuration
  css: ['@/assets/css/tailwind.css'],

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Nitro Configuration
  nitro: {
    routeRules: {
      '/_nuxt/**': {
        headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
      },
    },
    prerender: {
      routes: ['/post', '/post/category'], // Define static routes for SSG
      crawlLinks: true,
      failOnError: false, // Set to true to fail the build if any page fails to prerender
    },
  },

  // Vite Configuration
  vite: {
    ssr: {
      noExternal: ['@nuxtjs/supabase'],
    },
    cacheDir: '.vite-cache',
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.example\.com\/.*$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'api-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
          },
        },
      ],
    },
  },

  // Supabase Configuration
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    url: [
      // vercel, netlify
      process.env.NUXT_ENV_VERCEL_URL,
      process.env.URL,
      // cloudflare pages
      process.env.CF_PAGES_URL,
    ],
    // vercel, netlify
    name: [process.env.NUXT_ENV_VERCEL_GIT_REPO_SLUG, process.env.SITE_NAME],
    gzip: true,
    cacheTime: 1,
    routes: () => {
      return [{ url: new Date().toISOString() }]
    },
  },
})
