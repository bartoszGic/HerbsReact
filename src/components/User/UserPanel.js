import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import Modal from "../UI/Modal";
import { useDispatch } from "react-redux";
import { modalsStatesActions } from "../store/modalsStates-slice";
import DeleteUser from "./DeleteUser";
import { useState } from "react";

const UserPanel = (props) => {
    // console.log('UserPanel');
    const [deleteUserPanel, setDeleteUserPanel] = useState(false)
    const dispatch = useDispatch()
    const user = auth.currentUser
    let nick
    let email

    if (user !== null) {
        nick = user.email.substring(0, user.email.indexOf('@'))
        email = user.email
    } else {
        console.log(user);
    }

    const logOutHandler = async () => {
        try {
            await signOut(auth)
            dispatch(modalsStatesActions.falseLogState())
        }
        catch (error) {
            console.log(error);
        }
    }
    const deleteAccountPanel = () => {
        setDeleteUserPanel(true)
    }
    if (deleteUserPanel) {
        return (
            <DeleteUser onClick={props.onToggleUserToolsHandler} />
        )
    }
    return (
        <Modal onClick={props.onToggleUserToolsHandler}>
            <div className="flex flex-col">
                <div className="text-center font-medium text-xl mb-4">Hello {`${nick}`}</div>
                <div>
                    <div className="flex">
                        <div>E-mail:</div>
                        <div>{email}</div>
                    </div>
                </div>
                <button onClick={logOutHandler} className="flex w-full bg-[#B81426] text-gray-50 justify-center rounded-xl  px-3 py-1 mt-6 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn">Log out</button>
                <button onClick={deleteAccountPanel} className="text-[#B81426] font-bold text-sm p-1 mx-auto transition duration-100 hover:opacity-90 active:animate-animeBtn">Delete account</button>
            </div>
        </Modal>
    )
}
export default UserPanel