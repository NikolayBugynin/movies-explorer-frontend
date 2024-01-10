import React from "react";
import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__wrapper">
        <form className="search__form">
          <div className="search__container">
            <input
              className="search__form-item"
              placeholder="Фильм"
              type="text"
              name="film"
              required
            />
            <button className="search__submit-btn" type="submit" />
          </div>
          <span className="search__form-item-error">Введите название фильма</span>
        </form>
        <FilterCheckbox />
        <div className="search__line"></div>
      </div>
    </section>
  );
}

export default SearchForm;
