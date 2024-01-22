import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { useUser } from "../../context/CurrentUserContext";

function Header() {
  const { user } = useUser();
  const [isClicked, setIsClicked] = React.useState(false);

  function handleOpenMenu() {
    setIsClicked(true);
  }

  function handleCloseMenu() {
    setIsClicked(false);
  }

  return (
    <>
      {!user.token ? (
        <header className="header">
          <NavLink to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </NavLink>
          <div className="header__links-container">
            <NavLink to="/signup" className="header__link-auth">
              Регистрация
            </NavLink>
            <NavLink to="/signin" className="header__link-log">
              Войти
            </NavLink>
          </div>
        </header>
      ) : (
        <header className="header">
          <NavLink to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </NavLink>
          <div className="header__wrapper">
            <div className="header__container">
              <NavLink to="/movies" className="header__link-movies">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className="header__link-movies">
                Сохраненные фильмы
              </NavLink>
            </div>
            <NavLink to="/profile" className="header__link-account">
              Аккаунт
            </NavLink>
          </div>
          <button
            className="header__menu-btn"
            type="button"
            onClick={handleOpenMenu}
          />
          {isClicked ? <Navigation handleCloseMenu={handleCloseMenu} /> : ""}
        </header>
      )}
    </>
  );
}

export default Header;
