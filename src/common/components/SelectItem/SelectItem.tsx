import { useState, useRef, useEffect } from 'react';
import styles from './SelectItem.module.scss';
import { formatOption } from '@/common/utils/formatOption.ts';
import { Icon } from '@/common/components/Icon/Icon.tsx';
import Checkbox from '@mui/material/Checkbox';
import {validationOfTypes} from '@/common/utils/validationOfTypes.ts';


type CustomSelectProps = {
    options: string[];
    value?: string[];
    onChange?: (value: string[]) => void;
    multiple?: boolean;

};

export const SelectItem = ({
                               options,
                               value = [],
                               onChange,
                               multiple = false,

                           }: CustomSelectProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(value);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        let newValues;
        if (selectedValues.includes(option)) {
            newValues = selectedValues.filter(v => v !== option);
        } else {
            newValues = [...selectedValues, option];
        }
        setSelectedValues(newValues);
        onChange?.(newValues);
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={`${styles.selectContainer} ${isOpen ? styles.open : ''}`}
                onClick={handleSelectClick}
            >
                {multiple ? (
                    <div className={`${styles.selectedValues} ${selectedValues.length > 2 ? styles.selectedValues2 :''}`}>
                        { validationOfTypes(selectedValues)}
                    </div>
                ) : (
                    <select
                        className={styles.select}
                        value={selectedValues[0] || ''}
                        onChange={(e) => {
                            setSelectedValues([e.target.value]);
                            onChange?.([e.target.value]);
                        }}
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}

                <div className={`${styles.selectArrow} ${isOpen ? styles.rotated : ''}`}>
                    <Icon iconId={'Arrow'} />
                </div>

                {isOpen && multiple  && (
                    <div className={styles.dropdown}>
                        {options.map((option) => (
                            <div key={option} className={styles.option}>
                                <Checkbox
                                    checked={selectedValues.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                <span>{formatOption(option)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};