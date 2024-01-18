import React, { useState, useEffect } from "react";
import { useUser } from "../../context/CurrentUserContext";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import api from "../../utils/MainApi";
import {
  LOCAL_STORAGE_QUERY,
  LOCAL_STORAGE_SHORT,
  LOCAL_STORAGE_FILTRED,
  LOCAL_STORAGE_MOVIE,
  MAX_DURATION,
  LOCAL_STORAGE_VISIBLE,
  CARD_COUNT_MD,
  WINDOW_WIDTH_LG,
  CARD_COUNT_LG,
  WINDOW_WIDTH_MD,
  CARD_COUNT_SM,
} from "../../utils/constants";

function Movies({ movies, setMovies, savedMovies, setSavedMovies }) {
  const { user } = useUser();

  const [visibleCardCount, setVisibleCardCount] = useState(
    () =>
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_VISIBLE)) || CARD_COUNT_MD
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_QUERY) || ""
  );
  const [isShortFilm, setIsShortFilm] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHORT)) || false
  );
  const [filteredMovies, setFilteredMovies] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTRED)) || []
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const setWidth = () => {
    if (windowWidth >= WINDOW_WIDTH_LG) {
      setVisibleCardCount(CARD_COUNT_LG);
    } else if (windowWidth >= WINDOW_WIDTH_MD) {
      setVisibleCardCount(CARD_COUNT_MD);
    } else {
      setVisibleCardCount(CARD_COUNT_SM);
    }
  };

  useEffect(() => {
    setWidth();
  }, [windowWidth]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_VISIBLE, visibleCardCount);
  }, [visibleCardCount]);

  useEffect(() => {
    if (movies) {
      localStorage.setItem(LOCAL_STORAGE_MOVIE, JSON.stringify(movies));
    }

    if (search !== "") {
      handleSearch(isShortFilm);
    }
  }, [movies]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FILTRED, JSON.stringify(filteredMovies));
  }, [filteredMovies]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_QUERY, search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SHORT, isShortFilm);
  }, [isShortFilm]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const m = await moviesApi.getMovies();
      setMovies(m);
    } catch (e) {
      console.log(e);
      setError("во время запроса возникла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedMovies = async () => {
    try {
      const m = await api(user).getMovies();
      setSavedMovies(m);
    } catch (e) {
      setError("во время запроса возникла ошибка");
    }
  };

  const handleSearch = async (checkbox) => {
    setError("");
    setWidth();

    if (!movies.length) {
      return await fetchMovies();
    }

    if (!savedMovies.length) {
      await fetchSavedMovies();
    }

    const s = search.toLocaleLowerCase();
    const filtred = movies.filter(({ duration, nameRU, nameEN }) => {
      const short = checkbox ? duration < MAX_DURATION : true;
      const ru = nameRU.toLocaleLowerCase();
      const en = nameEN.toLocaleLowerCase();
      return short && (ru.includes(s) || en.includes(s));
    });
    if (filtred.length === 0) {
      setError("ничего не найдено");
    }

    setFilteredMovies(filtred);
  };

  const handleSave = (movie) => {
    api(user)
      .createMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      });
  };

  const handleDelete = (movie) => {
    const [found] = savedMovies.filter((m) => m.movieId === movie.id) || [null];
    if (found) {
      api(user)
        .deleteMovie(found._id)
        .then(() => {
          setSavedMovies(
            savedMovies.filter(({ movieId }) => movieId !== found.movieId)
          );
        });
    }
  };

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        search={search}
        isShortFilm={isShortFilm}
        setSearch={setSearch}
        setIsShortFilm={setIsShortFilm}
      />
      {error && !loading && <div className="movies-error">{error}</div>}
      {!loading && !error && movies.length > 0 && (
        <MoviesCardList
          setWindowWidth={setWindowWidth}
          windowWidth={windowWidth}
          setVisibleCardCount={setVisibleCardCount}
          visibleCardCount={visibleCardCount}
          movies={filteredMovies}
          savedMovies={savedMovies}
          onSave={handleSave}
          onDelete={handleDelete}
          loading={loading}
          error={error}
        />
      )}

      <Footer />
    </section>
  );
}

export default Movies;
