import { useState, useEffect } from 'react';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import { useArbol } from '../contextos/ContextoArbol';
import { FormularioCrear } from './FormularioCrear';
import { VisualizacionArbol } from './VisualizacionArbol';
import './PaginaPrincipal.css';
import type { NodoArbol } from '../tipos';

export function PaginaPrincipal() {
  const { usuarioActual, logout } = useAutenticacion();
  const { datosArbol, guardarArbol } = useArbol();
  const [nodoSeleccionado, setNodoSeleccionado] = useState<NodoArbol | null>(null);
  const [guardando, setGuardando] = useState(false);

  // Sincronizar el nodo seleccionado cuando se carga el árbol
  useEffect(() => {
    if (datosArbol.raiz && !datosArbol.cargando) {
      setNodoSeleccionado(datosArbol.raiz);
    }
  }, [datosArbol.raiz, datosArbol.cargando]);

  const manejarGuardar = async () => {
    setGuardando(true);
    try {
      await guardarArbol();
      alert('Cambios guardados exitosamente');
    } catch (error) {
      alert('Error al guardar cambios');
    } finally {
      setGuardando(false);
    }
  };

  const manejarLogout = async () => {
    if (confirm('¿Deseas cerrar sesión?')) {
      await logout();
    }
  };

  const manejarSeleccionar = (nodo: NodoArbol) => {
    setNodoSeleccionado(nodo);
  };

  return (
    <div className="pagina-principal">
      <header className="header">
        <div className="header-contenido">
          <div className="header-izquierda">
            <h1>Gestor de Archivos</h1>
            {usuarioActual && (
              <div className="usuario-info">
                <span className="nombre">{usuarioActual.displayName || usuarioActual.email}</span>
              </div>
            )}
          </div>
          <div className="header-derecha">
            <button onClick={manejarGuardar} disabled={guardando} className="boton-guardar">
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
            <button onClick={manejarLogout} className="boton-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="contenido-principal">
        <div className="contenedor-formulario">
          <FormularioCrear nodoSeleccionado={nodoSeleccionado} />
        </div>

        <div className="contenedor-arbol">
          <VisualizacionArbol onSeleccionar={manejarSeleccionar} />
        </div>
      </main>
    </div>
  );
}
