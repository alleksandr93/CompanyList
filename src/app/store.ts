import {configureStore} from '@reduxjs/toolkit'
import {companyReducer, companySlice} from '@/slice/conpanySlice.ts';
import {appReducer, appSlice} from '@/slice/appSlice.ts';
import {contactReducer, contactSlice} from '@/slice/contantSlice.ts';
import {companiesReducer, companiesSlice} from '@/slice/companiesSlice.tsx';


// создание store
export const store = configureStore({
    reducer: {
        [companySlice.name]: companyReducer,
        [appSlice.name]: appReducer,
        [contactSlice.name]: contactReducer,
        [companiesSlice.name]:companiesReducer
    },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store