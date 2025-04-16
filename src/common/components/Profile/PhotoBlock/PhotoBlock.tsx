import style from './PhotoBlock.module.scss'
import {Button} from '@/common/components/Button/Button.tsx';

import type {Photo} from '@/type/type.ts';
import {deleteProductsImageTC} from '@/slice/conpanySlice.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectStatus} from '@/slice/appSlice.ts';

type PropsType = {
    productId: string;
    photo: Photo[],
    onClick:()=>void,
}
export const PhotoBlock = ({photo, productId,onClick}: PropsType) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus)
    const deleteImage = (name: string) => {
        dispatch(deleteProductsImageTC({id:productId, name}))
    }
    return (
        <div className={style.wrapper}>
            <div className={style.titleGroup}>
                <h3 className={style.title}>Photos</h3>
                <Button onClick={()=>onClick()}  iconId={'Add Photo'} type={'Flattened'}>Add</Button>
            </div>

            <div className={style.photoGroup}>
                {!photo ? <p>Not Photo</p> : photo.map((photo) => {
                    return (
                        <div key={photo.name}>
                            <img  src={photo.filepath} alt={photo.name}/>
                            <Button disabled={status==='loading'} onClick={() => deleteImage(photo.name)} iconId={'Trash'} type={'PhotoDelete'}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

