import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { HOUR, MOVIES_API_URL } from "../../utils/constants";

const formatDuration = (duration) => {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}ч ${minutes}м`;
};

function MoviesCard({ movie, isSaved, onDelete, onSave }) {
  const location = useLocation();

  const handleLikeClick = () => {
    if (isSaved(movie)) {
      onDelete(movie);
    } else {
      onSave(movie);
    }
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={
          location.pathname === "/saved-movies"
            ? movie.image
            : `${MOVIES_API_URL}${movie.image.url}`
        }
        alt={movie.nameRU}
      />
      <div className="card__container">
        <h3 className="card__title">{movie.nameRU}</h3>
        <p className="card__film-duration">{formatDuration(movie.duration)}</p>
      </div>
      {location.pathname === "/movies" ? (
        <button
          type="button"
          onClick={handleLikeClick}
          className={
            isSaved(movie) ? "card__save-btn_active" : "card__save-btn"
          }
        >
          Сохранить
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onDelete(movie)}
          className="card__save-btn_disactive"
        ></button>
      )}
    </li>
  );
}

export default MoviesCard;
