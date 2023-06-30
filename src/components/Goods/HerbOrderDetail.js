import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const HerbOrderDetail = (props) => {
    // console.log('HerbOrderDetail');
    const [weight, setWeight] = useState(10)
    const [showList, setShowList] = useState(false)
    const refOne = useRef(null)

    const toggleListHandler = () => {
        setShowList(state => !state)
    }
    const addHandl = () => {
        props.onAdd(weight)
    }
    const outsideClickCatch = (e) => {
        if (!refOne.current.contains(e.target)) setShowList(false)
    }
    const choseWeightHandler = (value) => {
        setWeight(value)
        setShowList(false)
    }

    useEffect(() => {
        props.onWeightChange(weight)
        setShowList(false)
    }, [weight, props])

    useEffect(() => {
        document.addEventListener('click', outsideClickCatch)
    }, [])

    return (
        <div className='col-start-3 col-span-3'>
            <div className='grid grid-cols-3'>
                <div className='w-full cursor-pointer text-slate-500 z-10' ref={refOne}>
                    <div className='flex items-center justify-between' onClick={toggleListHandler}>
                        {weight}g
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <ul className={`absolute flex-col mt-1 transition bg-white p-1 rounded-md ${showList ? 'flex' : 'hidden'}`}>
                        <li value="10" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>10g</li>
                        <li value="50" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>50g</li>
                        <li value="100" className='transition duration-100 hover:text-black' onClick={(e) => choseWeightHandler(e.target.value)}>100g</li>
                    </ul>
                </div>
                <div className='col-span-2 text-right'>
                    <button className='bg-[#B81426] text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                        onClick={addHandl}>Add</button>
                </div>
            </div>
        </div>
    )
}
export default HerbOrderDetail