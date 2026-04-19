// ================================================================
// ReservaPage.jsx
// Estructura del flujo de reserva RF11 — Renta Móvil
// SOLO JSX + lógica — los estilos están en ReservaPage.css
// Ubicación: src/modules/reservas/pages/ReservaPage.jsx
// ================================================================

import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './ReservaPage.css'

// ─── Helpers ─────────────────────────────────────────────────────
// Formatea moneda colombiana (COP)
const fmt = n =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(n)

// Fecha de hoy (sin hora)
const hoy = (() => { const d = new Date(); d.setHours(0,0,0,0); return d })()

// Días bloqueados mock (sin disponibilidad) — RF11.4
const BLOQUEADOS = new Set([
  new Date(hoy.getFullYear(), hoy.getMonth(), 5).getTime(),
  new Date(hoy.getFullYear(), hoy.getMonth(), 12).getTime(),
  new Date(hoy.getFullYear(), hoy.getMonth(), 20).getTime(),
])

// ─── Datos mock (reemplazables por API) ──────────────────────────

// Galería de imágenes del vehículo
const GALERIA_MOCK = [
  'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80',
]

// Sucursales disponibles (RF11.2)
const SUCURSALES = [
  { id: 1, nombre: 'Sede Norte',  direccion: 'Av. Boyacá #80-12, Bogotá'       },
  { id: 2, nombre: 'Sede Centro', direccion: 'Cra. 7 #32-45, Bogotá'           },
  { id: 3, nombre: 'Sede Sur',    direccion: 'Cll. 40 Sur #68-20, Bogotá'      },
  { id: 4, nombre: 'Sede Este',   direccion: 'Av. El Dorado #90-14, Bogotá'    },
]

// Tipos de seguro (RF11.10)
const SEGUROS = [
  { id: 'soat',    nombre: 'Solo SOAT',     desc: 'Cobertura básica obligatoria',          precio: 0     },
  { id: 'basico',  nombre: 'Seg. Básico',   desc: 'SOAT + daños parciales a terceros',     precio: 15000 },
  { id: 'todo',    nombre: 'Todo Riesgo',   desc: 'Cobertura total sin deducible',          precio: 35000 },
  { id: 'premium', nombre: 'Premium Plus',  desc: 'Todo riesgo + asistencia vial 24/7',    precio: 55000 },
]

// Servicios adicionales (RF11.11)
const SERVICIOS = [
  { id: 'gps',    nombre: 'GPS Navegador',          precio: 8000  },
  { id: 'silla',  nombre: 'Silla para bebé',        precio: 12000 },
  { id: 'chofer', nombre: 'Conductor adicional',    precio: 20000 },
  { id: 'wifi',   nombre: 'Wi-Fi portátil',         precio: 10000 },
  { id: 'tanque', nombre: 'Tanque lleno al inicio', precio: 0     },
]

// Pasos del wizard
const PASOS = [
  { id: 1, label: 'Fechas'       },
  { id: 2, label: 'Sucursal'     },
  { id: 3, label: 'Kilometraje'  },
  { id: 4, label: 'Seguro'       },
  { id: 5, label: 'Servicios'    },
  { id: 6, label: 'Resumen'      },
  { id: 7, label: 'Confirmado'   },
]

