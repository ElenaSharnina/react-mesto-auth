import React from "react";
function InfoTooltip({ isOpen, link, text, onClose }) {
    return (

        <div className={`modal modal_type_infoTooltip ${isOpen ? 'modal_active' : ''}`}>
            <div className="modal__container modal__container_type_infoTooltip">
                <button type="button" className="modal__close-icon" aria-label="Закрыть" onClick={onClose}></button>
                <img className="infoTooltip__image" src={link} alt="" />
                <p className="infoTooltip__text">{text}</p>
            </div>
        </div>

    )
}
export default InfoTooltip;