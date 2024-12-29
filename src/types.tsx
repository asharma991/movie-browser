export type Genre = {
  id: number;
  name: string;
};

export type Filter = {
  genres: [];
  yearRange: { min: number; max: number };
  ratingRange: { min: number; max: number };
};

export type movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isFavorite?: boolean;
};

export type HeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filter;
  setFilters: (filters: any) => void;
  allGenres: Genre[];
  clearAllFilters: () => void;
};

export type MovieCardsProps = {
  movies: movie[];
};
