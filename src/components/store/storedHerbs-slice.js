import { createSlice } from "@reduxjs/toolkit";

const storeHerbsSlice = createSlice({
    name: 'store',
    initialState: {
        storeHerbs: []
    },
    reducers: {
        loadDownloadedHerbs(action) {
            return {
                storeHerbs: action.payload
            }
        },
        searchInDownloadedHerbs(state, action) {
            let searchedHerbs
            return {
                storeHerbs: searchedHerbs
            }
        }
    }
})
export const storeHerbsActions = storeHerbsSlice.actions
export default storeHerbsSlice