import type {AppType, RequestStatus} from '@/type/type.ts';
import {appAPI} from '@/api/appAPI.ts';
import {createAppSlice} from '@/common/utils/createAppSlice.ts';
import {clearAllCompanies, fetchCompanies} from '@/slice/companiesSlice.tsx';
import {clearAllCompany} from '@/slice/conpanySlice.ts';
import {clearAllContats} from '@/slice/contantSlice.ts';


export const appSlice = createAppSlice({
    name: 'app',
    initialState: {
        error: null,
        auth: false,
        status: 'idle' as RequestStatus,
        companyList:['12']
    } as AppType,
    reducers: (create) => ({
        setAuth: create.asyncThunk(
            async (_: boolean,{dispatch}) => {
                const authToken = localStorage.getItem('authToken');
                try {
                    if (!authToken) {
                        await appAPI.auth()
                    }
                    dispatch(fetchCompanies())
                    return {auth: true}
                } catch (error) {
                    dispatch(setStatus('failed'))
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) state.auth = action.payload.auth
                }
            }
        ),
        logOut: create.asyncThunk(
            async (_,{dispatch})=>{
                try {
                    localStorage.removeItem('authToken')
                    await dispatch(clearAllCompanies())
                    await dispatch(clearAllCompany())
                    await dispatch(clearAllContats())
                    return {auth:false}
                }catch (error) {
                    console.log(error)
                }
            },
            {
                fulfilled:(state, action)=>{
                    if(action.payload){
                        state.auth=action.payload.auth
                    }
                }
            }
        ),
        setStatus: create.asyncThunk(
            async (status:RequestStatus)=>{
                return {status}
            },
            {
                fulfilled:(state, action)=>{
                    if(action.payload) state.status= action.payload.status
                }
            }
        ),

    }),
    selectors: {
        selectAuth: state => state.auth,
        selectStatus: state => state.status
    }
})
export const {setAuth,setStatus,logOut} = appSlice.actions;
export const appReducer = appSlice.reducer
export const {selectAuth,selectStatus} = appSlice.selectors