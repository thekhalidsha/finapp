import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    // { id: 1, name: 'Item 1', amount: 100, type: 'Expense' },
    // { id: 2, name: 'Item 2', amount: 200, type: 'Income' },
];


const financeReducer = createSlice({
    name: 'finance',
    initialState,
    reducers: {
        addData: (state, action) => { state.push(action.payload) },
        updateData: (state, action) => {
            const index = state.findIndex(item => item.id == action.payload.id);
            if (index !== -1) {
                state[index] = action.payload
            }
        },
        delData: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        eraseAll: (state) => {
            return state = []
        },
        importData: (state, action) => {
            return state = action.payload
        }
    }
});

export const { addData, updateData, delData, eraseAll, importData } = financeReducer.actions

export default financeReducer.reducer

