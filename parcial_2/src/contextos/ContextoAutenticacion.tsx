import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { DatosAutenticacion, UsuarioAutenticado } from '../tipos';

interface ContextoAutenticacionType {
  autenticacion: DatosAutenticacion;
  login: (email: string, password: string) => Promise<void>;
  registro: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  usuarioActual: UsuarioAutenticado | null;
}

const ContextoAutenticacion = createContext<ContextoAutenticacionType | undefined>(undefined);

interface ProveedorAutenticacionProps {
  children: ReactNode;
}

export function ProveedorAutenticacion({ children }: ProveedorAutenticacionProps) {
  const [autenticacion, setAutenticacion] = useState<DatosAutenticacion>({
    usuario: null,
    cargando: true,
    error: null,
  });

  // Escuchar cambios de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        const usuarioAutenticado: UsuarioAutenticado = {
          uid: usuarioFirebase.uid,
          email: usuarioFirebase.email || '',
          displayName: usuarioFirebase.displayName || 'Usuario',
        };
        setAutenticacion({
          usuario: usuarioAutenticado,
          cargando: false,
          error: null,
        });
      } else {
        setAutenticacion({
          usuario: null,
          cargando: false,
          error: null,
        });
      }
    }, (error) => {
      console.error('Error en autenticación:', error);
      setAutenticacion({
        usuario: null,
        cargando: false,
        error: 'Error de autenticación',
      });
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setAutenticacion((prev) => ({ ...prev, cargando: true, error: null }));
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error en login';
      setAutenticacion({
        usuario: null,
        cargando: false,
        error: mensaje,
      });
      throw error;
    }
  };

  const registro = async (email: string, password: string, displayName: string) => {
    setAutenticacion((prev) => ({ ...prev, cargando: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : 'Error en registro';
      setAutenticacion({
        usuario: null,
        cargando: false,
        error: mensaje,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  const value: ContextoAutenticacionType = {
    autenticacion,
    login,
    registro,
    logout,
    usuarioActual: autenticacion.usuario,
  };

  return (
    <ContextoAutenticacion.Provider value={value}>{children}</ContextoAutenticacion.Provider>
  );
}

export function useAutenticacion() {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de ProveedorAutenticacion');
  }
  return contexto;
}
