import React, { useEffect, useState } from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCard from "../MoviesCard/MoviesCard";
import Footer from "../Footer/Footer";
import api from "../../utils/MainApi";
import { useUser } from "../../context/CurrentUserContext";
import { MAX_DURATION } from "../../utils/constants";

function SavedMovies({ savedMovies, setSavedMovies }) {
  const { user } = useUser();

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  useEffect(() => {
    api(user)
      .getMovies()
      .then((res) => setSavedMovies(res));
  }, []);

  useEffect(() => {
    handleSearch(isShortFilm);
  }, [savedMovies]);

  const handleDelete = (movie) => {
    api(user)
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
        (checkbox ? duration < MAX_DURATION : true) &&
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
      <div className="card-list">
        <ul className="card-list__container">
          {filteredMovies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onDelete={handleDelete}
              isSaved={() => true}
            />
          ))}
        </ul>
      </div>
      <Footer />
    </section>
  );
}

export default SavedMovies;
