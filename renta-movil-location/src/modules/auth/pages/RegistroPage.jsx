import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistro } from '../hooks/useRegistro';
import logo from '../../../assets/logo.png';

// ── Componente Campo definido FUERA del componente principal ──────────────────
// IMPORTANTE: si se define dentro, React lo re-crea en cada render y el input
// pierde el foco después de cada tecla pulsada.
const Campo = ({
  label, name, type = 'text', placeholder, required,
  value, onChange, error,
  verPassword, verConfirmar, setVerPassword, setVerConfirmar,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={styles.label}>
      {label} {required && <span style={{ color: '#1a56db' }}>*</span>}
    </label>
    <div style={{ position: 'relative' }}>
      <input
        type={
          name === 'password'          ? (verPassword  ? 'text' : 'password') :
          name === 'confirmarPassword' ? (verConfirmar ? 'text' : 'password') :
          type
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          ...styles.input,
          borderColor: error ? '#e53e3e' : '#d1d5db',
        }}
      />
      {/* Ojo para ver/ocultar contraseña */}
      {(name === 'password' || name === 'confirmarPassword') && (
        <button
          type="button"
          onClick={() =>
            name === 'password'
              ? setVerPassword(v => !v)
              : setVerConfirmar(v => !v)
          }
          style={styles.eyeBtn}
        >
          {(name === 'password' ? verPassword : verConfirmar) ? '' : ''}
        </button>
      )}
    </div>
    {error && <p style={styles.errorMsg}>{error}</p>}
  </div>
);

// ── Barra de seguridad de contraseña (también fuera) ─────────────────────────
const BarraSeguridad = ({ password }) => {
  if (!password) return null;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z\d]/.test(password),
  ];
  const cumplidos = checks.filter(Boolean).length;
  const colores = ['#e53e3e', '#e53e3e', '#ed8936', '#ecc94b', '#38a169'];
  const textos = ['', 'Muy débil', 'Débil', 'Regular', 'Buena', 'Segura'];
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            height: 4, flex: 1, borderRadius: 2,
            backgroundColor: i <= cumplidos ? colores[cumplidos - 1] : '#e2e8f0',
            transition: 'background-color 0.3s',
          }} />
        ))}
      </div>
      {cumplidos > 0 && (
        <p style={{ fontSize: 11, marginTop: 2, color: colores[cumplidos - 1] }}>
          {textos[cumplidos]}
        </p>
      )}
    </div>
  );
};

