import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./components/store/CartProvider";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/UI/SearchInput";
import HERBS from "./herbsDatas/herbsDatas";

function App() {
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [herbsAreFiltred, setHerbsAreFiltred] = useState(false)
  const [herbsList, setHerbsList] = useState(HERBS)

  const showCartHandler = () => {
    setCart(true)
  }
  const hideCartHandler = () => {
    setCart(false)
  }
  const showSearchInputHandler = () => {
    setSearch(true)
  }
  const hideSearchInputHandler = () => {
    setSearch(false)
  }
  const actualHerbList = (filtredData) => {
    setHerbsList(filtredData)
  }
  const onColorHandler = () => {
    setHerbsAreFiltred(true)
  }

  return (
    <CartProvider>
      {cart && <Cart onHideCart={hideCartHandler} />}
      {search && <SearchInput onHideSearchInput={hideSearchInputHandler} actualHerbList={actualHerbList} onOnColorHandler={onColorHandler} />}
      <Header onShowCart={showCartHandler} onShowSearchInput={showSearchInputHandler} colorOfLoupe={herbsAreFiltred} />
      <main className="flex justify-center w-full">
        <HerbsList filtredHerbsList={herbsList} />
      </main>
    </CartProvider>
  );
}

export default App;
