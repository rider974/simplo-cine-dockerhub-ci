import { Request, Response } from 'express';
import * as movieService from '../services/movieServices';
import { check, validationResult } from 'express-validator';


// Créer un film
export const createMovie = async (req: Request, res: Response) => {
  // Validation et sanitation des champs
  await Promise.all([
    check('title').not().isEmpty().trim().escape().withMessage('Title is required').run(req),
    check('description').optional().trim().escape().run(req),
    check('releaseDate').optional().isDate().withMessage('Invalid release date').run(req),
    check('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer').run(req),
  ]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir tous les films
export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un film par ID
export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movie = await movieService.getMovieById(Number(req.params.id));
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un film
export const updateMovie = async (req: Request, res: Response) => {
  // Validation et sanitation des champs
  await Promise.all([
    check('title').optional().trim().escape().run(req),
    check('description').optional().trim().escape().run(req),
    check('releaseDate').optional().isDate().withMessage('Invalid release date').run(req),
    check('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer').run(req),
  ]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedMovie = await movieService.updateMovie(Number(req.params.id), req.body);
    if (updatedMovie) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};


// Supprimer un film
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const success = await movieService.deleteMovie(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
