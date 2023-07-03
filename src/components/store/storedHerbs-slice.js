import { createSlice } from "@reduxjs/toolkit";

const storeHerbsSlice = createSlice({
    name: 'store',
    initialState: {
        storeHerbs: [],
        filterHerbs: []
    },
    reducers: {
        loadDownloadedHerbs(state, action) {
            const allHerbs = action.payload
            state.storeHerbs = allHerbs
            state.filterHerbs = allHerbs
        },
        searchInDownloadedHerbs(state, action) {
            const searchedInputValue = action.payload
            if (searchedInputValue.trim() === '') {
                return {
                    storeHerbs: state.storeHerbs,
                    filterHerbs: state.storeHerbs
                }
            } else {
                const filtredHerbs = state.storeHerbs.filter(herb => herb.name.toLowerCase().includes(searchedInputValue.toString().toLowerCase()))
                return {
                    storeHerbs: state.storeHerbs,
                    filterHerbs: filtredHerbs
                }
            }
        },
        setFavoritesHerbs(state, action) {
            state.filterHerbs = action.payload
        }
    }
})
export const storeHerbsActions = storeHerbsSlice.actions
export default storeHerbsSlice