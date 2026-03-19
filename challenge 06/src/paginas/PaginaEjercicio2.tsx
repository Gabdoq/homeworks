import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import '../css/PaginaEjercicio.css';

/**
 * Segunda página privada - Ejercicio de Algoritmos y Búsqueda.
 * Contenido educativo sobre algoritmos de búsqueda y ordenamiento.
 */
export default function PaginaEjercicio2() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacion();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div className="contenedor-ejercicio">
      <header className="header-ejercicio">
        <div className="info-usuario">
          <h2>{usuario?.nombre}</h2>
          <p className="correo-usuario">{usuario?.correo}</p>
        </div>
        <button onClick={handleLogout} className="boton-logout">
          Cerrar Sesión
        </button>
      </header>

      <main className="contenido-ejercicio">
        <section className="seccion-titulo">
          <h1>Ejercicio 2: Búsqueda y Ordenamiento</h1>
          <p className="descripcion">
            Algoritmos fundamentales para procesamiento eficiente de datos
          </p>
        </section>

        <section className="seccion-contenido">
          <div className="tarjeta-concepto">
            <h3>Algoritmos de Búsqueda</h3>
            <p>
              Permiten localizar elementos en una colección de datos.
              La eficiencia depende de la estructura y el tamaño de los datos.
            </p>
          </div>

          <div className="tarjeta-concepto">
            <h3>Complejidad Temporal</h3>
            <ul>
              <li><strong>Búsqueda Lineal:</strong> O(n)</li>
              <li><strong>Búsqueda Binaria:</strong> O(log n)</li>
              <li><strong>Hash Table:</strong> O(1) promedio</li>
            </ul>
          </div>

          <div className="tarjeta-concepto">
            <h3>Importancia en Sistemas</h3>
            <p>
              Estos algoritmos son la base de sistemas de bases de datos,
              motores de búsqueda y aplicaciones de alto rendimiento.
            </p>
          </div>
        </section>

        <nav className="navegacion-ejercicios">
          <button className="boton-navegar" onClick={() => navigate('/ejercicio1')}>
            Ejercicio Anterior
          </button>
          <button className="boton-navegar-siguiente" onClick={() => navigate('/')}>
            Ir al Inicio
          </button>
        </nav>
      </main>
    </div>
  );
}
