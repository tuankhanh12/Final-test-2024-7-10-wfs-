import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <MovieList movies={movies} onMovieSelect={setSelectedMovie} />
      {selectedMovie && <MoviePopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
};

export default Home;
