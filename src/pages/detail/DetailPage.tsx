import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchAnimeDetail, clearAnime } from './animeDetailSlice';
import Loader from '../../components/Loader';
import detailPageBackground from '../../assets/backgrounds/detail_page_background.jpg';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { anime, loading, error } = useSelector(
    (state: RootState) => state.animeDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeDetail(Number(id)));
    }

    return () => {
      dispatch(clearAnime());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div
        className="relative flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${detailPageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="relative z-10">
          <Loader />
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div
        className="relative flex justify-center items-center px-4 min-h-screen"
        style={{
          backgroundImage: `url(${detailPageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
        <div className="relative z-10 text-center">
          <div className="mb-4 text-6xl">😢</div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            {error || 'Anime not found'}
          </h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 mt-4 text-white rounded-lg transition-colors bg-anime-primary hover:bg-anime-primary/90"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const imageUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
  const trailerUrl = anime.trailer?.embed_url || anime.trailer?.url;

  return (
    <div
      className="relative px-4 py-8 min-h-screen"
      style={{
        backgroundImage: `url(${detailPageBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <button
          onClick={() => navigate('/')}
          className="flex gap-2 items-center px-6 py-3 mb-6 text-white rounded-lg transition-colors bg-anime-primary hover:bg-anime-primary/90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Search
        </button>

        <div className="overflow-hidden bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={imageUrl}
                alt={anime.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
              />
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                {anime.title}
              </h1>
              
              {anime.title_english && anime.title_english !== anime.title && (
                <h2 className="mb-6 text-2xl text-gray-600 dark:text-gray-400">
                  {anime.title_english}
                </h2>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                {anime.score && (
                  <div className="p-4 rounded-lg bg-anime-primary/10">
                    <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">Score</div>
                    <div className="text-2xl font-bold text-anime-primary">
                      ⭐ {anime.score.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {anime.scored_by?.toLocaleString()} users
                    </div>
                  </div>
                )}
                
                <div className="p-4 rounded-lg bg-anime-secondary/10">
                  <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">Type</div>
                  <div className="text-xl font-bold text-anime-secondary">{anime.type}</div>
                </div>

                <div className="p-4 bg-pink-100 rounded-lg dark:bg-pink-900/30">
                  <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">Episodes</div>
                  <div className="text-xl font-bold text-pink-600 dark:text-pink-400">
                    {anime.episodes || 'N/A'}
                  </div>
                </div>

                <div className="p-4 bg-indigo-100 rounded-lg dark:bg-indigo-900/30">
                  <div className="mb-1 text-sm text-gray-600 dark:text-gray-400">Year</div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {anime.year || anime.aired?.prop?.from?.year || 'N/A'}
                  </div>
                </div>
              </div>

              {anime.genres && anime.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-anime-accent/20 text-anime-accent"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {anime.synopsis && (
                <div className="mb-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Synopsis</h3>
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {anime.synopsis}
                  </p>
                </div>
              )}

              {trailerUrl && (
                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Trailer</h3>
                  <div className="overflow-hidden rounded-lg aspect-video">
                    <iframe
                      src={trailerUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${anime.title} Trailer`}
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                {anime.status && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Status: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{anime.status}</span>
                  </div>
                )}
                {anime.rating && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Rating: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{anime.rating}</span>
                  </div>
                )}
                {anime.duration && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Duration: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{anime.duration}</span>
                  </div>
                )}
                {anime.popularity && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Popularity: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">#{anime.popularity}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

