import CartContext from "./cart-context";
import { useReducer } from "react";

const cartDefaultState = {
    herbs: [],
    sumTotal: 0
}

const cartReducer = (state, action) => {
    let updatedHerbs
    if (action.type === 'ADD') {
        const existCartHerbIndex = state.herbs.findIndex(
            herb => herb.id + herb.weight === action.herb.id + herb.weight
        )
        const existCartHerb = state.herbs[existCartHerbIndex]
        let updatedHerb
        const updatedsumTotal = state.sumTotal + action.herb.price
        if (existCartHerb) {
            updatedHerb = {
                ...existCartHerb,
                counter: existCartHerb.counter + 1,
            }
            updatedHerbs = [...state.herbs]
            updatedHerbs[existCartHerbIndex] = updatedHerb
        } else {
            updatedHerbs = state.herbs.concat(action.herb)
        }
        return {
            herbs: updatedHerbs,
            sumTotal: updatedsumTotal,
        }
    }
    if (action.type === 'REMOVE') {
        console.log(state);
        const existCartHerbIndex = state.herbs.findIndex(
            herb => herb.id + herb.weight === action.id + herb.weight
        )
        const existCartHerb = state.herbs[existCartHerbIndex]
        const updatedsumTotal = state.sumTotal - existCartHerb.price
        if (existCartHerb.counter === 1) {
            updatedHerbs = state.herbs.filter(herb => herb.id !== action.id)
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
    }
    return cartDefaultState
}
const CartProvider = props => {
    const [state, dispatch] = useReducer(cartReducer, cartDefaultState)


    const addHerbToCartHandl = herb => {
        dispatch({ type: 'ADD', herb: herb })
    }
    const removeHerbFromCartHandl = id => {
        dispatch({ type: 'REMOVE', id: id })
    }
    const cartContext = {
        herbs: state.herbs,
        sumTotal: state.sumTotal,
        addHerb: addHerbToCartHandl,
        removeHerb: removeHerbFromCartHandl
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
export default CartProvider