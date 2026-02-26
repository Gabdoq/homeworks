import React, { useState } from 'react'

// Props del componente: recibe una función de callback para agregar turnos
type Props = {
  onAdd: (name: string) => void
}

/**
 * Componente formulario para agregar nuevos turnos a la lista.
 * Utiliza props para comunicarse con el componente padre (Turner).
 */
export default function AddTurnForm({ onAdd }: Props) {
  // Estado local para el nombre del nuevo turno
  const [name, setName] = useState('')

  // Maneja el envío del formulario
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="form-add">
      <input
        aria-label="nuevo-turno"
        placeholder="Nombre del nuevo turno"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-turno"
      />
      <button type="submit" className="btn-agregar">Agregar</button>
    </form>
  )
}
