const MovieInfo = ({ name, value }) => {
  
    return (
      <div className="movie__main-details">
        <p>{name}</p>
        <p>{value}</p>
      </div>
    );
  };
  
  export default MovieInfo;