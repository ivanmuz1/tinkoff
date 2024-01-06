import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../MovieContext";
import Form from "../components/Form";

const CreateForm = () => {
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

  const { setMovies } = useMovieContext();

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
      alert("Заполнены не все поля формы");
      return;
    }
    fetch("http://localhost:3005/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formState,
        id: Math.random().toString(12).slice(2),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies((prevState) => [...prevState, data]);
        navigate("/movie/" + data.id);
      })
      .catch((err) => console.log(err));
    setFormState({
      title: "",
      director: "",
      year: "",
      runtime: "",
      plot: "",
      actors: "",
      genres: [],
      posterUrl: "",
    });
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
  return (
    <div className="movie__form-container">
      <form className="movie__form" onSubmit={handleSubmit}>
        <h1>Создание</h1>
        <Form
          value={formState.title}
          onChange={handleChange}
          name="title"
          label="Название фильма"
          type="text"
        />
        <Form
          value={formState.director}
          onChange={handleChange}
          name="director"
          label="Режиссер"
          type="text"
        />
        <Form
          value={formState.year}
          onChange={handleChange}
          name="year"
          label="Год выпуска"
          type="number"
        />
        <Form
          value={formState.runtime}
          onChange={handleChange}
          name="runtime"
          label="Продолжительность"
          type="number"
        />
        <Form
          value={formState.actors}
          onChange={handleChange}
          name="actors"
          label="Актеры"
          type="text"
        />
        <Form
          value={formState.plot}
          onChange={handleChange}
          name="plot"
          label="Описание"
          textarea
        />
        <Form
          value={formState.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          label="Обложка"
          type="text"
        />
        <Form
          value={formState.genres.join(", ")}
          onChange={handleChange}
          name="genres"
          label="Жанры"
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

export default CreateForm;