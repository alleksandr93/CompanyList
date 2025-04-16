import style from './BlockInfo.module.scss'
import {Button} from '@/common/components/Button/Button.tsx';

type Props = {
    type: 'Company' | 'Contact'
    onClick: () => void;
    data: {
        data1: string[]
        data2: string[] | string
        data3: string[] | string
    }

}
export const BlockInfo = ({type, onClick, data}: Props) => {
    if (type === 'Company') {
        return (
            <div className={style.wrapper}>
                <div className={style.titleGroup}>
                    <div className={style.title}>{'Company Details'}</div>
                    <Button onClick={() => onClick()} iconId={'EditFlattened'} type={'Flattened'}>Edit</Button>
                </div>
                <div className={style.textInfo}>
                    <div className={style.textGroup}>
                        <p className={style.text}>{'Agreement:'}</p>
                        <p className={style.text}>{'Business entity:'}</p>
                        <p className={style.text}>{'Company type:'}</p>
                    </div>
                    <div className={style.textMainGroup}>
                        <div className={style.textMainData}>
                            <p className={style.textMain}>{data.data1[0]}</p>
                            <div className={style.border}>/</div>
                            <p className={style.textMain}>{data.data1[1]}</p>
                        </div>
                        <p className={style.textMain}>{Array.isArray(data.data2)
                            ? data.data2.map(el => <span key={el}>{el}</span>)
                            : data.data2}</p>
                        <p className={style.textMain}>{Array.isArray(data.data3)
                            ? data.data3.map((el, i) => <span key={i}>{el} </span>)
                            : data.data3}</p>
                    </div>
                </div>
            </div>
        )
    } else if (type === 'Contact') {
        return (
            <div className={style.wrapper}>
                <div className={style.titleGroup}>
                    <div className={style.title}>{'Contacts'}</div>
                    <Button onClick={() => onClick()} iconId={'EditFlattened'} type={'Flattened'}>Edit</Button>
                </div>
                <div className={style.textInfo}>
                    <div className={style.textGroup}>
                        <p className={style.text}>{'Responsible person:'}</p>
                        <p className={style.text}>{'Phone number:'}</p>
                        <p className={style.text}>{'E-mail:'}</p>
                    </div>
                    <div className={style.textMainGroup}>
                        <div className={style.textMainData}>
                            <p className={style.textMain}>{`${data.data1[0]} ${data.data1[1]}`}</p>
                        </div>
                        <p className={style.textMain}>{data.data2}</p>
                        <p className={style.textMain}>{typeof data.data3 === 'string' ? data.data3 : data.data3.map((el, i) =>
                            <span key={i}>{el}</span>)}</p>
                    </div>
                </div>
            </div>
        )
    }
};
