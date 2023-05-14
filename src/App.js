import Cart from "./components/Cart/Cart";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/Search/SearchInput";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";

import { db } from "./firebase-config";
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch } from "react-redux";
import { storeHerbsActions } from "./components/store/storedHerbs-slice";

function App() {
  // console.log('App');
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [user, setUser] = useState(false)

  const [loadingState, setLoadingState] = useState(true)
  const [httpsError, setHttpsError] = useState(false)
  const dispatch = useDispatch()


  const toggleUserToolsHandler = () => {
    setUser(prevState => !prevState)
  }
  const toggleCartHandler = () => {
    setCart(prevState => !prevState)
  }
  const toggleSearchInputHandler = () => {
    setSearch(prevState => !prevState)
  }
  useEffect(() => {
    // console.log('App-useEffect');
    const fetchHerbs = async () => {
      try {
        const loadedHerbs = []
        const herbsCollectionRef = collection(db, 'herbs')
        const herbsDocs = await getDocs(herbsCollectionRef)
        herbsDocs.forEach((doc) => {
          loadedHerbs.push({
            id: doc.id,
            key: doc.id,
            name: doc.data().name,
            price1: doc.data().price1,
            price2: doc.data().price2,
            price3: doc.data().price3,
            img: doc.data().img
          })
        })
        dispatch(storeHerbsActions.loadDownloadedHerbs(loadedHerbs))
      }
      catch (error) {
        setHttpsError(true)
        console.error(error)
      }
    }
    fetchHerbs()
    setLoadingState(false)
  }, [dispatch])



  if (loadingState) {
    return (
      <div className="flex justify-center text-xl mt-[48px]">
        <p>Loading goods...</p>
      </div>
    )
  }
  if (httpsError) {
    return (
      <div className="flex justify-center text-xl mt-[48px]">
        <p>Server error !!!</p>
      </div>
    )
  }
  return (
    <>
      {user &&
        <div>
          <SignUp onHideUserTools={toggleUserToolsHandler} />
          <SignIn onHideUserTools={toggleUserToolsHandler} />
        </div>
      }
      {cart &&
        <Cart
          onHideCart={toggleCartHandler} />}
      {search &&
        <SearchInput
          onHideSearchInput={toggleSearchInputHandler}
        />}
      <Header
        onShowUserSignInUp={toggleUserToolsHandler}
        onShowCart={toggleCartHandler}
        onShowSearchInput={toggleSearchInputHandler}
      />
      <main className="flex justify-center w-full">
        <HerbsList />
      </main>
    </>
  );
}

export default App;
