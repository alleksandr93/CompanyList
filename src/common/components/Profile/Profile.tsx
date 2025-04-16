import style from './Profile.module.scss';
import {ProfileTitle} from '@/common/components/Profile/ProfileTitle/ProfileTitle.tsx';
import {PhotoBlock} from '@/common/components/Profile/PhotoBlock/PhotoBlock.tsx';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {CircularProgress} from '@mui/material';
import {selectCompany} from '@/slice/conpanySlice.ts';
import {selectStatus} from '@/slice/appSlice.ts';
import {BlocksInfo} from '@/common/components/Profile/BlocksInfo/BlocksInfo.tsx';
import {useState} from 'react';
import {AddPhoto} from '@/common/components/Profile/BlocksInfo/AddPhoto/AddPhoto.tsx';

type PropsType = {
    id: string;
}
export const Profile = ({id}: PropsType) => {
    const [editPhotoBlock, setEditPhotoBlock] = useState<boolean>(false);
    const company = useAppSelector(selectCompany)[id];
    const status = useAppSelector(selectStatus);
    if (!company) {
        return <div className={style.loadingData}>
            {status === 'loading' && <CircularProgress size={150} thickness={3}/>}
            <p>No data available</p>
        </div>;
    }


    return (
        <>
            <div className={style.wrapper}>
                <ProfileTitle company={company} title={company.name || 'No name'}/>
                <BlocksInfo idCompany={id} idContact={company.contactId}/>
                <PhotoBlock onClick={()=>setEditPhotoBlock(true)} productId={id} photo={company.photos || []}/>
                {editPhotoBlock && < AddPhoto  onClick={()=>setEditPhotoBlock(false)} id={id} edit={editPhotoBlock}/>}
            </div>
        </>
    );
};