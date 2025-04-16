import type {ReactNode} from 'react';
import {Icon} from '@/common/components/Icon/Icon.tsx';
import {NavLink} from 'react-router';
import style from './Button.module.scss';

type ButtonsType = 'Filled' | 'Outline' | 'Flattened' | 'Window' | 'Icon' | 'PhotoDelete' | 'Modal'
type PropsType = {
    children?: ReactNode
    type?: ButtonsType
    iconId?: string
    to?: string
    onClick?: () => void
    disabled?: boolean
    left?: boolean
}
export const Button = ({children, type, iconId, to, onClick, disabled, left}: PropsType) => {
    if (type === 'Window') {
        return (
            <NavLink
                to={to || ''}
                className={({isActive}) =>
                    isActive
                        ? `${style.window} ${style.active}`
                        : `${style.window} ${style.notActive}`
                }
            >
                {iconId && <Icon iconId={iconId}/>}
                <span>{children}</span>
            </NavLink>


        )
    }
    else if (type === 'Icon') {
        const onClickHandler = () => {
            onClick && onClick();
        }
        return <button onClick={onClickHandler} disabled={disabled} className={style.iconEdit}>
            {iconId && <Icon viewBox={'0 0 32 32'} height={32} width={32} iconId={iconId}/>}
        </button>
    }
    else if (type === 'Flattened') {
        return <button onClick={() => onClick && onClick()} disabled={disabled} className={style.flattened}>
            {iconId && <Icon iconId={iconId}/>}
            <span>{children}</span>
        </button>
    } else if (type === 'PhotoDelete') {
        const onClickHandler = () => {
            if (onClick) onClick();
        }
        return <div className={style.photoDelete}>
            <button disabled={disabled} onClick={onClickHandler} className={style.photoDeleteButton}>
                {iconId && <Icon iconId={iconId}/>}
            </button>
        </div>

    } else if (type === 'Modal') {
        const onClickHandler = () => {
            if (onClick) onClick();
        }
        return (
            <button onClick={onClickHandler} className={`${style.modal} ${left ? style.left : ''}`}>
                <span>{children}</span>
            </button>
        )
    }
};

