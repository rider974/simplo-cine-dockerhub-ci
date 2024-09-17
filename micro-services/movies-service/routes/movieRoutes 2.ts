import { Router } from 'express';
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController';

const router = Router();

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Créer un nouveau film
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Le titre du film
 *               description:
 *                 type: string
 *                 description: Une description du film
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Date de sortie du film
 *               duration:
 *                 type: integer
 *                 description: Durée du film en minutes
 *     responses:
 *       201:
 *         description: Film créé avec succès
 */
router.post('/', createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Récupère la liste de tous les films
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Liste des films récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   releaseDate:
 *                     type: string
 *                     format: date
 *                   duration:
 *                     type: integer
 */
router.get('/', getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Récupère un film par son ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du film
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 releaseDate:
 *                   type: string
 *                   format: date
 *                 duration:
 *                   type: integer
 *       404:
 *         description: Film non trouvé
 */
router.get('/:id', getMovieById);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Met à jour un film existant
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès
 *       404:
 *         description: Film non trouvé
 */
router.put('/:id', updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Supprime un film
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du film à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Film supprimé avec succès
 *       404:
 *         description: Film non trouvé
 */
router.delete('/:id', deleteMovie);

export default router;
