"use client";

import { useEffect, useState } from "react";


import Card from "./components/Card";



export enum IconType {
  view = 'view',
  edit = 'edit',
  delete = 'delete'
}

interface Movie {
  id: number;
  title: string;
  description?: string;
  image: string;
  type: string;
  release_date?: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  icon: IconType[]; // Liste d'icônes
}

import { Movie } from "../app/types/types";




export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [error] = useState<string | null>(null);

  const initialMovies: Movie[] = [
    {
      id: 1,
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
      image: "/testMovieImage.jpg",
      type: "Sci-Fi",
      release_date: "2010-07-16",
      duration: 148,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    },
    {
      id: 2,
      title: "The Dark Knight",
      description: "When the menace known as the Joker emerges from his mysterious past.",
      image: "/testMovieImage.jpg",
      type: "Action",
      release_date: "2008-07-18",
      duration: 152,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    },
    {
      id: 3,
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "/testMovieImage.jpg",
      type: "Adventure",
      release_date: "2014-11-07",
      duration: 169,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    },
    {
      id: 4,
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
      image: "/testMovieImage.jpg",
      type: "Sci-Fi",
      release_date: "1999-03-31",
      duration: 136,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    },
    {
      id: 5,
      title: "Gladiator",
      description: "A former Roman General sets out to exact vengeance against the corrupt emperor.",
      image: "/testMovieImage.jpg",
      type: "Drama",
      release_date: "2000-05-05",
      duration: 155,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption.",
      image: "/testMovieImage.jpg",
      type: "Drama",
      release_date: "1994-09-23",
      duration: 142,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-01T00:00:00Z",
      icon: [IconType.view, IconType.edit, IconType.delete]
    }
  ];

  useEffect(() => {
    setMovies(initialMovies);
    setLoading(true);
  }, []);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const response = await fetch("/api/movies");
  //       if (!response.ok) {
  //         throw new Error("Erreur lors du fetch des films");
  //       }
  //       const data = await response.json();
  //       setMovies(data);
  //     } catch (err) {
  //       // Typage plus spécifique pour l'erreur
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError("Une erreur inconnue est survenue");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  return (
    <div className="m-4">
      <h1 className="text-center text-3xl">Welcome to Simplon Cine</h1>
      {loading &&
        <>
          <p>Loading movies...</p>
          <h2 className="ms-6">Discover our movies</h2>
          <div className="flex flex-wrap -mx-2">

            {movies.map((movie) => (
              <div key={movie.id} className="w-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
                <div className="bg-white rounded-lg shadow-md p-4 m-4 mt-5">
                  <Card
                    title={movie.title}
                    description={movie.description}
                    release_date={movie.release_date}
                    duration={movie.duration}
                    created_at={movie.created_at}
                    updated_at={movie.updated_at}
                    image={movie.image}
                    type={movie.type}
                    icons={movie.icon}
                  />
                </div>
              </div>
            ))}
          </div>
        </>

      }
  );
}