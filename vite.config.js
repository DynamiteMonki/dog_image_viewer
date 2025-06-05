import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), ghPages()],
  base: 'https://github.com/DynamiteMonki/dog_image_viewer.git'
})
