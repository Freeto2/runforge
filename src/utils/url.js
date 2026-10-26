// Функция-помощник для чтения параметров из URL
export const getQueryParam = (param, defaultValue) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || defaultValue;
};