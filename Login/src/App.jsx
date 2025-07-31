// src/App.jsx
import React from 'react';
import BackgroundSection from './components/BackgroundSection';
import LoginForm from './components/LoginForm';
import useAuth from './hooks/useAuth'; // Importa el custom hook useAuth
import './App.css';

const App = () => {
  // Usa el custom hook useAuth para obtener el estado de autenticación y las funciones
  const { isLoggedIn, userData, logout } = useAuth();

  return (
    <div className="login-container">
      <BackgroundSection />

      {!isLoggedIn ? (
        <LoginForm /> 
      ) : (

        <div className="form-section">
          <div className="form-content">
            <h2 className="welcome-text">¡Bienvenido!</h2>
            {userData && (
              <div className="user-info">
                <p>Has iniciado sesión con éxito.</p>
                <pre className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200 max-h-96">
                  {JSON.stringify(userData, null, 2)}
                </pre>
              </div>
            )}
            <button
              onClick={logout} // Llama a la función logout del hook
              className="login-button logout-button"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;