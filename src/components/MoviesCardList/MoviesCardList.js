import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {
  CARD_ADD_LG,
  CARD_ADD_MD,
  CARD_COUNT_LG,
  CARD_COUNT_MD,
  CARD_COUNT_SM,
  LOCAL_STORAGE_VISIBLE,
  WINDOW_WIDTH_LG,
  WINDOW_WIDTH_MD,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  savedMovies,
  loading,
  onSave,
  onDelete,
  visibleCardCount,
  setVisibleCardCount,
  windowWidth,
  setWindowWidth,
}) {
  useEffect(() => {
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const calculateCardCount = () => {
    if (windowWidth >= WINDOW_WIDTH_LG) {
      return visibleCardCount + CARD_ADD_LG;
    }
    return visibleCardCount + CARD_ADD_MD;
  };

  const onNextPage = () => {
    setVisibleCardCount(calculateCardCount());
  };

  const isSaved = ({ id }) => {
    if (Array.isArray(savedMovies)) {
      return savedMovies.filter(({ movieId }) => movieId === id).length;
    }

    return false;
  };

  return (
    <div className="card-list">
      {loading && <Preloader />}
      <ul className="card-list__container">
        {movies.slice(0, visibleCardCount).map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            onDelete={onDelete}
            onSave={onSave}
            isSaved={isSaved}
          />
        ))}
      </ul>
      {movies.length > visibleCardCount && (
        <button
          type="button"
          onClick={onNextPage}
          className="card-list__more-btn"
        >
          Ещё
        </button>
      )}
    </div>
  );
}

export default MoviesCardList;
