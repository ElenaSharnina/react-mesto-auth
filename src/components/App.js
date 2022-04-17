import React from "react";
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './popups/PopupWithForm';
import ImagePopup from './popups/ImagePopup';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from "./popups/EditProflePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.js';
import successPic from '../images/Union.png';
import errorPic from '../images/Union2.png';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(true);
  let token = localStorage.getItem("token");

  React.useEffect(() => {
    if (token) {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, []);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.like(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      api.dislike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (token) {
      api.getUserInfoApi()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfoApi(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleUpdateAvatar({ avatar }) {
    api.changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleAddPlace({ name, link }) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  };

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setIsSuccess(true);

        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      })
  }

  React.useEffect(() => {
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          if (data) {
            setUserEmail(data.data.email);
            setLoggedIn(true);
            history.push("/");
          } else { console.log("error") };
        });
    }
  }, []);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
    if (isSuccess) {
      history.push("/sign-in");
    }
  }

  function handleExit() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header email={userEmail} onExit={handleExit} />
        <Switch>
          <Route exact path="/">
            {handleLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>
          <Route path="/sign-up">
            <Register onSubmit={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLoggedIn} />
          </Route>
        </Switch>
        <Footer />
        {isSuccess ?
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} text="Вы успешно зарегистрировались!" link={successPic} /> :
          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeInfoTooltip} text="Что-то пошло не так!
      Попробуйте ещё раз." link={errorPic} />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups} />

      </CurrentUserContext.Provider>

    </div>);
}

export default App;
