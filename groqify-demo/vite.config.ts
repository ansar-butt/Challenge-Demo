import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    define: {
        __API_PATH__: JSON.stringify('/api'),
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
        cors: {
            origin: 'https://localhost:3000',
        },
    },
    build: {
        manifest: true,
        rollupOptions: {
            input: 'groqify-demo/src/index.tsx',
        },
    },
});
