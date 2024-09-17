import React, { useState } from "react";
import {
  FaFilm,
  FaChair,
  FaCalendarAlt,
  FaClock,
  FaHourglassStart,
} from "react-icons/fa";

interface HallAttributes {
  id: number;
  name: string;
  capacity: number;
}

interface Screening {
  movieId: number;
  hallId: number;
  date: Date;
  startTime: string;
  duration: number;
}

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

export const ScheduleScreeningForm: React.FC<{
  movies: MovieAttributes[];
  halls: HallAttributes[];
  onSchedule: (screening: Screening) => void;
}> = ({ movies, halls, onSchedule }) => {
  const [movieId, setMovieId] = useState<number | null>(null);
  const [hallId, setHallId] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(120);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (movieId && hallId && date && startTime) {
      const screening = {
        movieId,
        hallId,
        date: new Date(`${date}T${startTime}:00`),
        startTime,
        duration,
      };
      onSchedule(screening);
      // Clear form after submission
      setMovieId(null);
      setHallId(null);
      setDate("");
      setStartTime("");
      setDuration(120);
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Planifier une nouvelle séance
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-gray-900 flex items-center">
            <FaFilm className="text-blue-600 mr-2" /> Film
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={movieId || ""}
            onChange={(e) => setMovieId(Number(e.target.value))}
          >
            <option value="">Sélectionnez un film</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className=" text-gray-900 flex items-center">
            <FaChair className="text-green-600 mr-2" /> Salle
          </label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={hallId || ""}
            onChange={(e) => setHallId(Number(e.target.value))}
          >
            <option value="">Sélectionnez une salle</option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>
                {hall.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-gray-900 flex items-center">
            <FaCalendarAlt className="text-yellow-500 mr-2" /> Date
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className=" text-gray-900 flex items-center">
            <FaClock className="text-purple-600 mr-2" /> Heure de début
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border rounded-md"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className=" text-gray-900 flex items-center">
            <FaHourglassStart className="text-red-600 mr-2" /> Durée (minutes)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Durée en minutes"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
        >
          Planifier la séance
        </button>
      </form>
    </div>
  );
};
