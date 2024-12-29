import { Heart, Star } from 'lucide-react';
import { MovieCardsProps } from '../types';
import { useEffect, useState } from 'react';

const MovieCards = ({ movies }: MovieCardsProps) => {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) ?? [];
    console.log({ favourites });
    const filteredMovies = movies.map((movie) => {
      const isCurrFav = favourites?.find((fav) => fav === movie.id);
      if (isCurrFav) {
        return { ...movie, isFavorite: true };
      }
      return movie;
    });
    setFilteredMovies(filteredMovies);
  }, [movies]);

  const addToFavourite = (id) => {
    console.log({ id });
    let favourites = JSON.parse(localStorage.getItem('favourites')) ?? [];
    if (favourites.includes(id)) {
      favourites = favourites?.filter((fav) => fav !== id);
    } else {
      favourites.push(id);
    }
    localStorage.setItem(
      'favourites',
      JSON.stringify([...new Set(favourites)])
    );
    const filteredMovies = movies.map((movie) => {
      if (favourites.includes(movie.id)) {
        return { ...movie, isFavorite: true };
      }
      return movie;
    });
    setFilteredMovies(filteredMovies);
  };

  console.log({ filteredMovies });
  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative bg-gray-200">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="w-full h-full object-cover"
              />
              <button
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  movie?.isFavorite ? 'bg-red-500' : 'bg-gray-800/70'
                }`}
                onClick={() => addToFavourite(movie.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    movie?.isFavorite ? 'fill-current' : ''
                  } text-white`}
                />
              </button>
            </div>

            {/* Movie Info */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {movie.title}
              </h2>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-600">
                  {movie.release_date.split('-')[0]}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-gray-700">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MovieCards;
