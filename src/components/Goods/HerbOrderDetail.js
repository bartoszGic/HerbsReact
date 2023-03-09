import { useRef } from 'react'

const HerbOrderDetail = (props) => {

    const refWeight = useRef(null)


    const changeValueHandl = (e) => {
        props.onWeightChange(e.target.value)
    }
    const addHandl = () => {
        const weight = refWeight.current.value;
        const weightNum = +weight
        props.onAdd(weightNum)
    }
    return (
        <div className='flex justify-end'>
            <select className='text-slate-500 mr-4 text-lg'
                name="amount"
                id="amount"
                ref={refWeight}
                onChange={changeValueHandl}>
                <option value="10">10g</option>
                <option value="50">50g</option>
                <option value="100">100g</option>
            </select>
            <button className='bg-[#B81426] text-gray-50 rounded-2xl px-3 py-1 transition duration-100 hover:opacity-90'
                onClick={addHandl}>Add</button>
        </div>
    )
}
export default HerbOrderDetail