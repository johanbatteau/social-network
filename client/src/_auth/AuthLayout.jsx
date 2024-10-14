import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../_dev/css/form.css'
import { jwtDecode } from "jwt-decode";

const AuthLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

// Vérification de l'état d'authentification via le token JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Vérifier si le token est valide et non expiré
        const decodedToken = jwtDecode(token);  //
        const currentTime = Date.now() / 1000; // Date actuelle en secondes
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true); // Le token est valide et non expiré
        } else {
          localStorage.removeItem('token'); // Si le token est expiré, le retirer
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        localStorage.removeItem('token'); // Supprimer le token si une erreur survient
      }
    }
  }, []);


  return (
      <main>
        {isAuthenticated ? (
            <Navigate to="/"></Navigate>
        ): (
            <>
                <Outlet />
            </>
        )}
      </main>
  );
};

export default AuthLayout;