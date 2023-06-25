import { createSlice } from "@reduxjs/toolkit";

const storeSearchInputSlice = createSlice({
    name: 'searchInput',
    initialState: {
        inputValue: ''
    },
    reducers: {
        loadInputValue(state, action) {
            state.inputValue = action.payload
        }
    }
})
export const storeSearchInputActions = storeSearchInputSlice.actions
export default storeSearchInputSlice