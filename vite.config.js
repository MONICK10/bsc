import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Auto-update service worker
      registerType: 'autoUpdate',
      
      // Include all static assets
      includeAssets: [
        'favicon.ico', 
        'robots.txt', 
        'icons/*.png',
        'images/*.png',
        'images/*.jpg',
        'offline.html'
      ],
      
      // App manifest
      manifest: {
        name: 'Bearhatty Sports Club',
        short_name: 'Bearhatty',
        description: 'Live sports streaming, upcoming matches, and achievements for Bearhatty Sports Club',
        theme_color: '#0EA5E9',
        background_color: '#001F3F',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        categories: ['sports'],
        
        // App icons for installable app
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        
        // Screenshots for installable experience
        screenshots: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      
      // Workbox configuration
      workbox: {
        // Include all necessary file types
        globPatterns: [
          '**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff,woff2,ttf,eot}',
          'manifest.json',
          'offline.html'
        ],
        
        // Exclude source maps and other dev files
        globIgnores: [
          '**/node_modules/**/*',
          '**/.git/**/*',
          '**/.gitignore',
          '**/map'
        ],
        
        // Workbox runtime caching strategies
        runtimeCaching: [
          // Google Fonts - Cache First, very long expiration
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Google Fonts files
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // API Matches - Network First
          {
            urlPattern: /\/api\/matches$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-matches',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // API Achievements - Network First
          {
            urlPattern: /\/api\/achievements$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-achievements',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 10 // 10 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // Uploaded images - Cache First
          {
            urlPattern: /\/uploads\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'uploaded-images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          
          // CRITICAL: Realtime APIs - NO CACHING
          {
            urlPattern: /\/api\/live/i,
            handler: 'NetworkOnly'
          },
          {
            urlPattern: /socket\.io/i,
            handler: 'NetworkOnly'
          }
        ],
        
        // Navigation fallback
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api\//],
        
        // Don't precache
        skipWaiting: false,
        clientsClaim: true
      },
      
      // Integration with VitePWA
      devOptions: {
        enabled: false // Disable in dev
      }
    })
  ],
  
  // Dev server config
  server: {
    port: 3000,
    open: true,
  },
  
  // Build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          
          // Animation library
          animations: ['framer-motion'],
          
          // WebSocket library
          socket: ['socket.io-client'],
          
          // UI libraries
          ui: ['swiper']
        }
      }
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1024,
    
    // Report compressed size
    reportCompressedSize: false
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'framer-motion',
      'socket.io-client',
      'swiper'
    ]
  }
});
