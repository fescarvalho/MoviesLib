import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../components/MoviesCard.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKEY = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  const query = searchParams.get('q');

  const getTopMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json(res);
    setMovies(data.results);
  };

  useEffect(() => {
    const searchWithWueryURL = `${searchURL}?api_key=${apiKEY}&query=${query}`;
    getTopMovies(searchWithWueryURL);
  }, [query]);

  return (
    <div>
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
          {movies.length === 0 && <p>Carregando...</p>}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
