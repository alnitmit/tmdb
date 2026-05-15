import { Container, Typography } from "@mui/material";
import { useGetMovieByIdQuery } from "@/features/movies/api/tmdbApi";
import { MoviePosterCard } from "@/common/components/MoviePosterCard/MoviePosterCard.tsx";
import { useLikedMovies } from "@/common/Hooks/useLikedMovies.ts";

export const FavoritesPage = () => {
    const { likedMovieIds, toggleLike } = useLikedMovies();
    const ids = [...likedMovieIds];

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Your Favorite Movies
            </Typography>
            {ids.length === 0 ? (
                <Typography>No favorite movies yet.</Typography>
            ) : (
                <MoviesGridFromIds ids={ids} likedMovieIds={likedMovieIds} onToggleLike={toggleLike} />
            )}
        </Container>
    );
};

const MoviesGridFromIds = ({
                               ids,
                               likedMovieIds,
                               onToggleLike,
                           }: {
    ids: number[];
    likedMovieIds: Set<number>;
    onToggleLike: (id: number) => void;
}) => {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
            {ids.map((id) => (
                <FavoriteMovieItem
                    key={id}
                    movieId={id}
                    liked={likedMovieIds.has(id)}
                    onToggleLike={onToggleLike}
                />
            ))}
        </div>
    );
};

const FavoriteMovieItem = ({
                               movieId,
                               liked,
                               onToggleLike,
                           }: {
    movieId: number;
    liked: boolean;
    onToggleLike: (id: number) => void;
}) => {
    const { data: movie, isLoading, isError } = useGetMovieByIdQuery(movieId);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !movie) return <div>Failed to load</div>;

    return (
        <MoviePosterCard movie={movie} liked={liked} onToggleLike={onToggleLike} />
    );
};