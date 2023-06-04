import React from "react";
import { useState } from "react";

function Login(props) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  function handleMail(evt) {
    setMail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(mail, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          value={mail}
          placeholder="Email"
          onChange={handleMail}
          required
        />
        <input
          className="login__input"
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={handlePassword}
          required
        />
        <button className="login__button" type="submit" aria-label="Войти">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
