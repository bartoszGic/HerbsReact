import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        likes: []
    },
    reducers: {
        addToFavorites(state, action) {
            const likedHerb = action.payload.name
            !state.likes.includes(likedHerb) && state.likes.push(likedHerb)
        },
        removeFromFavorites(state, action) {
            const unlikedHerb = action.payload.name
            state.likes.includes(unlikedHerb) && state.likes.splice(state.likes.indexOf(unlikedHerb), 1)
        },
        showDownloadedUserFavorites(state, action) {
            state.likes = action.payload.likes
        },
        setEmptyFavorites(state) {
            state.likes = []
        }
    }
})
export const favoritesActions = favoritesSlice.actions
export default favoritesSlice