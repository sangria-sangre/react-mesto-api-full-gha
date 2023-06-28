import React from 'react';

function Card(props) {

    const isOwn = props.card.owner._id === props.userId;
    const isLiked = props.card.likes.some(i => i._id === props.userId);
    const cardLikeButtonClassName = (
        `element__like-btn ${isLiked && 'element__like-btn_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__column">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} ></button>
                <p className="element__likes-number">{props.card.likes.length}</p>
            </div>
            {isOwn && <button className="element__delete-btn" type="button" onClick={handleDeleteClick} ></button>}
        </article>
    );
}

export default Card;