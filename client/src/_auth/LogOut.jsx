import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');

    navigate('/sign-in');
  }, [navigate]);

  return null;
};

export default LogOut;
