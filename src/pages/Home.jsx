import { useEffect, useState } from 'react';

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
    <div>
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies_container">
        {topMovies.length > 0 && <p>Carregando...</p>}
        {topMovies.map((movie) => (
          <p key={movie.id}> {movie.title}</p>
        ))}
      </div>
    </div>
  );
}

export default Home;
