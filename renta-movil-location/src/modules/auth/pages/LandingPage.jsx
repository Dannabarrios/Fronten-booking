import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.png'

const features = [
  {
    titulo: 'Flota premium',
    desc: 'Más de 50 vehículos disponibles: SUVs, sedanes, económicos y deportivos para cada necesidad.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    titulo: 'Pagos 100% seguros',
    desc: 'PSE, Nequi, tarjetas crédito/débito a través de Wompi con cifrado SSL/TLS.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titulo: 'Contratos digitales',
    desc: 'Firma tu contrato en línea con validez legal. Sin papeleos, sin filas, sin complicaciones.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    titulo: 'Múltiples sucursales',
    desc: 'Recoge y devuelve tu vehículo en la sucursal más cercana con disponibilidad en tiempo real.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    titulo: 'App móvil PWA',
    desc: 'Reserva desde tu celular Android. Interfaz adaptada para una experiencia fluida en cualquier dispositivo.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-3 3h3" />
      </svg>
    ),
  },
  {
    titulo: 'Calificaciones reales',
    desc: 'Lee reseñas verificadas de otros conductores y califica tu experiencia al finalizar cada viaje.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
]

const pasos = [
  { num: '01', titulo: 'Crea tu cuenta', desc: 'Regístrate en minutos y sube tu licencia de conducir para verificación.' },
  { num: '02', titulo: 'Elige tu vehículo', desc: 'Explora la flota, filtra por categoría, precio y disponibilidad.' },
  { num: '03', titulo: 'Reserva y paga', desc: 'Selecciona fechas, sucursal y método de pago. Recibe tu contrato digital.' },
  { num: '04', titulo: 'Conduce libre', desc: 'Recoge tu vehículo, disfruta el viaje y califica tu experiencia.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="w-full max-w-screen-xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-[#1e3a8a]">Renta<span className="text-[#3b82f6]">Movil</span></span>
          <div className="hidden md:flex items-center gap-6">
            {['Vehículos', 'Sucursales', 'Servicios', 'Tarifas', 'Soporte'].map(item => (
              <a key={item} className="text-sm text-slate-600 font-medium hover:text-[#1e3a8a] transition-colors cursor-pointer">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-500 text-xs font-medium hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
             </svg>
                ES
             </button>
            <Link to="/login"
              className="px-4 py-1.5 rounded-full text-[#1e3a8a] border border-[#1e3a8a]/40 text-xs font-semibold hover:bg-[#1e3a8a]/5 transition-all">
              Iniciar sesión
            </Link>
            <Link to="/registro"
              className="px-4 py-1.5 rounded-full bg-[#1e3a8a] text-white text-xs font-bold hover:bg-[#162d6e] transition-all">
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
<section className="relative bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-white pt-16 min-h-screen flex items-center overflow-hidden">
  <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-100/60 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-100/40 translate-y-1/4 -translate-x-1/4 pointer-events-none" />

  <div className="relative w-full max-w-screen-xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-16">

    {/* Texto izquierda */}
    <div className="flex-1 text-left">
      <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#1e3a8a] text-xs font-bold px-3 py-1.5 rounded-full mb-8">
        <span className="w-2 h-2 rounded-full bg-[#1e3a8a] animate-pulse" />
        Disponible en Colombia
      </span>

     

      <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
        Alquila fácil,<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]">
          conduce libre
        </span>
      </h1>
      <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg">
        La plataforma digital que moderniza el alquiler de vehículos en Colombia.
        Reserva en minutos, paga seguro y maneja sin complicaciones.
      </p>
      <div className="flex flex-wrap gap-4 mb-12">
        <Link to="/registro"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1e3a8a] text-white font-bold text-base hover:bg-[#162d6e] transition-all shadow-xl shadow-blue-900/20">
          Comenzar ahora
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
        <Link to="/login"
          className="inline-flex items-center px-8 py-4 rounded-full border-2 border-slate-300 text-slate-700 font-semibold text-base hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition-all">
          Iniciar sesión
        </Link>
      </div>
      <div className="flex gap-12">
        {[['50+', 'Vehículos'], ['24/7', 'Soporte'], ['100%', 'Digital']].map(([n, l]) => (
          <div key={l}>
            <p className="text-3xl font-black text-[#1e3a8a]">{n}</p>
            <p className="text-sm text-slate-400 font-medium mt-1">{l}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Card derecha */}
    <div className="flex-1 flex justify-center lg:justify-end w-full">
      <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 p-8 w-full max-w-md border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Disponibles ahora</p>
        {[
          { emoji: '', modelo: 'Sedan Económico', nombre: 'Toyota Corolla 2024', precio: '$85k/día' },
          { emoji: '', modelo: 'SUV Premium', nombre: 'Mazda CX-5 2024', precio: '$145k/día' },
          { emoji: '', modelo: 'Deportivo', nombre: 'Mustang GT 2023', precio: '$220k/día' },
        ].map((car) => (
          <div key={car.nombre} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 mb-4 last:mb-0 hover:bg-blue-50 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl flex-shrink-0">{car.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-slate-800">{car.modelo}</p>
              <p className="text-sm text-slate-400">{car.nombre}</p>
            </div>
            <span className="text-base font-black text-[#1e3a8a] whitespace-nowrap">{car.precio}</span>
          </div>
        ))}
        <Link to="/registro"
          className="block w-full mt-6 py-4 rounded-2xl bg-[#1e3a8a] text-white text-base font-bold text-center hover:bg-[#162d6e] transition-all">
          Ver toda la flota →
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-8 bg-slate-50">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#1e3a8a] text-xs font-bold uppercase tracking-widest">Proceso simple</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">¿Cómo funciona?</h2>
            <p className="text-slate-500 mt-3 text-sm">En 4 pasos tienes tu vehículo listo para manejar</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((p, i) => (
              <div key={p.num} className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                {i < pasos.length - 1 && (
                  <div className="hidden lg:block absolute top-9 -right-3 z-10">
                    <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
                <span className="text-5xl font-black text-[#1e3a8a] select-none leading-none">{p.num}</span>
                <h3 className="text-slate-800 font-bold text-base mt-2 mb-2">{p.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="py-20 px-8 bg-white">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#1e3a8a] text-xs font-bold uppercase tracking-widest">Todo incluido</span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Por qué elegirnos</h2>
            <p className="text-slate-500 mt-3 text-sm">Una plataforma completa diseñada para tu comodidad</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.titulo}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-slate-800 font-bold text-base mb-2">{f.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-br from-[#0f1a3d] via-[#1e3a8a] to-[#2563eb]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            ¿Listo para manejar sin complicaciones?
          </h2>
          <p className="text-blue-200 text-base mb-8">
            Únete a cientos de conductores que ya confían en RentaMovil.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/registro"
              className="px-8 py-3.5 rounded-full bg-white text-[#1e3a8a] font-bold text-sm hover:scale-105 transition-transform shadow-xl">
              Crear cuenta gratis
            </Link>
            <Link to="/login"
              className="px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-14 px-8">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-10">
            <div className="max-w-xs">
              <img src={logo} alt="RentaMovil" className="h-10 mb-4 brightness-0 invert opacity-90" />
              <p className="text-sm leading-relaxed text-slate-500">
                Plataforma digital de alquiler de vehículos desarrollada en Colombia.
                Segura, eficiente y accesible para todos.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-white font-bold mb-4">Plataforma</p>
                {['Catálogo de vehículos', 'Reservas', 'Pagos en línea', 'Contratos digitales'].map(l => (
                  <p key={l} className="mt-2.5 hover:text-white cursor-pointer transition-colors text-xs">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-white font-bold mb-4">Soporte</p>
                {['Preguntas frecuentes', 'Contacto', 'Quejas y sugerencias', 'WhatsApp 24/7'].map(l => (
                  <p key={l} className="mt-2.5 hover:text-white cursor-pointer transition-colors text-xs">{l}</p>
                ))}
              </div>
              <div>
                <p className="text-white font-bold mb-4">Legal</p>
                {['Términos y condiciones', 'Política de privacidad', 'Ley 1581 de 2012', 'OWASP Top 10'].map(l => (
                  <p key={l} className="mt-2.5 hover:text-white cursor-pointer transition-colors text-xs">{l}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">© 2025 RentaMovil. Todos los derechos reservados. Ficha 3145555 — SENA CIES.</p>
            <div className="flex gap-3">
              {[
                { label: 'Facebook', body: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
                { label: 'Instagram', body: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg> },
                { label: 'WhatsApp', body: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.886l6.204-1.448A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.5-5.187-1.373l-.371-.221-3.845.897.943-3.741-.242-.386A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> },
              ].map((r) => (
                <a key={r.label} href="#"
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-500 transition-all">
                  {r.body}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}