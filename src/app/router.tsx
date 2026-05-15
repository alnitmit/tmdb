import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "@/features/movies/ui/MainPage";
import { MoviesLayout } from "@/features/movies/ui/MoviesLayout";
import { PopularMoviesPage } from "@/features/movies/ui/PopularMoviesPage";
import { TopRatedMoviesPage } from "@/features/movies/ui/TopRatedMoviesPage";
import { UpcomingMoviesPage } from "@/features/movies/ui/UpcomingMoviesPage";
import { NowPlayingMoviesPage } from "@/features/movies/ui/NowPlayingMoviesPage";
import { SearchPage } from "@/features/movies/ui/SearchPage";
import { FavoritesPage } from "@/features/movies/ui/FavoritesPage";
import { FilteredMoviesPage } from "@/features/movies/ui/FilteredMoviesPage";
import { MovieDetailsPage } from "@/features/movies/ui/MovieDetailsPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MoviesLayout />}>
                <Route index element={<Navigate to="/movies/popular" replace />} />
                <Route path="popular" element={<PopularMoviesPage />} />
                <Route path="top-rated" element={<TopRatedMoviesPage />} />
                <Route path="upcoming" element={<UpcomingMoviesPage />} />
                <Route path="now-playing" element={<NowPlayingMoviesPage />} />
            </Route>
            <Route path="/filtered-movies" element={<FilteredMoviesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
        </Routes>
    );
};