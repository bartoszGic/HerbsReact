import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalsStatesActions } from "../store/modalsStates-slice";
import DeleteUser from "./DeleteUser";
import { useEffect, useState } from "react";
import { herbsActions } from "../store/cartHerbs-slice";
import { favoritesActions } from "../store/favorites-slice";
import { storeHerbsActions } from "../store/storedHerbs-slice";

const UserPanel = (props) => {
    // console.log('UserPanel');
    const [deleteUserPanel, setDeleteUserPanel] = useState(false)
    const [disabledFavorites, setDisabledFavorites] = useState(true)
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)
    const favorites = useSelector(state => state.favorites)
    const dispatch = useDispatch()

    const email = auth.currentUser.email
    const nick = email.substring(0, email.indexOf('@'))

    const logOutHandler = async () => {
        try {
            await signOut(auth)
            dispatch(modalsStatesActions.falseLogState())
            dispatch(modalsStatesActions.noUploadPermition())
            dispatch(herbsActions.setEmptyCart())
            dispatch(favoritesActions.setEmptyFavorites())
        }
        catch (error) {
            console.log(error);
        }
    }
    const showUserFavorites = () => {
        const favoritesHerbsStored = allHerbs.filter(herb => favorites.likes.includes(herb.name))
        dispatch(storeHerbsActions.setFavoritesHerbs(favoritesHerbsStored))
        props.onToggleUserToolsHandler()
    }
    useEffect(() => {
        favorites.likes.length !== 0 && setDisabledFavorites(false)
    }, [favorites])

    if (deleteUserPanel) {
        return (
            <DeleteUser onClick={props.onToggleUserToolsHandler} />
        )
    }
    return (
        <Modal onClick={props.onToggleUserToolsHandler}>
            <div className="flex flex-col items-center">
                <div className="font-medium text-2xl mb-4">{`${nick}`}</div>
                <div className="grid grid-flow-row">
                    <div className="grid grid-flow-col mb-1 text-md text-gray-700 justify-center">
                        <div>{email}</div>
                    </div>
                    <div className="flex">
                        <button disabled={disabledFavorites} className={!disabledFavorites ? "bg-[#B81426]  text-gray-50 rounded-xl py-0.5 px-4 mt-2 transition duration-100 hover:opacity-90 active:animate-animeBtn" : "bg-gray-500   text-gray-50 rounded-xl py-0.5 px-4 mt-2"}
                            onClick={showUserFavorites}>Favorites</button>
                    </div>
                </div>
                <button onClick={logOutHandler} className="flex w-full bg-teal-500 text-gray-50 justify-center rounded-xl  px-3 py-1 mt-10 mb-4 transition duration-100 hover:opacity-90 active:animate-animeBtn">Log out</button>
                <button onClick={() => setDeleteUserPanel(true)} className="text-[#B81426] font-bold text-sm p-1 mx-auto transition duration-100 hover:opacity-90 active:animate-animeBtn">Delete account</button>
            </div>
        </Modal>
    )
}
export default UserPanel