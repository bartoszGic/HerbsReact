import { configureStore } from '@reduxjs/toolkit'

import herbsSlice from './cartHerbs-slice'
import storeHerbsSlice from './storedHerbs-slice'
import storeSearchInputSlice from './storeInput-slice'
import modalsStatesSlice from './modalsStates-slice'
import favoritesSlice from './favorites-slice'

const store = configureStore({
    reducer: {
        cartHerbs: herbsSlice.reducer,
        searchHerbs: storeHerbsSlice.reducer,
        inputValue: storeSearchInputSlice.reducer,
        modalContent: modalsStatesSlice.reducer,
        favorites: favoritesSlice.reducer
    }
})

export default store