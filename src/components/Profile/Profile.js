import React, { useEffect, useState } from "react";
import "../Profile/Profile.css";
import api from "../../utils/MainApi";
import { useForm } from "../../hooks/useForm";
import { useUser } from "../../context/CurrentUserContext";
import { nameRegex, emailRegex } from "../../utils/constants";

function Profile({ logOut }) {
  const { values, setValues, handleChange, errors, isValid } = useForm();

  const [changed, setChanged] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useUser();

  const isChanged = (key, val) => val[key] === values[key];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");
    api(user)
      .updateUserInfo(values)
      .then(({ name, email }) => {
        setSubmitted(false);
        setChanged(false);
        setUser({ ...user, name, email });
      })
      .catch((error) => {
        setError("При обновлении профиля произошла ошибка.");
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (user.name) {
      setValues({ ...user });
    }
  }, [user]);

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {user.name}!</h2>
      <form className="profile__form" onSubmit={handleUpdateProfile}>
        <label className="profile__form-label">
          Имя
          <input
            className="profile__form-item"
            value={values.name || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            id="username"
            type="text"
            name="name"
            placeholder="Имя"
            pattern={nameRegex}
            disabled={!changed}
            required
          />
        </label>
        <span className="profile__form-item-error">{errors.name}</span>
        <div className="profile__form-line"></div>
        <label className="profile__form-label">
          E-mail
          <input
            className="profile__form-item"
            value={values.email || ""}
            onChange={(e) => {
              handleChange(e);
            }}
            id="useremail"
            type="email"
            name="email"
            placeholder="E-mail"
            pattern={emailRegex}
            disabled={!changed}
            required
          />
        </label>
        <span className="profile__form-item-error">{errors.email}</span>
        <span className="profile__form-item-error">{error}</span>
        {changed ? (
          <button
            disabled={
              !isValid ||
              (isChanged("name", user) && isChanged("email", user)) ||
              submitted
            }
            className="profile__save-btn"
            type="submit"
          >
            Сохранить
          </button>
        ) : (
          <>
            <button
              className="profile__edit-btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setChanged(true);
              }}
            >
              Редактировать
            </button>
            <button
              className="profile__exit-btn"
              type="button"
              onClick={logOut}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
