import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={name}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
          className="popup__close-icon"
        ></button>
        <h2 className="popup__name">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save-button">
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
