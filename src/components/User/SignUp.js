import { useEffect, useState } from "react"
import Modal from "../UI/Modal"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"
const SignUp = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const signUpHandler = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
        }
        catch (error) {
            console.error(error)
        }

    }
    useEffect(() => {
        console.log(user);
    }, [user])

    return (
        <Modal onClick={props.onHideUserTools}>
            <div className="flex flex-col">
                <div className="text-center font-medium text-xl mb-4">Sign Up</div>
                <form className="flex flex-col items-center" onSubmit={signUpHandler}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="emailUp" className="mb-1">E-mail</label>
                        <input className="border py-2 px-3 mb-2 text-gray-700 leading-tight rounded-xl"
                            type="text"
                            id='emailUp'
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="passwordUp" className="mb-1">Password</label>
                        <input className="border py-2 px-3 mb-8 text-gray-700 leading-tight rounded-xl"
                            type="password"
                            id='passwordUp'
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className='flex w-full bg-[#B81426] text-gray-50 justify-center rounded-xl  px-3 py-1 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Sign Up</button>
                </form>
                <div className="text-right text-gray-700">Already have acount ? <span className="text-teal-500 font-bold">Sign In</span></div>
            </div>
        </Modal>
    )
}
export default SignUp