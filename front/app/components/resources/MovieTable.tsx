import React from "react";

import { MovieAttributes } from "../../types/types";

interface MovieCardProps {
  movies: MovieAttributes[];
}

export const MovieCard: React.FC<MovieCardProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5 px-5">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
          <p className="text-gray-700 mt-2">
            {movie.description || "Pas de description disponible."}
          </p>
          <p className="text-gray-600 mt-4">
            <span className="font-semibold">Date de sortie : </span>
            {movie.release_date?.toLocaleDateString() || "Inconnue"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Durée : </span>
            {movie.duration || 0} minutes
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Créé le : </span>
            {movie.created_at?.toLocaleDateString() || "Inconnue"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Mis à jour le : </span>
            {movie.updated_at?.toLocaleDateString() || "Inconnue"}
          </p>
        </div>
      ))}
    </div>
  );
};
