export const validationOfTypes = (data: string[] | undefined) => {
    // 1. Заменяем подчёркивания на пробелы
    const withSpaces = data?.map(item => item.replace(/_/g, ' '));

    // 2. Добавляем запятые ко всем элементам
    const withCommas = withSpaces?.map(item => item + ',');

    // 3. Удаляем запятую у последнего элемента
    if (withCommas&&withCommas.length > 0) {
        const lastIndex = withCommas.length - 1;
        withCommas[lastIndex] = withCommas[lastIndex].replace(',', '');
    }
    return withCommas;
}