export const validationDate = (dateItem: string) => {
    if (dateItem) {
        const date = new Date(dateItem)
        const day = String(date.getDate()).padStart(2, '0'); // "12"
        const month = String(date.getMonth() + 1).padStart(2, '0'); // "03" (месяцы 0-11)
        const year = date.getFullYear(); // "2024"
        return `${month}.${day}.${year}`;
    } else {
        return dateItem
    }

}