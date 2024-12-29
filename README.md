# Movie Browser

This project is developed in order to consume [TMDB](https://developer.themoviedb.org/docs/getting-started) and explore different movies with several filters.

## How to run the application

To run the application follow these steps:

1. Create a .env file and add `VITE_TMDB_API_KEY` and add your TMDB API key against it.
2. Install Dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

## Design Decisions

Tailwind CSS has been used in order to maintain customization. A very simple but crispy theme has been used in order to have good user insteractions.

## Additional Information

Debounce used here is custom and the infinite scroll with page change is custom made.

## Scope for improvement

- Custom components can be added for inputs and buttons.
- Both Dark/Light themes should be there.
- A detailed page should be added for each movie.
