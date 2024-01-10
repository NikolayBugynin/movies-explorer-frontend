import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ handleCloseMenu }) {
  return (
    <section className="navigation">
      <div className="navigation__overlay">
        <div className="navigation__wrapper"></div>
        <div className="navigation__menu">
          <button
            className="navigation__close-btn"
            type="button"
            onClick={handleCloseMenu}
          />
          <nav className="navigation__link-list">
            <NavLink
              className="navigation__link"
              to="/"
            >
              Главная
            </NavLink>
            <NavLink
              className="navigation__link"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className="navigation__link"
              to="/saved-movies"
            >
              Сохраненные фильмы
            </NavLink>
          </nav>
          <Link
            className="navigation__link-account"
            to="/profile"
          >
            Аккаунт
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navigation;
