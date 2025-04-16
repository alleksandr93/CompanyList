import style from './App.module.scss';
import {Navigation} from '@/common/components/Navigation/Navigation.tsx';
import {Routing} from '@/common/components/Routing/Routing.tsx';
import {useEffect} from 'react';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {CircularProgress, LinearProgress} from '@mui/material';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectAuth, selectStatus, setAuth, setStatus} from '@/slice/appSlice.ts';
import {useNavigate} from 'react-router';
import {Login} from '@/common/components/Login/Login.tsx';


export const App = () => {
    const status = useAppSelector(selectStatus)
    const auth = useAppSelector(selectAuth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(auth);
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            navigate('/login')
            dispatch(setStatus('succeeded'))
        } else {
            dispatch(setStatus('idle'))
            dispatch(setAuth(true))
        }

    }, [dispatch]);

    if (status === 'idle') {
        return <div className={style.progress}>
            <CircularProgress size={150} thickness={3}/>
        </div>
    }
    if (!auth) {
        return <Login/>
    }
    return (
        <>
            {status === 'loading' && <LinearProgress/>}
            <div className={style.wrapper}>
                <Navigation/>
                <Routing/>
            </div>
        </>

    );
};