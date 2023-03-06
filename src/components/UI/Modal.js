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
        <div className="fixed text-black bg-white top-16 left-4 right-4 p-4 rounded-xl animate-animeModal">
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