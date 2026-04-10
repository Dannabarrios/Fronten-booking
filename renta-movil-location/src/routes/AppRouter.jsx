import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistroPage from '../modules/auth/pages/RegistroPage'
import LandingPage from '../modules/auth/pages/LandingPage'
import LoginPage from '../modules/auth/pages/LoginPage'
import VehiculosPage from '../modules/auth/pages/VehiculoPage'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/home" element={<VehiculosPage />} />
      <Route path="/admin" element={<VehiculosPage />} />
      <Route path="/catalogo" element={<VehiculosPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
