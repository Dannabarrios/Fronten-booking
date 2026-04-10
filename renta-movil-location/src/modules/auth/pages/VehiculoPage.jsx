import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/* ─── Mock data ─── */
const VEHICULOS = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'RAV4',
    anio: 2024,
    categoria: 'SUV',
    combustible: 'Gasolina',
    tarifa: 120000,
    disponible: true,
    sucursal: 'Sede Norte',
    imagen: '/toyota rawr.jpeg',
    caracteristicas: { puertas: 5, pasajeros: 5, transmision: 'Automática', km: 0 },
    seguros: ['SOAT', 'Todo Riesgo', 'Responsabilidad Civil'],
    calificacion: 4.8,
    descripcion: 'SUV compacto con tracción integral opcional, ideal para ciudad y montaña.',
  },
  {
    id: 2,
    marca: 'Mazda',
    modelo: '3 Grand Touring',
    anio: 2023,
    categoria: 'Sedán',
    combustible: 'Gasolina',
    tarifa: 95000,
    disponible: true,
    sucursal: 'Sede Centro',
    imagen: 'https://www.motortrend.com/uploads/2022/10/2023-mazda3-sedan-front-three-quarter.jpg',
    caracteristicas: { puertas: 4, pasajeros: 5, transmision: 'Automática', km: 5000 },
    seguros: ['SOAT', 'Básico'],
    calificacion: 4.6,
    descripcion: 'Sedán premium con diseño Kodo y tecnología Skyactiv para mayor eficiencia.',
  },
  {
    id: 3,
    marca: 'Kia',
    modelo: 'Picanto Ion',
    anio: 2022,
    categoria: 'Urbano',
    combustible: 'Gasolina',
    tarifa: 65000,
    disponible: true,
    sucursal: 'Sede Sur',
    imagen: 'https://www.motortrend.com/uploads/2021/06/2022-kia-rio-front-three-quarter.jpg',
    caracteristicas: { puertas: 5, pasajeros: 4, transmision: 'Manual', km: 12000 },
    seguros: ['SOAT'],
    calificacion: 4.2,
    descripcion: 'Vehículo urbano económico, perfecto para movilizarse en la ciudad.',
  },
  {
    id: 4,
    marca: 'Ford',
    modelo: 'F-150 Lariat',
    anio: 2024,
    categoria: 'Pickup',
    combustible: 'Gasolina',
    tarifa: 180000,
    disponible: false,
    sucursal: 'Sede Norte',
    imagen: 'https://www.motortrend.com/uploads/2023/01/2024-ford-f-150-front-three-quarter.jpg',
    caracteristicas: { puertas: 4, pasajeros: 5, transmision: 'Automática', km: 2000 },
    seguros: ['SOAT', 'Todo Riesgo', 'Responsabilidad Civil', 'Asistencia Vial'],
    calificacion: 4.9,
    descripcion: 'Pickup potente con cabina doble y capacidad de carga de 1 tonelada.',
  },
  {
    id: 5,
    marca: 'BMW',
    modelo: 'Serie 3',
    anio: 2023,
    categoria: 'Lujo',
    combustible: 'Gasolina',
    tarifa: 210000,
    disponible: true,
    sucursal: 'Sede Este',
    imagen: 'https://www.motortrend.com/uploads/2022/11/2023-bmw-3-series-front-three-quarter.jpg',
    caracteristicas: { puertas: 4, pasajeros: 5, transmision: 'Automática', km: 1500 },
    seguros: ['SOAT', 'Todo Riesgo Premium', 'Responsabilidad Civil'],
    calificacion: 4.9,
    descripcion: 'Sedán de lujo deportivo con motorización BMW TwinPower Turbo.',
  },
  {
    id: 6,
    marca: 'BYD',
    modelo: 'Seagull',
    anio: 2024,
    categoria: 'Urbano',
    combustible: 'Eléctrico',
    tarifa: 110000,
    disponible: true,
    sucursal: 'Sede Centro',
    imagen: 'https://www.motortrend.com/uploads/2024/01/2024-byd-seagull-front-three-quarter.jpg',
    caracteristicas: { puertas: 5, pasajeros: 4, transmision: 'Automática', km: 0 },
    seguros: ['SOAT', 'Todo Riesgo'],
    calificacion: 4.5,
    descripcion: 'Hatchback eléctrico de última generación con autonomía de 405 km.',
  },
  {
    id: 7,
    marca: 'Chevrolet',
    modelo: 'Tracker',
    anio: 2024,
    categoria: 'SUV',
    combustible: 'Gasolina',
    tarifa: 105000,
    disponible: true,
    sucursal: 'Sede Sur',
    imagen: 'https://www.motortrend.com/uploads/2023/06/2024-chevrolet-trax-front-three-quarter.jpg',
    caracteristicas: { puertas: 5, pasajeros: 5, transmision: 'Automática', km: 8000 },
    seguros: ['SOAT', 'Básico'],
    calificacion: 4.3,
    descripcion: 'SUV compacto con conectividad Wi-Fi y sistema de infoentretenimiento avanzado.',
  },
  {
    id: 8,
    marca: 'Hyundai',
    modelo: 'Ioniq 6',
    anio: 2024,
    categoria: 'Sedán',
    combustible: 'Eléctrico',
    tarifa: 195000,
    disponible: false,
    sucursal: 'Sede Norte',
    imagen: 'https://www.motortrend.com/uploads/2023/01/2023-hyundai-ioniq-6-front-three-quarter.jpg',
    caracteristicas: { puertas: 4, pasajeros: 5, transmision: 'Automática', km: 500 },
    seguros: ['SOAT', 'Todo Riesgo', 'Responsabilidad Civil'],
    calificacion: 4.7,
    descripcion: 'Sedán eléctrico aerodinámico con autonomía de 614 km y carga rápida 800V.',
  },
]

