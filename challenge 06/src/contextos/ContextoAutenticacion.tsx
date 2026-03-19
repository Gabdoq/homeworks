import { createContext, useContext, useState, ReactNode } from 'react';
import { EstadoAutenticacion, UsuarioAutenticado, CredencialesLogin } from '../tipos';

interface ContextoAutenticacion extends EstadoAutenticacion {
  iniciarSesion: (credenciales: CredencialesLogin) => Promise<void>;
  cerrarSesion: () => void;
  limpiarError: () => void;
}

const ContextoAuth = createContext<ContextoAutenticacion | undefined>(undefined);

/**
 * Proveedor de autenticación que maneja el estado global de login
 * Valida credenciales: usuario@mail.com / 123
 */
export function ProveedorAutenticacion({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAutenticacion>({
    estaAutenticado: false,
    usuario: null,
    cargando: false,
    error: null,
  });

  const iniciarSesion = async (credenciales: CredencialesLogin) => {
    setEstado((prev: EstadoAutenticacion) => ({ ...prev, cargando: true, error: null }));
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validación de credenciales
    const CORREO_VALIDO = 'user@mail.com';
    const CONTRASEÑA_VALIDA = '123';

    if (credenciales.correo === CORREO_VALIDO && credenciales.contraseña === CONTRASEÑA_VALIDA) {
      const usuarioNuevo: UsuarioAutenticado = {
        id: 1,
        nombre: 'Usuario Demo',
        correo: CORREO_VALIDO,
        rolDescripcion: 'Estudiante',
      };

      setEstado((prev: EstadoAutenticacion) => ({
        ...prev,
        estaAutenticado: true,
        usuario: usuarioNuevo,
        cargando: false,
        error: null,
      }));

      // Guardar en localStorage (persistencia básica)
      localStorage.setItem('usuarioAutenticado', JSON.stringify(usuarioNuevo));
    } else {
      setEstado((prev: EstadoAutenticacion) => ({
        ...prev,
        cargando: false,
        error: 'Credenciales inválidas. Usa user@mail.com / 123',
      }));
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    setEstado({
      estaAutenticado: false,
      usuario: null,
      cargando: false,
      error: null,
    });
  };

  const limpiarError = () => {
    setEstado((prev: EstadoAutenticacion) => ({ ...prev, error: null }));
  };

  return (
    <ContextoAuth.Provider value={{ ...estado, iniciarSesion, cerrarSesion, limpiarError }}>
      {children}
    </ContextoAuth.Provider>
  );
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAutenticacion() {
  const contexto = useContext(ContextoAuth);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de ProveedorAutenticacion');
  }
  return contexto as ContextoAutenticacion;
}
