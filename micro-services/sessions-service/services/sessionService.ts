import Session from '../models/session';
import SessionCreationAttributes from "../models/session";
import SessionAttributes from "../models/session";
import { Op } from 'sequelize';

// Fonction de gestion des erreurs
const handleError = (operation: string, err: unknown) => {
    if (err instanceof Error) {
        throw new Error(`${operation}: ${err.message}`);
    } else {
        throw new Error(`Unknown error during ${operation}`);
    }
};

// Créer une session
export const createSession = async (data: SessionCreationAttributes): Promise<SessionAttributes | undefined> => {
    try {
        const session = await Session.create(data);
        return session;
    } catch (err) {
        handleError('creating session', err);
        return undefined;
    }
};

// Obtenir toutes les sessions
export const getSessions = async (): Promise<SessionAttributes[]> => {
    try {
        return await Session.findAll();
    } catch (err) {
        handleError('fetching sessions', err);
        return []; // Return an empty array in case of an error
    }
};

// Obtenir une session par ID
export const getSessionById = async (id: number): Promise<SessionAttributes | null> => {
    try {
        return await Session.findByPk(id); // Inclure les relations si nécessaire
    } catch (err) {
        handleError('fetching session by ID', err);
        return null; // Ensure a return value in case of an error
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
    } catch (err) {
        handleError('updating session', err);
        return null; // Ensure a return value in case of an error
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
    } catch (err) {
        handleError('deleting session', err);
        return false; // Ensure a return value in case of an error
    }
};

// Obtenir les sessions par date
// Obtenir les sessions par date
export const getSessionsByDate = async (date: string): Promise<SessionAttributes[]> => {
    try {
        // Fixe l'heure à minuit pour les comparaisons
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Définit l'heure à 00:00:00

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Définit l'heure à 23:59:59 pour inclure toute la journée

        return await Session.findAll({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay] // Requête entre le début et la fin de la journée
                }
            }
        });
    } catch (err) {
        handleError('fetching sessions by date', err);
        return []; // Retourne un tableau vide en cas d'erreur
    }
};
