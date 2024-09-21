"use client";
import * as React from "react";
import { useEffect, useState } from "react";

import Card from './components/Card';
import { MovieAttributes } from "./types/types";

interface Movie {
  id: number;
  title: string;
  description?: string;
  release_date?: string;
  duration?: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data = await response.json();
        setMovies(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleUpdateMovie = async (updatedMovie: MovieAttributes) => {
    try {
      const response = await fetch(`/api/movies/${updatedMovie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du film");
      }
      const updatedMovieData = await response.json();
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovieData.id ? updatedMovieData : movie
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? `${error}` + "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleDeleteMovie = async (movieId: number) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du film");
      }
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? `${error}` + "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const assignRandomType = (movieId: number): string => {
    const types = ["Romance", "Comédie", "Horreur", "Science-fiction"];
    const storedTypes = JSON.parse(localStorage.getItem('movieTypes') || '{}');

    if (storedTypes[movieId]) {
      return storedTypes[movieId];
    }

    const randomIndex = Math.floor(Math.random() * types.length);
    const assignedType = types[randomIndex];
    storedTypes[movieId] = assignedType;
    localStorage.setItem('movieTypes', JSON.stringify(storedTypes));

    return assignedType;
  };

  return (
    <div>
      <div className="flex justify-center bg-black">
        <img src="/AccueilSimplo.png" alt="Cinema" style={{ width: "auto", height: "200" }} />
      </div>
      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description || 'No description available'}
            type={assignRandomType(movie.id)}
            release_date={movie.release_date}
            duration={movie.duration}
            created_at={new Date().toISOString()}
            updated_at={new Date().toISOString()}
            onModify={handleUpdateMovie}
            onDelete={handleDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
}