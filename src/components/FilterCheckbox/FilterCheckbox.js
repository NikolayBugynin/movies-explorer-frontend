import React from "react";
import "../FilterCheckbox/FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__item"
        type="checkbox"
      />
      <span className="filter-checkbox__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
