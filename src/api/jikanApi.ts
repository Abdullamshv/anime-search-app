import type { AnimeSearchResponse, AnimeDetailResponse } from '../types/animeTypes';

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting: minimum delay between requests (in ms)
const MIN_REQUEST_DELAY = 1000; // 1 second between requests
let lastRequestTime = 0;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

// Helper function to wait for rate limit
const waitForRateLimit = async (): Promise<void> => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_DELAY) {
    const waitTime = MIN_REQUEST_DELAY - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

// Helper function to retry with exponential backoff
const fetchWithRetry = async (
  url: string,
  options: RequestInit = {},
  retries = MAX_RETRIES
): Promise<Response> => {
  try {
    await waitForRateLimit();
    
    const response = await fetch(url, options);
    
    // If 429 (Too Many Requests), retry with exponential backoff
    if (response.status === 429 && retries > 0) {
      const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries);
      console.warn(`Rate limited. Retrying in ${retryDelay}ms... (${retries} retries left)`);
      
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    
    if (retries > 0 && !(error instanceof Error && error.message.includes('Too many requests'))) {
      const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    throw error;
  }
};

let abortController: AbortController | null = null;

export const searchAnime = async (
  query: string,
  page: number = 1
): Promise<AnimeSearchResponse> => {
  // Cancel previous request if exists
  if (abortController) {
    abortController.abort();
  }

  // Create new abort controller for this request
  abortController = new AbortController();

  const url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`;
  
  const response = await fetchWithRetry(url, {
    signal: abortController.signal,
  });

  return response.json();
};

export const getAnimeById = async (id: number): Promise<AnimeDetailResponse> => {
  const url = `${BASE_URL}/anime/${id}/full`;
  
  const response = await fetchWithRetry(url);

  return response.json();
};

export const getTopAnime = async (page: number = 1): Promise<AnimeSearchResponse> => {
  const url = `${BASE_URL}/top/anime?page=${page}&limit=20`;
  
  const response = await fetchWithRetry(url);

  return response.json();
};

