import Goods from "./components/Goods/Goods";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./components/store/CartProvider";

function App() {
  const [cart, setCart] = useState(false)

  const showCartHandl = () => {
    setCart(true)
  }
  const hideCartHandl = () => {
    setCart(false)
  }

  return (
    <CartProvider>
      {cart && <Cart onHideCart={hideCartHandl} />}
      <Header onShowCart={showCartHandl} />
      <Goods />
    </CartProvider>
  );
}

export default App;
