import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./components/store/CartProvider";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'

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
      <main className="flex justify-center w-full">
        <HerbsList />
      </main>
    </CartProvider>
  );
}

export default App;
