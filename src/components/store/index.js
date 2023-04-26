import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import herbsSlice from './herbs-slice'

const store = configureStore({
    reducer: { cartHerbs: herbsSlice.reducer },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store