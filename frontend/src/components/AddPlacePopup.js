import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="popup-add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="popup-place"
          name="username"
          type="text"
          placeholder="Название"
          className="popup__input popup__input_type_username"
          minLength="2"
          maxLength="30"
          required
          value={cardName}
          onChange={handleChangeCardName}
        />
        <span id="popup-place-error" className="popup__error"></span>
      </label>
      <label className="popup__label">
        <input
          id="popup-link"
          name="profession"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_profession"
          required
          value={cardLink}
          onChange={handleChangeCardLink}
        />
        <span id="popup-link-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
