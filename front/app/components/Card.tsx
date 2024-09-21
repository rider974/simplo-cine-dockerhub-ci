"use client";

import { Dialog } from 'primereact/dialog';
import * as React from "react";
import { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { SlTag } from 'react-icons/sl';

import MovieImage from './MovieImage';
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const icons = [
        { name: 'view', component: FaEye },
        { name: 'edit', component: FaEdit },
        { name: 'delete', component: FaTrash }
    ];

    const renderIcon = (icon: { name: string, component: React.ComponentType }) => {
        const IconComponent = icon.component;
        return <IconComponent />;
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const actionIconOnClick = (icon: { name: string }, e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (icon.name === 'view') {
            setVisible(true)
        }

        if (icon.name === 'edit') {
            setVisible(true)
            setIsEditModalOpen(true);

            console.log(`Edit movie: ${title}`);
            // Add your edit logic here
        }
        if (icon.name === 'delete') {
            setVisible(true)

        }
    }

    console.log(isModalOpen)

    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className={`card max-w-sm rounded overflow-hidden shadow-lg ${isModalOpen ? 'hidden' : ''}`}>
                <div className="card-header">
                    <MovieImage src={image} alt={`${title} poster`} />
                </div>
                <div className="icons text-gray-700 flex justify-end space-x-2 p-2">
                    {icons.map((icon, index) => (
                        <button key={index} className="inline-block" onClick={(e) => actionIconOnClick(icon, e)}>{renderIcon(icon)}</button>
                    ))}
                </div>
                <div className="card-body p-4 h-72" onClick={openModal}>
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



            <Dialog header="" visible={visible} style={{ width: '50vw', background: 'white', padding: 20 }} onHide={() => { if (!visible) return; setVisible(false); setIsEditModalOpen(false); }}>
                <input type="text" value={title} disabled={isEditModalOpen ? false : true} />
                <img src={image} />
                <input type="text" value={description} width={"500"} disabled={isEditModalOpen ? false : true} />
                <div>
                    <input type="text" value={type} disabled={isEditModalOpen ? false : true} />
                    <input type="text" value={release_date} disabled={isEditModalOpen ? false : true} />
                    <input type="text" value={duration} disabled={isEditModalOpen ? false : true} />
                </div>
            </Dialog >
        </>
    );
};

export default Card;
