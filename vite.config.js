import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "/faculty-event-management/",
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        events: path.resolve(__dirname, 'events.html'),
        users: path.resolve(__dirname, 'users.html'),
      }
    }
  }
})
