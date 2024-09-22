import Session from '../models/session';
import SessionCreationAttributes from "../models/session";
import SessionAttributes from "../models/session";
import { Op } from 'sequelize';

// Fonction de gestion des erreurs
const handleError = (operation: string, err: unknown) => {
    if (err instanceof Error) {
        console.error(`${operation}: ${err.message}`);
    } else {
        console.error(`Unknown error during ${operation}`);
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
        return []; // Retourne un tableau vide en cas d'erreur
    }
};

// Obtenir une session par ID
export const getSessionById = async (id: number): Promise<SessionAttributes | null> => {
    try {
        return await Session.findByPk(id); // Inclure les relations si nécessaire
    } catch (err) {
        handleError('fetching session by ID', err);
        return null; // Assurer une valeur de retour en cas d'erreur
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
        return null; // Assurer une valeur de retour en cas d'erreur
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
        return false; // Assurer une valeur de retour en cas d'erreur
    }
};


// Fonction pour récupérer les informations d'un film par son ID
const fetchMovieById = async (movieId: number) => {
    try {
        const response = await fetch(`http://movie-service/movies/${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch movie');
        return await response.json(); // Retourne les détails du film
    } catch (error) {
        console.error(error);
        return null; // Gérer l'erreur selon ton besoin
    }
};

// Obtenir les sessions par date et récupérer les films
export const getSessionsWithMoviesByDate = async (date: string): Promise<unknown[]> => {
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Récupérer les sessions par date
        const sessions = await Session.findAll({
            where: {
                date: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        // Extraire tous les movie_id uniques
        const movieIds = [...new Set(sessions.map(session => session.movie_id))];

        // Récupérer les infos des films pour chaque movie_id
        const movies = await Promise.all(movieIds.map(movieId => fetchMovieById(movieId)));

        // Combiner les sessions avec les films correspondants
        const sessionsWithMovies = sessions.map(session => {
            const movie = movies.find(m => m.id === session.movie_id) || null;

            return {
                ...session.get(), // Utiliser .get() pour obtenir les attributs de session
                movie // Ajouter les informations du film
            };
        });

        return sessionsWithMovies; // Retourner les sessions avec les infos des films
    } catch (err) {
        console.error('Error fetching sessions with movies:', err);
        return []; // Retourner un tableau vide en cas d'erreur
    }
};


