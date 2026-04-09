import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // cambia por tu URL real

export const registrarUsuario = async (datosUsuario) => {
  const response = await axios.post(`${API_URL}/auth/registro`, datosUsuario);
  return response.data;
};
export async function loginUsuario({ correo, contrasena }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (correo === 'admin@renta.com' && contrasena === 'Admin123!') {
        resolve({ token: 'jwt-token-fake', rol: 'administrador', nombre: 'Admin' })
      } else if (correo === 'cliente@renta.com' && contrasena === 'Cliente123!') {
        resolve({ token: 'jwt-token-fake', rol: 'cliente', nombre: 'Cliente' })
      } else {
        reject(new Error('Correo o contraseña incorrectos'))
      }
    }, 800)
  })
}

export async function recuperarContrasena(correo) {
  const response = await axios.post(`${API_URL}/auth/recuperar-contrasena`, { correo });
  return response.data;
}