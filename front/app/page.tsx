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



export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data = await response.json();
        setMovies(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-center text-3xl">Welcome to Simplon Cine</h1>
      {loading &&
        <>
          <p>Loading movies...</p>
          <div className="flex flex-wrap -mx-2">
            <h2 className="ms-6">Discover our movies</h2>
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
      {error && <p>Error: {error}</p>}

    </div>

  );
}