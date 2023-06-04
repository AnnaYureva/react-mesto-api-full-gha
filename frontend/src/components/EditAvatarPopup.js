import React from "react";
import {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef(null);

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]); 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }
    
      function handleChangeAvatar() {
        return avatarRef.current.value;
      }


    return (
        <PopupWithForm
        name="popup-avatar-change"
        title="Обновить аватар"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label className="popup__label">
          <input
            id="popup-avatar"
            name="avatar"
            type="url"
            placeholder="Введите ссылку на аватар"
            className="popup__input popup__input_type_avatar"
            onChange={handleChangeAvatar}
            ref={avatarRef}
          />
          <span id="popup-avatar-error" className="popup__error"></span>
        </label>
      </PopupWithForm>
    )

}

export default EditAvatarPopup