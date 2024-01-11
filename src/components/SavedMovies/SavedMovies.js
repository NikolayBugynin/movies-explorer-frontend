import React from "react";
import "../Movies/Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList type='saved' />
      <Footer />
    </section>
  );
}

export default SavedMovies;
