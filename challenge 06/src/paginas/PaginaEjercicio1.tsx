import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import '../css/PaginaEjercicio.css';

/**
 * Primera página privada - Ejercicio de Estructuras de Datos.

 */
export default function PaginaEjercicio1() {
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
          <h1>Ejercicio 1: Estructuras Secuenciales</h1>
          <p className="descripcion">
            Explora el funcionamiento de pilas, colas y listas en memoria
          </p>
        </section>

        <section className="seccion-contenido">
          <div className="tarjeta-concepto">
            <h3>Concepto</h3>
            <p>
              Las estructuras de datos secuenciales son fundamentales en ciencias de la computación.
              Permiten organizar información de manera eficiente para diversos algoritmos.
            </p>
          </div>

          <div className="tarjeta-concepto">
            <h3>Tipos Principales</h3>
            <ul>
              <li><strong>Pila (Stack):</strong> LIFO - Last In First Out</li>
              <li><strong>Cola (Queue):</strong> FIFO - First In First Out</li>
              <li><strong>Lista:</strong> Acceso flexible a elementos</li>
            </ul>
          </div>

          <div className="tarjeta-concepto">
            <h3>Aplicaciones Prácticas</h3>
            <p>
              Estas estructuras se usan en compiladores (análisis de sintaxis),
              gestión de memoria, algoritmos de búsqueda, y mucho más.
            </p>
          </div>
        </section>

        <nav className="navegacion-ejercicios">
          <button className="boton-navegar" onClick={() => navigate('/')}>
            Volver
          </button>
          <button className="boton-navegar-siguiente" onClick={() => navigate('/ejercicio2')}>
            Siguiente Ejercicio
          </button>
        </nav>
      </main>
    </div>
  );
}
