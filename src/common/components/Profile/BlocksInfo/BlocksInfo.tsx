import {CompanyBlock} from '@/common/components/Profile/BlocksInfo/CompanyBlog/CompanyBlock.tsx';
import {ContactBlock} from '@/common/components/Profile/BlocksInfo/ContactBlock/ContactBlock.tsx';


type Props = {
    idCompany:string;
    idContact:string;
}


export const BlocksInfo = ({idCompany,idContact}:Props) => {
    return (
        <>
            <CompanyBlock id={idCompany}/>
            <ContactBlock id={idContact}/>
        </>
    )

};

