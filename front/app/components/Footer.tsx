"use client";

import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-left">
          <h5 className="font-bold text-lg">Simplo-cine.</h5>
          <p className="mt-2 text-sm">
            Trouvez les meilleures séances de films près de chez vous.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center mt-4 lg:mt-0 space-y-2 lg:space-y-0 lg:space-x-8">
          <Link href="#" className="text-sm hover:text-gray-400">
            À propos de nous
          </Link>

          <Link href="#" className="text-sm hover:text-gray-400">
            Conditions d&apos;utilisation
          </Link>
          <Link href="#" className="text-sm hover:text-gray-400">
            Contact
          </Link>
        </div>

        <div className="flex space-x-4 mt-4 lg:mt-0">
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-400"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-400"
          >
            <FaLinkedin />
          </a>
        </div>

        <div className="mt-4 lg:mt-0 text-center lg:text-right">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Simplo-cine. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
