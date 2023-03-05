import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
    return <div onClick={props.onClick}></div>
}
const ModalOverlay = (props) => {
    return (
        <div>
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