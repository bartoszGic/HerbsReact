import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    herbs: [],
    sumTotal: 0
}

const herbsSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            let updatedHerbs
            const newCartHerb = action.payload
            const existCartHerbIndex = state.herbs.findIndex(
                herb => herb.id + herb.weight === newCartHerb.id + newCartHerb.weight
            )
            const existCartHerb = state.herbs[existCartHerbIndex]
            let updatedHerb
            const updatedsumTotal = state.sumTotal + newCartHerb.price
            if (existCartHerb) {
                updatedHerb = {
                    ...existCartHerb,
                    counter: existCartHerb.counter + 1,
                }
                updatedHerbs = [...state.herbs]
                updatedHerbs[existCartHerbIndex] = updatedHerb
            } else {
                updatedHerbs = state.herbs.concat(newCartHerb)
            }
            return {
                herbs: updatedHerbs,
                sumTotal: updatedsumTotal,
            }
        },
        removeFromCart(state, action) {
        }
    }
})

export const herbsActions = herbsSlice.actions
export default herbsSlice