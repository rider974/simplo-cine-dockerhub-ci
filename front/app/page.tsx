"use client";
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
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
  const [userRole, setUserRole] = useState<string | null>(null);


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


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("/api/userRole");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch du rôle utilisateur");
        }
        const data = await response.json();
        setUserRole(data.role);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchUserRole();
  }, []);

  const isUserLoggedIn = (): boolean => {
    return userRole !== null;
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  console.log('userRole', userRole);
  console.log('isUserLoggedIn', isUserLoggedIn());
  console.log('isAdmin', isAdmin());

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
      {loading && <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>}
      {error && <Message severity="error" text={`Error: ${error}`} />}

      <h2 className="text-2xl font-bold text-center my-4">À la Une</h2>

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
            isAdmin={isAdmin}
            onModify={handleUpdateMovie}
            onDelete={handleDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
}