import { Routes, Route } from "react-router-dom";
import MovieForm from "./services/MovieForm";
import EditForm from "./services/EditForm";
import CreateForm from "./services/CreateForm";
import Header from "./components/Header";
import MovieListContainer from "./components/MovieListContainer";
import FilterModal from "./components/FilterModal";
import { useMovieContext } from "./MovieContext";
import "./styles/App.css";
import "./styles/modal.css";


function App() {

  const { showFilter } = useMovieContext();
  return (
    <>
      <Header />
      <main className="main">
        {showFilter && <FilterModal />}
        <MovieListContainer />
        <Routes>
          <Route path="/movie/:id" element={<MovieForm />} />
          <Route path="/editMovie/:id" element={<EditForm />} />
          <Route path="/createMovie" element={<CreateForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;