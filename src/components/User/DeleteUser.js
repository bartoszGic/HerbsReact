import { useState } from "react"
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth"
import { auth } from "../../firebase-config"

const DeleteUser = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)

    const user = auth.currentUser
    const userName = user.email.substring(0, user.email.indexOf('@'))

    const deleteUserHandler = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            await deleteUser(user)
            props.onClick()
        }
        catch (error) {
            console.error(error)
            if (error.code === 'auth/user-not-found') {
                setEmailError('User not found')
                setPasswordError('')
            } else if (error.code === 'auth/wrong-password') {
                setPasswordError('Invalid password')
            } else if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email')
            }
        }
    }

    return (
        <div className="flex flex-col">
            <div className="text-center font-medium text-xl mb-4"><span>{userName}</span> please, confirm details to delete account</div>
            <form className="flex flex-col items-center" onSubmit={deleteUserHandler}>
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
                <div className="text-center text-[#B81426]">{emailError}</div>
                <div className="flex flex-col w-full">
                    <label htmlFor="passwordIn" className="mb-1">Password</label>
                    <input className="border py-2 px-3 mb-2 text-gray-700 leading-tight rounded-xl"
                        type="password"
                        id='passwordIn'
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="text-center text-[#B81426]">{passwordError}</div>
                <button className='flex w-full bg-[#B81426] text-gray-50 justify-center rounded-xl  px-3 py-1 mt-6 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn'>Delete account</button>
            </form>
        </div>
    )
}
export default DeleteUser