import React from 'react';
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import FormValidator from '../utils/FormValidator.js';
import { validationConfig } from '../utils/const.js';

import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardContext } from '../contexts/CardContext.js';

function App() {
  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const formValidators = {}
  const [isLoading, setIsLoading] = React.useState(false);

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(validationConfig);

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

  function handleEditAvatarClick() {
    formValidators['avatar-update'].resetValidation();
    setAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    formValidators['profile'].resetValidation();
    setProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    formValidators['item'].resetValidation();
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

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id);
    setCards((state) => state.filter((c) => c._id !== card._id));
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
      })

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
        <div className="body">
          <div className="page">

            <Header />
            <Main
              onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />
            <Footer />
          </div>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
            textButton={isLoading ? "Сохранение..." : "Сохранить"} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
            textButton={isLoading ? "Сохранение..." : "Сохранить"} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}
            textButton={isLoading ? "Создание..." : "Создать"} />

          <PopupWithForm isOpen={false} isClose={closeAllPopups} name="delete-item" title="Вы уверены?" children="" />
          <ImagePopup isOpen={selectedCard} isClose={closeAllPopups} />

        </div>

      </CurrentUserContext.Provider >
    </CardContext.Provider>
  );
}

export default App;
