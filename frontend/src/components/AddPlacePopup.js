import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup(props) {
    const [ values, setValues ] = React.useState({
        name: '',
        link: '',
    });

    React.useEffect(() => {
        values.name = '';
        values.link = '';
    }, [props.isOpen]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
    }

    function handleSubmit() {
        props.onAddPlace({
            name: values.name,
            link: values.link
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} isClose={props.onClose} name="item" onSubmit={handleSubmit}
            title="Новое место" textButton={props.textButton} >
                    <input className="popup__input popup__input_item_title" id="name-input" type="text" name="name"
                        placeholder="Название" required value={values.name} onChange={handleChange} />

                    <input className="popup__input" id="url-input" type="url" name="link"
                        placeholder="Ссылка на картинку" required value={values.link} onChange={handleChange} />

        </PopupWithForm>
    );
}

export default AddPlacePopup;