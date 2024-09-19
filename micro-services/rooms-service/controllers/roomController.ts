import { Request, Response } from 'express';
import * as roomsService from '../services/roomService';
import { check, validationResult } from 'express-validator';

// Créer une salle
export const createRoom = async (req: Request, res: Response) => {
    // Validation et sanitation des champs
    await Promise.all([
        check('name').not().isEmpty().withMessage('Name is required').run(req),
        check('capacity').isInt({ gt: 0 }).withMessage('Capacity must be a positive integer').run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const room = await roomsService.createRoom(req.body);
        res.status(201).json(room);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Obtenir toutes les salles
export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await roomsService.getRooms();
        res.status(200).json(rooms);
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Obtenir une salle par ID
export const getRoomByName = async (req: Request, res: Response) => {
    try {
        const room = await roomsService.getRoomByName(String(req.params.name));
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: "Room not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une salle
export const updateRoom = async (req: Request, res: Response) => {
    // Validation et sanitation des champs
    await Promise.all([
        check('name').optional().not().isEmpty().withMessage('Name is required').run(req),
        check('capacity').optional().isInt({ gt: 0 }).withMessage('Capacity must be a positive integer').run(req),
    ]);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedRoom = await roomsService.updateRoom(Number(req.params.id), req.body);
        if (updatedRoom) {
            res.status(200).json(updatedRoom);
        } else {
            res.status(404).json({ error: "Room not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une salle
export const deleteRoom = async (req: Request, res: Response) => {
    try {
        const success = await roomsService.deleteRoom(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Room not found" });
        }
    } catch (err: unknown) {
        const error = err as Error;
        res.status(500).json({ error: error.message });
    }
};
