import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      id="popup-image"
      className={`popup ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__figure">
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__figcaption">{card.name}</p>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
