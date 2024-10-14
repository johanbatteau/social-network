import React, { useState, useEffect } from 'react';
import '../../_dev/css/users.css'

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };

    fetchUsers().then(() => console.log("Récupération des utilisateurs réussie"));
  }, []);

  return (
      <>
        <h1>Liste des utilisateurs</h1>
        <div className="users-grid">
          {users.map((user, index) => (
              <div key={index}>{user.email}</div>
          ))}
        </div>
      </>
  );
};

export default UsersList;
