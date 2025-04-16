import {Route, Routes} from 'react-router';
import {WindowNavigation} from '@/common/components/WindowNavigation/WindowNavigation.tsx';
import {Organizations} from '@/common/components/Organizations/Organizations.tsx';
import {Main} from '@/common/components/Main/Main.tsx';
import {Login} from '@/common/components/Login/Login.tsx';
import {Company} from '@/common/components/Company/Company.tsx';
import {InDevelopment} from '@/common/components/InDevelopment/InDevelopment.tsx';



export const Routing = () => {
    return (
        <Routes>
            <Route path={'navigation'} element={<WindowNavigation />} >
                <Route path={'organizations'} element={<Organizations />} />
                <Route path={'organizations/:companyId'} element={<Company />} />
                <Route path={'contractors'} element={<InDevelopment />} />
                <Route path={'clients'} element={<InDevelopment />} />
                <Route path={'login'} element={<Login />} />
            </Route>
            <Route path={'login'} element={<Login />} />
            <Route path={'/'} element={<Main />} />
            <Route path={'/search'} element={<InDevelopment />} />
            <Route path={'/settings'} element={<InDevelopment />} />
        </Routes>
    );
};
