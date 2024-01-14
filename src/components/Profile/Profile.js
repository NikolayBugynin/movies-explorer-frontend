import React from "react";
import "../Profile/Profile.css";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Николай!</h2>
      <form className="profile__form">
        <label className="profile__form-label">
          Имя
          <input
            className="profile__form-item"
            id="username"
            type="text"
            name="name"
            placeholder="Имя"
            required
          />
        </label>
        <span className="profile__form-item-error">
          Имя не должно содержать цифр
        </span>
        <div className="profile__form-line"></div>
        <label className="profile__form-label">
          E-mail
          <input
            className="profile__form-item"
            id="useremail"
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
        </label>
        <span className="profile__form-item-error">
          E-mail введен некорректно
        </span>
        <button className="profile__edit-btn" type="submit">
          Редактировать
        </button>
        <button className="profile__exit-btn" type="button">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
