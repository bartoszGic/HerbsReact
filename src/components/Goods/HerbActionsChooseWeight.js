import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

const HerbActionsChooseWeight = (props) => {
    const [showList, setShowList] = useState(false)
    const refOne = useRef(null)

    const toggleList = () => {
        setShowList(state => !state)
    }

    const choseWeightHandler = (value) => {
        props.onChoseWeightHandler(value)
        setShowList(false)
    }

    const outsideClickCatch = (e) => {
        (refOne.current && !refOne.current.contains(e.target)) && setShowList(false)
    }

    useEffect(() => {
        props.onWeightChange(props.weight)
        setShowList(false)
    }, [props.weight, props])

    useEffect(() => {
        document.addEventListener('click', outsideClickCatch)
    }, [])

    return (
        <div className='w-full cursor-pointer text-slate-500 z-10' ref={refOne}>
            <div className='flex items-center justify-between' onClick={toggleList}>
                {props.weight}g
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
    )
}
export default HerbActionsChooseWeight