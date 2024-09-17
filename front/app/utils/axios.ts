import axios from "axios";
import { NextRouter, useRouter } from "next/router";

const axiosInstance = axios.create({});

// Fonction pour gérer la redirection
function handleRedirectToSignIn(router: NextRouter) {
  router.push("/authentification/signin");
}

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        const router = useRouter();
        handleRedirectToSignIn(router);
      }
      if (error.response.status >= 500) {
        console.error("Erreur serveur:", error.response.data);
      }
    } else if (error.request) {
      console.error("Aucune réponse reçue:", error.request);
    } else {
      console.error("Erreur:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
