"use client";

// Importation des modules externes
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { RegisterForm } from "@/app/components/authentification/RegisterForm";

import axios from "../../utils/axios";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input);
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);

    // Sanitization des entrées utilisateur
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const response = await axios.post("/api/auth/register", {
        username: sanitizedUsername,
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 201) {
        router.push(
          "/authentification/signin?message=Inscription réussie. Veuillez vous connecter."
        );
      } else {
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    } catch (err) {
      setError("L'enregistrement a échoué. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <RegisterForm
        onSubmit={handleRegister}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
