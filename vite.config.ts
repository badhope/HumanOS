import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,
            handler: 'CacheFirst' as const,
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'HumanOS - 人类操作系统',
        short_name: 'HumanOS',
        description: '22种专业心理测评，探索真实的自己',
        theme_color: '#581c87',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@store': resolve(__dirname, 'src/store'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@data': resolve(__dirname, 'src/data'),
      '@services': resolve(__dirname, 'src/services'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 800,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('react-three')) return 'three'
            if (id.includes('recharts')) return 'charts-lib'
            if (id.includes('framer-motion') || id.includes('gsap')) return 'motion'
            if (id.includes('lucide') || id.includes('clsx') || id.includes('tailwind-merge')) return 'ui-lib'
            if (id.includes('dompurify')) return 'purify'
            if (id.includes('zustand')) return 'store-lib'
            if (id.includes('/react/') || id.includes('react-dom') || id.includes('scheduler')) return 'react-lib'
            if (id.includes('react-router')) return 'router-lib'
            if (id.includes('qrcode')) return 'qrcode'
            if (id.includes('html2canvas')) return 'html2canvas'
            if (id.includes('jspdf')) return 'jspdf'
            if (id.includes('axios')) return 'axios'
            if (id.includes('lodash')) return 'lodash'
            if (id.includes('zod')) return 'zod'
            if (id.includes('terser')) return 'terser'
            if (id.includes('@types')) return 'types'
            return 'vendor'
          }
          if (id.includes('src/data/assessments')) return 'assessments-data'
          if (id.includes('src/data/simulations')) return 'simulations-data'
          if (id.includes('src/data/professional')) return 'professional-data'
          if (id.includes('src/components/economy')) return 'economy-components'
          if (id.includes('src/components/charts')) return 'charts-components'
          if (id.includes('src/components/ui')) return 'ui-components'
          if (id.includes('src/components/animations')) return 'animation-components'
          if (id.includes('src/components/reports')) {
            const match = id.match(/\/(\w+)ProfessionalReport\.tsx$/)
            return match ? `report-${match[1].toLowerCase()}` : 'report-components'
          }
          if (id.includes('src/components/')) return 'shared-components'
          if (id.includes('src/hooks/')) return 'hooks'
          if (id.includes('src/services/')) return 'services'
          if (id.includes('src/utils/')) return 'utils'
          if (id.includes('src/store/')) return 'store'
          if (id.includes('src/types/')) return 'types'
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        keep_infinity: true,
        reduce_vars: true,
        unused: true,
        dead_code: true,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'zustand'],
    force: false,
  },
  define: {
    __TIMING_ENABLED: JSON.stringify(false),
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
  },
  experimental: {
    renderBuiltUrl(filename: string, { hostType }: { hostType: 'js' | 'css' | 'html' }) {
      if (hostType === 'js') {
        return { runtime: `new URL(${JSON.stringify(filename)}, import.meta.url).href` }
      }
      return { relative: true }
    },
  },
})
