import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": resolve(projectRootDir, "src"),
    },
  },
  define: {
		'process.env.NODE_ENV': JSON.stringify("development"),
		// 'process.env.VUE_APP_BASEURL': JSON.stringify(process.env.NODE_ENV === "production" ? "" : "http://192.168.50.56"),
		'process.env.VUE_APP_BASEURL': JSON.stringify(process.env.NODE_ENV === "production" ? "" : "http://localhost:8000"),
		'process.env.VUE_API': JSON.stringify({
			AUTHENTICATE: "/api/authenticate",
    })
  },
  build: {
    outDir: 'dist',
  }
})