// ── Componente principal ──────────────────────────────────────────────────────
const RegistroPage = () => {
  const navigate = useNavigate();
  const { registrar, cargando, error, exito } = useRegistro();

  const [form, setForm] = useState({
    nombreCompleto: '',
    nacionalidad: '',
    numeroDocumento: '',
    correo: '',
    confirmarCorreo: '',
    telefono: '',
    fechaNacimiento: '',
    password: '',
    confirmarPassword: '',
    terminosAceptados: false,
  });

  const [errores, setErrores] = useState({});
  const [verPassword, setVerPassword] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validar = () => {
    const err = {};

    if (!form.nombreCompleto.trim())  err.nombreCompleto  = 'El nombre completo es obligatorio';
    if (!form.nacionalidad.trim())    err.nacionalidad    = 'La nacionalidad es obligatoria';
    if (!form.numeroDocumento.trim()) err.numeroDocumento = 'El número de documento es obligatorio';
    if (!form.telefono.trim())        err.telefono        = 'El teléfono es obligatorio';

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo.trim()) {
      err.correo = 'El correo es obligatorio';
    } else if (!regexCorreo.test(form.correo)) {
      err.correo = 'El correo no tiene un formato válido';
    }

    if (!form.confirmarCorreo.trim()) {
      err.confirmarCorreo = 'Debes confirmar el correo';
    } else if (form.correo !== form.confirmarCorreo) {
      err.confirmarCorreo = 'Los correos no coinciden';
    }

    if (!form.fechaNacimiento) {
      err.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    } else {
      const hoy = new Date();
      const nac = new Date(form.fechaNacimiento);
      const edad = hoy.getFullYear() - nac.getFullYear();
      const cumple =
        hoy.getMonth() > nac.getMonth() ||
        (hoy.getMonth() === nac.getMonth() && hoy.getDate() >= nac.getDate());
      if ((cumple ? edad : edad - 1) < 18)
        err.fechaNacimiento = 'Debes tener al menos 18 años';
    }

    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!form.password) {
      err.password = 'La contraseña es obligatoria';
    } else if (!regexPass.test(form.password)) {
      err.password = 'Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo';
    }

    if (!form.confirmarPassword) {
      err.confirmarPassword = 'Debes confirmar la contraseña';
    } else if (form.password !== form.confirmarPassword) {
      err.confirmarPassword = 'Las contraseñas no coinciden';
    }

    if (!form.terminosAceptados)
      err.terminosAceptados = 'Debes aceptar los términos y condiciones';

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encontrados = validar();
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      return;
    }
    setErrores({});
    // eslint-disable-next-line no-unused-vars
    const { confirmarCorreo: _cc, confirmarPassword: _cp, terminosAceptados: _t, ...datos } = form;
    await registrar(datos);
  };

  if (exito) navigate('/login');

  // Props compartidos que Campo necesita para los toggles de contraseña
  const campoProps = { value: undefined, onChange: handleChange, verPassword, verConfirmar, setVerPassword, setVerConfirmar };
  const cp = (name) => ({ ...campoProps, name, value: form[name], error: errores[name] });

  return (
    <div style={styles.pagina}>

      

      {/* Layout: logo + tarjeta */}
      <div style={styles.contenedor}>

        {/* Panel izquierdo con logo */}
        <div style={styles.panelLogo}>
          <img src={logo} alt="RentaMovil" style={{ width: 240, marginBottom: 8 }} />
          
        </div>

        {/* Tarjeta del formulario */}
        <div style={styles.tarjeta}>
          <h2 style={styles.titulo}>Registro de Usuario</h2>
          <div style={styles.lineaTitulo} />

          {error && (
            <div style={styles.alertaError}> {error}</div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>

            {/* Fila 1: Nombre + Correo */}
            <div style={styles.fila}>
              <Campo {...cp('nombreCompleto')} label="NOMBRE COMPLETO" placeholder="Ej: Laura Vanessa Pérez" required />
              <Campo {...cp('correo')} label="CORREO ELECTRÓNICO" type="email" placeholder="correo@ejemplo.com" required />
            </div>

            {/* Fila 2: Confirmar correo + Nacionalidad */}
            <div style={styles.fila}>
              <Campo {...cp('confirmarCorreo')} label="CONFIRMAR CORREO" type="email" placeholder="Repite tu correo" required />
              <Campo {...cp('nacionalidad')} label="NACIONALIDAD" placeholder="Ej: Colombiana" required />
            </div>

            {/* Fila 3: Documento + Teléfono */}
            <div style={styles.fila}>
              <Campo {...cp('numeroDocumento')} label="NÚMERO DE DOCUMENTO" placeholder="Ej: 1075..." required />
              <Campo {...cp('telefono')} label="TELÉFONO CELULAR" placeholder="+57 300 000 0000" required />
            </div>

            {/* Fila 4: Fecha de nacimiento */}
            <div style={styles.fila}>
              <Campo {...cp('fechaNacimiento')} label="FECHA DE NACIMIENTO (Edad Mínima)" type="date" required />
              <div />
            </div>

            {/* Fila 5: Contraseña + Confirmar */}
            <div style={styles.fila}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Campo {...cp('password')} label="CONTRASEÑA" placeholder="Mínimo 8 caracteres" required />
                <BarraSeguridad password={form.password} />
              </div>
              <Campo {...cp('confirmarPassword')} label="CONFIRMAR CONTRASEÑA" placeholder="Repite tu contraseña" required />
            </div>

            {/* Checkbox términos */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 4 }}>
              <input
                type="checkbox"
                name="terminosAceptados"
                id="terminos"
                checked={form.terminosAceptados}
                onChange={handleChange}
                style={{ width: 18, height: 18, accentColor: '#1a56db', marginTop: 2, cursor: 'pointer' }}
              />
              <label htmlFor="terminos" style={{ fontSize: 14, color: '#374151', cursor: 'pointer' }}>
                Acepto los{' '}
                <span style={{ color: '#1a56db', textDecoration: 'underline' }}>términos, condiciones</span>
                {' '}y tratamiento de datos.
              </label>
            </div>
            {errores.terminosAceptados && <p style={styles.errorMsg}>{errores.terminosAceptados}</p>}

            {/* Botón principal */}
            <button
              type="submit"
              disabled={cargando}
              style={{ ...styles.boton, opacity: cargando ? 0.7 : 1, cursor: cargando ? 'not-allowed' : 'pointer' }}
            >
              {cargando ? 'CREANDO CUENTA...' : 'CREAR MI CUENTA'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 14, color: '#6b7280', marginTop: 4 }}>
              ¿Ya tienes una cuenta?{' '}
              <span onClick={() => navigate('/login')} style={{ color: '#1a56db', fontWeight: 600, cursor: 'pointer' }}>
                Inicia sesión aquí
              </span>
            </p>

            <button
              type="button"
              onClick={() => navigate('/')}
              style={styles.botonInvitado}
            >
              Entrar como invitado
            </button>

          </form>
        </div>
      </div>

      <div style={styles.footer}>
        <span>● RentaMovil Location © 2026</span>
      </div>
    </div>
  );
};

