import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from './ContextoAutenticacion';

/**
 * Componente que protege rutas privadas
 * Solo permite acceso si el usuario está autenticado
 */
export function RoutaPrivada({ children }: { children: ReactNode }) {
  const { estaAutenticado, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  return estaAutenticado ? children : <Navigate to="/login" replace />;
}
