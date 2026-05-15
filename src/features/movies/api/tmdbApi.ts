import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  MovieCard,
  MovieDto,
  MovieList,
  MovieListDto,
  SearchMoviesArgs,
  MovieCredits,
  CreditsDto,
  DiscoverMoviesArgs,
} from "./tmdbApi.types";

const tmdbBaseUrl = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

const withDefaultParams = (params?: Record<string, string | number | boolean | undefined>) => ({
  language: "en-US",
  ...(tmdbApiKey ? { api_key: tmdbApiKey } : {}),
  ...params,
});

const mapMovie = (movie: MovieDto): MovieCard => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  posterPath: movie.poster_path,
  backdropPath: movie.backdrop_path,
  releaseDate: movie.release_date,
  voteAverage: movie.vote_average,
  genres: movie.genres,
});

const mapMovieList = (response: MovieListDto): MovieList => ({
  page: response.page,
  results: response.results.map(mapMovie),
  totalPages: response.total_pages,
  totalResults: response.total_results,
});

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: tmdbBaseUrl,
    prepareHeaders: (headers) => {
      if (tmdbToken) {
        headers.set("Authorization", `Bearer ${tmdbToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/popular",
        params: withDefaultParams({ page }),
      }),
      transformResponse: mapMovieList,
    }),
    getTopRatedMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/top_rated",
        params: withDefaultParams({ page }),
      }),
      transformResponse: mapMovieList,
    }),
    getUpcomingMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/upcoming",
        params: withDefaultParams({ page }),
      }),
      transformResponse: mapMovieList,
    }),
    getNowPlayingMovies: builder.query<MovieList, number | undefined>({
      query: (page = 1) => ({
        url: "/movie/now_playing",
        params: withDefaultParams({ page }),
      }),
      transformResponse: mapMovieList,
    }),
    searchMovies: builder.query<MovieList, SearchMoviesArgs>({
      query: ({ query, page = 1 }) => ({
        url: "/search/movie",
        params: withDefaultParams({
          query,
          page,
          include_adult: false,
        }),
      }),
      transformResponse: mapMovieList,
    }),
    getMovieById: builder.query<MovieCard, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
        params: withDefaultParams(),
      }),
      transformResponse: (response: MovieDto) => mapMovie(response),
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
        params: withDefaultParams(),
      }),
      transformResponse: (response: CreditsDto) => ({
        cast: response.cast.map((c) => ({
          id: c.id,
          name: c.name,
          character: c.character,
          profilePath: c.profile_path,
        })),
      }),
    }),
    getGenres: builder.query<{ id: number; name: string }[], void>({
      query: () => ({
        url: "/genre/movie/list",
        params: withDefaultParams(),
      }),
      transformResponse: (response: { genres: { id: number; name: string }[] }) =>
          response.genres,
    }),
    discoverMovies: builder.query<MovieList, DiscoverMoviesArgs>({
      query: (params) => ({
        url: "/discover/movie",
        params: withDefaultParams(params),
      }),
      transformResponse: mapMovieList,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieByIdQuery,
  useGetMovieCreditsQuery,
  useGetGenresQuery,
  useDiscoverMoviesQuery,
} = tmdbApi;