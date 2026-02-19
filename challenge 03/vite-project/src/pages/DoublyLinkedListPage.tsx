import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { crearHistorial } from '../data/DoublyLinkedList';
import type { Pagina } from '../data/DoublyLinkedList';
import './DoublyLinkedListPage.css';

// Componente para la página de Lista Doblemente Enlazada (Historial del Navegador)
function DoublyLinkedListPage() {
  // Crear el historial usando useMemo para evitar recrearlo en cada render
  const historial = useMemo(() => crearHistorial(), []);
  
  // Estados del componente
  const [paginaActual, setPaginaActual] = useState<Pagina | null>(null);
  const [todasPaginas, setTodasPaginas] = useState<Pagina[]>([]);
  const [indiceActual, setIndiceActual] = useState<number>(0);
  const [puedeAtras, setPuedeAtras] = useState<boolean>(false);
  const [puedeAdelante, setPuedeAdelante] = useState<boolean>(false);

  // Inicializar estados al montar el componente
  useEffect(() => {
    setTodasPaginas(historial.aArray());
    setPaginaActual(historial.obtenerActual());
    setIndiceActual(historial.obtenerIndiceActual());
    setPuedeAtras(historial.puedeIrAtras());
    setPuedeAdelante(historial.puedeIrAdelante());
  }, [historial]);

  // Actualizar todos los estados
  const actualizarEstado = () => {
    setPaginaActual(historial.obtenerActual());
    setIndiceActual(historial.obtenerIndiceActual());
    setPuedeAtras(historial.puedeIrAtras());
    setPuedeAdelante(historial.puedeIrAdelante());
  };

  // Manejar ir atrás
  const manejarAtras = () => {
    if (historial.puedeIrAtras()) {
      historial.atras();
      actualizarEstado();
    }
  };

  // Manejar ir adelante
  const manejarAdelante = () => {
    if (historial.puedeIrAdelante()) {
      historial.adelante();
      actualizarEstado();
    }
  };

  // Manejar ir al inicio
  const manejarIrInicio = () => {
    historial.irAlInicio();
    actualizarEstado();
  };

  // Manejar ir al final
  const manejarIrFinal = () => {
    historial.irAlFinal();
    actualizarEstado();
  };

  return (
    <div className="contenedor historial">
      {/* Navegación */}
      <nav className="navegacion">
        <Link to="/">Inicio</Link>
        <Link to="/linked-list">Playlist</Link>
      </nav>

      {/* Encabezado */}
      <header className="encabezado">
        <h1>Lista Doblemente Enlazada</h1>
        <p>Historial del Navegador</p>
      </header>

      {/* Ventana del navegador */}
      <div className="navegador">
        <div className="barra-navegador">
          <button onClick={manejarAtras} disabled={!puedeAtras}>◀</button>
          <button onClick={manejarAdelante} disabled={!puedeAdelante}>▶</button>
          <div className="url">{paginaActual?.url || 'about:blank'}</div>
        </div>
        <div className="contenido-navegador">
          {paginaActual && (
            <>
              <h2>{paginaActual.titulo}</h2>
              <p>{paginaActual.url}</p>
              <small>Visitada: {paginaActual.visitadaEn}</small>
            </>
          )}
        </div>
      </div>

      {/* Controles */}
      <div className="controles">
        <button onClick={manejarIrInicio}>⏮ Primera</button>
        <button onClick={manejarAtras} disabled={!puedeAtras}>◀ Atrás</button>
        <span className="indicador">{indiceActual + 1} / {todasPaginas.length}</span>
        <button onClick={manejarAdelante} disabled={!puedeAdelante}>Adelante ▶</button>
        <button onClick={manejarIrFinal}>Última ⏭</button>
      </div>

      {/* Lista del historial */}
      <div className="lista">
        <h3>Historial ({todasPaginas.length})</h3>
        {todasPaginas.map((pagina, i) => (
          <div 
            key={pagina.id} 
            className={`item ${i === indiceActual ? 'activo' : ''} ${i < indiceActual ? 'anterior' : ''}`}
          >
            <span className="numero">{i + 1}</span>
            <div className="datos">
              <strong>{pagina.titulo}</strong>
              <small>{pagina.url}</small>
            </div>
            <span className="tiempo">{pagina.visitadaEn}</span>
          </div>
        ))}
      </div>

      {/* Información sobre la estructura */}
      <div className="info azul">
        <h4>Métodos de la Lista Doblemente Enlazada:</h4>
        <ul>
          <li><code>atras()</code> - Navega al nodo anterior</li>
          <li><code>adelante()</code> - Navega al nodo siguiente</li>
          <li><code>puedeIrAtras()</code> - Verifica si hay nodo anterior</li>
          <li><code>puedeIrAdelante()</code> - Verifica si hay nodo siguiente</li>
          <li><code>irAlInicio() / irAlFinal()</code> - Salta al inicio o final</li>
        </ul>
      </div>
    </div>
  );
}

export default DoublyLinkedListPage;
