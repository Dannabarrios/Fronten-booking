// AppRouter.jsx — Rutas de la aplicación Renta Móvil
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import RegistroPage       from '../modules/auth/pages/RegistroPage'
import LandingPage        from '../modules/auth/pages/LandingPage'
import LoginPage          from '../modules/auth/pages/LoginPage'
import VehiculosPage      from '../modules/auth/pages/VehiculoPage'
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage'
// RF11: flujo de reserva — recibe vehiculo via location.state
import ReservaPage        from '../modules/reservas/pages/ReservaPage'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"                element={<LandingPage />}             />
      <Route path="/login"           element={<LoginPage />}               />
      <Route path="/registro"        element={<RegistroPage />}            />
      <Route path="/home"            element={<VehiculosPage />}           />
      <Route path="/admin"           element={<VehiculosPage />}           />
      <Route path="/catalogo"        element={<VehiculosPage />}           />
      {/* Wizard de reserva RF11 — el vehículo llega via location.state */}
      <Route path="/reserva"         element={<ReservaPage />}             />
      <Route path="/forgot-password" element={<ForgotPasswordPage />}      />
      <Route path="*"                element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
