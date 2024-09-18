"use client";
import { useEffect, useState } from "react";

interface movie {
  id: number;  
  title: string;  
  description?: string;  
  release_date?: string;  
  duration?: number;  
  created_at: string; 
  updated_at: string;  
}

export default function Home() {

  const [movies, setMovies] = useState<movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("api/movies"); 
        if (!response.ok) {
          throw new Error("Erreur lors du fetch des films");
        }
        const data = await response.json(); 
        setMovies(data);
      } catch (err:any) {
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Date</th>
            <th>Duration (min)</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.description || 'N/A'}</td>
              <td>{movie.release_date || 'N/A'}</td>
              <td>{movie.duration || 'N/A'}</td>
              <td>{movie.created_at}</td>
              <td>{movie.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}