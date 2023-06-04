import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/Authorisation";
import InfoTooltip from "./InfoTooltip";
import Success from "../images/Success.png";
import Fail from "../images/Fail.png";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [infoToolTipData, setInfoToolTipData] = useState({image:'', text:''}) 
  const [infoTooltip, setInfoTooltip] = useState(false);

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setEmail(email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setInfoToolTipData({image: Fail, text:'Что-то пошло не так! Попробуйте ещё раз.' })
        setInfoTooltip(true);
      });
  }

  function onRegister(email, password) {
    auth
      .registerNewUser(email, password)
      .then(() => {
        setInfoToolTipData({image: Success, text:'Вы успешно зарегистрировались!' })
        navigate("/sign-in");
      })
      .catch(() => {
        setInfoToolTipData({image: Fail, text:'Что-то пошло не так! Попробуйте ещё раз.' })
      })
      .finally(() => {
        setInfoTooltip(true);
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn === true) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltip(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((el) => el._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((el) => (el._id === card._id ? newCard : el))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((el) => el._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateUserData(userData) {
    api
      .saveUserData(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .saveAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCardData) {
    api
      .addNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={onLogin} />
                  <Footer />
                </>
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={onRegister} />
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    title="Выйти"
                    email={email}
                    onClick={onSignOut}
                    route=""
                  />

                  <ProtectedRoute
                    component={Main}
                    isLogged={isLoggedIn}
                    cards={cards}
                    onEditProfile={setEditProfilePopupOpen}
                    onAddPlace={setAddPlacePopupOpen}
                    onEditAvatar={setEditAvatarPopupOpen}
                    onCardClick={setSelectedCard}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                  />
                  <Footer />
                </>
              }
            />

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
            />
          </Routes>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUserData}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoTooltip
            data={infoToolTipData}
            isOpen={infoTooltip}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
