import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            type="button"
            className="profile__image-edit"
            onClick={() => {
              onEditAvatar(true);
            }}
          ></button>
          <div className="profile__description">
            <div className="profile__name">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                aria-label="Открыть"
                type="button"
                className="profile__edit-button"
                onClick={() => {
                  onEditProfile(true);
                }}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          aria-label="Добавить"
          type="button"
          className="profile__add-button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
