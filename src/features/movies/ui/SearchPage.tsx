import { useState, type FormEvent, useEffect } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { useSearchMoviesQuery } from "@/features/movies/api/tmdbApi";
import { MoviesSection } from "@/common/components/MoviesSection/MoviesSection";
import { useLikedMovies } from "@/common/Hooks/useLikedMovies";
import { useDeferredValue } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import classes from "@/features/movies/ui/Movies.module.css";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get("query") || "";

    const [searchValue, setSearchValue] = useState(queryFromUrl);
    const [submittedQuery, setSubmittedQuery] = useState(queryFromUrl);

    useEffect(() => {
        setSearchValue(queryFromUrl);
        setSubmittedQuery(queryFromUrl);
    }, [queryFromUrl]);

    const deferredQuery = useDeferredValue(submittedQuery.trim());

    const { data, isLoading, isError, isFetching } = useSearchMoviesQuery(
        deferredQuery ? { query: deferredQuery } : skipToken
    );
    const { likedMovieIds, toggleLike } = useLikedMovies();

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (!trimmed) return;
        setSubmittedQuery(trimmed);
        setSearchParams({ query: trimmed });
    };

    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
        <Box className={mode === "light" ? classes.light : ""}>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Search Movies
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSearchSubmit}
                    className={classes.searchForm}
                >
                    <TextField
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search for a movie"
                        className={classes.searchField}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!searchValue.trim()}
                        className={classes.searchButton}
                    >
                        Search
                    </Button>
                </Box>

                {deferredQuery && (
                    <Box sx={{ mt: 4 }}>
                        <MoviesSection
                            title={`Results for "${deferredQuery}"`}
                            movies={data?.results}
                            isLoading={isLoading || isFetching}
                            isError={isError}
                            likedMovieIds={likedMovieIds}
                            onToggleLike={toggleLike}
                            showViewMore={false}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};