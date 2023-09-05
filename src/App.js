import Cart from "./components/Cart/Cart";
import { useState } from "react";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/Search/SearchInput";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import UserPanel from "./components/User/UserPanel";
import Reviews from "./components/Reviews/Reviews";
import { useSelector } from "react-redux";
import Footer from "./components/Header/Footer";

function App() {
  // console.log('App');
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [userPanel, setUserPanel] = useState(false)
  const [reviews, setReviews] = useState(false)

  const modalContent = useSelector(state => state.modalContent.panel)
  const userState = useSelector(state => state.modalContent.logState)

  const toggleUserToolsHandler = () => {
    setUserPanel(prevState => !prevState)
    setSearch(false)
    setCart(false)
    setReviews(false)
  }
  const toggleCartHandler = () => {
    setCart(prevState => !prevState)
    setSearch(false)
    setUserPanel(false)
    setReviews(false)
  }
  const toggleSearchInputHandler = () => {
    setSearch(prevState => !prevState)
    setCart(false)
    setUserPanel(false)
    setReviews(false)
  }
  const toggleReviewsHandler = () => {
    setReviews(prevState => !prevState)
    setSearch(false)
    setCart(false)
    setUserPanel(false)
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
      {reviews &&
        <Reviews
          onToggleReviewsHandler={toggleReviewsHandler}
          onToggleUserToolsHandler={toggleUserToolsHandler}
        />}
      <Header
        onToggleUserToolsHandler={toggleUserToolsHandler}
        onToggleSearchInputHandler={toggleSearchInputHandler}
        onToggleCartHandler={toggleCartHandler}
      />
      <main className="flex justify-center w-full">
        <HerbsList
          onToggleReviewsHandler={toggleReviewsHandler} />
      </main>
      <Footer />
    </>
  );
}

export default App;
