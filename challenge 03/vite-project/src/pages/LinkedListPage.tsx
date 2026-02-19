import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { crearPlaylist } from '../data/LinkedList';
import type { Cancion } from '../data/LinkedList';
import './LinkedListPage.css';

// Componente para la página de Lista Enlazada Simple (Playlist de Música)
function LinkedListPage() {
  // Crear la playlist usando useMemo para evitar recrearla en cada render
  const playlist = useMemo(() => crearPlaylist(), []);
  
  // Estados del componente
  const [cancionActual, setCancionActual] = useState<Cancion | null>(null);
  const [todasCanciones, setTodasCanciones] = useState<Cancion[]>([]);
  const [indiceActual, setIndiceActual] = useState<number>(0);
  const [haySiguiente, setHaySiguiente] = useState<boolean>(false);
  const [reproduciendo, setReproduciendo] = useState<boolean>(false);

  // Inicializar estados al montar el componente
  useEffect(() => {
    setTodasCanciones(playlist.aArray());
    setCancionActual(playlist.obtenerActual());
    setIndiceActual(playlist.obtenerIndiceActual());
    setHaySiguiente(playlist.haySiguiente());
  }, [playlist]);

  // Manejar siguiente canción
  const manejarSiguiente = () => {
    if (playlist.haySiguiente()) {
      const siguiente = playlist.siguiente();
      setCancionActual(siguiente);
      setIndiceActual(playlist.obtenerIndiceActual());
      setHaySiguiente(playlist.haySiguiente());
    }
  };

  // Manejar reinicio a primera canción
  const manejarReinicio = () => {
    const primera = playlist.reiniciar();
    setCancionActual(primera);
    setIndiceActual(playlist.obtenerIndiceActual());
    setHaySiguiente(playlist.haySiguiente());
  };

  return (
    <div className="contenedor">
      {/* Navegación */}
      <nav className="navegacion">
        <Link to="/">Inicio</Link>
        <Link to="/doubly-linked-list">Historial</Link>
      </nav>

      {/* Encabezado */}
      <header className="encabezado">
        <h1>Lista Enlazada Simple</h1>
        <p>Playlist de Música</p>
      </header>

      {/* Reproductor actual */}
      {cancionActual && (
        <div className="reproductor">
          <div className="icono-reproductor">{reproduciendo ? '▶' : '■'}</div>
          <div className="info-cancion">
            <h2>{cancionActual.titulo}</h2>
            <p>{cancionActual.artista}</p>
            <span>{cancionActual.duracion}</span>
          </div>
        </div>
      )}

      {/* Controles */}
      <div className="controles">
        <button onClick={manejarReinicio}>⏮ Inicio</button>
        <button onClick={() => setReproduciendo(!reproduciendo)} className="btn-principal">
          {reproduciendo ? '⏸ Pausar' : '▶ Reproducir'}
        </button>
        <button onClick={manejarSiguiente} disabled={!haySiguiente}>
          Siguiente ⏭
        </button>
      </div>

      {/* Lista de canciones */}
      <div className="lista">
        <h3>Playlist ({todasCanciones.length})</h3>
        {todasCanciones.map((cancion, i) => (
          <div key={cancion.id} className={`item ${i === indiceActual ? 'activo' : ''}`}>
            <span className="numero">{i + 1}</span>
            <div className="datos">
              <strong>{cancion.titulo}</strong>
              <small>{cancion.artista}</small>
            </div>
            <span className="duracion">{cancion.duracion}</span>
          </div>
        ))}
      </div>

      {/* Información sobre la estructura */}
      <div className="info">
        <h4>Métodos de la Lista Enlazada:</h4>
        <ul>
          <li><code>agregar()</code> - Añade al final</li>
          <li><code>siguiente()</code> - Avanza al siguiente nodo</li>
          <li><code>reiniciar()</code> - Vuelve al inicio</li>
          <li><code>haySiguiente()</code> - Verifica si hay más nodos</li>
        </ul>
      </div>
    </div>
  );
}

export default LinkedListPage;
