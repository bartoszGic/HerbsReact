import { createSlice } from "@reduxjs/toolkit";

const modalsStatesSlice = createSlice({
    name: 'modals',
    initialState: {
        panel: 'register'
    },
    reducers: {
        register(state) {
            state.panel = "register"
        },
        login(state) {
            state.panel = "login"
        },
        user(state) {
            state.panel = "user"
        },
        deleteUser(state) {
            state.panel = "deleteUser"
        }
    }
})
export const modalsStatesActions = modalsStatesSlice.actions
export default modalsStatesSlice