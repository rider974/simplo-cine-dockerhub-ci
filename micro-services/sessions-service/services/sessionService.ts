import Session from '../models/session';
import SessionCreationAttributes from "../models/session";
import SessionAttributes from "../models/session";

// Créer une session
export const createSession = async (data: SessionCreationAttributes): Promise<SessionAttributes> => {
    try {
        const session = await Session.create(data);
        return session;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error creating session: ${err.message}`);
        } else {
            throw new Error('Unknown error creating session');
        }
    }
};

// Obtenir toutes les sessions avec les relations 'movie' et 'room'
export const getSessions = async (): Promise<SessionAttributes[]> => {
    try {
        return await Session.findAll({ include: ['movie', 'room'] });
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error fetching sessions: ${err.message}`);
        } else {
            throw new Error('Unknown error fetching sessions');
        }
    }
};

// Obtenir une session par ID
export const getSessionById = async (id: number): Promise<SessionAttributes | null> => {
    try {
        return await Session.findByPk(id);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error fetching session by ID: ${err.message}`);
        } else {
            throw new Error('Unknown error fetching session by ID');
        }
    }
};

// Mettre à jour une session
export const updateSession = async (id: number, data: Partial<SessionCreationAttributes>): Promise<SessionAttributes | null> => {
    try {
        const session = await Session.findByPk(id);
        if (!session) {
            throw new Error('Session not found');
        }
        await session.update(data);
        return session;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error updating session: ${err.message}`);
        } else {
            throw new Error('Unknown error updating session');
        }
    }
};

// Supprimer une session
export const deleteSession = async (id: number): Promise<boolean> => {
    try {
        const session = await Session.findByPk(id);
        if (!session) {
            return false;
        }
        await session.destroy();
        return true;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error deleting session: ${err.message}`);
        } else {
            throw new Error('Unknown error deleting session');
        }
    }
};
