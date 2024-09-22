"use client";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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

// Interface pour le token décodé
interface DecodedToken {
  role: string;
}

// Hook d'authentification pour vérifier l'état de l'utilisateur
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    // Récupérer le token depuis les cookies
    const token = Cookies.get("authToken");
    if (token) {
      try {
        // Décoder le token pour récupérer le rôle
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Débogage du token
        setIsAuthenticated(true);
        if (decodedToken.role === "admin") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
  }, []);

  return { isAuthenticated, isAdmin };
};

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
        {!isAuthenticated ? (
          // Lien de connexion si l'utilisateur n'est pas connecté
          <div className="flex items-center">
            <Link
              href="/authentification/signin"
              className="flex items-center text-white hover:underline"
            >
              <FaSignInAlt className="text-white" />
              <span className="ml-2">Administrateur</span>
            </Link>
          </div>
        ) : (
          // Affichage du bouton "Register" si l'utilisateur est connecté et est admin
          isAdmin &&
          pathname === "/dashboard/admin" && (
            <div className="flex items-center">
              <Link
                href="/authentification/register"
                className="flex items-center text-white hover:underline"
              >
                <FaUserPlus className="text-white" />
                <span className="ml-2">Ajout nouvel admin</span>
              </Link>
            </div>
          )
        )}
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
            {!isAuthenticated ? (
              // Lien de connexion dans le menu mobile
              <Link
                href="/authentification/signin"
                className="flex items-center hover:underline"
              >
                <FaSignInAlt />
                <span className="ml-2">Administrateur</span>
              </Link>
            ) : (
              // Affichage du lien Register si l'utilisateur est connecté et admin sur le dashboard admin
              isAdmin &&
              pathname === "/dashboard/admin" && (
                <Link
                  href="/authentification/register"
                  className="flex items-center hover:underline"
                >
                  <FaUserPlus />
                  <span className="ml-2">Ajout nouvel admin</span>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
