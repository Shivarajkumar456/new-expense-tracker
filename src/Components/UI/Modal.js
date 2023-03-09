import React, {Fragment} from 'react';
import ReactDOM  from 'react-dom';
import { useDispatch } from 'react-redux';
import { premiumActions } from '../../store/premiumReducer';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    const dispatch = useDispatch();
    const closeHandler= ()=>{
        dispatch(premiumActions.showPremium(false));
    }
    return <div className={classes.backdrop} onClick={closeHandler}></div>
}

const ModalOverlay = (props) => { 
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props)=>{
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
    </Fragment>
}

export default Modal;