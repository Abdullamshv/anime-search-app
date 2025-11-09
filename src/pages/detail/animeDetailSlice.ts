import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAnimeById } from '../../api/jikanApi';
import type { Anime } from '../../types/animeTypes';

interface AnimeDetailState {
  anime: Anime | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnimeDetailState = {
  anime: null,
  loading: false,
  error: null,
};

export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetchAnimeDetail',
  async (id: number) => {
    const response = await getAnimeById(id);
    return response.data;
  }
);

const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {
    clearAnime: (state) => {
      state.anime = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.anime = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        const errorMessage = action.error?.message || 'Failed to fetch anime details';
        
        // Provide user-friendly error messages
        if (errorMessage.includes('429') || errorMessage.includes('Too many requests')) {
          state.error = 'Too many requests. Please wait a moment and try again.';
        } else if (errorMessage.includes('AbortError')) {
          // Don't show error for aborted requests
          state.error = null;
        } else {
          state.error = errorMessage;
        }
      });
  },
});

export const { clearAnime } = animeDetailSlice.actions;
export default animeDetailSlice.reducer;

