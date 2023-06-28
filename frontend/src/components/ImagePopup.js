function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.isOpen.link === '' && props.isOpen.name === '' ? "" : "popup_opened"}`}>
            <div className="popup__container popup__container_image">
                <button className="popup__close-btn popup__close-btn_image" type="button"
                    onClick={props.isClose}></button>
                <img className="popup__picture" src={props.isOpen.link} alt={props.isOpen.name} />
                <p className="popup__title popup__title_image">{props.isOpen.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;