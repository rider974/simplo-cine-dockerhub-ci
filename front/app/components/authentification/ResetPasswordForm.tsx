import React, { useState } from "react";

interface ResetPasswordFormProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export function ResetPasswordForm({
  onSubmit,
  isLoading,
  error,
  successMessage,
}: ResetPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateForm = () => {
    if (!email) {
      setEmailError("Votre email est requis");
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("Email non valide !");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center text-gray-400 font-bold mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              Reset Password
            </h2>
          </div>
          <form
            className="bg-white p-8 shadow-lg w-full max-w-sm mx-auto flex-col items-center"
            onSubmit={handleSubmit}
          >
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4 text-center">
                {successMessage}
              </p>
            )}
            <div className="mb-6">
              <label className="block text-gray-500 font-normal">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                className={`inline-block w-full p-4 leading-6 text-lg border font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  emailError ? "border-red-500" : ""
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="inline-block w-full mt-1 py-4 px-6 mb-6 text-center text-lg leading-6 transition duration-200 text-white font-extrabold bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
