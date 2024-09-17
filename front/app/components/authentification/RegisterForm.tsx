import React, { useState } from "react";

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const validateForm = () => {
    let valid = true;

    // Validation du nom d'utilisateur
    if (!username) {
      setUsernameError("Le nom est obligatoire");
      valid = false;
    } else {
      setUsernameError(null);
    }

    // Validation de l'email
    if (!email) {
      setEmailError("L'email est obligatoire ");
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("L'email doit être valide");
      valid = false;
    } else {
      setEmailError(null);
    }

    // Validation du mot de passe
    if (!password) {
      setPasswordError("Le mot de passe est obligatoire");
      valid = false;
    } else if (password.length < 12) {
      setPasswordError("Le mot de passe doit comporter au moins 12 caractères");
      valid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins une lettre majuscule"
      );
      valid = false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins une lettre minuscule"
      );
      valid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError(" Le mot de passe doit comporter au moins un chiffre");
      valid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins un caractère spécial"
      );
      valid = false;
    } else {
      setPasswordError(null);
    }

    // Validation de la confirmation du mot de passe
    if (confirmPassword !== password) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas !");
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(username, email, password);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container px-4 mx-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center text-gray-400 font-bold mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold">Sign up</h2>{" "}
          </div>
          <form
            className="bg-white p-8 shadow-lg w-full max-w-sm mx-auto flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label className="block text-gray-500 font-normal">
                Username
              </label>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="off"
                className={`inline-block w-full p-4 leading-6 text-lg border font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  usernameError ? "border-red-500" : ""
                }`}
              />
              {usernameError && (
                <p className="text-red-500 text-sm mt-2">{usernameError}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
            <div className="mb-6">
              <label className="block text-gray-500 font-normal">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className={`inline-block w-full p-4 leading-6 text-lg border font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  passwordError ? "border-red-500" : ""
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-500 font-normal">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="off"
                className={`inline-block w-full p-4 leading-6 text-lg border font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  confirmPasswordError ? "border-red-500" : ""
                }`}
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-2">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="inline-block w-full mt-1 py-4 px-6 mb-6 text-center text-lg leading-6 transition duration-200 text-white font-extrabold bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Register..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
