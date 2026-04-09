import { useState } from 'react';
import { registrarUsuario } from '../services/authService';

export const useRegistro = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError]       = useState(null);
  const [exito, setExito]       = useState(false);

  const registrar = async (datos) => {
    setCargando(true);
    setError(null);
    try {
      await registrarUsuario(datos);
      setExito(true);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar usuario');
    } finally {
      setCargando(false);
    }
  };

  return { registrar, cargando, error, exito };
};