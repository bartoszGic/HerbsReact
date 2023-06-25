import { createSlice } from "@reduxjs/toolkit";

const modalsStatesSlice = createSlice({
    name: 'modals',
    initialState: {
        panel: 'login',
        logState: false,
        downloadPermition: false
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
        trueLogState(state) {
            state.logState = true
        },
        falseLogState(state) {
            state.logState = false
        },
        uploadCart(state) {
            state.downloadPermition = true
        },
        noUploadCart(state) {
            state.downloadPermition = false
        }
    }
})
export const modalsStatesActions = modalsStatesSlice.actions
export default modalsStatesSlice