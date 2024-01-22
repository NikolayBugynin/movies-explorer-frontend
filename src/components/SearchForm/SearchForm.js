import React, { useState } from "react";
import "../SearchForm/SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onSearch,
  search,
  setSearch,
  isShortFilm,
  setIsShortFilm,
}) {
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    onSearch(isShortFilm);
  };

  const onCheckBoxChange = (newCheckbox) => {
    setIsShortFilm(newCheckbox);

    if (search.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    onSearch(newCheckbox);
  };

  return (
    <div className="search">
      <div className="search__wrapper">
        <form className="search__form" onSubmit={handleSearch} noValidate>
          <div className="search__container">
            <input
              className="search__form-item"
              placeholder="Фильм"
              type="text"
              name="film"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setError("");
              }}
            />
            <button className="search__submit-btn" type="submit" />
          </div>

          {error && (
            <span className="search__form-item-error">
              Введите название фильма
            </span>
          )}
        </form>
        <FilterCheckbox onChange={onCheckBoxChange} checked={isShortFilm} />
        <div className="search__line"></div>
      </div>
    </div>
  );
}

export default SearchForm;
