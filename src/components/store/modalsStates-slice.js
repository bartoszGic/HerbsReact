import { createSlice } from "@reduxjs/toolkit";

const modalsStatesSlice = createSlice({
    name: 'modals',
    initialState: {
        panel: 'login',
        logState: false,
        uploadPermition: false,
        reviewedHerb: null
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
        uploadPermition(state) {
            state.uploadPermition = true
        },
        noUploadPermition(state) {
            state.uploadPermition = false
        },
        setReviewedHerb(state, action) {
            state.reviewedHerb = action.payload
        }
    }
})
export const modalsStatesActions = modalsStatesSlice.actions
export default modalsStatesSlice