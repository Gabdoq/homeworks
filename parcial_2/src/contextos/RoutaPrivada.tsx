import { type ReactNode } from 'react';
import { useAutenticacion } from './ContextoAutenticacion';

interface RoutaPrivadaProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoutaPrivada({ children, fallback }: RoutaPrivadaProps) {
  const { usuarioActual, autenticacion } = useAutenticacion();

  if (autenticacion.cargando) {
    return <div className="cargando">Cargando...</div>;
  }

  if (!usuarioActual) {
    return fallback || <div>Acceso denegado. Por favor inicia sesión.</div>;
  }

  return <>{children}</>;
}
