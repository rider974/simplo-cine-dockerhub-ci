"use client";

import * as React from "react";

import MovieImage from './MovieImage'; 
import { SlTag } from 'react-icons/sl';

interface CardProps {
    title: string;
    description?: string;
    image: string;
    type: string;
    release_date?: string;
    duration?: number;
    created_at: string;
    updated_at: string;
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    image,
    type,
    release_date,
    duration,
    created_at,
    updated_at
}) => {
    const icons: any[] = []; // Define your icons array or remove if not needed

    const renderIcon = (icon: any) => {
        return <span>{icon}</span>;
    };

    return (
        <div className="card max-w-sm rounded overflow-hidden shadow-lg">
            <div className="card-header">
                <MovieImage src={image} alt={`${title} poster`} />  {/* Utilisation correcte de MovieImage */}
            </div>
            <div className="icons text-gray-700 flex justify-end space-x-2 p-2">
                {icons.map((icon, index) => (
                    <button key={index} className="inline-block">{renderIcon(icon)}</button>
                ))}
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
                    <SlTag />{type}
                </span>
            </div>
        </div>
    );
};

export default Card;
