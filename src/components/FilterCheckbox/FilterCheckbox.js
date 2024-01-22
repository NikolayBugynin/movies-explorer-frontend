import React, { useState } from "react";
import "../FilterCheckbox/FilterCheckbox.css";

function FilterCheckbox({onChange, checked}) {

  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__item"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <span className="filter-checkbox__title">Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;
