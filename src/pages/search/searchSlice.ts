import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { searchAnime, getTopAnime } from '../../api/jikanApi';
import type { AnimeSearchResponse, Anime } from '../../types/animeTypes';

interface SearchState {
  query: string;
  results: Anime[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  totalResults: number;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  totalResults: 0,
};

// Thunks with explicit return types
export const fetchAnimeSearch = createAsyncThunk<
  AnimeSearchResponse,
  { query: string; page: number }
>('search/fetchAnimeSearch', async ({ query, page }) => {
  return await searchAnime(query, page);
});

export const fetchTopAnime = createAsyncThunk<AnimeSearchResponse, number>(
  'search/fetchTopAnime',
  async (page) => {
    return await getTopAnime(page);
  }
);

// Helper functions for extraReducers
const handleFetchPending = (state: SearchState) => {
  state.loading = true;
  state.error = null;
};

const handleFetchFulfilled = (state: SearchState, action: PayloadAction<AnimeSearchResponse>) => {
  state.loading = false;
  state.results = action.payload.data;
  // Keep currentPage user-controlled to avoid API overwriting
  state.totalPages = action.payload.pagination.last_visible_page;
  state.hasNextPage = action.payload.pagination.has_next_page;
  state.totalResults = action.payload.pagination.items.total;
};

const handleFetchRejected = (state: SearchState, action: any, defaultMsg: string) => {
  state.loading = false;
  const errorMessage = action.error?.message || defaultMsg;
  
  // Provide user-friendly error messages
  if (errorMessage.includes('429') || errorMessage.includes('Too many requests')) {
    state.error = 'Too many requests. Please wait a moment before searching again.';
  } else if (errorMessage.includes('AbortError')) {
    // Don't show error for aborted requests (cancelled by new search)
    state.error = null;
  } else {
    state.error = errorMessage;
  }
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search anime
      .addCase(fetchAnimeSearch.pending, handleFetchPending)
      .addCase(fetchAnimeSearch.fulfilled, handleFetchFulfilled)
      .addCase(fetchAnimeSearch.rejected, (state, action) =>
        handleFetchRejected(state, action, 'Failed to fetch anime')
      )
      // Top anime
      .addCase(fetchTopAnime.pending, handleFetchPending)
      .addCase(fetchTopAnime.fulfilled, handleFetchFulfilled)
      .addCase(fetchTopAnime.rejected, (state, action) =>
        handleFetchRejected(state, action, 'Failed to fetch top anime')
      );
  },
});

export const { setQuery, setPage, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
