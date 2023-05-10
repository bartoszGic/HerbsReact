import { createSlice } from "@reduxjs/toolkit";

const storeSearchInputSlice = createSlice({
    name: 'searchInput',
    initialState: {
        inputValue: ''
    },
    reducers: {
        loadInputValue(state, action) {
            const inputValue = action.payload
            state.inputValue = inputValue
            console.log(state);
        }
    }
})
export const storeSearchInputActions = storeSearchInputSlice.actions
export default storeSearchInputSlice