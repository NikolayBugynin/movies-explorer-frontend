import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({type}) {
  return (
    <div className="card-list">
      <ul className="card-list__container">
        <MoviesCard status='active' type={type}/>
        <MoviesCard status='active' type={type}/>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button type="button" className="card-list__more-btn">Ещё</button>
    </div>
  );
}

export default MoviesCardList;
