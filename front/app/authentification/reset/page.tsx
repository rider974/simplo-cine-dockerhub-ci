"use client";

// Importation des modules externes
import axios from "axios";
import DOMPurify from "dompurify";
import React, { useState } from "react";

// Importation des modules absolus
import { ResetPasswordForm } from "@/app/components/authentification/ResetPasswordForm";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input);
  };

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const sanitizedEmail = sanitizeInput(email);

    try {
      const response = await axios.post("/api/auth/reset", {
        email: sanitizedEmail,
      });

      if (response.status === 200) {
        setSuccessMessage(
          "Un lien de réinitialisation a été envoyé à votre adresse email."
        );
      }
    } catch (err) {
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResetPasswordForm
      onSubmit={handleResetPassword}
      isLoading={isLoading}
      error={error}
      successMessage={successMessage}
    />
  );
}
