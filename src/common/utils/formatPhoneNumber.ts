export const formatPhoneNumber = (input: string): string => {
    // Удаляем все нецифровые символы, кроме плюса в начале
    let numbers = input.replace(/[^\d+]/g, '');

    // Если номер начинается не с +, добавляем +
    if (!numbers.startsWith('+')) {
        numbers = '+' + numbers.replace(/\D/g, '');
    }

    // Ограничиваем максимальную длину (1 код страны + 10 цифр номера)
    numbers = numbers.slice(0, 12);

    // Форматируем по шаблону +X XXX XXX XXXX
    const parts = [];
    parts.push(numbers.slice(0, 2)); // +1
    if (numbers.length > 2) parts.push(numbers.slice(2, 5)); // 702
    if (numbers.length > 5) parts.push(numbers.slice(5, 8)); // 555
    if (numbers.length > 8) parts.push(numbers.slice(8, 12)); // 2345

    return parts.join(' ');
};