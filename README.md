# Anime Search App

A fast, modern React + TypeScript app for discovering and browsing anime titles, built using the [Jikan API](https://docs.api.jikan.moe/)—an unofficial MyAnimeList API.

## Features

- 🔍 Instant search with debouncing and cancelable requests
- 🛰️ Server-side pagination
- 🎬 Rich, detailed anime information pages (genre, trailer, ratings, etc.)
- 🌓 Anime-themed, responsive UI with dark mode
- ⚡ Optimized, mobile-first performance (Tailwind CSS)
- 🗂️ Robust state management with Redux Toolkit
- 💫 Skeleton loaders and smooth transitions for great UX
- 🦾 Strong type safety with TypeScript

## Architecture & Technical Highlights

- **React 18+** with functional components and hooks
- **Redux Toolkit** for global state, async logic, and error handling
- **TypeScript** for type-safe development
- **API Layer:** Rate-limited and cancelable fetches with exponential backoff
- **Custom Hooks:** For debouncing and reusable logic (`useDebounce`)
- **Tailwind CSS:** Utility-first, performant UI with dark mode support
- **Vite:** Lightning-fast development and builds
- **React Router:** Declarative client-side routing

## Project Structure

```
src/
├── api/             # Jikan API service functions
├── app/             # Redux store configuration
├── assets/          # Images and other static resources
├── components/      # Reusable UI components (SearchBar, AnimeCard, Loader, etc.)
├── hooks/           # Custom React hooks (e.g., useDebounce)
├── pages/           # Page-level components (SearchPage, DetailPage, etc.)
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component with routing
├── main.tsx         # App entry point
├── index.css        # Global styles
├── vite-env.d.ts    # Vite type definitions
```

## Getting Started

```bash
npm install
npm run dev         # starts app on http://localhost:4000
npm run build       # production build
```

## API

All calls use the public Jikan API.
Handles rate limits gracefully; no API keys required.

## Notes

- Project is built with best React practices and modern patterns
- API requests are cancelable to prevent wasted network usage
- State management is robust and error-tolerant; provides user-friendly feedback for API/network issues
- Responsive across devices with rich, accessible UI
- Main languages: TypeScript (92.8%), JavaScript (3.8%), CSS (2.4%), HTML (1%)

---