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
    }, [currentUser]);

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
            title="Редактировать профиль" textButton={props.textButton} onSubmit={handleSubmit} 
            children={
                <>
                    <input className="popup__input popup__input_profile_title" id="title-input" type="text" name="name"
                        onChange={handleChangeName}
                        value={name || ''}
                        minLength="2" maxLength="40" required noValidate />
                    <span className="popup__input-error title-input-error"></span>
                    <input className="popup__input popup__input_profile_subtitle" id="subtitle-input" type="text" name="about"
                        onChange={handleChangeDescription}
                        value={description || ''}
                        minLength="2" maxLength="200" required />
                    <span className="popup__input-error subtitle-input-error"></span>
                </>
            } />);
}

export default EditProfilePopup;