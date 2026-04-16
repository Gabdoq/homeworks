import { ProveedorAutenticacion, useAutenticacion } from './contextos/ContextoAutenticacion';
import { ProveedorArbol } from './contextos/ContextoArbol';
import { RoutaPrivada } from './contextos/RoutaPrivada';
import { PaginaAutenticacion } from './componentes/PaginaAutenticacion';
import { PaginaPrincipal } from './componentes/PaginaPrincipal';
import './App.css';

function ContenidoApp() {
  const { usuarioActual, autenticacion } = useAutenticacion();

  if (autenticacion.cargando) {
    return (
      <div className="pantalla-carga">
        <div className="spinner"></div>
        <p>Cargando aplicación...</p>
      </div>
    );
  }

  if (!usuarioActual) {
    return <PaginaAutenticacion />;
  }

  return (
    <RoutaPrivada>
      <ProveedorArbol>
        <PaginaPrincipal />
      </ProveedorArbol>
    </RoutaPrivada>
  );
}

function App() {
  return (
    <ProveedorAutenticacion>
      <ContenidoApp />
    </ProveedorAutenticacion>
  );
}

export default App;
