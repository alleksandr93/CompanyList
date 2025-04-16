import style from './WindowNavigation.module.scss'
import {Button} from '@/common/components/Button/Button.tsx';
import {Outlet} from 'react-router';

export const WindowNavigation = () => {
    return (
        <div className={style.navigation}>
            <div className={style.wrapper}>
                <div className={style.titleGroup}>
                    <h3 className={style.title}>Oak Tree Cemetery</h3>
                    <p className={style.text}>Process Manager</p>
                </div>
                <div className={style.BTNGroup}>
                    <Button to={'organizations'} iconId={'company'} type={'Window'}>Organizations</Button>
                    <Button iconId={'Contractor'} to={'contractors'} type={'Window'}>Contractors</Button>
                    <Button iconId={'Account'} to={'clients'} type={'Window'}>Clients</Button>
                </div>
                <footer className={style.footer}>
                    <p className={style.smallText}>All Funeral Services © 2015-2025</p>
                </footer>
            </div>
          <Outlet/>
        </div>

    );
};

