import React from 'react';
import api from '../utils/Api.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Header from './Header.js'

import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';

function MyProfile() {
    const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');

    React.useEffect(() => {
        api.getAllData()
            .then(([cards, user]) => {
                setCurrentUser(user);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    React.useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeAllPopups();
            }
        }
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [])

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        api.getContent(jwt)
            .then((res) => {
                setUserEmail(res.data.email);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setPlacePopupOpen(true);
    }

    function handleCardClick(element) {
        setSelectedCard(element);
    }

    function closeAllPopups() {
        setProfilePopupOpen(false);
        setAvatarPopupOpen(false);
        setPlacePopupOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(err);
            });

    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.postUserInfo(data)
            .then((user) => {
                setCurrentUser(user)
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.postUserPhoto(data)
            .then((user) => {
                setCurrentUser(user);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    function handleAddPlace(data) {
        setIsLoading(true);
        api.postCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);;
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <CardContext.Provider value={cards}>
            <CurrentUserContext.Provider value={currentUser}>
                <Header headerStaus="profile" email={userEmail} />
                <Main
                    onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete} />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                    textButton={isLoading ? "Сохранение..." : "Сохранить"} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                    textButton={isLoading ? "Сохранение..." : "Сохранить"} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}
                    textButton={isLoading ? "Создание..." : "Создать"} />

                <PopupWithForm isOpen={false} isClose={closeAllPopups} name="delete-item" title="Вы уверены?" children="" />
                <ImagePopup isOpen={selectedCard} isClose={closeAllPopups} />

            </CurrentUserContext.Provider >
        </CardContext.Provider>
    );
}

export default MyProfile;