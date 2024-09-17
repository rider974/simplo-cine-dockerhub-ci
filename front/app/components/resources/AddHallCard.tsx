import React, { useState } from "react";
import { MdPeople, MdRoom } from "react-icons/md";

interface HallAttributes {
  id: number;
  name: string;
  capacity: number;
}

interface AddHallCardProps {
  onAddHall: (newHall: HallAttributes) => void;
}

export const AddHallCard: React.FC<AddHallCardProps> = ({ onAddHall }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | null>(null);

  // Deux salles créées en dur
  const initialHalls: HallAttributes[] = [
    { id: 1, name: "Salle 1 - IMAX", capacity: 150 },
    { id: 2, name: "Salle 2 - 4DX", capacity: 100 },
  ];

  const [halls, setHalls] = useState<HallAttributes[]>(initialHalls);

  const handleAdd = () => {
    if (name && capacity) {
      const newHall: HallAttributes = {
        id: Math.random(),
        name,
        capacity,
      };
      setHalls([...halls, newHall]);
      onAddHall(newHall);
      setName("");
      setCapacity(null);
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Ajouter une nouvelle salle
      </h2>
      <div className="mb-4">
        <label className="text-gray-900 flex items-center">
          <MdRoom className="text-blue-600 mr-2" /> Nom de la salle
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la salle"
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-900 flex items-center">
          <MdPeople className="text-green-600 mr-2" /> Capacité
        </label>
        <input
          type="number"
          className="w-full text-gray-900  px-3 py-2 border rounded-md"
          value={capacity !== null ? capacity : ""}
          onChange={(e) => setCapacity(Number(e.target.value))}
          placeholder="Capacité"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
      >
        Ajouter la salle
      </button>

      {/* Affichage des salles déjà créées */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Salles existantes
        </h3>
        <ul>
          {halls.map((hall) => (
            <li key={hall.id} className="mb-2">
              <strong>{hall.name}</strong> - Capacité : {hall.capacity} places
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
