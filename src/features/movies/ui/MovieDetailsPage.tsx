import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Chip,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useGetMovieByIdQuery, useGetMovieCreditsQuery } from "@/features/movies/api/tmdbApi";
import { getImageUrl } from "@/features/movies/model/movieModel";
import classes from "@/features/movies/ui/Movies.module.css";

export const MovieDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const movieId = Number(id);
    const navigate = useNavigate();

    const theme = useTheme();
    const mode = theme.palette.mode;
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { data: movie, isLoading, isError } = useGetMovieByIdQuery(movieId);
    const { data: credits } = useGetMovieCreditsQuery(movieId);

    if (isLoading) {
        return (
            <Container sx={{ py: 4, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isError || !movie) {
        return (
            <Container sx={{ py: 4 }}>
                <Alert severity="error">Failed to load movie details</Alert>
            </Container>
        );
    }

    const poster = getImageUrl(movie.posterPath);

    return (
        <Box className={mode === "light" ? classes.light : ""}>
            <Container sx={{ py: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        className={classes.sectionViewMore}
                    >
                        ← Back
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: 4,
                        alignItems: "flex-start",
                    }}
                >
                    <Box
                        sx={{
                            width: isMobile ? "100%" : 200,
                            flexShrink: 0,
                            alignSelf: isMobile ? "center" : "flex-start",
                        }}
                    >
                        {poster ? (
                            <Box
                                component="img"
                                src={poster}
                                alt={movie.title}
                                sx={{
                                    width: "100%",
                                    maxWidth: 200,
                                    borderRadius: 2,
                                    boxShadow: 4,
                                    display: "block",
                                    mx: "auto",
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: "100%",
                                    maxWidth: 200,
                                    aspectRatio: "0.68",
                                    bgcolor: "grey.800",
                                    borderRadius: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                }}
                            >
                                <Typography color="white">{movie.title}</Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            {movie.title}
                        </Typography>
                        {movie.genres && (
                            <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                {movie.genres.map((genre) => (
                                    <Chip key={genre.id} label={genre.name} variant="outlined" color="primary" />
                                ))}
                            </Box>
                        )}
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {movie.overview}
                        </Typography>
                    </Box>
                </Box>

                {credits?.cast && credits.cast.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Cast
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                            {credits.cast
                                .filter((actor) => actor.profilePath)
                                .slice(0, 15)
                                .map((actor) => (
                                    <Box key={actor.id} sx={{ flex: "0 0 100px", textAlign: "center" }}>
                                        <Box
                                            component="img"
                                            src={getImageUrl(actor.profilePath!)}
                                            alt={actor.name}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                mb: 0.5,
                                                mx: "auto",
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                            noWrap
                                            sx={{ maxWidth: 100 }}
                                        >
                                            {actor.name}
                                        </Typography>
                                    </Box>
                                ))}
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
};