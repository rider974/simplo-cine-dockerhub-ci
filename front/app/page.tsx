"use client";
import { useEffect, useState } from "react";

import Card from './components/Card';

interface Movie {
  id: number;
  title: string;
  description?: string;
  image?: string;
  type: string;
  release_date?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [error] = useState<string | null>(null);

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
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } else {
          setError("An unknown error occurred");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // useEffect(() => {
  //   const hardcodedMovies: Movie[] = [
  //     {
  //       id: 1,
  //       title: "Inception",
  //       description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
  //       image: "/images/inception.jpg",
  //       type: "Sci-Fi",
  //       release_date: "2010-07-16",
  //       duration: 148,
  //       created_at: "2023-01-01T00:00:00Z",
  //       updated_at: "2023-01-01T00:00:00Z",
  //     },
  //     {
  //       id: 2,
  //       title: "The Matrix",
  //       description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
  //       image: "/images/matrix.jpg",
  //       type: "Action",
  //       release_date: "1999-03-31",
  //       duration: 136,
  //       created_at: "2023-01-01T00:00:00Z",
  //       updated_at: "2023-01-01T00:00:00Z",
  //     },
  //     {
  //       id: 3,
  //       title: "Interstellar",
  //       description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  //       image: "/images/interstellar.jpg",
  //       type: "Adventure",
  //       release_date: "2014-11-07",
  //       duration: 169,
  //       created_at: "2023-01-01T00:00:00Z",
  //       updated_at: "2023-01-01T00:00:00Z",
  //     },
  //   ];

  //   setMovies(hardcodedMovies);
  //   setLoading(false);
  // }, []);

  return (
    <div>
      <div className="flex justify-center bg-black">
        <img src="/AccueilSimplo.png" alt="Cinema" style={{ width: "auto", height: "200" }} />
      </div>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", textAlign: "center" }}>Bienvenue sur Simplon Cine</h1>
      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            description={movie.description || 'No description available'}
            image={'/testMovieImage.jpg'}
            type={movie.type || 'Unknown type'}
            release_date={movie.release_date}
            duration={movie.duration}
            created_at={movie.created_at}
            updated_at={movie.updated_at} id={0} />
        ))}
      </div>
    </div>
  );
}
