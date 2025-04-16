import type {ProductType, UpdateType} from '@/type/type.ts';
import {appAPI} from '@/api/appAPI.ts';
import {createAppSlice} from '@/common/utils/createAppSlice.ts';
import {setStatus} from '@/slice/appSlice.ts';
import {fetchContactByIdTC} from '@/slice/contantSlice.ts';


export const companySlice = createAppSlice({
    name: 'products',
    initialState: {} as ProductType,
    reducers: (create) => ({
        fetchProductsTC: create.asyncThunk(
            async (id: string, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    const res = await appAPI.getOrganizationById(id)
                    dispatch(fetchContactByIdTC(res.data.contactId))
                    dispatch(setStatus('succeeded'))
                    return {id, data: res.data}
                } catch (error) {
                    dispatch(setStatus('failed'))
                    console.error('Ошибка при загрузке данных:', error);
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        if (typeof action.payload.data.businessEntity === 'string') {
                            const data = action.payload.data
                            data.businessEntity = [data.businessEntity as string]
                            state[action.payload.data.id] = data
                        } else {
                            state[action.payload.data.id] = action.payload.data
                        }

                    }

                }
            }
        ),
        deleteProductsImageTC: create.asyncThunk(
            async (payload: { id: string, name: string }, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    await appAPI.deleteProdutImage(payload)
                    dispatch(setStatus('succeeded'))
                    return payload
                } catch (error) {
                    dispatch(setStatus('failed'))
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        const index = state[action.payload.id].photos.findIndex(el => el.name === action.payload?.name)
                        if (index !== -1) state[action.payload.id].photos.splice(index, 1)
                    }

                }
            }
        ),
        deleteCompanyTC: create.asyncThunk(
            async (id: string, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    await appAPI.deleteCompanyId(id)
                    dispatch(setStatus('succeeded'))
                    return {id}
                } catch (error) {
                    dispatch(setStatus('failed'))
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        delete state[action.payload.id]
                    }
                }
            }
        ),
        updateOrganizationTC: create.asyncThunk(
            async (payload: { id: string, data: UpdateType }, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    const res = await appAPI.updateOrganization(payload.id, payload.data)
                    dispatch(setStatus('succeeded'))
                    return {company: res.data}
                } catch (error) {
                    dispatch(setStatus('failed'))
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        state[action.payload.company.id] = action.payload.company
                    }
                }
            }
        ),
        createImage: create.asyncThunk(
            async (payload: { id: string, file: File; title: string }, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    const res = await appAPI.addImage(payload.id, payload.file)
                    dispatch(setStatus('succeeded'))
                    return {id: payload.id, data: res.data}
                } catch (error) {
                    dispatch(setStatus('failed'))
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                        state[action.payload.id].photos.push(action.payload.data)
                    }
                }
            }
        ),
        clearAllCompany: create.asyncThunk(
            async ()=>{
                return true
            },
            {
                fulfilled:(_,action)=>{
                    if(action.payload){
                        return {}
                    }
                }
            }
        )
    }),

    selectors: {
        selectCompany: state => state
    }
})

export const {
    fetchProductsTC,
    deleteProductsImageTC,
    deleteCompanyTC,
    updateOrganizationTC,
    createImage,
    clearAllCompany
} = companySlice.actions;
export const companyReducer = companySlice.reducer
export const {selectCompany} = companySlice.selectors