// ─── Icono SVG de check ──────────────────────────────────────────
function IconCheck({ size = 10, color = '#fff' }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="3" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ─── Icono flecha izquierda ──────────────────────────────────────
function IconBack() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

// ─── Icono flecha derecha ────────────────────────────────────────
function IconNext() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

// ─── Icono info ──────────────────────────────────────────────────
function IconInfo() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

// ─── Icono advertencia ───────────────────────────────────────────
function IconWarn() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPONENTE: Navbar
// Muestra logo + botón "Volver al catálogo"
// ─────────────────────────────────────────────────────────────────
function Navbar({ onBack }) {
  return (
    <nav className="rv-nav">
      {/* Logo */}
      <span className="rv-nav__logo">RENTA <span>MÓVIL</span></span>

      {/* Volver al catálogo — RF11 permite cancelar en cualquier momento */}
      <button className="rv-nav__back" onClick={onBack}>
        <IconBack /> Volver al catálogo
      </button>

      <span className="rv-nav__title">Reservar vehículo</span>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPONENTE: Calendario de disponibilidad (RF11.3)
// Permite seleccionar rango de fechas inicio→fin
// ─────────────────────────────────────────────────────────────────
function Calendario({ inicio, fin, onChange }) {
  const [mes, setMes] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1))
  // 'inicio' o 'fin' — qué fecha se está eligiendo
  const [eligiendo, setEligiendo] = useState('inicio')

  const DIAS_SEM = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

  // Genera array de días del mes con relleno inicial
  const dias = useMemo(() => {
    const primerDia  = new Date(mes.getFullYear(), mes.getMonth(), 1).getDay()
    const totalDias  = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate()
    const arr = Array(primerDia).fill(null)
    for (let d = 1; d <= totalDias; d++)
      arr.push(new Date(mes.getFullYear(), mes.getMonth(), d))
    return arr
  }, [mes])

  const mesLabel = mes.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })

  // Maneja clic en un día — RF11.1 selección de fechas
  function handleDia(dia) {
    if (!dia) return
    if (BLOQUEADOS.has(dia.getTime()) || dia < hoy) return

    if (eligiendo === 'inicio') {
      onChange({ inicio: dia, fin: null })
      setEligiendo('fin')
    } else {
      if (dia <= inicio) {
        onChange({ inicio: dia, fin: null })
        setEligiendo('fin')
      } else {
        onChange({ inicio, fin: dia })
        setEligiendo('inicio')
      }
    }
  }

  // Calcula las clases CSS de cada celda de día
  function clsDia(dia) {
    if (!dia) return 'rv-cal__day rv-cal__day--empty'
    const t = dia.getTime()
    const cls = ['rv-cal__day']
    if (t < hoy.getTime() || BLOQUEADOS.has(t)) cls.push('rv-cal__day--off')
    else if (t === hoy.getTime()) cls.push('rv-cal__day--today')

    if (inicio && t === inicio.getTime()) cls.push('rv-cal__day--sel rv-cal__day--range-s')
    else if (fin && t === fin.getTime())  cls.push('rv-cal__day--sel rv-cal__day--range-e')
    else if (inicio && fin && t > inicio.getTime() && t < fin.getTime())
      cls.push('rv-cal__day--range')

    return cls.join(' ')
  }

  return (
    <div className="rv-calendar">
      {/* Cabecera: mes y botones de navegación */}
      <div className="rv-cal__header">
        <button className="rv-cal__nav" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth()-1, 1))}>‹</button>
        <span style={{ textTransform: 'capitalize' }}>{mesLabel}</span>
        <button className="rv-cal__nav" onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth()+1, 1))}>›</button>
      </div>

      {/* Grid de días */}
      <div className="rv-cal__grid">
        {DIAS_SEM.map(d => <div key={d} className="rv-cal__dname">{d}</div>)}
        {dias.map((dia, i) => (
          <div key={i} className={clsDia(dia)} onClick={() => handleDia(dia)}>
            {dia ? dia.getDate() : ''}
          </div>
        ))}
      </div>

      {/* Leyenda de disponibilidad */}
      <div className="rv-cal__legend">
        <div className="rv-cal__legend-item">
          <div className="rv-cal__legend-dot" style={{ background: '#2563eb' }} />
          Seleccionado
        </div>
        <div className="rv-cal__legend-item">
          <div className="rv-cal__legend-dot" style={{ background: '#bfdbfe' }} />
          Rango
        </div>
        <div className="rv-cal__legend-item">
          <div className="rv-cal__legend-dot" style={{ background: '#e2e8f0' }} />
          No disponible
        </div>
      </div>

      {/* Indicador de qué fecha se elige */}
      <div style={{ padding: '.3rem .7rem .55rem', fontSize: '.72rem', color: '#64748b', fontWeight: 600 }}>
        {eligiendo === 'inicio' ? '→ Elige la fecha de INICIO' : '→ Elige la fecha de DEVOLUCIÓN'}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// COMPONENTE: Panel derecho con desglose de costos