// ── Estilos ───────────────────────────────────────────────────────────────────
const styles = {
  pagina: {
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', sans-serif",
  },
  barraTop: {
  backgroundColor: '#1a56db',
  padding: '10px 4%', // Alineado con el padding del contenedor
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  boxSizing: 'border-box',
},
  idioma: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: '#0f3d8c',
    padding: '4px 14px',
    borderRadius: 20,
    cursor: 'pointer',
  },
  contenedor: {
  flex: 1,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 60,            // Aumentamos el espacio entre logo y form
  padding: '40px 4%', // Padding lateral pequeño para que use casi toda la pantalla
  width: '100%',      // Ocupa todo el ancho
  maxWidth: 'none',   // QUITAMOS el límite de 1100px o 1600px
  boxSizing: 'border-box',
},
  panelLogo: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: 16,
  width: '280px',     // Ancho fijo para el área del logo
  flexShrink: 0,      // Que no se haga más pequeño
},
  logoTitulo: {
    fontSize: 32,
    fontWeight: 800,
    color: '#0f3d8c',
    marginTop: 8,
    lineHeight: 1,
  },
  logoSlogan: {
    fontSize: 13,
    color: '#4b6cb7',
    marginTop: 4,
  },
  tarjeta: {
  flex: 1,            // Toma todo el espacio sobrante
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: '40px 5%', // Padding interno en porcentaje para que los inputs se estiren
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
},
  titulo: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 6,
  },
  lineaTitulo: {
    width: 60,
    height: 3,
    backgroundColor: '#1a56db',
    borderRadius: 2,
    marginBottom: 24,
  },
  alertaError: {
    backgroundColor: '#fff5f5',
    border: '1px solid #fc8181',
    color: '#c53030',
    padding: '10px 16px',
    borderRadius: 8,
    fontSize: 14,
    marginBottom: 16,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    
  },
  fila: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: '#374151',
    letterSpacing: '0.05em',
    marginBottom: 4,
    display: 'block',
    
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#fafafa',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    padding: 0,
  },
  errorMsg: {
    fontSize: 11,
    color: '#e53e3e',
    marginTop: 2,
    margin: 0,
  },
  boton: {
    width: '100%',
    backgroundColor: '#1a56db',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: '0.08em',
    padding: '14px',
    borderRadius: 8,
    border: 'none',
    marginTop: 8,
    transition: 'background-color 0.2s',
  },
  botonInvitado: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#1a56db',
    fontWeight: 600,
    fontSize: 14,
    padding: '10px',
    borderRadius: 20,
    border: '1.5px solid #1a56db',
    cursor: 'pointer',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#e8eef8',
    padding: '10px 48px',
    fontSize: 12,
    color: '#6b7280',
  },
};

export default RegistroPage;
