import { Link } from 'react-router-dom';
import type { Anime } from '../types/animeTypes';

interface AnimeCardProps {
  anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const imageUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
  const score = anime.score ? anime.score.toFixed(1) : 'N/A';
  const year = anime.year || anime.aired?.prop?.from?.year || 'N/A';

  return (
    <Link
      to={`/anime/${anime.mal_id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={anime.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        {anime.score && (
          <div className="absolute top-4 right-4 bg-anime-primary text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            ⭐ {score}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-anime-primary transition-colors">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="bg-anime-secondary/20 text-anime-secondary px-2 py-1 rounded">
            {anime.type || 'N/A'}
          </span>
          <span>{year}</span>
        </div>
      </div>
    </Link>
  );
}

