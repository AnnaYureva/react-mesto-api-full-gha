import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register( {onRegister} ) {
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
    onRegister(mail, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          aria-label="Email"
          value={mail}
          onChange={handleMail}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          aria-label="Пароль"
          value={password}
          onChange={handlePassword}
          required
        />
        <button
          className="login__button"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>{" "}
      </p>
    </section>
  );
}

export default Register;
