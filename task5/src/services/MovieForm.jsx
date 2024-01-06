import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useMovieContext } from "../MovieContext";
import MovieInfo from "../components/MovieInfo";

const MovieForm = () => {
  const { id } = useParams();

  const [copied, setCopied] = useState(false);

  const { selectedMovie, setSelectedMovie } = useMovieContext();

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3005/movies/" + id)
        .then((res) => res.json())
        .then((data) =>
          Object.keys(data).length > 0
            ? setSelectedMovie(data)
            : setSelectedMovie(null)
        )
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const notFound = (event) => {
    
    event.target.src = "https://via.placeholder.com/200x300?text=Not+found"

  };

  return (
    <div className="movie__container">
      <div className="movie__header">
        <p>
          Id: {id}
          <button className="movie__copy" onClick={handleCopy}>
            {copied && <FiCheckCircle />}
            {!copied && <FiAlertCircle />}
          </button>
        </p>
        <Link to={`/editMovie/${id}`}>
          <BiEdit />
          Редактировать
        </Link>
      </div>
      <div className="movie__main">
        <img
          onError= {notFound}
          width="200"
          height="300"
          src={selectedMovie?.posterUrl}
          alt={"Film poster"}
        />
        <div className="movie__main-info">
          <h1>{selectedMovie?.title}</h1>
          <h2>{selectedMovie?.director}</h2>
          <h3>Параметры</h3>
          <MovieInfo name="Год производства" value={selectedMovie?.year} />
          <MovieInfo
            name="Продолжительность"
            value={`${selectedMovie?.runtime} мин.`}
          />
          <MovieInfo name="Жанры" value={selectedMovie?.genres.join(", ")} />
          <MovieInfo name="Актеры" value={selectedMovie?.actors} />
        </div>
      </div>
      <div className="movie__description">
        <h2>Описание</h2>
        <p>{selectedMovie?.plot}</p>
      </div>
    </div>
  );
};

export default MovieForm;