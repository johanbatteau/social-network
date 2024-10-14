import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log('Connexion réussie', data);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        console.error('Mauvais mot de passe', data);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit">Se connecter</button>
        <span>Vous n'avez pas de compte ? <Link to="/sign-up">S'inscrire</Link></span>
      </form>
  );
};

export default LoginForm;