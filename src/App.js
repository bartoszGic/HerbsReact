import Cart from "./components/Cart/Cart";
import { useState } from "react";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/Search/SearchInput";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import UserPanel from "./components/User/UserPanel";
import { useSelector } from "react-redux";


function App() {
  // console.log('App');
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [userPanel, setUserPanel] = useState(false)

  const modalContent = useSelector(state => state.modalContent.panel)
  const userState = useSelector(state => state.modalContent.logState)
  // console.log(modalContent);

  const toggleUserToolsHandler = () => {
    setUserPanel(prevState => !prevState)
    search && setSearch(false)
    cart && setCart(false)
  }
  const toggleCartHandler = () => {
    setCart(prevState => !prevState)
    search && setSearch(false)
    userPanel && setUserPanel(false)
  }
  const toggleSearchInputHandler = () => {
    setSearch(prevState => !prevState)
    cart && setCart(false)
    userPanel && setUserPanel(false)
  }

  return (
    <>
      {(userPanel && !userState && modalContent === 'login') &&
        <SignIn onToggleUserToolsHandler={toggleUserToolsHandler} />}
      {(userPanel && !userState && modalContent === 'register') &&
        <SignUp onToggleUserToolsHandler={toggleUserToolsHandler} />}
      {(userPanel && userState) &&
        <UserPanel onToggleUserToolsHandler={toggleUserToolsHandler} />}
      {cart &&
        < Cart
          onToggleCartHandler={toggleCartHandler} onOrderIfLogged={toggleUserToolsHandler} />}
      {search &&
        <SearchInput
          onToggleSearchInputHandler={toggleSearchInputHandler}
        />}
      <Header
        onToggleUserToolsHandler={toggleUserToolsHandler}
        onToggleSearchInputHandler={toggleSearchInputHandler}
        onToggleCartHandler={toggleCartHandler}
      />
      <main className="flex justify-center w-full">
        <HerbsList />
      </main>
    </>
  );
}

export default App;
