import { Link } from 'react-router-dom';
import './HomePage.css';

// Página principal con navegación a las demos de estructuras de datos
function HomePage() {
  return (
    <div className="inicio">
      {/* Encabezado */}
      <header className="inicio-header">
        <h1>Estructuras de Datos</h1>
        <p>Listas Enlazadas Interactivas</p>
      </header>

      {/* Tarjetas de navegación */}
      <div className="tarjetas">
        <Link to="/linked-list" className="tarjeta">
          <span className="tarjeta-icono">♫</span>
          <h2>Lista Enlazada Simple</h2>
          <p>Playlist de Música</p>
          <small>Navega hacia adelante entre canciones</small>
          <div className="tarjeta-codigo">
            [Cabeza] → [Nodo] → [Nodo] → null
          </div>
        </Link>

        <Link to="/doubly-linked-list" className="tarjeta azul">
          <span className="tarjeta-icono">⇄</span>
          <h2>Lista Doblemente Enlazada</h2>
          <p>Historial del Navegador</p>
          <small>Navega hacia atrás y adelante</small>
          <div className="tarjeta-codigo">
            null ← [Cabeza] ↔ [Nodo] ↔ [Cola] → null
          </div>
        </Link>
      </div>

      {/* Información */}
      <section className="seccion-info">
        <h3>Conceptos</h3>
        <div className="info-grid">
          <div className="info-item">
            <h4>Lista Simple</h4>
            <p>Cada nodo tiene datos y una referencia al siguiente nodo. Permite recorrido secuencial hacia adelante.</p>
          </div>
          <div className="info-item">
            <h4>Lista Doble</h4>
            <p>Cada nodo tiene referencias al anterior y siguiente. Permite navegación bidireccional.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
