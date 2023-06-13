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
            return {
                herbs: updatedHerbs,
                sumTotal: updatedsumTotal,
            }
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
            return {
                herbs: updatedHerbs,
                sumTotal: updatedsumTotal,
            }
        },
        showDownloadedUserCart(state, action) {
            const sumsTotal = action.payload.map((herb) => {
                const typeOfHerbsPrices = [herb.price * herb.counter].reduce((a, b) => a + b, 0)
                return typeOfHerbsPrices
            })
            const updatedsumTotal = sumsTotal.reduce((a, b) => a + b, 0)
            return {
                herbs: action.payload,
                sumTotal: updatedsumTotal
            }
        }
    }
})

export const herbsActions = herbsSlice.actions
export default herbsSlice