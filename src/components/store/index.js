import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

import herbsSlice from './cartHerbs-slice'
import storeHerbsSlice from './storedHerbs-slice'
import storeSearchInputSlice from './storeInput-slice'
import modalsStatesSlice from './modalsStates-slice'

const store = configureStore({
    reducer: {
        cartHerbs: herbsSlice.reducer,
        searchHerbs: storeHerbsSlice.reducer,
        inputValue: storeSearchInputSlice.reducer,
        modalContent: modalsStatesSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store