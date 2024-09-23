import { useState } from "react";
import { MdPeople, MdRoom } from "react-icons/md";

import { HallAttributes } from "../../types/types";

interface AddHallCardProps {
  onAddHall: (newHall: HallAttributes) => void;
  halls: HallAttributes[]; // Récupérez les salles depuis la prop
}

export const AddHallCard: React.FC<AddHallCardProps> = ({
  onAddHall,
  halls,
}) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | null>(null);

  const handleAdd = async () => {
    if (name && capacity) {
      const newHall: HallAttributes = {
        id: Math.random(), // Remplacez cela par un ID généré par l'API si nécessaire
        name,
        seatsNumber: capacity,
      };

      try {
        const response = await fetch("/api/rooms-service", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHall),
        });

        if (!response.ok) {
          throw new Error(
            "Erreur lors de l'ajout de la salle à la base de données."
          );
        }

        const addedHall = await response.json();
        onAddHall(addedHall);
      } catch (err) {
        console.error("Erreur lors de l'ajout de la salle :", err);
        alert("Erreur lors de l'ajout de la salle.");
      }

      setName("");
      setCapacity(null);
    } else {
      alert("Veuillez remplir tous les champs requis.");
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="relative">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Ajouter une nouvelle salle
        </h2>
        <div className="bg-orange-500 absolute top-8 left-2 w-[calc(100%_-_20px)] h-2"></div>
      </div>
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
          className="w-full text-gray-900 px-3 py-2 border rounded-md"
          value={capacity !== null ? capacity : ""}
          onChange={(e) => setCapacity(Number(e.target.value))}
          placeholder="Capacité"
        />
      </div>
      <button
        onClick={handleAdd}
        className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-500"
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
              <strong>{hall.name}</strong> - Capacité : {hall.seatsNumber}{" "}
              places
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
