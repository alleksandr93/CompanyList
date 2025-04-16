import {appAPI} from '@/api/appAPI.ts';
import {createAppSlice} from '@/common/utils/createAppSlice.ts';
import type {ContactType, UpdateContactType} from '@/type/type.ts';
import {setStatus} from '@/slice/appSlice.ts';


export const contactSlice = createAppSlice({
    name: 'contact',
    initialState: {} as ContactType,
    reducers: (create) => ({
        fetchContactByIdTC: create.asyncThunk(
            async (id: string, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    const res = await appAPI.getContactById(id)
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
                        state[action.payload.id] = action.payload.data
                    }

                }
            }
        ),
        changeContact: create.asyncThunk(
            async (payload: { id: string, contact: UpdateContactType }, {dispatch}) => {
                try {
                    dispatch(setStatus('loading'))
                    const res = await appAPI.changeContact(payload.id, payload.contact)
                    console.log(res.data)
                    dispatch(setStatus('succeeded'))
                    return {id: payload.id, data: res.data}
                } catch (error) {
                    dispatch(setStatus('failed'))
                    console.error('Ошибка при загрузке данных:', error);
                }
            },
            {
                fulfilled: (state, action) => {
                    if (action.payload) {
                       state[action.payload.id]= action.payload.data
                    }
                }
            }
        ),
        clearAllContats: create.asyncThunk(
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
        selectContact: state => state
    }
})

export const {fetchContactByIdTC, changeContact,clearAllContats} = contactSlice.actions;
export const contactReducer = contactSlice.reducer
export const {selectContact} = contactSlice.selectors