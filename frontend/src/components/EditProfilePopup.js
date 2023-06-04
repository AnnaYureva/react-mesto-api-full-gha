import React from "react";
import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      description: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="popup-edit-profile"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="popup__label">
        <input
          id="popup-username"
          name="username"
          type="text"
          placeholder="Имя"
          className="popup__input popup__input_type_username"
          minLength="2"
          maxLength="40"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span id="popup-username-error" className="popup__error"></span>
      </label>
      <label className="popup__label">
        <input
          id="popup-profession"
          name="profession"
          type="text"
          placeholder="Профессия"
          className="popup__input popup__input_type_profession"
          minLength="2"
          maxLength="200"
          required
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span id="popup-profession-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
