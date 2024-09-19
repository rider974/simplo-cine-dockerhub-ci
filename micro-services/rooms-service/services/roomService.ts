import Room from '../models/room';
import RoomCreationAttributes from "../models/room";
import RoomAttributes from "../models/room";

// Créer une room
export const createRoom = async (data: RoomCreationAttributes): Promise<RoomAttributes> => {
    try {
        const room = await Room.create(data);
        return room;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error creating room: ${err.message}`);
        } else {
            throw new Error('Unknown error creating room');
        }
    }
};

// Obtenir toutes les rooms
export const getRooms = async (): Promise<RoomAttributes[]> => {
    try {
        return await Room.findAll();
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error fetching rooms: ${err.message}`);
        } else {
            throw new Error('Unknown error fetching rooms');
        }
    }
};

// Obtenir une room par nom
export const getRoomByName = async (name: string): Promise<RoomAttributes | null> => {
    try {
        return await Room.findOne({ where: { name } });
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error fetching room by name: ${err.message}`);
        } else {
            throw new Error('Unknown error fetching room by name');
        }
    }
};

// Mettre à jour une room
export const updateRoom = async (id: number, data: Partial<RoomCreationAttributes>): Promise<RoomAttributes | null> => {
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            throw new Error('Room not found');
        }
        await room.update(data);
        return room;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error updating room: ${err.message}`);
        } else {
            throw new Error('Unknown error updating room');
        }
    }
};

// Supprimer une room
export const deleteRoom = async (id: number): Promise<boolean> => {
    try {
        const room = await Room.findByPk(id);
        if (!room) {
            return false;
        }
        await room.destroy();
        return true;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error deleting room: ${err.message}`);
        } else {
            throw new Error('Unknown error deleting room');
        }
    }
};
