import { Request, Response, NextFunction } from 'express';
import { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } from '../controllers/movieController';
import * as movieService from '../services/movieServices';
import { validationResult } from 'express-validator';

// Mock du service
jest.mock('../services/movieServices');

// Mock de validationResult de express-validator
jest.mock('express-validator', () => ({
    ...jest.requireActual('express-validator'),
    validationResult: jest.fn(),
}));

describe('Movie Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createMovie', () => {
        it('should create a movie and return it with status 201', async () => {
            req.body = { title: 'Inception', description: 'A mind-bending thriller', releaseDate: '1999-03-31', duration: 145 };
            const createdMovie = { id: 1, ...req.body };

            (movieService.createMovie as jest.Mock).mockResolvedValue(createdMovie);

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(true), 
            });

            await createMovie(req as Request, res as Response);

            expect(movieService.createMovie).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdMovie);
        });

        it('should return 400 if validation fails', async () => {
            req.body = { title: '' }; 

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false), 
                array: jest.fn().mockReturnValue([{ msg: 'Title is required' }]),
            });

            await createMovie(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Title is required' }] });
        });
    });

    describe('getMovies', () => {
        it('should return a list of movies with status 200', async () => {
            const movies = [{ id: 1, title: 'Inception' }];
            (movieService.getMovies as jest.Mock).mockResolvedValue(movies);

            await getMovies(req as Request, res as Response);

            expect(movieService.getMovies).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(movies);
        });
    });

    describe('getMovieById', () => {
        it('should return a movie by ID with status 200', async () => {
            req.params = { id: '1' };
            const movie = { id: 1, title: 'Inception' };
            (movieService.getMovieById as jest.Mock).mockResolvedValue(movie);

            await getMovieById(req as Request, res as Response);

            expect(movieService.getMovieById).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(movie);
        });

        it('should return 404 if movie not found', async () => {
            req.params = { id: '1' };
            (movieService.getMovieById as jest.Mock).mockResolvedValue(null);

            await getMovieById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
        });
    });

    describe('updateMovie', () => {
        it('should update a movie and return it with status 200', async () => {
            req.body = { title: 'Inception', description: 'A mind-bending thriller', releaseDate: '1999-03-31', duration: 145 };
            req.params = { id: '1' };
            const updatedMovie = { id: 1, ...req.body };

            (movieService.updateMovie as jest.Mock).mockResolvedValue(updatedMovie);

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(true), 
            });

            await updateMovie(req as Request, res as Response);

            expect(movieService.updateMovie).toHaveBeenCalledWith(Number(req.params.id), req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedMovie);
        });

        it('should return 404 if movie to update not found', async () => {
            req.body = { title: 'Inception' };
            req.params = { id: '1' };

            (movieService.updateMovie as jest.Mock).mockResolvedValue(null);

            await updateMovie(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
        });

        it('should return 400 if validation fails', async () => {
            req.body = { title: '' }; 
            req.params = { id: '1' };

            (validationResult as unknown as jest.Mock).mockReturnValue({
                isEmpty: jest.fn().mockReturnValue(false), 
                array: jest.fn().mockReturnValue([{ msg: 'Title is required' }]),
            });

            await updateMovie(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Title is required' }] });
        });
    });

    describe('deleteMovie', () => {
        it('should delete a movie and return status 204', async () => {
            req.params = { id: '1' };
            (movieService.deleteMovie as jest.Mock).mockResolvedValue(true);

            await deleteMovie(req as Request, res as Response);

            expect(movieService.deleteMovie).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('should return 404 if movie to delete not found', async () => {
            req.params = { id: '1' };
            (movieService.deleteMovie as jest.Mock).mockResolvedValue(false);

            await deleteMovie(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' });
        });
    });
});
