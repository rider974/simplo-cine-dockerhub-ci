import React, { useState } from "react";

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

interface AddMovieCardProps {
  onAddMovie: (newMovie: MovieAttributes) => void;
}

export const AddMovieCard: React.FC<AddMovieCardProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [poster, setPoster] = useState<File | null>(null); // État pour stocker l'affiche

  const handleAdd = () => {
    if (title && releaseDate && duration) {
      const newMovie: MovieAttributes = {
        id: Math.floor(Math.random() * 10000), // ID temporaire pour l'exemple
        title,
        description,
        release_date: releaseDate,
        duration,
        created_at: new Date(),
        updated_at: new Date(),
        poster, // Ajout de l'affiche au nouvel objet de film
      };
      onAddMovie(newMovie);
      setTitle("");
      setDescription("");
      setReleaseDate(null);
      setDuration(null);
      setPoster(null); // Réinitialise l'affiche après l'ajout
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  };

  const handlePosterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPoster(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-[600px] max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl text-gray-900 font-semibold mb-4">
        Ajouter un nouveau film
      </h2>
      <div className="mb-4">
        <label className="block text-gray-900">Titre</label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du film"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900">Description</label>
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description du film"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-900">Date de sortie</label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          onChange={(e) => setReleaseDate(e.target.valueAsDate)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900">Durée (en minutes)</label>
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          value={duration !== null ? duration : ""}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Durée en minutes"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900">Affiche du film</label>
        <input
          type="file"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          accept="image/*"
          onChange={handlePosterUpload}
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
      >
        Ajouter le film
      </button>
    </div>
  );
};
