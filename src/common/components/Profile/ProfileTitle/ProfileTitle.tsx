import style from './ProfileTitle.module.scss'
import {Button} from '@/common/components/Button/Button.tsx';
import {useState} from 'react';
import {Modal} from '@/common/components/Modal/Modal.tsx';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {deleteCompanyTC, updateOrganizationTC} from '@/slice/conpanySlice.ts';
import type {ModalType, Organization} from '@/type/type.ts';

type PropsType = {
    title: string,
    company: Organization
}

export const ProfileTitle = ({title, company}: PropsType) => {

    const [modal, setModal] = useState(false)
    const [typeModal, setTypeModal] = useState<null | ModalType>(null)
    const dispatch = useAppDispatch();

    const setModalType = (type: ModalType) => {
        if (type === 'Remove') {
            setModal(true)
            setTypeModal(type)
        }
        if (type === 'Edit') {
            setModal(true)
            setTypeModal(type)
        }
    }
    const removeCompanyHandler = () => {
        setModal(false)
        dispatch(deleteCompanyTC(company.id))
        setTypeModal(null)
    }
    const closeModal = (modal: boolean) => {
        setModal(modal)
        setTypeModal(null)
    }
    const saveTitleHandler = (title: string) => {
        setModal(false)
        dispatch(updateOrganizationTC({id:company.id,data:{name:title}}))
        setTypeModal(null)
    }
    return (
        <div className={style.wrapper}>
            <h4 className={style.title}>{title}</h4>
            <div className={style.btnWrapper}>
                <Button onClick={() => setModalType('Edit')} iconId={'Edit'} type={'Icon'}/>
                <Button onClick={() => setModalType('Remove')} iconId={'TrashRed'} type={'Icon'}/>
                <Modal oldTitle={title} onSave={saveTitleHandler} onRemove={removeCompanyHandler} type={typeModal} onClose={closeModal}
                       modal={modal}/>
            </div>
        </div>
    );
};

