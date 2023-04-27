// import { useEffect, useState } from "react"
// const FetchGoods = () => {
//     const [loadedHerbsList, setLoadedHerbsList] = useState([])
//     const [filtredHerbsList, setFiltredHerbList] = useState([])
//     const [loadingState, setLoadingState] = useState(true)
//     const [httpsError, setHttpsError] = useState(false)
//     useEffect(() => {
//         const fetchHerbs = async () => {
//             const loadedHerbs = []
//             try {
//                 const herbsCollectionRef = collection(db, 'herbs')
//                 const herbsDocs = await getDocs(herbsCollectionRef)
//                 herbsDocs.forEach((doc) => {
//                     loadedHerbs.push({
//                         id: doc.id,
//                         key: doc.id,
//                         name: doc.data().name,
//                         price1: doc.data().price1,
//                         price2: doc.data().price2,
//                         price3: doc.data().price3,
//                         img: doc.data().img
//                     })
//                 })
//             }
//             catch {
//                 setHttpsError(true)
//                 console.error('Server error !!!')
//             }
//             setLoadedHerbsList(loadedHerbs)
//             setFiltredHerbList(loadedHerbs)
//         }
//         fetchHerbs()
//         setLoadingState(false)
//     }, [])
//     if (loadingState) {
//         return (
//             <div className="flex justify-center text-xl mt-[48px]">
//                 <p>Loading goods...</p>
//             </div>
//         )
//     }
//     if (httpsError) {
//         return (
//             <div className="flex justify-center text-xl mt-[48px]">
//                 <p>Server error !!!</p>
//             </div>
//         )
//     }
//     return {

//     }
// }
// export default FetchGoods