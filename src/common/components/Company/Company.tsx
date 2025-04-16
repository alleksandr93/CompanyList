import {Button} from '@/common/components/Button/Button.tsx';
import {Profile} from '@/common/components/Profile/Profile.tsx';
import style from './Company.module.scss';
import {useNavigate} from 'react-router';


export const Company = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/navigation/organizations');
    }
    return (
        <div className={style.wrapper}>
            <Button onClick={handleClick} iconId={'Chevron'} type={'Icon'} />
            <Profile id={'12'}/>
        </div>
    );
};

