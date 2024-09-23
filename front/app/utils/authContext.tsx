import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Interface pour le token décodé
interface DecodedToken {
  role: string;
  exp: number;
}

// Définir les types pour le contexte d'authentification
interface AuthContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

// Interface des propriétés du AuthProvider
interface AuthProviderProps {
  children: ReactNode; // Définir le type des children
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

// Fournisseur de contexte
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Récupérer le token depuis les cookies
    const token = Cookies.get("authToken");

    if (token) {
      try {
        // Décoder le token pour récupérer le rôle
        const decodedToken: DecodedToken = jwtDecode(token);

        // Vérification de l'expiration du token
        if (Date.now() >= decodedToken.exp * 1000) {
          console.warn("Token expired");
          setIsAuthenticated(false);
          setIsAdmin(false);
          return;
        }

        // Mise à jour de l'état d'authentification
        setIsAuthenticated(true);
        setIsAdmin(decodedToken.role === "admin");
      } catch (error) {
        console.error("Invalid token format", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } else {
      // Aucun token n'est présent, mettre à jour les états
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setIsAdmin(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    Cookies.remove("authToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);
