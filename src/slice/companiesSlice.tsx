import {createAppSlice} from '@/common/utils/createAppSlice.ts';
import {appAPI} from '@/api/appAPI.ts';
import { fetchProductsTC} from '@/slice/conpanySlice.ts';
import {setStatus} from '@/slice/appSlice.ts';

export const companiesSlice = createAppSlice({
    name: 'companies',
    initialState: [] as string[],
    reducers: (create) => ({
        fetchCompanies: create.asyncThunk(
            async (_, {dispatch}) => {
                try {
                    dispatch(setStatus('idle'))
                    const res = await appAPI.getCompanyList()
                    dispatch(fetchProductsTC(res as string))
                    dispatch(setStatus('succeeded'))
                    return {id: res}
                } catch (error) {
                    dispatch(setStatus('failed'))
                    console.error('Ошибка при загрузке данных:', error);
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) state.push(action.payload.id as string)
                }
            }
        ),
        clearAllCompanies: create.asyncThunk(
            async ()=>{
                return true
            },
            {
                fulfilled:(_, action)=>{
                    if(action.payload){
                        return []
                    }
                }
            }
        )
    }),
    selectors: {
        selectCompanies:state=>state
    }
})
export const {fetchCompanies,clearAllCompanies} = companiesSlice.actions;
export const companiesReducer = companiesSlice.reducer
export const {selectCompanies} = companiesSlice.selectors