import CartContext from "./cart-context";
import { useReducer } from "react";

const cartDefaultState = {
    herbs: [],
    sumAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedHerbs = state.herbs.concat(action.herb)
        const updatedSumAmount = state.sumAmount + action.herb.price * action.herb.amount
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