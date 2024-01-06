import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SearchFilmInput from "./SearchFilmInput";
import MovieList from "./MovieList";
import { useMovieContext } from "../MovieContext";

const MovieListContainer = () => {
  const { movies, setShowFilter, favorites, showFavorites, setShowFavorites} = useMovieContext();
  const navigate = useNavigate();
  const [displayedMovies, setDisplayedMovies] = useState(movies);

  useEffect(() => {
    setDisplayedMovies(showFavorites ? favorites : movies);
  }, [showFavorites, favorites, movies]);

  const handleCheckboxChange = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  return (
    <aside>
      <SearchFilmInput />
      <div className="cont__button">
        <button
          onClick={() => setShowFilter((prevState) => !prevState)}
          className="filter__button"
        >
          Фильтры
        </button>
        <label className="filter__label">
          Избранное
          <input
          type="checkbox"
          className="fav__input"
          checked={showFavorites}
          onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <MovieList movies={displayedMovies} />
      <div className="movie__list-footer">
        <p>Найдено {displayedMovies.length} элементов</p>
        <button onClick={() => navigate("/createMovie")}>
          <AiOutlinePlus />
          Добавить
        </button>
      </div>
    </aside>
  );
};

export default MovieListContainer;