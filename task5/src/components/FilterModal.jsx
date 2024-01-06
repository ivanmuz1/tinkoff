import { useMovieContext } from "../MovieContext";
import { RxCross1 } from "react-icons/rx";

const FilterModal = () => {
  const { setShowFilter, allGenres, setSelectedGenres, selectedGenres } = useMovieContext();
  
  return (
    <div
      className="modal"
      onClick={() => {
        setShowFilter(false);
      }}
    >
      <div onClick={(event) => event.stopPropagation()} className="modal__body">
        <h1>Выберите категории:</h1>
        <button onClick={() => setShowFilter(false)} className="modal__close">
          <RxCross1 />
        </button>
        <ul className="modal__form">
          {allGenres.map((genre) => (
            <li key={genre}>
              <input
                type="checkbox"
                id={genre}
                checked={selectedGenres.includes(genre)}
                onClick={() => {
                  selectedGenres.includes(genre)
                    ? setSelectedGenres((prevState) =>
                        prevState.filter((tmp) => genre !== tmp)
                      )
                    : setSelectedGenres((prevState) => [...prevState, genre]);
                }}
                value={genre}
              />
              <label htmlFor={genre}>{genre}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterModal;