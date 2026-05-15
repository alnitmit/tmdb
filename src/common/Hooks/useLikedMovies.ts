import { useState, useEffect } from "react";

const STORAGE_KEY = "likedMovies";

export function useLikedMovies() {
    const [likedMovieIds, setLikedMovieIds] = useState<Set<number>>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...likedMovieIds]));
    }, [likedMovieIds]);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                setLikedMovieIds(new Set(JSON.parse(e.newValue)));
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const toggleLike = (movieId: number) => {
        setLikedMovieIds((prev) => {
            const next = new Set(prev);
            next.has(movieId) ? next.delete(movieId) : next.add(movieId);
            return next;
        });
    };

    return { likedMovieIds, toggleLike };
}