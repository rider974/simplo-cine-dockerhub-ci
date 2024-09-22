"use client";

import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";

import { AddHallCard } from "../../components/resources/AddHallCard";
import { AddMovieCard } from "../../components/resources/AddMovieCard";
import { MovieCalendar } from "../../components/resources/MovieCalendar";
import { MovieCard } from "../../components/resources/MovieTable";
import { MovieView } from "../../components/resources/MovieView";
import { ScheduleScreeningForm } from "../../components/resources/ScheduleScreeningForm";
import { MovieAttributes, HallAttributes } from "../../types/types";

export default function AdminDashboard() {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [halls, setHalls] = useState<HallAttributes[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [screenings, setScreenings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieAttributes | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour les événements du calendrier
  const [events, setEvents] = useState<any[]>([]);

  // Fetch initial pour récupérer les films
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

  // Fetch initial pour récupérer les salles
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await fetch("/api/rooms-service");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des salles.");
        }
        const data = await response.json();
        setHalls(data);
      } catch (err) {
        setError("Erreur lors de la récupération des salles.");
      }
    };

    fetchHalls();
  }, []);

  // Met à jour les événements du calendrier à chaque modification des films
  useEffect(() => {
    const updatedEvents = screenings
      .map((screening) => {
        const movie = movies.find((m) => m.id === screening.movie_id);
        const hall = halls.find((h) => h.id === screening.hall_id);
        if (!movie || !hall) return null;

        const start = new Date(screening.start_time);

        return {
          id: movie.id,
          title: `${movie.title} - ${hall.name}`,
          start: start,
          end: new Date(
            moment(start)
              .add(movie.duration || 120, "minutes")
              .toDate()
          ),
          desc: movie.description || "",
        };
      })
      .filter((event) => event !== null);

    setEvents(updatedEvents as any[]);
  }, [movies, screenings, halls]);

  // Gestion de la sélection d'un événement dans le calendrier
  const handleSelectEvent = (event: any) => {
    const movie = movies.find((m) => m.id === event.id);
    if (movie) {
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  };

  const handleAddMovie = async (newMovie: MovieAttributes) => {
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du film à la base de données.");
      }

      const addedMovie = await response.json();
      setMovies([...movies, addedMovie]);
    } catch (err) {
      console.error("Erreur lors de l'ajout du film :", err);
      setError("An unknown error occurred");
    }
  };

  const handleAddHall = (newHall: HallAttributes) => {
    setHalls([...halls, newHall]);
  };

  const handleScheduleScreening = (newScreening: any) => {
    setScreenings([...screenings, newScreening]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleModifyMovie = (updatedMovie: MovieAttributes) => {
    setMovies(
      movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const handleArchiveMovie = () => {
    if (selectedMovie) {
      setMovies(movies.filter((movie) => movie.id !== selectedMovie.id));
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Gestion des Séances de Films
      </h1>

      {loading && <p>Chargement des films...</p>}
      {error && <p className="text-red-500">Erreur : {error}</p>}

      {!loading && !error && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1: Calendrier et Liste des Films */}
          <div className="lg:col-span-2 space-y-6 relative">
            <h2 className="text-xl pl-6 font-medium text-gray-900 py-2">
              Calendrier des Séances
            </h2>
            <div className="bg-orange-500 absolute top-9 left-2 w-[calc(20%)] h-2"></div>
            <MovieCalendar events={events} onSelectEvent={handleSelectEvent} />

            <div className="rounded-lg bg-gray-300 relative">
              <h2 className="text-xl pl-6 text-gray-900 font-medium py-2">
                Liste des Films
              </h2>
              <div className="bg-orange-500 absolute top-9 left-2 w-[calc(20%)] h-2"></div>
              <MovieCard movies={movies} />
            </div>
          </div>

          {/* Colonne 2: Formulaires à droite */}
          <div className="space-y-6">
            <div className="rounded-lg shadow-md">
              <AddMovieCard onAddMovie={handleAddMovie} halls={halls} />
            </div>
            <div className="rounded-lg shadow-md">
              <AddHallCard onAddHall={handleAddHall} />
            </div>
            <div className="rounded-lg shadow-md">
              <ScheduleScreeningForm
                movies={movies}
                halls={halls}
                onSchedule={handleScheduleScreening}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedMovie && (
        <MovieView
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
          onModify={handleModifyMovie}
          onArchive={handleArchiveMovie}
          availableHalls={halls}
          isAdmin={() => true}
        />
      )}
    </div>
  );
}
