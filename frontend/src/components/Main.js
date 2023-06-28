import React from 'react';
import pencil from '../images/edit_profile.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CardContext);

    return (
        <main className="main">
            <section className="profile">
                <img className="profile__image-edit" src={pencil} alt="Белый карандаш" onClick={props.onEditAvatar} />
                <img className="profile__image" src={currentUser.avatar} alt="Фото профиля" />
                <h1 className="profile__title">{currentUser.name}</h1>
                <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} ></button>
                <p className="profile__subtitle">{currentUser.about}</p>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace} ></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card card={card} onCardClick={props.onCardClick} key={card._id} userId={currentUser._id} 
                    onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                ))}
            </section>
        </main>
    );
}

export default Main;