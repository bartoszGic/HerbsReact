import HerbOrderDetail from './HerbOrderDetail'
import { useState } from 'react'
import { herbsActions } from '../store/cartHerbs-slice'
import { useDispatch } from 'react-redux'

const Herb = (props) => {
    const [price, setPrice] = useState(props.price1)
    const counter = 1
    const dispatch = useDispatch()

    const changeWeightHandl = (weight) => {
        if (weight === '10') {
            setPrice(props.price1)
        } else if (weight === '50') {
            setPrice(props.price2)
        } else if (weight === '100') {
            setPrice(props.price3)
        }

    }

    const addToCartHandl = (weight) => {
        dispatch(herbsActions.addToCart({
            id: props.id + weight,
            name: props.name,
            weight: weight,
            counter: counter,
            price: price,
            img: props.img
        }));
    }

    return (
        <li className='grid grid-cols-2 p-3'>
            <img className='w-40 h-28' src={props.img} alt={props.name} />
            <div className='flex flex-col justify-between'>
                <div className='text-right'>
                    <div className='font-bold text-lg text-gray-900'>{props.name}</div>
                    <div className='text-slate-600 mt-1 font-bold'>{`${price.toFixed(2)} `}<span className='text-sm font-semibold'>zł</span></div>
                </div>
                <HerbOrderDetail onAdd={addToCartHandl} onWeightChange={changeWeightHandl} />
            </div>
        </li>
    )
}
export default Herb