function getRandomDate() {
    const end = new Date(); // Текущий момент времени
    const start = new Date();
    start.setDate(end.getDate() - 7); // Отматываем на 7 дней назад для диапазона

    // Генерируем случайное число миллисекунд между start и end
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());

    // Возвращаем объект Date
    return new Date(randomTimestamp);
}


// Локальные mock-данные (имитация базы данных бэкенда)
const mockAgentsData = [
    {
        id: 1,
        name: "Codex",
        repository: "api-migration",
        status: "succeeded",
        time: "finished 18 min ago",
        durationSeconds: 1080,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 2,
        name: "Claude Code",
        repository: "lint-fixes",
        status: "failed",
        time: "failed 51 min ago",
        durationSeconds: 3060,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 3,
        name: "Claude Code",
        repository: "test-suite",
        status: "running",
        time: "running 1h 37m",
        durationSeconds: 5820,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 4,
        name: "Claude Code",
        repository: "checkout-refactor",
        status: "running",
        time: "running 2h 15m",
        durationSeconds: 8100,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 5,
        name: "OpenCode",
        repository: "pr-review-1842",
        status: "queued",
        time: "waiting 4 min",
        durationSeconds: 240,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 6,
        name: "Codex",
        repository: "nightly-qa",
        status: "succeeded",
        time: "succeeded 2 hr ago",
        durationSeconds: 7200,
        createdAt: getRandomDate().toISOString()
    },
    {
        id: 7,
        name: "Claude Code",
        repository: "test-suite",
        status: "failed",
        time: "failed 3 hr ago",
        durationSeconds: 10800,
        createdAt: getRandomDate().toISOString()
    }
];

/**
 * Имитация эндпоинта бэкенда GET /api/runs
 * Возвращает Promise с задержкой в 500мс для реалистичности асинхронного запроса
 */
export const fetchAgentRuns = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockAgentsData);
        }, 500); // задержка сети
    });
};