 class Authorisation {
    constructor( {url, headers} ) {
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

  //регистрация пользователя
  registerNewUser(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(this._handleResponse);
  }

  //логин
  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  //получение токена
  getToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
}

const auth = new Authorisation({
    url: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default auth;