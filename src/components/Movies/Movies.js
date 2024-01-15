import React, { useState, useEffect } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import useResize from "../../hooks/useResize";
import api from "../../utils/MainApi";
import {
  LOCAL_STORAGE_QUERY,
  LOCAL_STORAGE_SHORT,
  LOCAL_STORAGE_FILTRED,
} from "../../utils/constants";

function Movies({ movies, setMovies, savedMovies, setSavedMovies }) {
  const [search, setSearch] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_QUERY) || ""
  );
  const [isShortFilm, setIsShortFilm] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHORT)) || false
  );
  const [filteredMovies, setFilteredMovies] = useState(
    () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTRED)) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FILTRED, JSON.stringify(filteredMovies));
  }, [filteredMovies]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_QUERY, search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SHORT, isShortFilm);
  }, [isShortFilm]);

  const handleSearch = async (checkbox) => {
    console.log(search, movies, savedMovies);
    setLoading(true);
    setError("");
    if (!movies.length) {
      try {
        const m = await moviesApi.getMovies();
        setMovies(m);
      } catch (e) {
        console.log(e);
        setError("во время запроса возникла ошибка");
      } finally {
        setLoading(false);
      }
    }

    if (!savedMovies.length) {
      try {
        const m = await api.getMovies();
        setSavedMovies(m);
      } catch (e) {
        setError("во время запроса возникла ошибка");
      }
    }

    const s = search.toLocaleLowerCase();
    const filtred = movies.filter(({ duration, nameRU, nameEN }) => {
      const short = checkbox ? duration < 40 : true;
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
    api.createMovie(movie).then((res) => {
      setSavedMovies([...savedMovies, res]);
    });
  };

  const handleDelete = (movie) => {
    const [found] = savedMovies.filter((m) => m.movieId === movie.id) || [null];
    if (found) {
      api.deleteMovie(found._id).then(() => {
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
