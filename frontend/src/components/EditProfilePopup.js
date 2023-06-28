import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit() {
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} isClose={props.onClose} name="profile"
            title="Редактировать профиль" textButton={props.textButton} onSubmit={handleSubmit} >

            <input className="popup__input" id="title-input" type="text" name="name"
                onChange={handleChangeName}
                value={name || ''} required />

            <input className="popup__input" id="subtitle-input" type="text" name="about"
                onChange={handleChangeDescription}
                value={description || ''} required />

        </PopupWithForm>
    );
}

export default EditProfilePopup;