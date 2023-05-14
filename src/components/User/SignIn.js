import { useState } from "react"
import Modalzzzz from "../UI/Modalzzzz"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase-config"
const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signInHandler = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            console.log(user);
        }
        catch (error) {
            console.error(error)
        }

    }

    return (
        <Modalzzzz onClick={props.onHideUserTools}>
            <div className="flex flex-col">
                <div className="text-center font-medium text-xl mb-4">Sign In</div>
                <form className="flex flex-col items-center" onSubmit={signInHandler}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="emailIn" className="mb-1">E-mail</label>
                        <input className="border py-2 px-3 mb-2 text-gray-700 leading-tight rounded-xl"
                            type="text"
                            id='emailIn'
                            placeholder="E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="passwordIn" className="mb-1">Password</label>
                        <input className="border py-2 px-3 mb-8 text-gray-700 leading-tight rounded-xl"
                            type="password"
                            id='passwordIn'
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className='flex w-full bg-teal-500 text-gray-50 justify-center rounded-xl  px-3 py-1 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Sign In</button>
                </form>
                <div className="text-right text-gray-700">Don' t have acount ? <span className="text-[#B81426] font-bold">Sign Up</span></div>
            </div>
        </Modalzzzz>
    )
}
export default SignIn