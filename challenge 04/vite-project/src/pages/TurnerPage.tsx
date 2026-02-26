/**
 * Página principal del sistema de turnos.
 * Renderiza el header, Turner y footer.
 */
import React from 'react'
import Turner from '../components/Turner'

export default function TurnerPage() {
  return (
    <>
      <header className="header">
        <h1>Sistema de Turnos (Cola Circular)</h1>
        <p>Una simulación de un sistema de turnos para banco, clínica o servicio al cliente.</p>
      </header>
      <main>
        <Turner />
      </main>
    </>
  )
}
