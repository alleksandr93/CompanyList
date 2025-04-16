import { type SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts';
import { useNavigate } from 'react-router';
import { useAppSelector } from '@/common/hooks/useAppSelector.ts';
import { selectAuth, setAuth } from '@/slice/appSlice.ts';
import { useEffect } from 'react';
import { fetchProductsTC } from '@/slice/conpanySlice.ts';
import style from './Login.module.scss'; // Предполагается, что у вас есть CSS-модуль

export type Inputs = {
    email: string;
    password: string;
};

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector(selectAuth);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '' } });

    const onSubmit: SubmitHandler<Inputs> = _ => {
        dispatch(setAuth(true))
            .then(() => {
                dispatch(fetchProductsTC('12'));
            })
            .finally(() => reset());
    };

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, [auth]);

    return (
        <div className={style.loginContainer}>
            <div className={style.loginForm}>
                <div className={style.formHeader}>
                    <p>
                        <strong>Email:</strong> free@free.com
                    </p>
                    <p>
                        <strong>Password:</strong> free
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={style.formGroup}>
                    <div className={style.formField}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Incorrect email address',
                                },
                            })}
                            className={errors.email ? style.errorInput : ''}
                        />
                        {errors.email && <span className={style.errorMessage}>{errors.email.message}</span>}
                    </div>

                    <div className={style.formField}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 3,
                                    message: 'Password must be at least 3 characters',
                                },
                            })}
                            className={errors.password ? style.errorInput : ''}
                        />
                        {errors.password && <span className={style.errorMessage}>{errors.password.message}</span>}
                    </div>

                    <button type="submit" className={style.submitButton}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};