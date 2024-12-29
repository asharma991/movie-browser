import { useEffect, useState } from 'react';
import Header from './components/Header';
import MovieCards from './components/MovieCard';
import useFetchMovies from './hooks/useFetchMovies';
import useDebounce from './hooks/useDebounce';
import useFetchAllGenres from './hooks/useFetchAllGenre';
import { Filter, Genre } from './types';

function App() {
  const initialFilters: Filter = {
    genres: [],
    yearRange: { min: 1990, max: 2024 },
    ratingRange: { min: 0, max: 10 }
  };
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filter>(initialFilters);
  const clearAllFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
    search();
  };

  const { movieRes, loading, error, fetchMovies } = useFetchMovies();
  const { fetchAllGenres, allGenres } = useFetchAllGenres();

  const debouncedSearch = useDebounce(
    () => fetchMovies(`/search/movie?query=${searchQuery}`, page, true),
    500
  );
  const search = (filterQuery: string = '') =>
    fetchMovies(`/search/movie?query=${searchQuery + filterQuery}`, page);

  useEffect(() => {
    setPage(1);
    if (searchQuery.length > 0) {
      debouncedSearch();
    } else {
      fetchMovies('/movie/popular?', 1, true);
    }
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          window.document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage(page + 1);
      }
    };
    if (movieRes.total_pages >= page) {
      window.addEventListener('scroll', onScroll);
    }

    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  useEffect(() => {
    let genres = '',
      vote_range = '',
      year_range = '';
    if (filters.genres.length > 0) {
      genres = `&with_genres=${filters.genres
        .map((genre: Genre) => genre.name)
        .join('|')}`;
    }
    if (filters.ratingRange.min !== 0 || filters.ratingRange.max !== 10) {
      vote_range = `&vote_average.gte=${filters.ratingRange.min}&vote_average.lte=${filters.ratingRange.max}`;
    }
    if (
      (filters.yearRange.min !== 1990 || filters.yearRange.max !== 2024) &&
      filters.yearRange.min > 1000 &&
      filters.yearRange.max <= 2024
    ) {
      year_range = `&primary_release_date.gte=${filters.yearRange.min}-01-01&primary_release_date.lte=${filters.yearRange.max}-12-31`;
    }

    if (page > 1 && movieRes.total_pages >= page) {
      if (searchQuery.length > 0 && !loading) {
        search(genres + vote_range + year_range);
      }
    } else if (genres || vote_range || year_range) {
      search(genres + vote_range + year_range);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setFilters={setFilters}
        filters={filters}
        allGenres={allGenres}
        clearAllFilters={clearAllFilters}
      />
      <MovieCards movies={movieRes.results} />
      <div className="p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}

export default App;
