import { useState, useEffect } from 'react'
import { cartHerbsActions } from '../store/cartHerbs-slice'
import { useDispatch } from 'react-redux'
import { favoritesActions } from '../store/favorites-slice'
import HerbActions from './HerbActions'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useRef } from 'react'

const Herb = (props) => {
    const [price, setPrice] = useState(props.price1)
    const [reviewsNumber, setReviewsNumber] = useState(0)
    const [ratingAverage, setRatingAverage] = useState(0)
    const [showDescription, setShowDescription] = useState(false)
    const refOne = useRef(false)

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

    const toggleDescription = () => {
        setShowDescription(state => !state)
    }

    const clickCatch = (e) => {
        refOne.current.contains(e.target) && setShowDescription(true)
        !refOne.current.contains(e.target) && setShowDescription(false)
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
    const countAverage = (inputArray, numOfReviews) => {
        const sum = inputArray.reduce((rate, review) => rate + review.rate, 0)
        const average = sum / numOfReviews
        if (average % 1 === 0) {
            return average
        } else {
            return average.toFixed(1)
        }
    }

    useEffect(() => {
        const fetchReviewsNumber = async () => {
            try {
                const docRef = doc(db, 'herbsReviews', props.name)
                const docSnap = await getDoc(docRef);
                const reviewsArray = docSnap.data().reviews
                setReviewsNumber(reviewsArray.length)
                setRatingAverage(countAverage(reviewsArray, reviewsNumber))
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviewsNumber()
    }, [props, reviewsNumber, ratingAverage])

    useEffect(() => {
        document.addEventListener('click', clickCatch)
    }, [])

    return (
        <div key={props.id} className='py-2'>
            <div onClick={toggleDescription} ref={refOne} className="relative aspect-h-1 aspect-w-1 h-44 w-80 overflow-hidden cursor-pointer transition duration-200 hover:opacity-90 lg:aspect-none sm:h-40 sm:w-72 lg:w-full lg:h-full">
                {showDescription &&
                    <div className="absolute flex items-center bg-transparent h-full w-full p-4 text-xs text-gray-700 font-medium text-justify object-cover object-center cursor-default lg:h-full lg:w-full bg-white bg-opacity-80">{props.description}
                    </div>}
                <img
                    src={props.img}
                    alt={props.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full border border-slate-100"
                />
            </div>
            <div className='grid grid-cols-5 px-2'>
                <div className='flex flex-col justify-between col-span-2 mt-4'>
                    <h3 className="text-gray-700">{props.name}</h3>
                    <p className="text-lg font-medium text-gray-900">{price} zł</p>
                </div>
                <HerbActions
                    onAddToCart={addToCartHandler}
                    onWeightChange={changeWeightHandl}
                    onAddToFavorites={addToFavoritesHandler}
                    onRemoveFromFavorites={removeFromFavoritesHandler}
                    herbName={props.name}
                    toggleReviews={props.toggleReviews}
                    reviewsNumber={reviewsNumber}
                    ratingAverage={ratingAverage} />
            </div>
        </div>
    )
}
export default Herb