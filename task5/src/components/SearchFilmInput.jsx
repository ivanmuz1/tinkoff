import { useMovieContext } from "../MovieContext";
import { BiSearch } from "react-icons/bi";

const SearchFilmInput = () => {
  const { searchTerm, setSearchTerm } = useMovieContext();
  return (
    <div className="search">
      <div className="search__input">
        <BiSearch className="search__input-icon" />
        <input
          type="text"
          placeholder="Введите название фильма"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilmInput;