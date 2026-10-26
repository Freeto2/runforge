import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import AgentsList from './agents-list.jsx';
import { fetchAgentRuns } from '../../data/agents.js';

// Мокаем сам модуль, чтобы мы могли управлять тем, что он возвращает в тестах
vi.mock('../../data/agents.js', () => ({
    fetchAgentRuns: vi.fn()
}));

describe('Тестирование обработки ошибок в AgentsList', () => {

    it('должен показывать блок ошибки и успешно перезагружать данные при клике на Повторить', async () => {
        // 1. Имитируем, что первый вызов функции fetchAgentRuns завершился ошибкой (Promise.reject)
        fetchAgentRuns.mockImplementationOnce(() => Promise.reject(new Error('Network Error')));

        render(<AgentsList title="Agents" />);

        // Ждем, пока исчезнет Loading... и появится текст ошибки
        await waitFor(() => {
            expect(screen.getByText('Failed to load data')).toBeInTheDocument();
        });

        // Проверяем, что кнопка "Повторить запрос" на месте
        const retryButton = screen.getByRole('button', { name: /Repeat/i });
        expect(retryButton).toBeInTheDocument();

        // 2. Настраиваем mock так, чтобы СЛЕДУЮЩИЙ вызов (при клике на повтор) вернул успешные данные
        fetchAgentRuns.mockImplementationOnce(() => Promise.resolve([
            { id: '1', name: 'Auth refactor', repository: 'web-platform', status: 'running', createdAt: '2026-10-25T14:20:00Z' }
        ]));

        // Имитируем клик по кнопке "Повторить запрос ↻"
        fireEvent.click(retryButton);

        // Проверяем, что блок ошибки исчез, и на экране появился наш успешный агент
        await waitFor(() => {
            expect(screen.queryByText('Failed to load data')).not.toBeInTheDocument();
            expect(screen.getByText('Auth refactor')).toBeInTheDocument();
        });
    });
});
