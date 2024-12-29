import { useState } from 'react';

const useFetchAllGenres = () => {
  const [allGenres, setAllGenres] = useState([]);

  const fetchAllGenres = () => {
    const uri = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_API_KEY
      }
    };
    fetch(uri, options)
      .then((res) => res.json())
      .then((data) => {
        setAllGenres(data.genres);
      });
  };

  return { fetchAllGenres, allGenres };
};

export default useFetchAllGenres;
