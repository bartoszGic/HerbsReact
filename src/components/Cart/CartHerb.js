

const CartHerb = (props) => {
    // console.log('CartHerb');
    const price = props.price.toFixed(2)
    return (
        <li className="grid grid-cols-6 text-gray-900 py-4">

            <img className="w-20 h-14 col-span-2" src={props.img} alt={props.name} />

            <div className="col-span-2 font-medium flex flex-col justify-between">
                <div className="pr-2">{props.name}</div>
                <div className="text-sm font-normal">{`${props.weight}g`}</div>
            </div>

            <div className="font-medium flex flex-col justify-between">
                <div>{props.counter}</div>
                <div className="text-sm font-medium">{`${price * props.counter} `}
                    <span className="text-sm font-normal">zł</span>
                </div>
            </div>

            <div className="flex flex-col justify-between items-center">

                <button className="w-6 text active:animate-animeBtn" onClick={props.onAdd}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>

                <button className="w-6 active:animate-animeBtn" onClick={props.onRemove}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>
            </div>
        </li>
    )
}
export default CartHerb