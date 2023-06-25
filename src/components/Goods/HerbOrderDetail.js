import { useRef } from 'react'

const HerbOrderDetail = (props) => {

    const refWeight = useRef(null)

    const changeWeightHandl = (e) => {
        props.onWeightChange(e.target.value)
    }
    const addHandl = () => {
        const weight = refWeight.current.value;
        const weightNum = +weight
        props.onAdd(weightNum)
    }
    return (
        <div className='col-start-3 col-span-3'>
            <div className='grid grid-cols-3'>
                <select className='col-span-1 text-slate-500 text-md border-none cursor-pointer'
                    name="amount"
                    id="amount"
                    ref={refWeight}
                    onChange={changeWeightHandl}>
                    <option value="10">10g</option>
                    <option value="50">50g</option>
                    <option value="100">100g</option>
                </select>
                <div className='col-span-2 text-right'>
                    <button className='bg-[#B81426] text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                        onClick={addHandl}>Add</button>
                </div>
            </div>
        </div>
    )
}
export default HerbOrderDetail