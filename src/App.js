import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./components/store/CartProvider";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/UI/SearchInput";

function App() {
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)

  const showCartHandler = () => {
    setCart(true)
  }
  const hideCartHandler = () => {
    setCart(false)
  }
  const showSearchInputHandler = () => {
    setSearch(true)
    console.log(search);
  }
  const hideSearchInputHandler = () => {
    setSearch(false)
  }

  return (
    <CartProvider>
      {cart && <Cart onHideCart={hideCartHandler} />}
      {search && <SearchInput onHideSearchInput={hideSearchInputHandler} />}
      <Header onShowCart={showCartHandler} onShowSearchInput={showSearchInputHandler} />
      <main className="flex justify-center w-full">
        <HerbsList />
      </main>
    </CartProvider>
  );
}

export default App;
