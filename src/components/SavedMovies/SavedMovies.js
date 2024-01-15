import React, { useEffect, useState } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import api from "../../utils/MainApi";

function SavedMovies({ savedMovies, setSavedMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [search, setSearch] = useState("");

  const [isShortFilm, setIsShortFilm] = useState(false);

  useEffect(() => {
    api.getMovies().then((res) => setSavedMovies(res));
  }, []);

  useEffect(() => {
    console.log(savedMovies);
    handleSearch(isShortFilm);
  }, [savedMovies]);

  const handleDelete = (movie) => {
    api
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(({ _id }) => _id !== movie._id));
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (checkbox) => {
    const S = search.toLowerCase();
    const filtred = savedMovies.filter(({ nameRU, nameEN, duration }) => {
      return (
        (checkbox ? duration < 40 : true) &&
        (nameRU.toLowerCase().includes(S) || nameEN.toLowerCase().includes(S))
      );
    });
    setFilteredMovies(filtred);
  };

  return (
    <section className="movies">
      <SearchForm
        onSearch={handleSearch}
        isShortFilm={isShortFilm}
        setIsShortFilm={setIsShortFilm}
        search={search}
        setSearch={setSearch}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        onDelete={handleDelete}
        movies={filteredMovies}
      />
      <Footer />
    </section>
  );
}

export default SavedMovies;
