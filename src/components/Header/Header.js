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
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__links-container">
            <Link to="/signup" className="header__link-auth">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link-log">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__wrapper">
            <div className="header__container">
              <NavLink to="/movies" className="header__link-movies">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className="header__link-movies">
                Сохраненные фильмы
              </NavLink>
            </div>
            <Link to="/profile" className="header__link-account">
              Аккаунт
            </Link>
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
