import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recuperarContrasena } from '../services/authService'
import logo from '../../../assets/logo.png'

export default function ForgotPasswordPage() {
  const [correo, setCorreo]     = useState('')
  const [enviado, setEnviado]   = useState(false)
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!correo) { setError('Ingresa tu correo electrónico'); return }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(correo)) { setError('Formato de correo inválido'); return }
    setCargando(true)
    try {
      await recuperarContrasena(correo)
      setEnviado(true)
    } catch {
      setError('No encontramos ese correo en el sistema')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f4f6f9',
      fontFamily: "'Segoe UI', system-ui, sans-serif"
    }}>

      {/* Franja azul */}
      <div style={{ width: '100%', height: 70, background: 'linear-gradient(to right, #1e3a8a, #2563eb)' }} />

      {/* Contenido centrado */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>

        {/* Logo centrado arriba */}
        <img src={logo} alt="RentaMovil" style={{ width: 150, marginBottom: 24 }} />

        {/* Card centrada */}
        <div style={{
          width: '100%',
          maxWidth: 420,
          backgroundColor: '#fff',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2rem'
        }}>
          {!enviado ? (
            <>
              {/* Ícono escudo */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  backgroundColor: '#eff6ff', border: '2px solid #dbeafe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <svg width="28" height="28" fill="none" stroke="#1e3a8a" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              </div>

              <p style={{ fontSize: 20, fontWeight: 900, color: '#1e293b', textAlign: 'center', margin: '0 0 8px' }}>
                ¿Olvidaste tu contraseña?
              </p>
              <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', margin: '0 0 20px', lineHeight: 1.6 }}>
                Ingresa tu correo y te enviaremos un enlace para restablecerla de forma segura.
              </p>

              {error && (
                <div style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 12, backgroundColor: '#fff5f5', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    disabled={cargando}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '2px solid #e2e8f0', fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fafafa' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={cargando}
                  style={{ width: '100%', padding: '13px', borderRadius: 12, backgroundColor: '#1e3a8a', color: '#fff', fontWeight: 900, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: cargando ? 'not-allowed' : 'pointer', opacity: cargando ? 0.6 : 1 }}>
                  {cargando ? 'Enviando...' : 'Enviar'}
                </button>
              </form>

              <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 12, backgroundColor: '#eff6ff', border: '1px solid #dbeafe', textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: '#1e3a8a', fontStyle: 'italic', margin: 0 }}>
                  El enlace de recuperación expirará en 24 horas por seguridad.
                </p>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width="28" height="28" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p style={{ fontSize: 18, fontWeight: 900, color: '#1e293b', margin: '0 0 8px' }}>¡Correo enviado!</p>
              <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px', lineHeight: 1.6 }}>
                Revisa tu bandeja en <span style={{ color: '#1e3a8a', fontWeight: 700 }}>{correo}</span> y sigue las instrucciones.
              </p>
              <div style={{ padding: '10px 14px', borderRadius: 12, backgroundColor: '#eff6ff', border: '1px solid #dbeafe', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#1e3a8a', fontStyle: 'italic', margin: 0 }}>
                  El enlace expirará en 24 horas por seguridad.
                </p>
              </div>
              <Link to="/login" style={{ display: 'block', width: '100%', padding: '13px', borderRadius: 12, backgroundColor: '#1e3a8a', color: '#fff', fontWeight: 900, fontSize: 13, textAlign: 'center', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', boxSizing: 'border-box' }}>
                Volver al inicio de sesión
              </Link>
            </div>
          )}
        </div>

        {/* Link volver */}
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 20 }}>
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" style={{ color: '#1e3a8a', fontWeight: 700, textDecoration: 'none' }}>
            Volver al Login
          </Link>
        </p>

      </div>
    </div>
  )
}