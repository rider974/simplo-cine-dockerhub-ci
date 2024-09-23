"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, FormEvent } from "react";
import {
  FaHome,
  FaSignInAlt,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";

import { useAuth } from "../utils/authContext";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Utiliser le contexte d'authentification

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAdminClick = () => {
    if (!isAuthenticated) {
      // Rediriger vers la page de connexion si non authentifié
      router.push("/authentification/signin");
    } else {
      // Rediriger vers la page d'ajout d'admin si authentifié
      router.push("/authentification/register");
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center ml-2 text-white hover:underline"
        >
          <FaHome className="text-white" />
          <span className="ml-2">Accueil</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4 text-white">
        <form onSubmit={handleSearch} className="flex items-center w-auto">
          <input
            type="text"
            className="px-3 py-1 rounded-lg text-gray-800"
            placeholder="Recherche films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="ml-2 text-white hover:underline">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="hidden md:flex space-x-4 text-white">
        <div className="flex items-center">
          <button
            onClick={handleAdminClick}
            className="flex items-center text-white hover:underline"
          >
            {!isAuthenticated ? (
              <>
                <FaSignInAlt className="text-white" />
                <span className="ml-2">Administration</span>
              </>
            ) : (
              <>
                <FaUserPlus className="text-white" />
                <span className="ml-2">Ajout nouvel admin</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 w-full bg-gray-800 text-white flex flex-col py-4 z-50">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full px-4"
          >
            <input
              type="text"
              className="px-3 py-1 rounded-lg text-gray-800 w-full"
              placeholder="Recherche films..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="ml-2 text-white hover:underline">
              <FaSearch />
            </button>
          </form>

          <div className="flex flex-col items-start space-y-4 px-4 mt-4">
            <button
              onClick={handleAdminClick}
              className="flex items-center hover:underline text-white"
            >
              {!isAuthenticated ? (
                <>
                  <FaSignInAlt />
                  <span className="ml-2">Administration</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span className="ml-2">Ajout nouvel admin</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
