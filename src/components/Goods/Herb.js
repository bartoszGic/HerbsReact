import { useState } from 'react'
import { cartHerbsActions } from '../store/cartHerbs-slice'
import { useDispatch } from 'react-redux'
import { favoritesActions } from '../store/favorites-slice'
import HerbActions from './HerbActions'


const Herb = (props) => {
    // console.log('Herb');
    const [price, setPrice] = useState(props.price1)
    const counter = 1
    const dispatch = useDispatch()

    const changeWeightHandl = (weight) => {
        if (weight === 10) {
            setPrice(props.price1)
        } else if (weight === 50) {
            setPrice(props.price2)
        } else if (weight === 100) {
            setPrice(props.price3)
        }
    }

    const addToCartHandler = (weight) => {
        dispatch(cartHerbsActions.addToCart({
            id: props.id + weight,
            name: props.name,
            weight: weight,
            counter: counter,
            price: price,
            img: props.img
        }));
    }
    const addToFavoritesHandler = () => {
        dispatch(favoritesActions.addToFavorites({
            name: props.name
        }))
    }
    const removeFromFavoritesHandler = () => {
        dispatch(favoritesActions.removeFromFavorites({
            name: props.name
        }))
    }

    return (
        <div key={props.id}>
            <div className="relative aspect-h-1 aspect-w-1 h-44 w-80 overflow-hidden lg:aspect-none transition duration-100 sm:h-40 sm:w-72 lg:w-full lg:h-full">
                <div className="absolute flex items-center bg-transparent h-full w-full p-4 text-xs text-gray-700 font-medium text-justify object-cover object-center cursor-default lg:h-full lg:w-full transition duration-100 opacity-0 hover:opacity-100 hover:bg-white hover:bg-opacity-80">{props.description}
                </div>
                <img
                    src={props.img}
                    alt={props.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className='grid grid-cols-5 px-2 mt-2'>
                <div className='flex flex-col justify-between col-span-2'>
                    <h3 className="text-gray-700">{props.name}</h3>
                    <p className="text-lg font-medium text-gray-900">{price} zł</p>
                </div>
                <HerbActions
                    onAddToCart={addToCartHandler}
                    onWeightChange={changeWeightHandl}
                    onAddToFavorites={addToFavoritesHandler}
                    onRemoveFromFavorites={removeFromFavoritesHandler}
                    herbName={props.name}
                    toggleReviews={props.toggleReviews} />
            </div>
        </div>
    )
}
export default Herb