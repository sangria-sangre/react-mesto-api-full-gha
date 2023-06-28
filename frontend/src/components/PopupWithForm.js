import React from 'react';

function PopupWithForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        
                <div className="popup__container" >
                    <button className="popup__close-btn" type="button" onClick={props.isClose}></button>
                    <form className="popup__form" action="get" name={`${props.name}`} noValidate onSubmit={handleSubmit}>
                        <h2 className="popup__title"> {props.title} </h2>
                        {props.children}
                        <button className="popup__save-btn popup__save-btn_profile" type="submit">{props.textButton}</button>
                    </form>
                </div>
                
        </section>
    );
}

export default PopupWithForm;