import { createSlice } from "@reduxjs/toolkit";

const modalsStatesSlice = createSlice({
    name: 'modals',
    initialState: {
        panel: 'login',
        logState: false
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
        },
        trueLogState(state) {
            state.logState = true
        },
        falseLogState(state) {
            state.logState = false
        }
    }
})
export const modalsStatesActions = modalsStatesSlice.actions
export default modalsStatesSlice