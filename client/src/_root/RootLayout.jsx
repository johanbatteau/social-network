import {Link} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";

const RootLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si un token JWT est présent dans le localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
      <>
        <nav>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/users">Utilisateurs</Link></li>

            {isAuthenticated ? (
                <li><Link to="/log-out">Se déconnecter</Link></li>
            ) : (
                <>
                  <li><Link to="/sign-up">S'inscrire</Link></li>
                  <li><Link to="/sign-in">Se connecter</Link></li>
                </>
            )}
          </ul>
        </nav>

        <main>
          <Outlet/>
        </main>
      </>
  );
};

export default RootLayout;
