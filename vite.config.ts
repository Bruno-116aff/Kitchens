import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		minify: 'esbuild',
		target: 'esnext',
		rollupOptions: {
			output: {
				manualChunks: {
					'vendor-react': ['react', 'react-dom', 'react-router-dom'],
					'vendor-framer': ['framer-motion'],
					'vendor-i18n': ['react-i18next', 'i18next'],
				},
				inlineDynamicImports: false,
			},
		},
	},
	server: {
		headers: {
			'Cache-Control': 'public, max-age=31536000',
		},
	},
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom'],
		force: true,
	},
});
