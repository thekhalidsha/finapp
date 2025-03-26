import { configureStore } from "@reduxjs/toolkit";
import financeReducer from './reducers/financeReducer'

export const store = configureStore({
    reducer: {
        finance: financeReducer,
    }
})