import {BlockInfo} from '@/common/components/Profile/BlocksInfo/BlockInfo/BlockInfo.tsx';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {changeContact, selectContact} from '@/slice/contantSlice.ts';
import {formattedNumber} from '@/common/utils/formattedNumber.ts';
import {useState} from 'react';
import {EditBlock} from '@/common/components/Profile/BlocksInfo/EditBlock/EditBlock.tsx';
import type {UpdateContactType} from '@/type/type.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';


type Props = {
    id: string
}


export const ContactBlock = ({id}: Props) => {
    const [editBlock, setEditBlock] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const contact = useAppSelector(selectContact)[id]

    const data = {
        data1: [contact?.firstname || 'No data', contact?.lastname || 'No data'],
        data2: [formattedNumber(contact?.phone) || 'No data'],
        data3: [contact?.email || 'No data'],
    }
    const updateContact = (contact: UpdateContactType) => {
        dispatch(changeContact({id, contact}))
        setEditBlock(false)
    }
    return (
        <>
            {!editBlock && <BlockInfo type={'Contact'} onClick={() => setEditBlock(true)} data={data}/>}
            {editBlock && <EditBlock onSaveContact={updateContact} onClose={() => setEditBlock(false)} type={'Contacts'}
                                     contact={data}/>}
        </>
    );
};

