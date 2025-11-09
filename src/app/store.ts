import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import animeDetailReducer from '../features/detail/animeDetailSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    animeDetail: animeDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

