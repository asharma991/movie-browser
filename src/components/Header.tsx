import { Search, Film, SlidersHorizontal, X, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Filter, Genre, HeaderProps } from '../types';

const Header = ({
  searchQuery,
  setSearchQuery,
  setFilters,
  allGenres,
  filters,
  clearAllFilters
}: HeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleGenreToggle = (genre: Genre) => {
    const currentGenre = filters.genres.find((i: Genre) => i.id === genre.id);
    if (currentGenre) {
      setFilters((prev: Filter) => ({
        ...prev,
        genres: prev.genres.filter((g: Genre) => g.id !== genre.id)
      }));
    } else {
      setFilters((prev: Filter) => ({
        ...prev,
        genres: [...prev.genres, genre]
      }));
    }
  };

  const handleYearRangeChange = (value: string, bound: string) => {
    setFilters((prev: Filter) => ({
      ...prev,
      yearRange: {
        ...prev.yearRange,
        [bound]: parseInt(value)
      }
    }));
  };

  const handleRatingRangeChange = (value: string, bound: string) => {
    setFilters((prev: Filter) => ({
      ...prev,
      ratingRange: {
        ...prev.ratingRange,
        [bound]: parseFloat(value)
      }
    }));
  };

  return (
    <div className="bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Reccos</h1>
            </div>

            <div className="relative flex-1 max-w-xl mx-4">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full p-2 pl-10 rounded-lg text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`bg-white border-b shadow-md transition-all ${
          showFilters ? 'max-h-96' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              {/* Clear Filters Button */}
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-2 px-3 py-1 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.genres.find((i: Genre) => i.id === genre.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Release Year</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label>From:</label>
                <input
                  type="number"
                  min="1900"
                  max="2024"
                  value={filters.yearRange.min}
                  onChange={(e) => handleYearRangeChange(e.target.value, 'min')}
                  className="w-24 p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label>To:</label>
                <input
                  type="number"
                  min="1900"
                  max="2024"
                  value={filters.yearRange.max}
                  onChange={(e) => handleYearRangeChange(e.target.value, 'max')}
                  className="w-24 p-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Rating</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label>From:</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.ratingRange.min}
                  onChange={(e) =>
                    handleRatingRangeChange(e.target.value, 'min')
                  }
                  className="w-24 p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label>To:</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={filters.ratingRange.max}
                  onChange={(e) =>
                    handleRatingRangeChange(e.target.value, 'max')
                  }
                  className="w-24 p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
