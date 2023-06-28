import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const avatarRef = React.createRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleSubmit() {
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} isClose={props.onClose} name="avatar-update" onSubmit={handleSubmit}
            title="Обновить аватар" textButton={props.textButton} children={
                <>
                    <input className="popup__input popup__input_avatar-update" id="url-avatar" type="url" name="avatar"
                        ref={avatarRef}
                        placeholder="Ссылка на картинку" required />
                    <span className="popup__input-error url-avatar-error"></span>
                </>} />
    );
}

export default EditAvatarPopup;