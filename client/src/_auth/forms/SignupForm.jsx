import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Le header doit être bien défini
        },
        body: JSON.stringify({email, password, confirm}), // Données envoyées au backend
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Inscription réussie !!!', data);
        navigate('/')
      } else {
        console.error('Erreur lors de l\'inscription', data);
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirm}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
        />
        <button type="submit">S'inscrire</button>
        <span>Vous avez déjà un compte ? <Link to="/sign-in">Se connecter</Link></span>
      </form>
  );
};

export default SignupForm;