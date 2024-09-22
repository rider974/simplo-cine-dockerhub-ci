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
import { Spinner } from "../../components/resources/Spinner";
import { MovieAttributes, HallAttributes, MovieEvent } from "../../types/types";

export default function AdminDashboard() {
  const [movies, setMovies] = useState<MovieAttributes[]>([]);
  const [halls, setHalls] = useState<HallAttributes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<MovieAttributes | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État pour les événements du calendrier
  const [events, setEvents] = useState<MovieEvent[]>([]);

  // Fetch initial pour récupérer les films
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data: MovieAttributes[] = await response.json();
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
        const response = await fetch("/api/rooms");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des salles.");
        }
        const data: HallAttributes[] = await response.json();
        setHalls(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Erreur lors de la récupération des salles: ${err.message}`);
        } else {
          setError("Erreur inconnue lors de la récupération des salles.");
        }
      }
    };

    fetchHalls();
  }, []);

  // Met à jour les événements du calendrier à chaque modification des films
  useEffect(() => {
    const updatedEvents: MovieEvent[] = movies.map((movie) => {
      const releaseDate = new Date(movie.release_date || "");
      const start = isNaN(releaseDate.getTime()) ? new Date() : releaseDate;

      return {
        id: movie.id,
        title: movie.title,
        start: start,
        end: new Date(
          moment(start)
            .add(movie.duration || 120, "minutes")
            .toDate()
        ),
        desc: movie.description || "",
      };
    });

    setEvents(updatedEvents);
  }, [movies]);

  const handleSelectEvent = (event: MovieEvent) => {
    const movie = movies.find((m) => m.id === event.id);
    if (movie) {
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  };

  const handleAddMovie = async (newMovie: MovieAttributes) => {
    try {
      if (!newMovie.title || !newMovie.release_date || !newMovie.duration) {
        alert("Veuillez remplir tous les champs requis.");
        return;
      }

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
      setMovies((prevMovies) => [...prevMovies, addedMovie]);
    } catch (err) {
      console.error("Erreur lors de l'ajout du film :", err);
      setError("An unknown error occurred");
    }
  };

  const handleAddHall = (newHall: HallAttributes) => {
    setHalls((prevHalls) => [...prevHalls, newHall]);
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
        Gestion des Films et des Salles
      </h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500">Erreur : {error}</p>}

      {!loading && !error && (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne 1: Calendrier et Liste des Films */}
          <div className="lg:col-span-2 space-y-6 relative">
            <h2 className="text-xl pl-6 font-medium text-gray-900 py-2">
              Calendrier des Films
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
              <AddMovieCard onAddMovie={handleAddMovie} />
            </div>
            <div className="rounded-lg shadow-md">
              <AddHallCard onAddHall={handleAddHall} halls={halls} />
              {/* Ajout du composant ScheduleScreeningForm ici */}
              <div className="rounded-lg shadow-md">
                <ScheduleScreeningForm
                  movies={movies}
                  halls={halls}
                  onSchedule={() => {
                    // Ne fait rien pour le moment
                    alert("Formulaire de planification de séance affiché !");
                  }}
                />
              </div>
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
