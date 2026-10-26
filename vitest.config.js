import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // <-- Использовать этот импорт

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.js',
    },
});
