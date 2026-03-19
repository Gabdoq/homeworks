import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import '../css/PaginaInicio.css';

/**
 * Página de inicio - Solo accesible con autenticación.
 * Muestra las opciones de ejercicios y la información del usuario.
 */
export default function PaginaInicio() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacion();

  const handleLogout = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div className="contenedor-inicio">
      <header className="header-inicio">
        <div className="bienvenida">
          <h1>Bienvenido de vuelta</h1>
          <p className="usuario-actual">
            Sesión: <span className="nombre-usuario">{usuario?.nombre}</span>
          </p>
        </div>
        <button onClick={handleLogout} className="boton-logout">
          Cerrar Sesión
        </button>
      </header>

      <main className="contenido-inicio">
        <section className="seccion-bienvenida">
          <h2>Sistema de Autenticación</h2>
        </section>

        <section className="grid-ejercicios">
          <div className="tarjeta-ejercicio" onClick={() => navigate('/ejercicio1')}>
            <div className="icono">1</div>
            <h3>Ejercicio 1</h3>
            <p>Estructuras Secuenciales</p>
            <div className="flecha">→</div>
          </div>

          <div className="tarjeta-ejercicio" onClick={() => navigate('/ejercicio2')}>
            <div className="icono">2</div>
            <h3>Ejercicio 2</h3>
            <p>Búsqueda y Ordenamiento</p>
            <div className="flecha">→</div>
          </div>
        </section>

        <section className="info-usuario-completa">
          <h3>Información de Usuario</h3>
          <div className="datos-usuario">
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Correo:</strong> {usuario?.correo}</p>
            <p><strong>Rol:</strong> {usuario?.rolDescripcion || 'Usuario'}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
