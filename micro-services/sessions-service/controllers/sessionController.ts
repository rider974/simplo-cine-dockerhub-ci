import { Request, Response } from 'express';
import * as sessionsService from '../services/sessionService';
import { check, validationResult } from 'express-validator';

// Créer une session
export const createSession = async (req: Request, res: Response) => {
    // Validation et sanitation des champs
    await Promise.all([
        check('movie_id').not().isEmpty().withMessage('Movie ID is required').run(req),
        check('heure_debut').not().isEmpty().withMessage('Start time is required').run(req),
        check('heure_fin').not().isEmpty().withMessage('End time is required').run(req),
        check('room_id').not().isEmpty().withMessage('Room ID is required').run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const session = await sessionsService.createSession(req.body);
        res.status(201).json(session);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les sessions
export const getSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await sessionsService.getSessions();
        res.status(200).json(sessions);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Obtenir une session par ID
export const getSessionById = async (req: Request, res: Response) => {
    try {
        const session = await sessionsService.getSessionById(Number(req.params.id));
        if (session) {
            res.status(200).json(session);
        } else {
            res.status(404).json({ error: "Session not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une session
export const updateSession = async (req: Request, res: Response) => {
    // Validation et sanitation des champs
    await Promise.all([
        check('movieId').optional().isInt().withMessage('Movie ID must be an integer').run(req),
        check('startTime').optional().isISO8601().withMessage('Invalid start time').run(req),
        check('endTime').optional().isISO8601().withMessage('Invalid end time').run(req),
        check('roomId').optional().isInt().withMessage('Room ID must be an integer').run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedSession = await sessionsService.updateSession(Number(req.params.id), req.body);
        if (updatedSession) {
            res.status(200).json(updatedSession);
        } else {
            res.status(404).json({ error: "Session not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une session
export const deleteSession = async (req: Request, res: Response) => {
    try {
        const success = await sessionsService.deleteSession(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Session not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};
