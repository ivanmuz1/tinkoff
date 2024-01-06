import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieContext } from "../MovieContext";
import Form from "../components/Form";

const EditForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    director: "",
    year: "",
    runtime: "",
    plot: "",
    actors: "",
    genres: [],
    posterUrl: "",
  });

  const navigate = useNavigate();

  const { setMovies, selectedMovie, setSelectedMovie } = useMovieContext();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch("http://localhost:3005/movies/" + id)
        .then((res) => res.json())
        .then((data) => {
          Object.keys(data).length > 0
            ? setSelectedMovie(data)
            : setSelectedMovie(null);
          setFormState(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formState.title.trim() ||
      !formState.director.trim() ||
      !formState.plot.trim() ||
      !formState.actors.trim() ||
      formState.genres.length === 0 ||
      !formState.posterUrl.trim() ||
      !formState.year.trim() ||
      !formState.runtime.trim()
    ) {
      alert("Пожалуйста заполните все значения");
      return;
    }
    fetch("http://localhost:3005/movies/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
        id: selectedMovie.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevState) =>
          prevState.map((movie) => (movie.id === id ? data : movie))
        );
        navigate("/movie/" + id);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]:
      event.target.name === "genres"
          ? event.target.value.split(", ")
          : event.target.value,
    });
  };
  if (!selectedMovie) {
    return (
      <div className="home">
        <h1 className="home__title">Фильм номер {id} не найден</h1>
      </div>
    );
  }
  return (
    <div className="movie__form-container">
      <form className="movie__form" onSubmit={handleSubmit}>
        <h1>Редактирование</h1>
        <Form
          value={formState?.title}
          onChange={handleChange}
          name="title"
          label="Название фильма"
          placeholder="Название фильма"
          type="text"
        />
        <Form
          value={formState?.director}
          onChange={handleChange}
          name="director"
          label="Режиссер"
          placeholder="Режиссер"
          type="text"
        />
        <Form
          value={formState?.year}
          onChange={handleChange}
          name="year"
          label="Год выпуска"
          placeholder="Год выпуска"
          type="number"
        />
        <Form
          value={formState?.runtime}
          onChange={handleChange}
          name="runtime"
          label="Продолжительность"
          placeholder="Продолжительность"
          type="number"
        />
        <Form
          value={formState?.actors}
          onChange={handleChange}
          name="actors"
          label="Актеры"
          placeholder="Актеры"
          type="text"
        />
        <Form
          value={formState?.plot}
          onChange={handleChange}
          name="plot"
          label="Описание"
          placeholder="Описание"
          textarea
        />
        <Form
          value={formState?.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          label="Обложка"
          placeholder="Обложка"
          type="text"
        />
        <Form
          value={formState?.genres.join(", ")}
          onChange={handleChange}
          name="genres"
          label="Жанры"
          placeholder="Жанры"
          type="text"
        />
      </form>
      <div className="movie__form-footer">
        <button onClick={() => navigate(-1)}>Отменить</button>
        <button onClick={handleSubmit}>Сохранить</button>
      </div>
    </div>
  );
};

export default EditForm;