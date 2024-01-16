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

function MoviesCardList({ movies, savedMovies, loading, onSave, onDelete }) {
  const [visibleCardCount, setVisibleCardCount] = useState(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_VISIBLE)) || CARD_COUNT_MD
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_VISIBLE, visibleCardCount);
  }, [visibleCardCount]);

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

  useEffect(() => {
    if (windowWidth >= WINDOW_WIDTH_LG) {
      if (visibleCardCount < CARD_COUNT_LG) {
        setVisibleCardCount(CARD_COUNT_LG);
      }
    } else if (windowWidth >= WINDOW_WIDTH_MD) {
      if (visibleCardCount < CARD_COUNT_MD) {
        setVisibleCardCount(CARD_COUNT_MD);
      }
    } else {
      if (visibleCardCount < CARD_COUNT_SM) {
        setVisibleCardCount(CARD_COUNT_SM);
      }
    }
  }, [windowWidth]);

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
