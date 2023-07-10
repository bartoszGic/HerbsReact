import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return (
        <div className="fixed bg-black/75 top-0 left-0 w-full h-full z-30"
            onClick={props.onClick}>
        </div>
    )
}
const ModalOverlay = (props) => {
    return (
        <div className="fixed text-black bg-white mt-16 p-4 rounded-xl animate-animeModal left-[5%] w-[90%]  sm:w-[30rem] sm:left-[calc(50%-15rem)] z-40">
            {props.children}
        </div>
    )
}
const portalElement = document.getElementById('overlays')

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClick}
                />,
                portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}
                </ModalOverlay>,
                portalElement)}
        </Fragment>
    )
}
export default Modal