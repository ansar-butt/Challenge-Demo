import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
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
