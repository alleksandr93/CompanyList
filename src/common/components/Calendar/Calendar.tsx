import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Calendar.module.scss';
import { useState } from 'react';

type Props = {
    selected: Date|string;
    onChange: (dateString: string) => void;
};

export const Calendar = ({  selected, onChange }: Props) => {
    const [startDate, setStartDate] = useState<Date | null|string>(selected || null);

    const handleChange = (date: Date | null) => {
        if (date) {
            // Преобразуем дату в UTC и форматируем в ISO-строку без времени (или с 00:00:00)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // Формат: `YYYY-MM-DDT00:00:00Z` (UTC)
            const isoDateString = `${year}-${month}-${day}T00:00:00Z`;

            onChange(isoDateString); // Передаем строку, а не Date
            setStartDate(date);
        }
    };

    return (
        <div className={styles.datePickerWrapper}>
            <DatePicker
                selected={startDate as Date}
                onChange={handleChange}
                dateFormat="MM.dd.yyyy"
                className={styles.input}
            />
        </div>
    );
};