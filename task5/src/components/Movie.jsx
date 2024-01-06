import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../MovieContext";

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const { selectedMovie, setSelectedMovie, favorites, setFavorites } = useMovieContext();
  const [isChecked, setChecked] = useState(false);

  const isMovieInFavorites = (movie, favorites) => {
    return favorites.some((favMovie) => favMovie.id === movie.id);
  };

  useEffect(() => {
    setChecked(isMovieInFavorites(movie, favorites));
  }, [movie, favorites]);

  const addToFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3005/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: movie.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Не удалось добавить фильм в favorites на сервере");
      }

      setFavorites([...favorites, movie]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeFromFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:3005/favorites/${movie.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить фильм из favorites на сервере");
      }

      setFavorites(favorites.filter((favMovie) => favMovie.id !== movie.id));
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleCheckboxChange = () => {
    setChecked(!isChecked);

    if (!isChecked) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }

    setSelectedMovie(movie);
    navigate("/movie/" + movie.id);
  };

  return (
    <li
      className={`movie ${selectedMovie?.id === movie.id ? "movie-selected" : ""}`}
      onClick={() => {
        setSelectedMovie(movie);
        navigate("/movie/" + movie.id);
      }}
    >
      <input
        className="movie__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <h2 className="movie__title">{movie.title}</h2>
      <div className="movie__info">
        <p>{movie.year}</p>
        <span>{movie.genres ? movie.genres.join(", ") : ""}</span>
      </div>
    </li>
  );
};

export default Movie;