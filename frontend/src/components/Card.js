import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="elements__item">
      {isOwn && (
        <button
          className="elements__delete-button"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="elements__photo"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />
      <div className="elements__description">
        <h2 className="elements__name">{card.name}</h2>
        <div className="elements__like-container">
          <button
            aria-label="Нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="elements__likes-count">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;
