import React from "react";
import moment from "moment";

interface MovieAttributes {
  id: number;
  title: string;
  description?: string;
  release_date?: Date;
  duration?: number;
  created_at?: Date;
  updated_at?: Date;
  poster?: File | null;
}

interface MovieTableProps {
  movies: MovieAttributes[];
}

export const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#ECEFF1] rounded-md overflow-hidden shadow-lg hidden sm:table">
        <thead>
          <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-gray-900">ID</th>
            <th className="py-3 px-6 text-gray-900">Title</th>
            <th className="py-3 px-6 text-gray-900">Description</th>
            <th className="py-3 px-6 text-gray-900">Release Date</th>
            <th className="py-3 px-6 text-gray-900">Duration (min)</th>
            <th className="py-3 px-6 text-gray-900">Created At</th>
            <th className="py-3 px-6 text-gray-900">Updated At</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6">{movie.id}</td>
              <td className="py-3 px-6">{movie.title}</td>
              <td className="py-3 px-6">{movie.description || "N/A"}</td>
              <td className="py-3 px-6">
                {movie.release_date
                  ? moment(movie.release_date).format("YYYY-MM-DD")
                  : "N/A"}
              </td>
              <td className="py-3 px-6">{movie.duration || "N/A"}</td>
              <td className="py-3 px-6">
                {moment(movie.created_at).format("YYYY-MM-DD HH:mm")}
              </td>
              <td className="py-3 px-6">
                {moment(movie.updated_at).format("YYYY-MM-DD HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card View for small screens */}
      <div className="sm:hidden space-y-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="text-gray-800 font-bold">
              ID: <span className="font-normal">{movie.id}</span>
            </div>
            <div className="text-gray-800 font-bold">
              Title: <span className="font-normal">{movie.title}</span>
            </div>
            <div className="text-gray-800 font-bold">
              Description:{" "}
              <span className="font-normal">{movie.description || "N/A"}</span>
            </div>
            <div className="text-gray-800 font-bold">
              Release Date:{" "}
              <span className="font-normal">
                {movie.release_date
                  ? moment(movie.release_date).format("YYYY-MM-DD")
                  : "N/A"}
              </span>
            </div>
            <div className="text-gray-800 font-bold">
              Duration (min):{" "}
              <span className="font-normal">{movie.duration || "N/A"}</span>
            </div>
            <div className="text-gray-800 font-bold">
              Created At:{" "}
              <span className="font-normal">
                {moment(movie.created_at).format("YYYY-MM-DD HH:mm")}
              </span>
            </div>
            <div className="text-gray-800 font-bold">
              Updated At:{" "}
              <span className="font-normal">
                {moment(movie.updated_at).format("YYYY-MM-DD HH:mm")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
