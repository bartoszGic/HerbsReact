import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import herbsSlice from './cartHerbs-slice'
import storeHerbsSlice from './storedHerbs-slice'

const store = configureStore({
    reducer: {
        cartHerbs: herbsSlice.reducer,
        storeHerbs: storeHerbsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store