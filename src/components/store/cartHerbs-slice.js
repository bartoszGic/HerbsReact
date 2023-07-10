import { createSlice } from '@reduxjs/toolkit'

const herbsSlice = createSlice({
    name: 'cart',
    initialState: {
        herbs: [],
        sumTotal: 0
    },
    reducers: {
        addToCart(state, action) {
            let updatedHerbs
            const existCartHerbIndex = state.herbs.findIndex(
                herb => herb.id + herb.weight === action.payload.id + action.payload.weight
            )
            const existCartHerb = state.herbs[existCartHerbIndex]
            let updatedHerb
            const updatedsumTotal = state.sumTotal + action.payload.price
            if (existCartHerb) {
                updatedHerb = {
                    ...existCartHerb,
                    counter: existCartHerb.counter + 1,
                }
                updatedHerbs = [...state.herbs]
                updatedHerbs[existCartHerbIndex] = updatedHerb
            } else {
                updatedHerbs = state.herbs.concat(action.payload)
            }
            state.herbs = updatedHerbs
            state.sumTotal = updatedsumTotal
        },
        removeFromCart(state, action) {
            let updatedHerbs
            const cartHerbId = action.payload
            const existCartHerbIndex = state.herbs.findIndex(
                herb => herb.id + herb.weight === cartHerbId + herb.weight
            )
            const existCartHerb = state.herbs[existCartHerbIndex]
            const updatedsumTotal = state.sumTotal - existCartHerb.price
            if (existCartHerb.counter === 1) {
                updatedHerbs = state.herbs.filter(herb => herb.id !== cartHerbId)
            }
            else {
                const updatedHerb = {
                    ...existCartHerb,
                    counter: existCartHerb.counter - 1
                }
                updatedHerbs = [...state.herbs]
                updatedHerbs[existCartHerbIndex] = updatedHerb
            }
            state.herbs = updatedHerbs
            state.sumTotal = updatedsumTotal
        },
        showDownloadedUserCart(state, action) {
            state.herbs = action.payload.herbs
            state.sumTotal = action.payload.sumTotal
        },
        setEmptyCart(state) {
            state.herbs = []
            state.sumTotal = 0
        }
    }
})

export const cartHerbsActions = herbsSlice.actions
export default herbsSlice