"use client";

import * as React from "react";
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { SlTag } from 'react-icons/sl';

import MovieImage from './MovieImage';
import { MovieView } from './resources/MovieView';

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
    image: string;
    type: () => string;
    release_date?: string;
    duration?: number;
    created_at: string;
    updated_at: string;
    onModify: (updatedMovie: MovieAttributes) => Promise<void>;
    onDelete: (movieId: number) => void;
}

const Card: React.FC<CardProps> = ({
    id,
    title,
    description,
    image,
    type,
    release_date,
    duration,
    created_at,
    updated_at,
    onModify,
    onDelete
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieAttributes | null>(null);

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
            poster: null
        };
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const handleModifyMovie = (updatedMovie: MovieAttributes) => {
        onModify(updatedMovie);
        handleCloseModal();
    };

    const handleArchiveMovie = () => {
        if (selectedMovie) {
            onDelete(selectedMovie.id);
            handleCloseModal();
        }
    };

    return (
        <>
            <div className={`card max-w-sm rounded overflow-hidden shadow-lg ${isModalOpen ? 'hidden' : ''}`}>
                <div className="card-header">
                    <MovieImage src={image} alt={`${title} poster`} />
                </div>
                <div className="icons text-gray-700 flex justify-end space-x-2 p-2">
                    <button className="inline-block" onClick={handleSelectEvent}>{<FaEye />}</button>
                </div>
                <div className="card-body p-4 h-72">
                    <div className="movie-info">
                        <h3 className="text-xl text-gray-700 font-bold mb-2">{title}</h3>
                        {description && <p className="text-gray-700 text-base">{description}</p>}
                        {release_date && <p className="text-gray-700 text-base">{release_date}</p>}
                        {duration !== undefined && <p className="text-gray-700 text-base">{duration} min</p>}
                        <p className="text-gray-700 text-base">{new Date(created_at).toLocaleDateString()}</p>
                        <p className="text-gray-700 text-base">{new Date(updated_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="card-footer p-4 flex justify-end">
                    <span className="flex bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        <SlTag />{type()}
                    </span>
                </div>
            </div>

            {selectedMovie && (
                <MovieView
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    movie={selectedMovie}
                    onModify={handleModifyMovie}
                    onArchive={handleArchiveMovie}
                    availableHalls={[]}
                />
            )}
        </>
    );
};

export default Card;