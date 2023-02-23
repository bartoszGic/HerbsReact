import CartContext from "./cart-context";
import { useReducer } from "react";

const cartDefaultState = {
    herbs: [],
    sumAmount: 0
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const updatedSumAmount = state.sumAmount + action.herb.price * action.herb.counter
        const existCartHerbIndex = state.herbs.findIndex(
            herb => herb.id === action.herb.id
        )
        const existCartHerb = state.herbs[existCartHerbIndex]
        let updatedHerbs
        if (existCartHerb) {
            let updatedHerb
            updatedHerb = {
                ...existCartHerb,
                counter: existCartHerb.counter + action.herb.counter
            }
            updatedHerbs = [...state.herbs]
            updatedHerbs[existCartHerbIndex] = updatedHerb
        } else {
            updatedHerbs = state.herbs.concat(action.herb)
        }

        return {
            herbs: updatedHerbs,
            sumAmount: updatedSumAmount
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
        sumAmount: state.sumAmount,
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