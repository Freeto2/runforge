import '@testing-library/jest-dom';
import { vi } from 'vitest';

// На всякий случай мокаем window.location, так как мы активно используем URLSearchParams
Object.defineProperty(window, 'location', {
    writable: true,
    value: {
        search: '',
        pathname: '/',
    },
});
