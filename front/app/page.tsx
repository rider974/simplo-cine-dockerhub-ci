"use client";
import { useEffect, useState } from "react";
import Card from './components/Card';

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
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies"); 
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data = await response.json(); 
        setMovies(data);
      } catch (err: any) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Welcome to Simplon Cine</h1>
      <h2>Discover our movies</h2>
      {loading && <p>Loading movies...</p>} 
      {error && <p>Error: {error}</p>} 
      <div className="movie-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <Card 
            key={movie.id}
            title={movie.title}
            description={movie.description || 'No description available'}
            image={movie.image || '/public/testMovieImage.jpg'}
            type={movie.type || 'Unknown type'}
            release_date={movie.release_date}
            duration={movie.duration}
            created_at={movie.created_at}
            updated_at={movie.updated_at}
          />
        ))}
      </div>
    </div>
  );
}
