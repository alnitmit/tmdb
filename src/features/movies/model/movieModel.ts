export type MovieSection = {
  id: "popular" | "topRated" | "upcoming" | "nowPlaying";
  title: string;
};

export const movieSections: MovieSection[] = [
  {
    id: "popular",
    title: "Popular Movies",
  },
  {
    id: "topRated",
    title: "Top Rated Movies",
  },
  {
    id: "upcoming",
    title: "Upcoming Movies",
  },
  {
    id: "nowPlaying",
    title: "Now Playing Movies",
  },
];

const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size: "w500" | "original" = "w500") => {
  if (!path) {
    return null;
  }

  return `${imageBaseUrl}/${size}${path}`;
};

