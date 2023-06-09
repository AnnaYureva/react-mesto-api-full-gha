 class Api {
  constructor({ url }) {
    this._url = url
  }
  //метод обработки ошибок
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  // // метод запроса с проверкой ответа
  // _request(url, options) {
  //   return fetch(url, options).then(this._handleResponse);
  // }

  //получить все карточки в виде массива методом GET
  getInitialCards() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
    }).then((res) => {
      return this._handleResponse(res);
  })
  }

  // добавить карточку методом POST

  addNewCard({ name, link }) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._handleResponse(res);
  })
  }

  // удалить карточку методом DELETE

  deleteCard(card) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards/${card._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
      method: "DELETE",
    }).then((res) => {
      return this._handleResponse(res);
  });
  }

  // получить данные пользователя (GET)

  getUserData() {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    }).then((res) => {
      return this._handleResponse(res);
  })
  };

  //  заменить данные пользователя (PATCH)

  saveUserData(data) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
      method: "PATCH",
      body: JSON.stringify({ name: data.name, about: data.description }),
    }).then((res) => {
      return this._handleResponse(res);
  });;
  }
 //лайки и дизлайки
 changeLikeCardStatus(cardId, isLiked) {
  const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
    }).then((res) => {
      return this._handleResponse(res);
  });
}

  //Сохранить аватар

  saveAvatar(avatar) {
    const token = localStorage.getItem('jwt')
    return fetch(`${this._url}/users/me/avatar`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
      method: "PATCH",
      body: JSON.stringify({ avatar: avatar.avatar}),
    }).then((res) => {
      return this._handleResponse(res);
  });
  }
}

const api = new Api({
 // url: "http://localhost:3000",
 url: "https://api.yuanya.nomoredomains.rocks"
});

export default api;

