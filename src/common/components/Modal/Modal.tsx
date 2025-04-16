import styles from './Modal.module.scss';
import {Button} from '@/common/components/Button/Button.tsx';
import type {ModalType} from '@/type/type.ts';
import {type ChangeEvent, type KeyboardEvent, useState} from 'react';

type Props = {
    modal: boolean
    onClose: (modal: boolean) => void;
    onRemove: () => void;
    type: ModalType | null;
    onSave: (title: string) => void;
    oldTitle: string;
}
export const Modal = ({modal, onClose, type, onRemove, onSave, oldTitle}: Props) => {
    const [title, setTitle] = useState(oldTitle);
    const [error, setError] = useState<string | null>(null);
    const onSaveHandler = () => {
        if (title !== oldTitle && title.trim() !== '') {
            onSave(title);
        } else if (title.trim() === '') {
            setError('empty string')
            setTitle(oldTitle)
        } else if (title === oldTitle) {
            setError('the name is the same')
            setTitle(oldTitle)
        }

    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            setTitle(event.currentTarget.value)
        }
        setError(null)
    }
    const onClickCancelHandler = () => {
        onClose(false)
        setError(null)
    }
    const onKeyPressHandler=(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            onSaveHandler()
        }
    }
    if (type === 'Remove') {
        return (
            <div className={`${styles.modalOverlay} ${modal ? styles.active : ''}`}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h2>Remove the Organization?</h2>
                    </div>
                    <div className={styles.modalContent}>
                        <p>Are you sure you want to remove this Organozation?</p>
                    </div>
                    <div className={styles.modalFooter}>
                        <Button onClick={() => onClose(false)} type={'Modal'}>No</Button>
                        <Button onClick={() => onRemove()} left type={'Modal'}>Yes, remove</Button>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'Edit') {

        return (
            <div className={`${styles.modalOverlay} ${modal ? styles.active : ''}`}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h2>Specify the Organization's name</h2>
                    </div>
                    <div className={styles.modalContent}>
                        {error && <p className={styles.error}>{error}</p>}
                        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} autoFocus
                               className={`${styles.inputWin} ${error ? styles.inputError : ''}`} type="text"/>
                    </div>
                    <div className={styles.modalFooter}>
                        <Button onClick={onClickCancelHandler } type={'Modal'}>Cancel</Button>
                        <Button onClick={onSaveHandler} left type={'Modal'}>Save changes</Button>
                    </div>
                </div>
            </div>


        )
    }

}

