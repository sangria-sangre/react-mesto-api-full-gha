import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
    const nameRef = React.createRef();
    const linkRef = React.createRef();

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [linkRef, nameRef, props.isOpen]);

    function handleSubmit() {
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} isClose={props.onClose} name="item" onSubmit={handleSubmit}
            title="Новое место" textButton={props.textButton} children={
                <>
                    <input className="popup__input popup__input_item_title" id="name-input" type="text" name="name"
                        placeholder="Название" minLength="2" maxLength="30" required ref={nameRef} />
                    <span className="popup__input-error name-input-error"></span>
                    <input className="popup__input popup__input_item_image" id="url-input" type="url" name="link"
                        placeholder="Ссылка на картинку" required ref={linkRef} />
                    <span className="popup__input-error url-input-error"></span>
                </>} />
    );
}

export default AddPlacePopup;