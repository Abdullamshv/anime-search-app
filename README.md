# Anime Search App

A modern React + TypeScript application for searching and browsing anime using the Jikan API.

## Features

- 🔍 Instant search with debouncing (250ms)
- 📱 Mobile responsive design
- 🎨 Modern anime-themed UI with Tailwind CSS
- 🔄 Redux for state management
- 📄 Server-side pagination
- 🎬 Detailed anime information pages
- ⚡ Cancelable API requests
- 💫 Skeleton loaders for better UX

## Tech Stack

- React 18+
- TypeScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start on **http://localhost:4000**

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── jikanApi.ts          # API service functions
├── app/
│   └── store.ts             # Redux store configuration
├── components/
│   ├── SearchBar.tsx        # Search input component
│   ├── AnimeCard.tsx        # Anime card component
│   ├── Pagination.tsx       # Pagination component
│   ├── Loader.tsx           # Loading spinner
│   └── SkeletonLoader.tsx   # Skeleton loading state
├── features/
│   ├── search/
│   │   ├── searchSlice.ts   # Redux slice for search
│   │   └── SearchPage.tsx   # Search page component
│   └── detail/
│       ├── animeDetailSlice.ts # Redux slice for anime details
│       └── DetailPage.tsx     # Detail page component
├── hooks/
│   └── useDebounce.ts      # Custom debounce hook
├── types/
│   └── animeTypes.ts        # TypeScript type definitions
├── App.tsx                  # Main app component with routing
├── main.tsx                 # Entry point
└── index.css               # Global styles
```

## API

This app uses the [Jikan API](https://docs.api.jikan.moe/) - an unofficial MyAnimeList API.

## License

MIT

