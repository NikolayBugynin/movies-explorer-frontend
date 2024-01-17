import React, { useEffect, useState } from "react";
import "../Form/Form.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useForm } from "../../hooks/useForm";
import { emailRegex, nameRegex } from "../../utils/constants";
import { useUser } from "../../context/CurrentUserContext";

function Register({ onRegister }) {
  const { user } = useUser();
  const { token } = user;
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.token) {
      navigate("/movies");
    }
  }, [token]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    try {
      await onRegister(values);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">Добро пожаловать!</h2>
      <form className="window__form" onSubmit={handleSubmit}>
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
          pattern={nameRegex}
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="window__form-item-error">{errors.name}</span>
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
          pattern={emailRegex}
          value={values.email || ""}
          onChange={(e) => {
            setError(false);
            handleChange(e);
          }}
        />
        <span className="window__form-item-error">{errors.email}</span>
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
          minLength={8}
          value={values.password || ""}
          onChange={(e) => {
            setError(false);
            handleChange(e);
          }}
        />
        <span className="window__form-item-error">{errors.password}</span>
        <span className="message-error">{error}</span>
        <button
          className="window__form-submit-btn"
          type="submit"
          disabled={!isValid || submitted}
        >
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
