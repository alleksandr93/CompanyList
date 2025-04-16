import style from './Navigation.module.scss'
import {Icon} from '@/common/components/Icon/Icon.tsx'
import {Link, NavLink} from 'react-router';
import {logOut, selectAuth} from '@/slice/appSlice.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

export const Navigation = () => {
    const auth =useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    const onclickHandler=()=>{
        dispatch(logOut())
    }
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.logoGroup}>
                    <Link to={'/'}>
                        <Icon iconId={'logo'} width={36} height={36} viewBox={'0 0 36 36'}/>
                    </Link>
                    <NavLink className={({isActive}) => isActive ? style.active : style.notActive} to={'navigation'}>
                        <Icon iconId={'menuButton'} width={36} height={36} viewBox={'0 0 36 36'}/>
                    </NavLink>
                    <NavLink to={'search'} className={({isActive}) => isActive ? style.active : style.notActive}>
                        <Icon iconId={'Deceased'} width={36} height={36} viewBox={'0 0 36 36'}/>
                    </NavLink>
                </div>
                <div className={style.logoGroup}>
                    <NavLink className={({isActive}) => isActive ? style.active : style.notActive} to={'settings'}>
                        <Icon iconId={'settings'} width={36} height={36} viewBox={'0 0 36 36'}/>
                    </NavLink>
                    {auth&&<NavLink onClick={onclickHandler} to={'login'} className={({isActive}) => isActive ? style.active : style.notActive}>
                        <Icon iconId={'exit'} width={36} height={36} viewBox={'0 0 36 36'}/>
                    </NavLink>}
                </div>

            </div>
        </>


    )
}