// Replica exactamente el diseño de la imagen de referencia
// ─────────────────────────────────────────────────────────────────
function PanelReserva({ vehiculo, reserva, diasTotal, total, onContinuar, paso }) {
  // Seguro obligatorio fijo (SOAT incluido)
  const seguroBase = reserva.seguro ? reserva.seguro.precio * diasTotal : 0

  return (
    <div className="rv-panel">
      <div className="rv-panel__card">

        {/* Encabezado azul — igual al diseño */}
        <div className="rv-panel__header">
          <h2>Reserva tu vehículo</h2>
        </div>

        <div className="rv-panel__body">

          {/* Fechas seleccionadas (read-only, estilo igual al diseño) */}
          <div className="rv-field">
            <label className="rv-field__label">Fecha de recogida</label>
            <div className="rv-field__input">
              {reserva.fechaInicio ? reserva.fechaInicio.toLocaleDateString('es-CO') : ''}
            </div>
          </div>

          <div className="rv-field">
            <label className="rv-field__label">Fecha de devolución</label>
            <div className="rv-field__input">
              {reserva.fechaFin ? reserva.fechaFin.toLocaleDateString('es-CO') : ''}
            </div>
          </div>

          {/* Desglose de costos (RF11.12) — visible solo si hay fechas */}
          {diasTotal > 0 && vehiculo && (
            <div className="rv-breakdown">
              {/* Tarifa base: precio × días */}
              <div className="rv-breakdown__row">
                <span>{fmt(vehiculo.tarifa)} × {diasTotal} día{diasTotal > 1 ? 's' : ''}</span>
                <span>{fmt(vehiculo.tarifa * diasTotal)}</span>
              </div>

              {/* Seguro seleccionado */}
              {reserva.seguro && seguroBase > 0 && (
                <div className="rv-breakdown__row">
                  <span>{reserva.seguro.nombre}</span>
                  <span>{fmt(seguroBase)}</span>
                </div>
              )}

              {/* Seguro obligatorio SOAT (fijo) */}
              {!reserva.seguro && (
                <div className="rv-breakdown__row">
                  <span>Seguro obligatorio</span>
                  <span>{fmt(45000)}</span>
                </div>
              )}

              {/* Servicios adicionales */}
              {reserva.servicios.map(s => s.precio > 0 && (
                <div key={s.id} className="rv-breakdown__row">
                  <span>{s.nombre}</span>
                  <span>{fmt(s.precio * diasTotal)}</span>
                </div>
              ))}

              {/* Línea del TOTAL en azul grande */}
              <div className="rv-breakdown__total">
                <span className="rv-breakdown__total-label">Total</span>
                <span className="rv-breakdown__total-price">{fmt(total || (vehiculo.tarifa * diasTotal + 45000))}</span>
              </div>
            </div>
          )}

          {/* Botón "CONTINUAR AL PAGO" */}
          <button
            className="rv-btn-primary"
            disabled={paso === 7}
            onClick={onContinuar}
          >
            {paso < 6 ? 'CONTINUAR' : paso === 6 ? 'CONFIRMAR RESERVA' : 'RESERVADO ✓'}
          </button>

          {/* Nota de seguridad */}
          <p className="rv-panel__note">No se realizará ningún cargo todavía.</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PAGE PRINCIPAL: ReservaPage
// Wizard de 7 pasos que cubre RF11.1 → RF11.16
// ─────────────────────────────────────────────────────────────────
export default function ReservaPage() {
  const navigate  = useNavigate()
  const location  = useLocation()

  // Vehículo recibido desde el catálogo vía location.state (RF11.7)
  const vehiculo = location.state?.vehiculo ?? null

  // Galería: usa imágenes del vehículo o fallback mock
  const galeria = vehiculo?.galeria ?? GALERIA_MOCK
  const [fotoActiva, setFotoActiva] = useState(0)

  // Paso actual del wizard (1–7)
  const [paso, setPaso] = useState(1)

  // Mensaje de error de validación
  const [error, setError] = useState('')

  // Estado acumulado de la reserva
  const [reserva, setReserva] = useState({
    fechaInicio: null,
    fechaFin:    null,
    sucursal:    null,
    kmTipo:      '',      // 'limitado' | 'ilimitado'
    kmLimite:    150,     // km/día cuando es limitado
    seguro:      null,
    servicios:   [],
  })

  // Actualización parcial del estado de reserva
  const update = patch => setReserva(prev => ({ ...prev, ...patch }))

  // Alterna un servicio adicional (RF11.11)
  const toggleServicio = s => update({
    servicios: reserva.servicios.find(x => x.id === s.id)
      ? reserva.servicios.filter(x => x.id !== s.id)
      : [...reserva.servicios, s],
  })

  // Cálculo de días totales (RF11.12)
  const diasTotal = useMemo(() => {
    if (!reserva.fechaInicio || !reserva.fechaFin) return 0
    return Math.ceil(
      (reserva.fechaFin.getTime() - reserva.fechaInicio.getTime()) / 86400000
    )
  }, [reserva.fechaInicio, reserva.fechaFin])

  // Tarifa total calculada (RF11.12)
  const total = useMemo(() => {
    if (!vehiculo || diasTotal === 0) return 0
    const base   = vehiculo.tarifa * diasTotal
    const seguro = reserva.seguro ? reserva.seguro.precio * diasTotal : 45000
    const serv   = reserva.servicios.reduce((s, x) => s + x.precio, 0) * diasTotal
    return base + seguro + serv
  }, [vehiculo, diasTotal, reserva.seguro, reserva.servicios])

  // Validación por paso (RF11 criterios de aceptación)
  function validar() {
    setError('')
    switch (paso) {
      case 1:
        if (!reserva.fechaInicio || !reserva.fechaFin)
          return setError('Selecciona las fechas de inicio y devolución.'), false
        if (diasTotal < 1)
          return setError('La fecha de devolución debe ser posterior al inicio.'), false
        return true
      case 2:
        if (!reserva.sucursal)
          return setError('Selecciona una sucursal de recogida.'), false
        return true
      case 3:
        if (!reserva.kmTipo)
          return setError('Selecciona el tipo de kilometraje.'), false
        return true
      case 4:
        if (!reserva.seguro)
          return setError('Selecciona un tipo de seguro.'), false
        return true
      default: return true
    }
  }

  // Avanza al siguiente paso
  function avanzar() {
    if (!validar()) return
    setPaso(p => p + 1)
  }

  // Retrocede al paso anterior
  function retroceder() {
    setError('')
    setPaso(p => p - 1)
  }

  // Confirma la reserva (RF11.15)
  function confirmar() {
    if (!validar()) return
    // TODO: llamar al backend aquí
    setPaso(7)
  }

  // Código único de reserva (mock)
  const codigoReserva = `RM-${Date.now().toString(36).toUpperCase().slice(-6)}`

  // ── RENDER DE PASOS ─────────────────────────────────────────────

  // Paso 1: Selección de fechas + calendario (RF11.1, RF11.3, RF11.5)
  function renderPaso1() {
    return (
      <div className="rv-anim">
        {/* Banner del vehículo seleccionado */}
        {vehiculo && (
          <div className="rv-veh-preview">
            <img
              className="rv-veh-preview__img"
              src={galeria[0]}
              alt={vehiculo.modelo}
              onError={e => { e.target.src = `https://placehold.co/160x108/1e3a8a/fff?text=${vehiculo.marca}` }}
            />
            <div>
              <div className="rv-veh-preview__name">{vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}</div>
              <div className="rv-veh-preview__sub">{vehiculo.categoria} · {vehiculo.sucursal}</div>
            </div>
            <div className="rv-veh-preview__price">
              <div className="rv-veh-preview__per">Tarifa / día</div>
              <div className="rv-veh-preview__amt">{fmt(vehiculo.tarifa)}</div>
            </div>
          </div>
        )}

        {/* Calendario interactivo (RF11.3) */}
        <Calendario
          inicio={reserva.fechaInicio}
          fin={reserva.fechaFin}
          onChange={({ inicio, fin }) => update({ fechaInicio: inicio, fechaFin: fin })}
        />

        {/* Confirmación de duración seleccionada */}
        {diasTotal > 0 && (
          <div className="rv-alert rv-alert--info">
            <IconInfo />
            Reserva de <strong>{diasTotal} día{diasTotal > 1 ? 's' : ''}</strong>
            {vehiculo && ` · Tarifa base: ${fmt(vehiculo.tarifa * diasTotal)}`}
          </div>
        )}
      </div>
    )
  }

  // Paso 2: Selección de sucursal (RF11.2)
  function renderPaso2() {
    return (
      <div className="rv-anim">
        <div className="rv-section-title">📍 Sucursal de recogida</div>
        <div className="rv-sucursales">
          {SUCURSALES.map(s => (
            <div
              key={s.id}
              className={`rv-sucursal${reserva.sucursal?.id === s.id ? ' rv-sucursal--sel' : ''}`}
              onClick={() => update({ sucursal: s })}
            >
              {/* Radio visual */}
              <div className="rv-sucursal__radio" />
              <div>
                <div className="rv-sucursal__name">{s.nombre}</div>
                <div className="rv-sucursal__addr">{s.direccion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Paso 3: Tipo de kilometraje (RF11.8, RF11.9)
  function renderPaso3() {
    return (
      <div className="rv-anim">
        <div className="rv-section-title">🛣️ Tipo de kilometraje</div>
        <div className="rv-opts-grid">

          {/* Opción: kilometraje limitado */}
          <div
            className={`rv-opt${reserva.kmTipo === 'limitado' ? ' rv-opt--sel' : ''}`}
            onClick={() => update({ kmTipo: 'limitado' })}
          >
            <div className="rv-opt__check"><IconCheck /></div>
            <div className="rv-opt__name">Limitado</div>
            <div className="rv-opt__desc">Límite diario incluido. Excedente se cobra por km.</div>
            <div className="rv-opt__price">+$850/km extra</div>
          </div>

          {/* Opción: kilometraje ilimitado */}
          <div
            className={`rv-opt${reserva.kmTipo === 'ilimitado' ? ' rv-opt--sel' : ''}`}
            onClick={() => update({ kmTipo: 'ilimitado' })}
          >
            <div className="rv-opt__check"><IconCheck /></div>
            <div className="rv-opt__name">Ilimitado</div>
            <div className="rv-opt__desc">Sin restricción de km. Todo incluido en la tarifa.</div>
            <div className="rv-opt__price" style={{ color: '#16a34a' }}>Sin cargos extra</div>
          </div>
        </div>

        {/* Selector del límite diario (solo si eligió limitado) — RF11.9 */}
        {reserva.kmTipo === 'limitado' && (
          <>
            <div className="rv-section-title" style={{ marginTop: '.5rem' }}>Límite diario</div>
            <select
              className="rv-select"
              value={reserva.kmLimite}
              onChange={e => update({ kmLimite: Number(e.target.value) })}
            >
              <option value={100}>100 km / día</option>
              <option value={150}>150 km / día</option>
              <option value={200}>200 km / día</option>
              <option value={250}>250 km / día</option>
            </select>

            {/* Info sobre el costo por exceso de km (RF11.9) */}
            <div className="rv-alert rv-alert--info" style={{ marginTop: '.75rem' }}>
              <IconInfo />
              Cada km extra sobre {reserva.kmLimite} km/día se cobra a <strong>$850/km</strong> al devolver.
            </div>
          </>
        )}
      </div>
    )
  }

  // Paso 4: Selección de seguro (RF11.10)
  function renderPaso4() {
    return (
      <div className="rv-anim">
        <div className="rv-section-title">🛡️ Tipo de seguro</div>
        <div className="rv-opts-grid">
          {SEGUROS.map(s => (
            <div
              key={s.id}
              className={`rv-opt${reserva.seguro?.id === s.id ? ' rv-opt--sel' : ''}`}
              onClick={() => update({ seguro: s })}
            >
              <div className="rv-opt__check"><IconCheck /></div>
              <div className="rv-opt__name">{s.nombre}</div>
              <div className="rv-opt__desc">{s.desc}</div>
              <div className="rv-opt__price">
                {s.precio > 0 ? `+${fmt(s.precio)}/día` : 'Incluido'}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Paso 5: Servicios adicionales (RF11.11)
  function renderPaso5() {
    return (
      <div className="rv-anim">
        <div className="rv-section-title">
          ✨ Servicios adicionales
          <span className="rv-badge rv-badge--blue" style={{ marginLeft: 'auto', fontWeight: 600 }}>
            Opcionales
          </span>
        </div>
        <div className="rv-services">
          {SERVICIOS.map(s => {
            const marcado = !!reserva.servicios.find(x => x.id === s.id)
            return (
              <div
                key={s.id}
                className={`rv-service${marcado ? ' rv-service--on' : ''}`}
                onClick={() => toggleServicio(s)}
              >
                {/* Checkbox visual */}
                <div className="rv-service__box">
                  {marcado && <IconCheck size={10} />}
                </div>
                <span className="rv-service__name">{s.nombre}</span>
                <span className="rv-service__price">
                  {s.precio > 0 ? `+${fmt(s.precio)}/día` : 'Gratis'}
                </span>
              </div>
            )
          })}
        </div>

        <div className="rv-alert rv-alert--info">
          <IconInfo />
          Puedes continuar sin seleccionar servicios adicionales.
        </div>
      </div>
    )
  }

  // Paso 6: Resumen + edición (RF11.13, RF11.14)
  function renderPaso6() {
    return (
      <div className="rv-anim">
        <div className="rv-section-title">📋 Resumen de la reserva</div>

        {/* Bloque editable: fechas */}
        <div className="rv-summary-block">
          <div className="rv-summary-block__head">
            <span className="rv-summary-block__title">Fechas</span>
            {/* RF11.14: botón editar */}
            <button className="rv-summary-block__edit" onClick={() => setPaso(1)}>Editar</button>
          </div>
          <div className="rv-summary-block__val">
            {reserva.fechaInicio?.toLocaleDateString('es-CO')} →{' '}
            {reserva.fechaFin?.toLocaleDateString('es-CO')}
            <span className="rv-badge rv-badge--blue" style={{ marginLeft: '.5rem' }}>
              {diasTotal} día{diasTotal > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Bloque editable: sucursal */}
        <div className="rv-summary-block">
          <div className="rv-summary-block__head">
            <span className="rv-summary-block__title">Sucursal de recogida</span>
            <button className="rv-summary-block__edit" onClick={() => setPaso(2)}>Editar</button>
          </div>
          <div className="rv-summary-block__val">{reserva.sucursal?.nombre}</div>
          <div className="rv-summary-block__sub">{reserva.sucursal?.direccion}</div>
        </div>

        {/* Bloque editable: kilometraje */}
        <div className="rv-summary-block">
          <div className="rv-summary-block__head">
            <span className="rv-summary-block__title">Kilometraje</span>
            <button className="rv-summary-block__edit" onClick={() => setPaso(3)}>Editar</button>
          </div>
          <div className="rv-summary-block__val">
            {reserva.kmTipo === 'ilimitado' ? 'Ilimitado' : `Limitado — ${reserva.kmLimite} km/día`}
          </div>
        </div>

        {/* Bloque editable: seguro */}
        <div className="rv-summary-block">
          <div className="rv-summary-block__head">
            <span className="rv-summary-block__title">Seguro</span>
            <button className="rv-summary-block__edit" onClick={() => setPaso(4)}>Editar</button>
          </div>
          <div className="rv-summary-block__val">{reserva.seguro?.nombre}</div>
          <div className="rv-summary-block__sub">{reserva.seguro?.desc}</div>
        </div>

        {/* Bloque editable: servicios */}
        <div className="rv-summary-block">
          <div className="rv-summary-block__head">
            <span className="rv-summary-block__title">Servicios adicionales</span>
            <button className="rv-summary-block__edit" onClick={() => setPaso(5)}>Editar</button>
          </div>
          {reserva.servicios.length === 0
            ? <div className="rv-summary-block__sub">Ninguno seleccionado</div>
            : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem' }}>
                {reserva.servicios.map(s => (
                  <span key={s.id} className="rv-badge rv-badge--blue">{s.nombre}</span>
                ))}
              </div>
          }
        </div>

        {/* Total visible en móvil (el panel lateral se oculta) */}
        <div style={{
          background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
          borderRadius: 14, padding: '1rem 1.25rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: '#fff', marginTop: '.5rem',
        }}>
          <span style={{ fontWeight: 800, fontSize: '.9rem' }}>TOTAL ESTIMADO</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 900 }}>{fmt(total)}</span>
        </div>

        <div className="rv-alert rv-alert--info" style={{ marginTop: '1rem' }}>
          <IconInfo />
          No se realizará ningún cargo todavía. El pago se gestiona en el paso siguiente.
        </div>
      </div>
    )
  }

  // Paso 7: Confirmación exitosa (RF11.15, RF11.16)
  function renderPaso7() {
    return (
      <div className="rv-confirm rv-anim">
        {/* Ícono de éxito */}
        <div className="rv-confirm__icon">✓</div>

        <div className="rv-confirm__title">¡Reserva creada con éxito!</div>

        {/* RF11.16: notificación enviada */}
        <div className="rv-confirm__sub">
          Tu reserva fue registrada en el sistema.<br />
          Recibirás una notificación de confirmación en tu correo registrado.
        </div>

        {/* Código único de reserva */}
        <div className="rv-confirm__code">{codigoReserva}</div>

        {/* Datos clave de la reserva confirmada */}
        <div style={{ textAlign: 'left', background: '#f8fafc', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', border: '1px solid #e2e8f0' }}>
          {[
            ['Vehículo',   `${vehiculo?.marca} ${vehiculo?.modelo}`                    ],
            ['Recogida',   reserva.fechaInicio?.toLocaleDateString('es-CO') ?? '—'     ],
            ['Devolución', reserva.fechaFin?.toLocaleDateString('es-CO')    ?? '—'     ],
            ['Sucursal',   reserva.sucursal?.nombre                         ?? '—'     ],
            ['Seguro',     reserva.seguro?.nombre                           ?? '—'     ],
          ].map(([lbl, val]) => (
            <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0', borderBottom: '1px solid #e2e8f0', fontSize: '.83rem' }}>
              <span style={{ color: '#64748b' }}>{lbl}</span>
              <span style={{ fontWeight: 700 }}>{val}</span>
            </div>
          ))}
          {/* Total final */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.55rem 0 0', fontSize: '.9rem' }}>
            <span style={{ fontWeight: 900 }}>Total</span>
            <span style={{ fontWeight: 900, color: '#2563eb', fontSize: '1.1rem' }}>{fmt(total)}</span>
          </div>
        </div>

        {/* Acciones post-confirmación */}
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="rv-btn-primary" style={{ width: 'auto', padding: '.75rem 1.5rem' }} onClick={() => navigate('/catalogo')}>
            Ir al catálogo
          </button>
          <button className="rv-btn-ghost" onClick={() => navigate('/home')}>
            Mis reservas
          </button>
        </div>
      </div>
    )
  }

  // Mapa de pasos → función de render
  const renderPasoActual = () => {
    switch (paso) {
      case 1: return renderPaso1()
      case 2: return renderPaso2()
      case 3: return renderPaso3()
      case 4: return renderPaso4()
      case 5: return renderPaso5()
      case 6: return renderPaso6()
      case 7: return renderPaso7()
      default: return null
    }
  }

  // ── RENDER PRINCIPAL ──────────────────────────────────────────────
  return (
    <div className="rv-root">

      {/* Navbar fija con botón "Volver" */}
      <Navbar onBack={() => navigate('/catalogo')} />

      <div className="rv-page">

        {/* ── Stepper de progreso (barra de pasos) ── */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '.25rem', scrollbarWidth: 'none' }}>
          {PASOS.map((p, i) => {
            const estado = p.id < paso ? 'done' : p.id === paso ? 'active' : 'pending'
            const dotBg  = estado === 'done' ? '#1e3a8a' : estado === 'active' ? '#2563eb' : '#e2e8f0'
            const dotClr = estado !== 'pending' ? '#fff' : '#94a3b8'
            const lblClr = estado === 'active' ? '#2563eb' : estado === 'done' ? '#1e3a8a' : '#94a3b8'
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {/* Línea conectora */}
                {i > 0 && (
                  <div style={{
                    width: 24, height: 2, flexShrink: 0,
                    background: p.id <= paso ? '#1e3a8a' : '#e2e8f0',
                    margin: '0 .25rem',
                  }} />
                )}
                {/* Círculo del paso */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.2rem', cursor: 'default' }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: dotBg, color: dotClr,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '.7rem', fontWeight: 900,
                    boxShadow: estado === 'active' ? '0 0 0 4px rgba(37,99,235,.18)' : 'none',
                    transition: 'all .2s',
                  }}>
                    {estado === 'done'
                      ? <IconCheck size={11} />
                      : p.id
                    }
                  </div>
                  {/* Etiqueta del paso (oculta en mobile) */}
                  <span style={{
                    fontSize: '.62rem', fontWeight: 700,
                    color: lblClr, whiteSpace: 'nowrap',
                    display: 'block',
                  }}>
                    {p.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Grid de dos columnas ── */}
        <div className="rv-layout">

          {/* ── Columna izquierda: imagen + info del vehículo ── */}
          <div className="rv-vehicle-col">

            {/* Imagen principal (fiel al diseño de referencia) */}
            <img
              className="rv-hero-img"
              src={galeria[fotoActiva]}
              alt={vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : 'Vehículo'}
              onError={e => { e.target.src = 'https://placehold.co/800x450/e2e8f0/64748b?text=Imagen+Principal+(HD)' }}
            />

            {/* Galería de 4 miniaturas */}
            <div className="rv-gallery">
              {galeria.map((src, i) => (
                <img
                  key={i}
                  className={`rv-gallery__thumb${i === fotoActiva ? ' rv-gallery__thumb--active' : ''}`}
                  src={src}
                  alt={`Vista ${i + 1}`}
                  onClick={() => setFotoActiva(i)}
                  onError={e => { e.target.src = `https://placehold.co/200x150/e2e8f0/64748b?text=Vista+${i+1}` }}
                />
              ))}
            </div>

            {/* Nombre y categoría del vehículo */}
            {vehiculo && (
              <>
                <h1 className="rv-vehicle-name">
                  {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
                </h1>
                <p className="rv-vehicle-sub">
                  {vehiculo.categoria} de Lujo · Placa: {vehiculo.placa ?? 'KLS-456'}
                </p>

                {/* Especificaciones técnicas en 4 columnas */}
                <div className="rv-specs">
                  <div>
                    <div className="rv-spec__label">Motor</div>
                    <div className="rv-spec__val">{vehiculo.motor ?? `${vehiculo.combustible}`}</div>
                  </div>
                  <div>
                    <div className="rv-spec__label">Transmisión</div>
                    <div className="rv-spec__val">{vehiculo.caracteristicas?.transmision ?? 'Automática'}</div>
                  </div>
                  <div>
                    <div className="rv-spec__label">Gasolina (RF21.10)</div>
                    <div className="rv-spec__val">Tanque Lleno</div>
                  </div>
                  <div>
                    <div className="rv-spec__label">Pasajeros</div>
                    <div className="rv-spec__val">{vehiculo.caracteristicas?.pasajeros ?? 5} Personas</div>
                  </div>
                </div>
              </>
            )}

            {/* Alerta si no hay vehículo (navegación directa sin state) */}
            {!vehiculo && (
              <div className="rv-alert rv-alert--warn" style={{ marginTop: '1.25rem' }}>
                <IconWarn />
                No se recibió información del vehículo. Vuelve al catálogo y presiona "ALQUILAR".
              </div>
            )}

            <div className="rv-divider" style={{ marginTop: '1.5rem' }}>Paso {paso} de {PASOS.length}</div>

            {/* Contenido del paso actual */}
            {renderPasoActual()}

            {/* Alerta de validación */}
            {error && (
              <div className="rv-alert rv-alert--error" style={{ marginTop: '1rem' }}>
                <IconWarn />
                {error}
              </div>
            )}

            {/* Botones de navegación entre pasos */}
            {paso < 7 && (
              <div className="rv-step-actions">
                {/* Botón Atrás (desde paso 2 en adelante) */}
                {paso > 1 && (
                  <button className="rv-btn-ghost" onClick={retroceder}>
                    <IconBack /> Atrás
                  </button>
                )}

                {/* Continuar o confirmar */}
                {paso < 6
                  ? <button className="rv-btn-primary" style={{ width: 'auto', padding: '.72rem 1.5rem' }} onClick={avanzar}>
                      Continuar <IconNext />
                    </button>
                  : <button className="rv-btn-primary" style={{ width: 'auto', padding: '.72rem 1.5rem' }} onClick={confirmar}>
                      Confirmar reserva <IconCheck size={12} color="#fff" />
                    </button>
                }
              </div>
            )}
          </div>

          {/* ── Columna derecha: panel de reserva (sticky, fiel al diseño) ── */}
          <PanelReserva
            vehiculo={vehiculo}
            reserva={reserva}
            diasTotal={diasTotal}
            total={total}
            paso={paso}
            onContinuar={paso < 6 ? avanzar : paso === 6 ? confirmar : undefined}
          />

        </div>
      </div>
    </div>
  )
}
