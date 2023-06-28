import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    const [ values, setValues ] = React.useState({
        avatar: ''
    });

    React.useEffect(() => {
        values.avatar = '';
    }, [props.isOpen]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
    }

    function handleSubmit() {
        props.onUpdateAvatar({
            avatar: values.avatar
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} isClose={props.onClose} name="avatar-update" onSubmit={handleSubmit}
            title="Обновить аватар" textButton={props.textButton} >
            <input className="popup__input" id="url-avatar" type="url" name="avatar"
                value={values.avatar} placeholder="Ссылка на картинку" onChange={handleChange} required />
            
        </PopupWithForm>
    );
}

export default EditAvatarPopup;