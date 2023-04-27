import Cart from "./components/Cart/Cart";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HerbsList from './components/Goods/HerbsList'
import SearchInput from "./components/Search/SearchInput";
import { db } from "./firebase-config";
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [cart, setCart] = useState(false)
  const [search, setSearch] = useState(false)
  const [loadedHerbsList, setLoadedHerbsList] = useState([])
  const [filtredHerbsList, setFiltredHerbList] = useState([])
  const [loadingState, setLoadingState] = useState(true)
  const [httpsError, setHttpsError] = useState(false)

  const toggleCartHandler = () => {
    setCart(prevState => !prevState)
  }
  const toggleSearchInputHandler = () => {
    setSearch(prevState => !prevState)
  }
  const filterListHandler = (filter) => {
    setFiltredHerbList(filter)
  }

  useEffect(() => {
    const fetchHerbs = async () => {
      const loadedHerbs = []
      try {
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
      }
      catch {
        setHttpsError(true)
        console.error('Server error !!!')
      }
      setLoadedHerbsList(loadedHerbs)
      setFiltredHerbList(loadedHerbs)
    }
    fetchHerbs()
    setLoadingState(false)
  }, [])


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
      {cart && <Cart onHideCart={toggleCartHandler} />}
      {search && <SearchInput
        onHideSearchInput={toggleSearchInputHandler}
        downloadedList={loadedHerbsList}
        onFilterListHandler={filterListHandler}
      />}
      <Header
        onShowCart={toggleCartHandler}
        onShowSearchInput={toggleSearchInputHandler} />
      <main className="flex justify-center w-full">
        <HerbsList downloadedList={loadedHerbsList} filtredList={filtredHerbsList} />
      </main>
    </>
  );
}

export default App;
