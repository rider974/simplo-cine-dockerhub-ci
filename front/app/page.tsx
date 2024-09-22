"use client";

import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import * as React from "react";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from 'react-icons/fa';


import Card from './components/Card';
import { MovieAttributes } from './types/types';



interface Movie {
  id: number;
  title: string;
  description?: string;
  release_date?: string;
  duration?: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesWithDate, setMoviesWhitDate] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole] = useState<string | null>(null);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data = await response.json();
        setMovies(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     try {
  //       const response = await fetch("/api/userRole");
  //       if (!response.ok) {
  //         throw new Error("Erreur lors du fetch du rôle utilisateur");
  //       }
  //       const data = await response.json();
  //       setUserRole(data.role);
  //     } catch (err: unknown) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError("An unknown error occurred");
  //       }
  //     }
  //   };

  //   fetchUserRole();
  // }, []);

  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  console.log('isAdmin', isAdmin());

  const handleUpdateMovie = async (updatedMovie: MovieAttributes) => {
    try {
      const response = await fetch(`/api/movies/${updatedMovie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du film");
      }
      const updatedMovieData = await response.json();
      setMovies(
        movies.map((movie) =>
          movie.id === updatedMovieData.id ? updatedMovieData : movie
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? `${error}` + "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleDeleteMovie = async (movieId: number) => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du film");
      }
      setMovies(movies.filter((movie) => movie.id !== movieId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message ?? `${error}` + "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateInputChange = async () => {
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    if (dateInput) {
      const selectedDate = dateInput.value;
      setSelectedDate(selectedDate);

      if (selectedDate) {
        try {
          // Appel au service session pour récupérer les sessions par date
          const sessionResponse = await fetch(`/api/sessions/date/${selectedDate}`);
          if (!sessionResponse.ok) {
            throw new Error("Erreur lors de la recherche des sessions par date");
          }
          const sessionsData = await sessionResponse.json();

          // Vérifier s'il y a des sessions
          if (sessionsData.length === 0) {
            setMoviesWhitDate([]); // Réinitialiser l'état des films
            return; // Sortir de la fonction
          } else {
            setError(null); // Réinitialiser l'erreur
          }

          // Extraire les movie_id des sessions
          const movieIds = sessionsData.map((session: { movie_id: number }) => session.movie_id);

          if (movieIds.length > 0) {
            // Appel au service movie pour récupérer les films par IDs
            const movieResponses = await Promise.all(movieIds.map((movieId: number) =>
              fetch(`/api/movies/${movieId}`)
            ));

            const moviesData = await Promise.all(movieResponses.map(res => {
              if (!res.ok) {
                throw new Error("Erreur lors de la récupération des films");
              }
              return res.json();
            }));


            console.log("Films récupérés :", moviesData);
            setMoviesWhitDate(moviesData); // Stocke les films récupérés dans l'état
          } else {
            setMoviesWhitDate([]); // Aucun film à afficher si pas de movie_id
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    }
  };




  const assignRandomType = (movieId: number): string => {
    const types = ["Romance", "Comédie", "Horreur", "Science-fiction"];
    const storedTypes = JSON.parse(localStorage.getItem('movieTypes') || '{}');

    if (storedTypes[movieId]) {
      return storedTypes[movieId];
    }

    const randomIndex = Math.floor(Math.random() * types.length);
    const assignedType = types[randomIndex];
    storedTypes[movieId] = assignedType;
    localStorage.setItem('movieTypes', JSON.stringify(storedTypes));

    return assignedType;
  };

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const moviesTemplate = (movie: Movie) => {
    return (
      <Card
        key={movie.id}
        id={movie.id}
        title={movie.title}
        description={movie.description || 'No description available'}
        type={assignRandomType(movie.id)}
        release_date={movie.release_date}
        duration={movie.duration}
        created_at={new Date().toISOString()}
        updated_at={new Date().toISOString()}
        isAdmin={isAdmin}
        onModify={handleUpdateMovie}
        onDelete={handleDeleteMovie}
      />
    );
  };

  return (
    <div>
      <div className="flex justify-center bg-black">
        <img src="/AccueilSimplo.png" alt="Cinema" style={{ width: "auto", height: "200" }} />
      </div>
      {loading && <div className="card flex justify-content-center">
        <ProgressSpinner />
      </div>}
      {error && <Message severity="error" text={`Error: ${error}`} />}

      {/* Section de recherche par date */}
      <div className="flex flex-col items-center mb-5">
        <h2 className="text-2xl font-bold text-center mt-5 mb-10">Recherchez une séance par date pour voir les films disponibles</h2>
        <div className="flex justify-center w-full">
          <div className="w-full max-w-2xl flex items-center justify-between space-x-4">
            <div className="w-1/2 flex flex-col items-start space-y-4">
              <label className="block text-gray-900 mt-4">
                <FaCalendarAlt className="mr-2 inline-block text-red-600" /> Date de séance
              </label>
              <input
                type="date"
                onChange={(e) => e.target.value}
                className="w-full px-3 py-2 border rounded-md text-gray-900"
              />
            </div>
            <div className="w-1/2 flex justify-end">
              <button
                onClick={() => { handleDateInputChange() }}
                className="inline-flex justify-center rounded-md border border-transparent mt-14 shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Affiche les films ou un message d'erreur */}
      {error ? (
        <p>{error}</p>
      ) : movies.length === 0 ? (
        <p>Aucun film trouvé pour cette date.</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mt-5 mb-10">Film du {selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</h2>
          <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {moviesWithDate.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                title={movie.title}
                description={movie.description || 'No description available'}
                type={assignRandomType(movie.id)}
                release_date={movie.release_date}
                duration={movie.duration}
                created_at={new Date().toISOString()}
                updated_at={new Date().toISOString()}
                isAdmin={isAdmin}
                onModify={handleUpdateMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-center my-36">À la Une</h2>

      <div className="card">
        <Carousel value={movies} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions} itemTemplate={moviesTemplate} />
      </div>

      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            title={movie.title}
            description={movie.description || 'No description available'}
            type={assignRandomType(movie.id)}
            release_date={movie.release_date}
            duration={movie.duration}
            created_at={new Date().toISOString()}
            updated_at={new Date().toISOString()}
            isAdmin={isAdmin}
            onModify={handleUpdateMovie}
            onDelete={handleDeleteMovie}
          />
        ))}
      </div>
    </div>
  );
}