import {BlockInfo} from '@/common/components/Profile/BlocksInfo/BlockInfo/BlockInfo.tsx';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectCompany, updateOrganizationTC} from '@/slice/conpanySlice.ts';
import {validationDate} from '@/common/utils/validationDate.ts';
import {validationOfTypes} from '@/common/utils/validationOfTypes.ts';
import {EditBlock} from '@/common/components/Profile/BlocksInfo/EditBlock/EditBlock.tsx';
import {useState} from 'react';
import type {UpdateType} from '@/type/type.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';

type Props = {
    id: string,
}

export const CompanyBlock = ({id}: Props) => {
    const [editBlock, setEditBlock] = useState<boolean>(false);
    const company = useAppSelector(selectCompany)[id];
    const dispatch = useAppDispatch();
    const data = {
        data1: [company.contract.no || 'No data', validationDate(company.contract.issue_date) || 'No data'],
        data2: company.businessEntity || ['No data'],
        data3: validationOfTypes(company.type) || ['No data'],
    }
    company.businessEntity
    const changeCompany = (obj: UpdateType) => {
        dispatch(updateOrganizationTC({id: company.id, data: obj}))
        setEditBlock(false)
    }
    return (
        <>
            {!editBlock && <BlockInfo data={data} type={'Company'} onClick={() => setEditBlock(true)}/>}
            {editBlock &&
                <EditBlock type={'Company'} company={company} onClose={() => setEditBlock(false)} onSaveCompany={changeCompany}/>}
        </>
    );
};
