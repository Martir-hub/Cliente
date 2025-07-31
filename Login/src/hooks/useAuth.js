import { useState, useEffect, useCallback } from 'react';

// URL de la API de login
const API_LOGIN_URL = 'http://localhost/IUTEPI/horarios-iutepi/api/Login';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para verificar el estado de autenticación al cargar el componente
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Error al parsear datos de usuario almacenados:", e);
        localStorage.removeItem('userData'); 
        setIsLoggedIn(false);
        alert('Se detectaron datos de sesión corruptos. Por favor, inicia sesión de nuevo.');
      }
    }
  }, []);

  // Función para manejar el login
  const login = useCallback(async (username, password) => {
    setIsLoading(true);

    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      };

      const res = await fetch(API_LOGIN_URL, options);

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({ message: 'Error desconocido del servidor.' }))
        alert(errBody.message || `Error ${res.status}: Fallo en la solicitud.`);
        return false; 
      }

      //Para guarda en localStorage
      const data = await res.json();
      setUserData(data);
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(data));
      
  
      alert('¡Inicio de sesión exitoso!'); 
      return true; 
    } catch (err) {
      alert('Error al iniciar sesión. Verifica tu conexión a internet o tus credenciales.');
      console.error('Fallo en el login:', err); // Mantener en consola para depuración
      setIsLoggedIn(false);
      setUserData(null);
      return false; 
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para manejar el cierre de sesión
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
    alert('¡Sesión cerrada correctamente!'); 
  }, []);


  return { isLoggedIn, userData, isLoading, login, logout };
};

export default useAuth;