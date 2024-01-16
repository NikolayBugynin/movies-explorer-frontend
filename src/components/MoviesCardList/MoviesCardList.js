import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { LOCAL_STORAGE_VISIBLE } from "../../utils/constants";

function MoviesCardList({ movies, savedMovies, loading, onSave, onDelete }) {
  const [visibleCardCount, setVisibleCardCount] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_VISIBLE)) || 8
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
    if (windowWidth >= 1280) {
      //вынести в константы

      setVisibleCardCount(12);
    } else if (windowWidth >= 768) {
      setVisibleCardCount(8);
    } else {
      setVisibleCardCount(5);
    }
  }, [windowWidth]);

  const calculateCardCount = () => {
    if (windowWidth >= 1280) {
      return visibleCardCount + 3;
    }
    return visibleCardCount + 2;
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
