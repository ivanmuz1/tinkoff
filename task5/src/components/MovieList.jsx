import React from "react";
import Movie from "./Movie";
import { useMovieContext } from "../MovieContext";

const MovieList = () => {
  const { movies, favorites, showFavorites } = useMovieContext();

  function favMovies() {
    const filteredMovies = movies.filter(movie => favorites.some(favMovie => favMovie.id === movie.id));
    return filteredMovies;
  }

  const moviesToDisplay = showFavorites ? favMovies() : movies;

  return (
    <ul className="movie-list">
      {moviesToDisplay.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;