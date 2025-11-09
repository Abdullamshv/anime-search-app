import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { setQuery, setPage, fetchAnimeSearch, fetchTopAnime } from './searchSlice';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from '../../components/SearchBar';
import AnimeCard from '../../components/AnimeCard';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import SkeletonLoader from '../../components/SkeletonLoader';
import searchPageBackground from '../../assets/backgrounds/search_page_background.jpg';

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { query, results, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.search
  );

  const [searchInput, setSearchInput] = useState(query);
  const debouncedQuery = useDebounce(searchInput, 250);

  // Initial load: fetch top anime for page 1
  useEffect(() => {
    dispatch(fetchTopAnime(1));
  }, [dispatch]);

  // Handle debounced search input
  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(setQuery(debouncedQuery));
      dispatch(fetchAnimeSearch({ query: debouncedQuery, page: 1 }));
      dispatch(setPage(1)); // Reset pagination to 1
    } else {
      dispatch(setQuery(''));
      dispatch(fetchTopAnime(1));
      dispatch(setPage(1));
    }
  }, [debouncedQuery, dispatch]);

  // Handle pagination changes
  useEffect(() => {
    if (currentPage > 1 || query.trim()) {
      if (query.trim()) {
        dispatch(fetchAnimeSearch({ query, page: currentPage }));
      } else {
        dispatch(fetchTopAnime(currentPage));
      }
    }
  }, [currentPage, query, dispatch]);

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.log('Search error:', error);
    }
  }, [error]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="relative px-4 py-8 min-h-screen"
      style={{
        backgroundImage: `url(${searchPageBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="flex gap-3 justify-center items-center mb-8 text-4xl font-bold text-center text-white">
          <img src="/anime_app_logo.svg" alt="AnimeCorsair Logo" className="w-10 h-10" />
          <span>Anime Corsair</span>
        </h1>

        <SearchBar value={searchInput} onChange={setSearchInput} />

        {loading && currentPage === 1 ? (
          <SkeletonLoader />
        ) : loading ? (
          <Loader />
        ) : results.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400">Try searching for a different anime title</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
