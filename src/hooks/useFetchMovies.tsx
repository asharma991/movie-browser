import { useState } from 'react';

const useFetchMovies = () => {
  const [movieRes, setMovieRes] = useState({ results: [], total_pages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchMovies = async (
    query: string,
    page: number = 1,
    reset = false
  ) => {
    setLoading(true);
    try {
      const uri = `https://api.themoviedb.org/3${query}&language=en-US&page=${page}`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_API_KEY
        }
      };
      const response = await fetch(uri, options);
      const data = await response.json();
      if (data.results) {
        setMovieRes((prev) => ({
          results: reset ? data.results : [...prev.results, ...data.results],
          total_pages: data.total_pages
        }));
      } else if (!data.success) {
        setError(data.status_message);
      } else {
        setMovieRes({ results: [], total_pages: 0 });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { movieRes, loading, error, fetchMovies };
};

export default useFetchMovies;