const MARCAS = ['Todas las marcas', ...new Set(VEHICULOS.map(v => v.marca))]
const CATEGORIAS = ['SUV / Camionetas', 'Sedán', 'Deportivo / Lujo', 'Urbano', 'Pickup', 'Eléctrico']

const CATEGORIA_MAP = {
  'SUV / Camionetas': v => v.categoria === 'SUV' || v.categoria === 'Pickup',
  'Sedán': v => v.categoria === 'Sedán',
  'Deportivo / Lujo': v => v.categoria === 'Lujo',
  'Urbano': v => v.categoria === 'Urbano',
  'Pickup': v => v.categoria === 'Pickup',
  'Eléctrico': v => v.combustible === 'Eléctrico',
}

const fmt = n => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n)

/* ─── Navbar ─── */
function Navbar({ rol, nombre }) {
  const navigate = useNavigate()
  const navLinks = rol === 'administrador'
    ? ['Catálogo', 'Gestionar Flota', 'Reservas', 'Reportes', 'Sucursales']
    : ['Catálogo', 'Mis Reservas', 'Soporte', 'Perfil']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a8a] shadow-lg">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-lg font-black text-white tracking-wide">
          RENTA <span className="text-[#60a5fa]">MÓVIL</span>
        </span>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a key={link} className={`text-sm font-medium cursor-pointer transition-colors ${i === 0 ? 'text-white border-b-2 border-[#60a5fa] pb-0.5' : 'text-blue-200 hover:text-white'}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {rol === 'administrador' && (
            <span className="hidden sm:block bg-amber-400 text-amber-900 text-xs font-black px-2.5 py-1 rounded-full">
              ADMIN
            </span>
          )}
          <button className="bg-white text-[#1e3a8a] text-sm font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
            Hola, {nombre || 'Juan P.'}
          </button>
        </div>
      </div>
    </nav>
  )
}

/* ─── Stars ─── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  )
}

/* ─── Badge categoría ─── */
const CAT_COLORS = {
  SUV: 'bg-blue-100 text-blue-700',
  Sedán: 'bg-purple-100 text-purple-700',
  Lujo: 'bg-amber-100 text-amber-700',
  Urbano: 'bg-green-100 text-green-700',
  Pickup: 'bg-orange-100 text-orange-700',
  Eléctrico: 'bg-emerald-100 text-emerald-700',
}

/* ─── Modal detalle ─── */
function DetalleModal({ vehiculo, onClose, rol }) {
  if (!vehiculo) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[fadeIn_.2s_ease]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header imagen */}
        <div className="relative h-52 bg-slate-100 rounded-t-2xl overflow-hidden">
          <img
            src={vehiculo.imagen}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = `https://placehold.co/700x300/e2e8f0/64748b?text=${vehiculo.marca}+${vehiculo.modelo}` }}
          />
          <button onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CAT_COLORS[vehiculo.categoria] || 'bg-slate-100 text-slate-700'}`}>
              {vehiculo.categoria.toUpperCase()} • {vehiculo.anio}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${vehiculo.disponible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {vehiculo.disponible ? '● Disponible' : '● No disponible'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-2xl font-black text-slate-800">{vehiculo.marca} {vehiculo.modelo}</h2>
            <Stars rating={vehiculo.calificacion} />
          </div>
          <p className="text-slate-500 text-sm mb-4">{vehiculo.descripcion}</p>

          {/* Tarifa */}
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] rounded-xl p-4 mb-4 text-white flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs font-medium">Tarifa diaria</p>
              <p className="text-2xl font-black">{fmt(vehiculo.tarifa)}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200 text-xs font-medium">Sucursal</p>
              <p className="text-sm font-bold">{vehiculo.sucursal}</p>
            </div>
          </div>

          {/* Características */}
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-3">Características</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Puertas', val: vehiculo.caracteristicas.puertas, icon: '🚪' },
              { label: 'Pasajeros', val: vehiculo.caracteristicas.pasajeros, icon: '👥' },
              { label: 'Transmisión', val: vehiculo.caracteristicas.transmision, icon: '⚙️' },
              { label: 'Km recorridos', val: vehiculo.caracteristicas.km.toLocaleString(), icon: '📍' },
            ].map(({ label, val, icon }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-sm font-black text-slate-700">{val}</p>
              </div>
            ))}
          </div>

          {/* Seguros */}
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-2">Seguros incluidos</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {vehiculo.seguros.map(s => (
              <span key={s} className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                {s}
              </span>
            ))}
          </div>

          {/* Vista admin adicional */}
          {rol === 'administrador' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-black text-amber-800 uppercase tracking-wider mb-2">
                🔒 Panel Administrador
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-amber-700 font-semibold">ID:</span> <span className="text-slate-700">VH-{String(vehiculo.id).padStart(4,'0')}</span></div>
                <div><span className="text-amber-700 font-semibold">Combustible:</span> <span className="text-slate-700">{vehiculo.combustible}</span></div>
                <div><span className="text-amber-700 font-semibold">Sucursal:</span> <span className="text-slate-700">{vehiculo.sucursal}</span></div>
                <div><span className="text-amber-700 font-semibold">Estado:</span> <span className={vehiculo.disponible ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{vehiculo.disponible ? 'Activo' : 'No disponible'}</span></div>
              </div>
              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Consulta registrada en auditoría — {new Date().toLocaleString('es-CO')}
              </p>
            </div>
          )}

          {/* CTA */}
          <button disabled={!vehiculo.disponible}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white font-black text-sm tracking-wide hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-blue-900/20">
            {vehiculo.disponible ? 'ALQUILAR AHORA' : 'NO DISPONIBLE'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Card vehículo ─── */
function VehiculoCard({ v, onVerDetalle, rol }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Imagen */}
      <div className="relative bg-slate-50 h-44 overflow-hidden">
        <img
          src={imgError ? `https://placehold.co/480x200/e2e8f0/64748b?text=${v.marca}` : v.imagen}
          alt={`${v.marca} ${v.modelo}`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        {!v.disponible && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full tracking-wider">NO DISPONIBLE</span>
          </div>
        )}
        {rol === 'administrador' && (
          <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-black px-2 py-0.5 rounded-full">ADMIN</div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Categoría + año */}
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${CAT_COLORS[v.categoria] || 'bg-slate-100 text-slate-600'}`}>
            {v.categoria.toUpperCase()} • {v.anio}
          </span>
          <Stars rating={v.calificacion} />
        </div>

        {/* Nombre */}
        <h3 className="text-lg font-black text-slate-800 mb-0.5">{v.marca} {v.modelo}</h3>
        <p className="text-xs text-slate-400 mb-3">{v.sucursal} · {v.combustible}</p>

        {/* Tarifa */}
        <p className="text-xl font-black text-slate-800 mb-3">
          {fmt(v.tarifa)}<span className="text-sm font-medium text-slate-400"> / día</span>
        </p>

        {/* Admin extra */}
        {rol === 'administrador' && (
          <div className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 mb-3 space-y-0.5">
            <p><span className="font-semibold">ID:</span> VH-{String(v.id).padStart(4,'0')}</p>
            <p><span className="font-semibold">Km:</span> {v.caracteristicas.km.toLocaleString()}</p>
          </div>
        )}

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onVerDetalle(v)}
            className="flex-1 py-2.5 rounded-xl border-2 border-[#1e3a8a] text-[#1e3a8a] font-black text-xs hover:bg-blue-50 transition-colors">
            VER DETALLES
          </button>
          <button
            disabled={!v.disponible}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white font-black text-xs hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
            ALQUILAR
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── PAGE PRINCIPAL ─── */
export default function VehiculosPage() {
  // Simula rol desde localStorage
  const userRaw = localStorage.getItem('renta_user')
  const user = userRaw ? JSON.parse(userRaw) : { nombre: 'Juan P.', rol: 'cliente' }
  const rol = user.rol || 'cliente'

  const [marca, setMarca] = useState('Todas las marcas')
  const [disponibilidad, setDisponibilidad] = useState('todos')
  const [combustibles, setCombustibles] = useState([])
  const [categorias, setCategorias] = useState([])
  const [precioMax, setPrecioMax] = useState(250000)
  const [busqueda, setBusqueda] = useState('')
  const [detalle, setDetalle] = useState(null)
  const [orden, setOrden] = useState('defecto')

  const MAX_PRECIO = 250000

  const toggleCombustible = (c) =>
    setCombustibles(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const toggleCategoria = (c) =>
    setCategorias(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const limpiarFiltros = () => {
    setMarca('Todas las marcas')
    setDisponibilidad('todos')
    setCombustibles([])
    setCategorias([])
    setPrecioMax(250000)
    setBusqueda('')
    setOrden('defecto')
  }

  const filtrados = useMemo(() => {
    let lista = VEHICULOS.filter(v => {
      if (marca !== 'Todas las marcas' && v.marca !== marca) return false
      if (disponibilidad === 'disponible' && !v.disponible) return false
      if (disponibilidad === 'no_disponible' && v.disponible) return false
      if (combustibles.length && !combustibles.includes(v.combustible)) return false
      if (categorias.length && !categorias.some(c => CATEGORIA_MAP[c]?.(v))) return false
      if (v.tarifa > precioMax) return false
      if (busqueda && !`${v.marca} ${v.modelo}`.toLowerCase().includes(busqueda.toLowerCase())) return false
      return true
    })
    if (orden === 'precio_asc') lista.sort((a,b) => a.tarifa - b.tarifa)
    if (orden === 'precio_desc') lista.sort((a,b) => b.tarifa - a.tarifa)
    if (orden === 'calificacion') lista.sort((a,b) => b.calificacion - a.calificacion)
    return lista
  }, [marca, disponibilidad, combustibles, categorias, precioMax, busqueda, orden])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar rol={rol} nombre={user.nombre} />

      <div className="pt-14 max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">

          {/* ── Sidebar filtros ── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-slate-800 text-base">Filtros de Búsqueda</h2>
                <button onClick={limpiarFiltros} className="text-xs text-[#2563eb] font-semibold hover:underline">Limpiar</button>
              </div>

              {/* Marca */}
              <div className="mb-5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Marca</label>
                <select
                  value={marca}
                  onChange={e => setMarca(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  {MARCAS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              {/* Disponibilidad */}
              <div className="mb-5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Disponibilidad</label>
                <div className="space-y-1.5">
                  {[['todos','Todos'],['disponible','Disponibles'],['no_disponible','No disponibles']].map(([val,lbl]) => (
                    <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" name="disponibilidad" value={val} checked={disponibilidad===val}
                        onChange={() => setDisponibilidad(val)}
                        className="accent-[#1e3a8a] w-4 h-4" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">{lbl}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Precio */}
              <div className="mb-5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
                  Rango de Precio
                </label>
                <input type="range" min={50000} max={MAX_PRECIO} step={5000}
                  value={precioMax}
                  onChange={e => setPrecioMax(Number(e.target.value))}
                  className="w-full accent-[#1e3a8a]" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>$50.000</span>
                  <span className="font-bold text-[#1e3a8a]">{fmt(precioMax)}</span>
                </div>
              </div>

              {/* Combustible */}
              <div className="mb-5">
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Combustible</label>
                <div className="space-y-1.5">
                  {['Gasolina','Eléctrico'].map(c => (
                    <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={combustibles.includes(c)}
                        onChange={() => toggleCombustible(c)}
                        className="accent-[#1e3a8a] w-4 h-4 rounded" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Categoría</label>
                <div className="space-y-1.5">
                  {CATEGORIAS.map(c => (
                    <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="checkbox" checked={categorias.includes(c)}
                        onChange={() => toggleCategoria(c)}
                        className="accent-[#1e3a8a] w-4 h-4 rounded" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-800">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Contenido principal ── */}
          <div className="flex-1 min-w-0">

            {/* Barra superior */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" placeholder="Buscar por marca o modelo…"
                  value={busqueda} onChange={e => setBusqueda(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 bg-white transition-all" />
              </div>
              <select value={orden} onChange={e => setOrden(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#2563eb] bg-white text-slate-700 transition-all">
                <option value="defecto">Ordenar por defecto</option>
                <option value="precio_asc">Precio: menor a mayor</option>
                <option value="precio_desc">Precio: mayor a menor</option>
                <option value="calificacion">Mejor calificación</option>
              </select>
            </div>

            {/* Contador */}
            <p className="text-sm text-slate-500 mb-4">
              {filtrados.length === 0
                ? 'Sin resultados'
                : <><span className="font-bold text-slate-700">{filtrados.length}</span> vehículo{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}</>
              }
            </p>

            {/* Grid o mensaje vacío */}
            {filtrados.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="text-lg font-black text-slate-700 mb-2">No se encontraron vehículos</h3>
                <p className="text-sm text-slate-400 mb-5">Intenta ajustar los filtros de búsqueda para ver más resultados.</p>
                <button onClick={limpiarFiltros}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white font-black text-sm hover:opacity-90 transition-all">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtrados.map(v => (
                  <VehiculoCard key={v.id} v={v} onVerDetalle={setDetalle} rol={rol} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal detalle */}
      <DetalleModal vehiculo={detalle} onClose={() => setDetalle(null)} rol={rol} />

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </div>
  )
}
