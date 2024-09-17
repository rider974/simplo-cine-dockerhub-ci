"use client";

import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Movie {
  id: number;
  title: string;
  description?: string;
  release_date?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
}

const localizer = momentLocalizer(moment);

export default function AdminDashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
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
    // Données en dur pour tester le calendrier
    const hardCodedMovies: Movie[] = [
      {
        id: 1,
        title: "Inception",
        description:
          "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction : sa spécialité consiste à s'approprier les secrets les plus précieux d'un individu, enfouis au plus profond de son subconscient, pendant qu'il rêve et que son esprit est particulièrement vulnérable.... ",
        release_date: "2024-09-22T06:00:00Z",
        duration: 180,
        created_at: "2024-09-20T00:00:00Z",
        updated_at: "2024-09-20T00:00:00Z",
      },
      {
        id: 2,
        title: "Flight to Paris",
        description: "Vol de JFK à CDG",
        release_date: "2024-09-22T07:30:00Z",
        duration: 120,
        created_at: "2024-09-20T00:00:00Z",
        updated_at: "2024-09-20T00:00:00Z",
      },
      {
        id: 3,
        title: "Sightseeing",
        description: "Visite de la Tour Eiffel",
        release_date: "2024-09-22T11:00:00Z",
        duration: 90,
        created_at: "2024-09-20T00:00:00Z",
        updated_at: "2024-09-20T00:00:00Z",
      },
    ];

    setMovies(hardCodedMovies);
    setLoading(false);
  }, []);
  const events = movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
    start: new Date(movie.release_date || movie.created_at),
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

  return (
    <div className="bg-[#ECEFF1] min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Séances de Films</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="mb-8">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              height: 600,
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#42a5f5",
                color: "white",
                borderRadius: "4px",
                padding: "2px 6px",
                fontSize: "14px",
              },
            })}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      )}

      <h2 className="text-xl text-gray-900 font-semibold mb-4">
        Liste des Films
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#ECEFF1] rounded-md overflow-hidden shadow-lg hidden sm:table">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Release Date</th>
              <th className="py-3 px-6">Duration (min)</th>
              <th className="py-3 px-6">Created At</th>
              <th className="py-3 px-6">Updated At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {movies.map((movie) => (
              <tr
                key={movie.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{movie.id}</td>
                <td className="py-3 px-6">{movie.title}</td>
                <td className="py-3 px-6">{movie.description || "N/A"}</td>
                <td className="py-3 px-6">{movie.release_date || "N/A"}</td>
                <td className="py-3 px-6">{movie.duration || "N/A"}</td>
                <td className="py-3 px-6">{movie.created_at}</td>
                <td className="py-3 px-6">{movie.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Card View for small screens */}
        <div className="sm:hidden space-y-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="text-gray-800 font-bold">
                ID: <span className="font-normal">{movie.id}</span>
              </div>
              <div className="text-gray-800 font-bold">
                Title: <span className="font-normal">{movie.title}</span>
              </div>
              <div className="text-gray-800 font-bold">
                Description:{" "}
                <span className="font-normal">
                  {movie.description || "N/A"}
                </span>
              </div>
              <div className="text-gray-800 font-bold">
                Release Date:{" "}
                <span className="font-normal">
                  {movie.release_date || "N/A"}
                </span>
              </div>
              <div className="text-gray-800 font-bold">
                Duration (min):{" "}
                <span className="font-normal">{movie.duration || "N/A"}</span>
              </div>
              <div className="text-gray-800 font-bold">
                Created At:{" "}
                <span className="font-normal">{movie.created_at}</span>
              </div>
              <div className="text-gray-800 font-bold">
                Updated At:{" "}
                <span className="font-normal">{movie.updated_at}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
