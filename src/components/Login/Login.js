import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../Form/Form.css";

function Login() {
  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">Рады видеть!</h2>
      <form className="window__form" method="POST">
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
        <span className="window__form-item-error window__form-item-error-log">
          Пароль должен содержать не менее 8 символов
        </span>
        <button className="window__form-submit-btn" type="submit">
          Войти
        </button>
      </form>
      <p className="window__text">
        Ещё не зарегистрированы?
        <Link to="/signup" className="window__link" type="button">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
