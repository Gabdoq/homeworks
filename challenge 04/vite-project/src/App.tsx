import React from 'react'
import TurnerPage from './pages/TurnerPage'

/**
 * Componente raíz de la aplicación.
 * Renderiza la estructura general (app container y routes).
 */
export default function App() {
  return (
    <div className="app">
      <TurnerPage />
      <footer className="footer">
        <p>Challenge 04 - Estructuras de Datos</p>
      </footer>
    </div>
  )
}
