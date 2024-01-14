import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();
  const [isClicked, setIsClicked] = React.useState(false);

  function handleOpenMenu() {
    setIsClicked(true);
  }

  function handleCloseMenu() {
    setIsClicked(false);
  }

  function useAuthHeader() {
    const { pathname } = location;
    return pathname === "/"
  }

  function useLogHeader() {
    const { pathname } = location;
    return (
      pathname === "/profile" ||
      pathname === "/movies" ||
      pathname === "/saved-movies"
    )
  }
  return (
    <>
      {useAuthHeader() && (
        <header className="header">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__links-container">
            <Link to="/signup" className="header__link-auth">Регистрация</Link>
            <Link to="/signin" className="header__link-log">Войти</Link>
          </div>
        </header>
      )}

      {useLogHeader() && (
        <header className="header">
          <Link to="/">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
          </Link>
          <div className="header__wrapper">
            <div className="header__container">
              <Link to="/movies" className="header__link-movies">Фильмы</Link>
              <Link to="/saved-movies" className="header__link-movies">Сохраненные фильмы</Link>
            </div>
            <Link to="/profile" className="header__link-account">Аккаунт</Link>
          </div>
          <button className="header__menu-btn" type="button" onClick={handleOpenMenu} />
          {isClicked ? (<Navigation handleCloseMenu={handleCloseMenu} />) : ("")}
        </header>
      )}
    </>
  );
}

export default Header;
