import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectCompanies} from '@/slice/companiesSlice.tsx';
import {selectCompany} from '@/slice/conpanySlice.ts';
import style from './Organizations.module.scss'
import {useNavigate} from 'react-router';

export const Organizations = () => {
    const companies = useAppSelector(selectCompanies)
    const company = useAppSelector(selectCompany)
    const navigate = useNavigate();
    const handleCompanyClick = (companyId: string) => {
        navigate(`/navigation/organizations/${companyId}`); // Переходим на новый маршрут
    };
    // Проверка наличия данных перед рендерингом
    if (!companies || !company || companies.length === 0) {
        return (
            <div className={style.wrapper}>
                <h3>Company List:</h3>
                <p>No companies available</p>
            </div>
        );
    }

    return (
        <div className={style.wrapper}>
            <h3>Company List:</h3>
            {companies.map(el => {
                const currentCompany = company[el];
                // Проверка наличия конкретной компании
                if (!currentCompany) {
                    return <button key={el} disabled>Company data not loaded</button>;
                }
                return <button key={el}
                               onClick={() => handleCompanyClick(el)}> {currentCompany.name || 'No name available'}</button>
            })}
        </div>
    );
};

