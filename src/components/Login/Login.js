import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import logo from "../../images/logo.svg";
import "../Form/Form.css";
import { useUser } from "../../context/CurrentUserContext";

function Login({ onLogin, error, setError }) {
  const { user } = useUser();
  const { token } = user;
  const navigate = useNavigate();
  const { values, errors, isValid, handleChange } = useForm();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  useEffect(() => {
    if (user.token) {
      navigate("/movies");
    }
  }, [token]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setSubmitted(true);
      await onLogin(values);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="window">
      <Link to="/" className="window__logo-link">
        <img className="window__logo" alt="Логотип" src={logo} />
      </Link>
      <h2 className="window__title">Рады видеть!</h2>
      <form className="window__form" method="POST" onSubmit={handleSubmit}>
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
          minLength={8}
          required
          value={values.password || ""}
          onChange={(e) => {
            setError(false);
            handleChange(e);
          }}
        />
        <span className="window__form-item-error window__form-item-error-log">
          {errors.password}
        </span>
        <span className="message-error">{error}</span>
        <button
          className="window__form-submit-btn"
          type="submit"
          disabled={!isValid || submitted}
        >
          Войти
        </button>
      </form>
      <p className="window__text">
        Ещё не зарегистрированы?
        <Link to="/signup" className="window__link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export default Login;
