import { Box, Button, CircularProgress, Typography, Alert } from "@mui/material";
import type { MovieCard as MovieCardType } from "@/features/movies/api/tmdbApi.types";
import classes from "./MainPage.module.css";
import {MoviePosterCard} from "@/common/components/MoviePosterCard/MoviePosterCard.tsx";

export const MoviesSection = ({
                                  title,
                                  movies,
                                  isLoading,
                                  isError,
                                  likedMovieIds,
                                  onToggleLike,
                              }: {
    title: string;
    movies?: MovieCardType[];
    isLoading: boolean;
    isError: boolean;
    likedMovieIds: Set<number>;
    onToggleLike: (movieId: number) => void;
}) => (
    <Box className={classes.section}>
        <Box className={classes.sectionHeader}>
            <Typography variant="h4" className={classes.sectionTitle}>
                {title}
            </Typography>
            <Button variant="outlined" className={classes.sectionViewMore}>
                View more
            </Button>
        </Box>
        {isLoading && (
            <Box className={classes.loaderBox}>
                <CircularProgress />
            </Box>
        )}
        {isError && (
            <Alert severity="error" className={classes.errorBox}>
                TMDB request failed. Check your token or API key in `.env`.
            </Alert>
        )}
        {!isLoading && !isError && movies && (
            <Box className={classes.grid}>
                {movies.slice(0, 6).map((movie) => (
                    <MoviePosterCard
                        key={movie.id}
                        movie={movie}
                        liked={likedMovieIds.has(movie.id)}
                        onToggleLike={onToggleLike}
                    />
                ))}
            </Box>
        )}
    </Box>
);