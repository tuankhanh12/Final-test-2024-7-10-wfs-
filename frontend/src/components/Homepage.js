import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MoviePopup from './MoviePopup';

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get('/api/movies');
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="homepage">
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.ID} className="movie-item" onClick={() => handleMovieClick(movie)}>
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
          </div>
        ))}
      </div>
      {selectedMovie && <MoviePopup movie={selectedMovie} onClose={handleClosePopup} />}
    </div>
  );
};

export default Homepage;
