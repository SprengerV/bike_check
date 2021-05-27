import React from 'react';

const Modal = ({modalImage, setModalImage}) => {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setModalImage(null);
        }
    }
    
    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={modalImage} alt="modal popup"/>
        </div>
    )
}

export default Modal;