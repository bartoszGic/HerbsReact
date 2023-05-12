import { useSelector } from 'react-redux'
import Herb from './Herb'


const HerbsList = () => {
    console.log('HerbsList');
    let herbsToBuy
    let errorMsg = false
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)
    const filtredHerbs = useSelector(state => state.searchHerbs.filterHerbs)
    const stateOfInput = useSelector(state => state.inputValue.inputValue)

    if (allHerbs.length === filtredHerbs.length) {
        herbsToBuy = allHerbs
    } else {
        herbsToBuy = filtredHerbs
    }
    if (filtredHerbs.length === 0 && stateOfInput !== '') {
        errorMsg = true
    }
    return (
        <section className='flex pt-[48px] justify-center w-full max-w-4xl'>
            {errorMsg
                ?
                <div className="text-[#B81426] pt-16 text-center text-2xl">Niema takiego towaru</div>
                :
                <ul className='grid grid-cols-1 gap-x-16 gap-y-6 mt-1 md:grid-cols-2 divide-y divide-gray-200'>
                    {herbsToBuy.map(herb =>
                        <Herb
                            key={herb.id}
                            id={herb.id}
                            name={herb.name}
                            price1={herb.price1}
                            price2={herb.price2}
                            price3={herb.price3}
                            img={herb.img}
                        />
                    )
                    }
                </ul>
            }
        </section >
    )
}
export default HerbsList