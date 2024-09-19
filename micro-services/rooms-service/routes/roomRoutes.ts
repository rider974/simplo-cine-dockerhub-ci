import { Router } from 'express';
import { createRoom, getRooms, getRoomByName, updateRoom, deleteRoom } from '../controllers/roomController';

const router = Router();

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Créer une nouvelle salle
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la salle
 *               capacity:
 *                 type: integer
 *                 description: Capacité de la salle
 *     responses:
 *       201:
 *         description: Salle créée avec succès
 */
router.post('/', createRoom);

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Récupère la liste de toutes les salles
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Liste des salles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   capacity:
 *                     type: integer
 */
router.get('/', getRooms);

/**
 * @swagger
 * /rooms/name/{name}:
 *   get:
 *     summary: Récupère une salle par son nom
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nom de la salle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la salle
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *       404:
 *         description: Salle non trouvée
 */
router.get('/name/:name', getRoomByName);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Met à jour une salle existante
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salle à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Salle mise à jour avec succès
 *       404:
 *         description: Salle non trouvée
 */
router.put('/:id', updateRoom);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Supprime une salle
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la salle à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Salle supprimée avec succès
 *       404:
 *         description: Salle non trouvée
 */
router.delete('/:id', deleteRoom);

export default router;
