import React, { useEffect, useState } from 'react'
import AddTurnForm from './AddTurnForm'

/**
 * Componente principal que gestiona la lista circular de turnos.
 * Implementa:
 * - useEffect para mostrar mensajes cuando cambia la cola
 * - Comportamiento circular al avanzar turnos
 * - Props hacia el componente hijo AddTurnForm
 */
export default function Turner() {
  // Estado de la cola de turnos
  const [queue, setQueue] = useState<string[]>([])
  // Índice actual en la cola (para saber quién tiene el turno)
  const [index, setIndex] = useState<number>(0)
  // Mensaje de notificación que aparece brevemente
  const [message, setMessage] = useState<string>('')

  // useEffect: muestra un mensaje cada vez que la cola cambia
  useEffect(() => {
    setMessage(queue.length ? `Cola actualizada: ${queue.join(', ')}` : 'La cola está vacía')
    const t = setTimeout(() => setMessage(''), 4000)
    return () => clearTimeout(t)
  }, [queue])

  // Avanza al siguiente turno con comportamiento circular
  function next() {
    if (queue.length === 0) return
    setIndex((i) => (i + 1) % queue.length)
  }

  // Agrega un nuevo turno a la cola
  function addTurn(name: string) {
    setQueue((q) => {
      const nextQ = [...q, name]
      // Si la cola estaba vacía, asegurar índice 0
      if (q.length === 0) setIndex(0)
      return nextQ
    })
  }

  // Elimina un turno en el índice especificado
  function removeAt(i: number) {
    setQueue((q) => {
      const next = q.filter((_, idx) => idx !== i)
      if (next.length === 0) setIndex(0)
      else if (i < index) setIndex((idx) => idx - 1)
      else if (index >= next.length) setIndex(0)
      return next
    })
  }

  return (
    <div>
      <div className="controls">
        <AddTurnForm onAdd={addTurn} />
        <button onClick={next} className="btn-siguiente">Siguiente</button>
        <div className="turno-actual">Turno actual: <strong>{queue.length ? queue[index] : '-'}</strong></div>
      </div>

      <div className="queue">
        {queue.length === 0 && <div className="msg">No hay turnos aún. Agrega alguien para comenzar.</div>}
        {queue.map((name, i) => (
          <div key={i} className={`turn ${i === index ? 'current' : ''}`}>
            <span className="numero">{i + 1}.</span>
            <span className="nombre">{name}</span>
            <button className="btn-eliminar" onClick={() => removeAt(i)}>Eliminar</button>
          </div>
        ))}
      </div>

      {message && <div className="msg msg-notif">{message}</div>}
    </div>
  )
}
