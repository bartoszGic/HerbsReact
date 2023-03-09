import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return (
        <div className="fixed bg-black/75 top-0 left-0 w-full h-full"
            onClick={props.onClick}>
        </div>
    )
}
const ModalOverlay = (props) => {
    return (
        <div className="fixed top-16 left-[5%] w-[90%] p-4 text-black bg-white rounded-xl  animate-animeModal sm:w-[30rem] sm:left-[calc(50%-15rem)]">
            <div>{props.children}</div>
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