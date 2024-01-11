import React from "react";
import "../Form/Form.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">Добро пожаловать!</h2>
      <form className="window__form" method="POST">
        <label className="window__form-label" htmlFor="username">
          Имя
        </label>
        <input
          className="window__form-item"
          id="username"
          type="text"
          name="name"
          placeholder="Имя"
          required
        />
        <span className="window__form-item-error">
          Имя не должно содержать цифр
        </span>
        <label className="window__form-label" htmlFor="useremail">
          E-mail
        </label>
        <input
          className="window__form-item"
          id="useremail"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />
        <span className="window__form-item-error">
          E-mail введен некорректно
        </span>
        <label className="window__form-label" htmlFor="userpassword">
          Пароль
        </label>
        <input
          className="window__form-item"
          id="userpassword"
          type="password"
          name="password"
          placeholder="Пароль"
          autoComplete="on"
          required
        />
        <span className="window__form-item-error">
          Пароль должен содержать не менее 8 символов
        </span>
        <button className="window__form-submit-btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="window__text">
        Уже зарегистрированы?
        <Link to="/signin" className="window__link">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
