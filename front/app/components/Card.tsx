"use client";

import * as React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { SlTag } from "react-icons/sl";

import MovieImage from "./MovieImage";
import { MovieView } from "./resources/MovieView";

interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  release_date?: Date;
  duration?: number;
}

interface CardProps {
  id: number;
  title: string;
  description?: string;
  type: string;
  release_date?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  iconDisabled?: boolean;
  isAdmin: () => boolean;
  onModify?: (updatedMovie: MovieAttributes) => Promise<void>;
  onDelete?: (movieId: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  type,
  release_date,
  duration,
  created_at,
  updated_at,
  iconDisabled,
  isAdmin,
  onModify,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieAttributes | null>(
    null
  );

  const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const handleSelectEvent = () => {
    const movie = {
      id,
      title,
      description,
      type,
      release_date: release_date ? new Date(release_date) : undefined,
      duration,
      created_at: new Date(created_at),
      updated_at: new Date(updated_at),
      poster: null,
    };
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleModifyMovie = (updatedMovie: MovieAttributes) => {
    if (onModify) {
      onModify(updatedMovie);
    }
    handleCloseModal();
  };

  const handleDeleteMovie = () => {
    if (selectedMovie) {
      if (onDelete) {
        onDelete(selectedMovie.id);
      }
      handleCloseModal();
    }
  };

  const assignImageByType = (type: string): string => {
    switch (type) {
      case "Romance":
        return "/romance.png";
      case "Comédie":
        return "/comedie.png";
      case "Horreur":
        return "/horreur.png";
      case "Science-fiction":
        return "/scienceFiction.png";
      default:
        return "/testMovieImage.png";
    }
  };

  return (
    <>
      <div
        className={`card max-w-sm rounded overflow-hidden shadow-lg relative ${isModalOpen ? "hidden" : ""}`}
      >
        <div className="card-header">
          <MovieImage
            className="w-auto h-80"
            src={assignImageByType(type)}
            alt={`${title} poster`}
          />
        </div>
        <div className="icons text-gray-700 flex justify-end space-x-2 p-2">
          {!iconDisabled && (
            <button className="inline-block" onClick={handleSelectEvent}>
              <FaEye />
            </button>
          )}
        </div>
        <div className="card-body p-4">
          <div className="movie-info">
            <h3 className="text-xl text-gray-700 font-bold mb-2">
              {decodeHtmlEntities(title.toUpperCase())}
            </h3>

            {isAdmin() && (
              <>
                <h4 className="text-gray-700 text-base font-semibold mb-2">
                  Description
                </h4>
                {description && (
                  <p className="text-gray-700 text-base">
                    {decodeHtmlEntities(description)}
                  </p>
                )}
              </>
            )}

            {!iconDisabled && (
              <div className="flex flex-wrap">
                <div className="w-1/2">
                  <h4 className="text-gray-700 text-base font-semibold mb-2">
                    Date de sortie
                  </h4>
                  <p className="text-gray-700 text-base">
                    {release_date
                      ? new Date(release_date).toLocaleDateString()
                      : "Date non disponible"}
                  </p>
                </div>
                <div className="w-1/2">
                  <h4 className="text-gray-700 text-base font-semibold mb-2">
                    Durée
                  </h4>
                  {duration !== undefined && (
                    <p className="text-gray-700 text-base">{duration} min</p>
                  )}
                </div>
              </div>
            )}

            {isAdmin() && (
              <>
                <p className="text-gray-700 text-base">
                  {new Date(created_at).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-base">
                  {new Date(updated_at).toLocaleDateString()}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer avec le genre */}
        <div className="absolute bottom-0 right-0 m-4 flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          <SlTag />
          <span>{type}</span>
        </div>
      </div>

      {selectedMovie && (
        <MovieView
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
          onModify={handleModifyMovie}
          onDelete={handleDeleteMovie}
          availableHalls={[]}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default Card;
