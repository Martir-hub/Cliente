import React, { useState } from 'react';
import useAuth from '../hooks/useAuth'; // Importa el custom hook useAuth

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    
    // Llama a la función login del custom hook
    await login(username, password);
  };

  return (
    <div className="form-section">
      <div className="form-content">
        <h2 className="welcome-text">Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading} // Deshabilita el input si está cargando
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading} // Deshabilita el input si está cargando
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;