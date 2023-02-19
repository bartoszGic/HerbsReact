import CartContext from "./cart-context";

const CartProvider = props => {
    const addHerbToCartHandl = herb => { }
    const removeHerbFromCartHandl = id => { }

    const cartContext = {
        herbs: [],
        sumAmount: 0,
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