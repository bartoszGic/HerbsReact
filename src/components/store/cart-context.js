import React from 'react'

const CartContext = React.createContext({
    herbs: [],
    sumAmount: 0,
    addHerb: (herb) => { },
    removeHerb: (id) => { }
})
export default CartContext