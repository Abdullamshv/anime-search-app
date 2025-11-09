# PROMPTS.md

This document explains the prompts and AI assistance used to create this Anime Search App project.

## Project Overview

This Anime Search App was created using AI assistance to build a complete React + TypeScript application with Redux state management, React Router for navigation, and Tailwind CSS for styling.

## Prompts Used

### 1. Initial Project Setup Prompt
**Purpose**: Create the complete project structure and configuration files

**What it helped with**:
- Setting up Vite + React + TypeScript project configuration
- Creating `package.json` with all necessary dependencies
- Configuring TypeScript (`tsconfig.json`, `tsconfig.node.json`)
- Setting up Vite to run on port 4000
- Configuring Tailwind CSS and PostCSS
- Setting up ESLint for code quality

### 2. Type Definitions Prompt
**Purpose**: Define TypeScript interfaces for the Jikan API responses

**What it helped with**:
- Creating comprehensive type definitions in `src/types/animeTypes.ts`
- Defining `Anime`, `AnimeSearchResponse`, and `AnimeDetailResponse` interfaces
- Ensuring type safety throughout the application

### 3. API Service Layer Prompt
**Purpose**: Create API service functions with cancelable requests

**What it helped with**:
- Implementing `jikanApi.ts` with search, detail, and top anime functions
- Adding AbortController for canceling in-flight requests
- Proper error handling for API calls
- Using the Jikan API v4 endpoints correctly

### 4. Redux State Management Prompt
**Purpose**: Set up Redux Toolkit with slices for search and anime details

**What it helped with**:
- Creating Redux store configuration
- Implementing `searchSlice` with async thunks for search and top anime
- Implementing `animeDetailSlice` for anime detail state
- Managing loading, error, and data states properly

### 5. Custom Hooks Prompt
**Purpose**: Create reusable custom hooks

**What it helped with**:
- Implementing `useDebounce` hook for debouncing search input (250ms delay)
- Clean implementation with proper cleanup

### 6. UI Components Prompt
**Purpose**: Create reusable UI components

**What it helped with**:
- **SearchBar**: Search input with icon and styling
- **AnimeCard**: Card component displaying anime poster, title, type, year, and score
- **Pagination**: Pagination component with ellipsis for large page counts
- **Loader**: Animated loading spinner
- **SkeletonLoader**: Skeleton loading state for better UX

### 7. Search Page Implementation Prompt
**Purpose**: Create the main search page with debounced search and pagination

**What it helped with**:
- Integrating debounced search (250ms)
- Handling empty search state (showing top anime)
- Server-side pagination
- Loading states and error handling
- Empty state messaging
- Responsive grid layout

### 8. Detail Page Implementation Prompt
**Purpose**: Create the anime detail page

**What it helped with**:
- Displaying comprehensive anime information
- Handling trailer embeds
- Genre display
- Responsive layout with image and details side-by-side
- Error handling for missing anime
- Back navigation button

### 9. Routing and App Setup Prompt
**Purpose**: Set up React Router and main app structure

**What it helped with**:
- Configuring React Router with routes
- Setting up Redux Provider
- Main app entry point configuration

### 10. Styling Prompt
**Purpose**: Create modern, anime-themed UI

**What it helped with**:
- Tailwind CSS configuration with custom anime colors
- Gradient backgrounds
- Dark mode support
- Responsive design
- Smooth transitions and hover effects
- Custom utility classes

## Key Features Implemented

1. **Debounced Search**: 250ms debounce with cancelable API requests
2. **Redux State Management**: Centralized state for search results and anime details
3. **Server-side Pagination**: Using Jikan API pagination parameters
4. **Error Handling**: Graceful error messages and fallback states
5. **Loading States**: Skeleton loaders and spinners
6. **Responsive Design**: Mobile-first approach with Tailwind CSS
7. **Type Safety**: Full TypeScript coverage
8. **Modern UI**: Clean, anime-themed design with smooth animations

## Technologies Used

- **React 18+**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Redux Toolkit**: Simplified Redux setup
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Notes

- All API calls use the public Jikan API (no API keys required)
- The app handles API rate limits gracefully
- Cancelable requests prevent unnecessary API calls
- The project follows React best practices and modern patterns
- All components are functional components using hooks only

