 class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers;
  }
  //метод обработки ошибок
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  //получить все карточки в виде массива методом GET
  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  // добавить карточку методом POST

  addNewCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  // удалить карточку методом DELETE

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  // получить данные пользователя (GET)

  getUserData() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  //  заменить данные пользователя (PATCH)

  saveUserData(data) {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name: data.name, about: data.description }),
    });
  }
 //лайки и дизлайки
 changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._headers,
    })
}

  //Сохранить аватар

  saveAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar.avatar }),
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "dde92b4e-039a-4bf6-9370-cec53bed9950",
    "Content-Type": "application/json",
  },
});

export default api;

