import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import '../components/MoviesCard.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json(res);
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topUrl = `${moviesURL}top_rated?api_key=${apiKey}`;
    getTopMovies(topUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length < 0 && <p>Carregando...</p>}
        {topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
