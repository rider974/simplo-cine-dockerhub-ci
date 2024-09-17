
"use client";
import Image from "next/image";
import * as React from "react";
import { FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import { SlTag } from "react-icons/sl";

import { IconType } from "../page";

interface CardProps {
    title: string;
    description?: string;
    image: string;
    type: string;
    icons: IconType[]; // Liste d'icônes
    release_date?: string;
    duration?: number;
    created_at: string;
    updated_at: string;
}

const Card: React.FC<CardProps> = ({ title,
    description,
    image,
    type,
    icons,
    release_date,
    duration,
    created_at,
    updated_at, }) => {

    const renderIcon = (icon: IconType) => {
        switch (icon) {
            case IconType.view:
                return <FaRegEye />;
            case IconType.edit:
                return <FaEdit />;
            case IconType.delete:
                return <FaTrash />;
            default:
                return null;
        }
    };
    return (
        <div className="card max-w-sm rounded overflow-hidden shadow-lg">
            <div className="card-header">
                <Image src={image} alt="Movie Poster" width={300} height={300} className="w-full" />
            </div>
            <div className="icons text-gray-700 flex justify-end space-x-2 p-2">
                {icons.map((icon, index) => (
                    <button key={index} className="inline-block">{renderIcon(icon)}</button>
                ))}
            </div>
            <div className="card-body p-4">
                <div className="movie-info">
                    <h3 className="text-xl text-gray-700 text-gray-700 font-bold mb-2">{title}</h3>
                    <p className="text-gray-700 text-base">{description}</p>
                    <p className="text-gray-700 text-base">{release_date}</p>
                    <p className="text-gray-700 text-base">{duration} min</p>
                    <p className="text-gray-700 text-base">{new Date(created_at).toLocaleDateString()}</p>
                    <p className="text-gray-700 text-base">{new Date(updated_at).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="card-footer p-4 flex justify-end">
                <span className="flex bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"><SlTag />{type}</span>
            </div>
        </div>
    );
};

export default Card;