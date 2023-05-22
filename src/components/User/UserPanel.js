import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";


const UserPanel = (props) => {
    console.log('UserPanel');
    let nick
    let email

    if (auth.currentUser !== null) {
        nick = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@'))
        email = auth.currentUser.email
    }
    console.log(auth.currentUser);
    const logOutHandler = async () => {
        try {
            await signOut(auth)
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteAcountHandler = () => {
        console.log('delete');
    }
    return (
        <div className="flex flex-col">
            <div className="text-center font-medium text-xl mb-4">User Panel</div>
            <div>
                <div className="flex">
                    <div>Nick:</div>
                    <div>{nick}</div>
                </div>
                <div className="flex">
                    <div>E-mail:</div>
                    <div>{email}</div>
                </div>
            </div>
            <button onClick={logOutHandler} className="flex w-full bg-[#B81426] text-gray-50 justify-center rounded-xl  px-3 py-1 mt-6 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn">Log out</button>
            <button onClick={deleteAcountHandler} className="text-[#B81426] font-bold text-sm p-1 mx-auto transition duration-100 hover:opacity-90 active:animate-animeBtn">Delete acount</button>
        </div>
    )
}
export default UserPanel