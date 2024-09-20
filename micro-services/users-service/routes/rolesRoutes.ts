import { Router } from "express";
import { RoleController } from "../controllers/roleController";

const router = Router();
const roleController = new RoleController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API de gestion des roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupère la liste de tous les roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des roles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   rolename:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get("/", roleController.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Récupère un role par son ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du role
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 rolename:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Role non trouvé
 */
router.get("/:id", roleController.getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crée un nouvel role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolename:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: role créé avec succès
 *       500:
 *         description: Erreur du serveur lors de la création d'un role
 */
router.post("/", roleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Met à jour un role par son ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du role à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolename:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role mis à jour avec succès
 *       404:
 *         description: Role non trouvé
 *       500:
 *         description: Erreur du serveur lors de la mise à jour
 */
router.put("/:id", roleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Supprime un role par son ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du role à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role supprimé avec succès
 *       404:
 *         description: Role non trouvé
 *       500:
 *         description: Erreur du serveur lors de la suppression
 */
router.delete("/:id", roleController.deleteRole);

export default router;
