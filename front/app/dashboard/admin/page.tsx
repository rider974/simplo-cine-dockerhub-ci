// /* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { MovieCalendar } from "../../components/resources/MovieCalendar";
import { MovieTable } from "../../components/resources/MovieTable";
import { AddMovieCard } from "@/app/components/resources/AddMovieCard";

interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  release_date?: Date;
  duration?: number;
  created_at?: Date;
  updated_at?: Date;
  poster?: File | null;
}

export default function AdminDashboard() {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await fetch("/api/movies");
  //       if (!response.ok) {
  //         throw new Error("Erreur lors du fetch des films");
  //       }
  //       const data = await response.json();
  //       setMovies(data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError("Une erreur inconnue est survenue");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  useEffect(() => {
    // Données en dur pour tester le calendrier, avec des dates au format `Date` au lieu de `string`
    const hardCodedMovies: MovieAttributes[] = [
      {
        id: 1,
        title: "Inception",
        description:
          "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction : sa spécialité consiste à s'approprier les secrets les plus précieux d'un individu...",
        release_date: new Date("2024-09-22T06:00:00Z"),
        duration: 180,
        created_at: new Date("2024-09-20T00:00:00Z"),
        updated_at: new Date("2024-09-20T00:00:00Z"),
      },
      {
        id: 2,
        title: "Flight to Paris",
        description: "Vol de JFK à CDG",
        release_date: new Date("2024-09-22T07:30:00Z"),
        duration: 120,
        created_at: new Date("2024-09-20T00:00:00Z"),
        updated_at: new Date("2024-09-20T00:00:00Z"),
      },
      {
        id: 3,
        title: "Sightseeing",
        description: "Visite de la Tour Eiffel",
        release_date: new Date("2024-09-22T11:00:00Z"),
        duration: 90,
        created_at: new Date("2024-09-20T00:00:00Z"),
        updated_at: new Date("2024-09-20T00:00:00Z"),
      },
    ];

    setMovies(hardCodedMovies);
    setLoading(false);
  }, []);

  const events = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    start: new Date(movie.release_date || movie.created_at || ""),
    end: new Date(
      moment(movie.release_date || movie.created_at)
        .add(movie.duration || 120, "minutes")
        .toDate()
    ),
    desc: movie.description || "",
  }));

  const handleSelectEvent = (event: any) => {
    alert(`Selected movie: ${event.title}`);
  };

  const handleAddMovie = (newMovie: MovieAttributes) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Séances de Films</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="lg:w-2/3 w-full">
            <MovieCalendar events={events} onSelectEvent={handleSelectEvent} />
          </div>
          <div className="lg:w-1/3 w-full mt-4 lg:mt-0">
            <AddMovieCard onAddMovie={handleAddMovie} />
          </div>
        </div>
      )}

      <h2 className="text-xl text-gray-900 font-semibold mb-4 mt-6">
        Liste des Films
      </h2>
      <MovieTable movies={movies} />
    </div>
  );
}
