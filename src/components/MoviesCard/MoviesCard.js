import React from "react";
import "./MoviesCard.css";
import firstImage from "../../images/33-words-about-design.jpg";

function MoviesCard() {
  return (
    <article className="card">
      <img className="card__image" src={firstImage} alt="33 слова о дизайне" />
      <div className="card__container">
        <h3 className="card__title">33 слова о дизайне</h3>
        <p className="card__film-duration">1ч 17м</p>
      </div>
      <button type="button" className="card__save-btn">Сохранить</button>
    </article>
  );
}

export default MoviesCard;
