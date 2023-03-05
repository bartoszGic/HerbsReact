

const CartHerb = (props) => {
    const price = props.price.toFixed(2)
    return (
        <li>
            <p>{props.name}</p>
            <p>{`${props.weight}g x ${props.counter}`}</p>
            <p>{`${price * props.counter} zł`}</p>
            <div>
                <button onClick={props.onAdd}>+</button>
                <button onClick={props.onRemove}>-</button>
            </div>
        </li>
    )
}
export default CartHerb