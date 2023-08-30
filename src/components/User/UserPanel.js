import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { modalsStatesActions } from "../store/modalsStates-slice";
import DeleteUser from "./DeleteUser";
import { useEffect, useState } from "react";
import { cartHerbsActions } from "../store/cartHerbs-slice";
import { favoritesActions } from "../store/favorites-slice";
import { storeHerbsActions } from "../store/storedHerbs-slice";

const UserPanel = (props) => {
    const [deleteUserPanel, setDeleteUserPanel] = useState(false)
    const [disabledFavorites, setDisabledFavorites] = useState(true)
    const allHerbs = useSelector(state => state.searchHerbs.storeHerbs)
    const favorites = useSelector(state => state.favorites)
    const dispatch = useDispatch()

    let email
    let nick

    onAuthStateChanged(auth, (user) => {
        if (user) {
            nick = user.email.substring(0, user.email.indexOf('@'))
            email = user.email
        } else {
            nick = ''
            email = ''
        }
    })

    const logOutHandler = async () => {
        try {
            await signOut(auth)
            dispatch(modalsStatesActions.falseLogState())
            dispatch(modalsStatesActions.noUploadPermition())
            dispatch(cartHerbsActions.setEmptyCart())
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
            <div className="grid grid-cols-1">
                <h3 className='mb-4 text-center font-medium text-xl'>User panel</h3>
                <div className="grid grid-cols-4">
                    <div className="my-2 col-span-2">
                        <div className="mb-1 text-sm text-gray-500">username:</div>
                        <div className="mb-1 text-sm text-gray-500">email:</div>
                        <div className="grid grid-cols-1 gap-y-4 mt-4">
                            <button disabled={disabledFavorites} className={!disabledFavorites ? "flex text-[#B81426] text-sm transition duration-100 hover:opacity-90 active:animate-animeBtn" : "flex text-sm text-gray-500"} onClick={showUserFavorites}>Favorites</button>
                            <button onClick={logOutHandler} className="flex text-teal-500 text-sm transition duration-100 hover:opacity-90 active:animate-animeBtn">Log out</button>
                            <button onClick={() => setDeleteUserPanel(true)} className="flex text-sm transition duration-100 hover:opacity-90 active:animate-animeBtn">Delete account</button>
                        </div>
                    </div>
                    <div className="my-2 col-span-2">
                        <div className="mb-1 text-sm text-black">{nick}</div>
                        <div className="mb-1 text-sm text-black">{email}</div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}
export default UserPanel