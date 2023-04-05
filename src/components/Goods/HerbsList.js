import Herb from './Herb'


const HerbsList = (props) => {
    let herbsToBuy

    if (props.downloadedList === props.filtredList) {
        herbsToBuy = props.downloadedList
    } else {
        herbsToBuy = props.filtredList
    }

    return (
        <section className='flex pt-[48px] justify-center w-full max-w-4xl'>
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
                )}
            </ul>
        </section >
    )
}
export default HerbsList