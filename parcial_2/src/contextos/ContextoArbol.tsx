import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from '../firebaseConfig';
import type { DatosArbol } from '../tipos';
import { ArbolNario } from '../ArbolNario';
import { useAutenticacion } from './ContextoAutenticacion';

interface ContextoArbolType {
  datosArbol: DatosArbol;
  arbol: ArbolNario;
  agregarNodo: (idPadre: string, nombre: string, tipo: 'carpeta' | 'archivo') => boolean;
  eliminarNodo: (idNodo: string) => boolean;
  renombrarNodo: (idNodo: string, nuevoNombre: string) => boolean;
  obtenerRuta: (idNodo: string) => string[];
  guardarArbol: () => Promise<void>;
  cargarArbol: () => Promise<void>;
  obtenerEstadisticas: () => {
    totalNodos: number;
    profundidad: number;
    totalCarpetas: number;
    totalArchivos: number;
  };
}

const ContextoArbol = createContext<ContextoArbolType | undefined>(undefined);

interface ProveedorArbolProps {
  children: ReactNode;
}

export function ProveedorArbol({ children }: ProveedorArbolProps) {
  const { usuarioActual, autenticacion } = useAutenticacion();
  const [arbol, setArbol] = useState<ArbolNario>(() => new ArbolNario('Mi Espacio', 'sistema'));
  const [datosArbol, setDatosArbol] = useState<DatosArbol>({
    raiz: arbol.getRaiz(),
    cargando: true,
    error: null,
  });

  // Cargar el árbol del usuario cuando se autentica
  useEffect(() => {
    if (usuarioActual?.uid) {
      cargarArbol();
    } else if (!autenticacion.cargando) {
      // Si no hay usuario, inicializar árbol vacío
      const arbolVacio = new ArbolNario('Mi Espacio', 'sistema');
      setArbol(arbolVacio);
      setDatosArbol({
        raiz: arbolVacio.getRaiz(),
        cargando: false,
        error: null,
      });
    }
  }, [usuarioActual?.uid, autenticacion.cargando]);

  const agregarNodo = (idPadre: string, nombre: string, tipo: 'carpeta' | 'archivo'): boolean => {
    if (!usuarioActual) {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'Debes estar autenticado para crear archivos/carpetas',
      }));
      return false;
    }

    // Validar que el nombre no esté vacío
    if (!nombre.trim()) {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'El nombre no puede estar vacío',
      }));
      return false;
    }

    // Validar que el padre existe
    const nodoPadre = arbol.buscarNodoPorId(idPadre);
    if (!nodoPadre) {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'El nodo padre no existe',
      }));
      return false;
    }

    // Validar que el padre es una carpeta
    if (nodoPadre.tipo === 'archivo') {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'No se pueden agregar elementos dentro de un archivo',
      }));
      return false;
    }

    const resultado = arbol.agregarHijo(idPadre, nombre.trim(), tipo, usuarioActual.email || 'desconocido');

    if (resultado) {
      // Actualizar el estado para que React detecte el cambio
      const arbolActualizado = Object.assign(Object.create(Object.getPrototypeOf(arbol)), arbol);
      setArbol(arbolActualizado);
      setDatosArbol({
        raiz: arbolActualizado.getRaiz(),
        cargando: false,
        error: null,
      });
      guardarArbolEnStorage(arbolActualizado);
    } else {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'No se pudo crear el nodo. Verifica que el padre sea una carpeta.',
      }));
    }

    return resultado;
  };

  const eliminarNodo = (idNodo: string): boolean => {
    if (!usuarioActual) {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'Debes estar autenticado',
      }));
      return false;
    }

    const resultado = arbol.eliminarNodo(idNodo);

    if (resultado) {
      const arbolActualizado = Object.assign(Object.create(Object.getPrototypeOf(arbol)), arbol);
      setArbol(arbolActualizado);
      setDatosArbol({
        raiz: arbolActualizado.getRaiz(),
        cargando: false,
        error: null,
      });
      guardarArbolEnStorage(arbolActualizado);
    } else {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'No se pudo eliminar el nodo',
      }));
    }

    return resultado;
  };

  const renombrarNodo = (idNodo: string, nuevoNombre: string): boolean => {
    if (!usuarioActual) {
      return false;
    }

    if (!nuevoNombre.trim()) {
      setDatosArbol((prev) => ({
        ...prev,
        error: 'El nombre no puede estar vacío',
      }));
      return false;
    }

    const resultado = arbol.renombrarNodo(idNodo, nuevoNombre.trim());

    if (resultado) {
      const arbolActualizado = Object.assign(Object.create(Object.getPrototypeOf(arbol)), arbol);
      setArbol(arbolActualizado);
      setDatosArbol({
        raiz: arbolActualizado.getRaiz(),
        cargando: false,
        error: null,
      });
      guardarArbolEnStorage(arbolActualizado);
    }

    return resultado;
  };

  const obtenerRuta = (idNodo: string): string[] => {
    return arbol.obtenerRuta(idNodo);
  };

  const guardarArbolEnStorage = async (arbolActual: ArbolNario) => {
    if (usuarioActual?.uid) {
      try {
        const datos = arbolActual.aJSON();
        // Guardar en localStorage
        localStorage.setItem(`arbol-${usuarioActual.uid}`, JSON.stringify(datos));
        
        // Guardar en Firebase Realtime Database
        const arbolRef = ref(database, `users/${usuarioActual.uid}/arbol`);
        await set(arbolRef, datos);
      } catch (error) {
        console.error('Error saving tree to database:', error);
        setDatosArbol((prev) => ({
          ...prev,
          error: 'Error al guardar en la base de datos',
        }));
      }
    }
  };

  const guardarArbol = async (): Promise<void> => {
    setDatosArbol((prev) => ({ ...prev, cargando: true }));
    try {
      guardarArbolEnStorage(arbol);
      setDatosArbol((prev) => ({
        ...prev,
        cargando: false,
        error: null,
      }));
    } catch (error) {
      setDatosArbol((prev) => ({
        ...prev,
        cargando: false,
        error: error instanceof Error ? error.message : 'Error al guardar',
      }));
    }
  };

  const cargarArbol = async (): Promise<void> => {
    if (!usuarioActual?.uid) return;

    setDatosArbol((prev) => ({ ...prev, cargando: true }));
    try {
      // Intentar cargar de Firebase primero
      const arbolRef = ref(database, `users/${usuarioActual.uid}/arbol`);
      const snapshot = await get(arbolRef);
      
      if (snapshot.exists()) {
        try {
          const datos = snapshot.val();
          const nuevoArbol = new ArbolNario();
          nuevoArbol.cargarDesdeJSON(datos);
          setArbol(nuevoArbol);
          // Guardar también en localStorage para sincronización offline
          localStorage.setItem(`arbol-${usuarioActual.uid}`, JSON.stringify(datos));
          setDatosArbol({
            raiz: nuevoArbol.getRaiz(),
            cargando: false,
            error: null,
          });
        } catch (parseError) {
          console.error('Error parsing tree from Firebase:', parseError);
          throw new Error('Error al procesar el árbol desde la base de datos');
        }
      } else {
        // Si no existe en Firebase, intentar cargar de localStorage
        const datosGuardados = localStorage.getItem(`arbol-${usuarioActual.uid}`);
        if (datosGuardados) {
          try {
            const datos = JSON.parse(datosGuardados);
            const nuevoArbol = new ArbolNario();
            nuevoArbol.cargarDesdeJSON(datos);
            setArbol(nuevoArbol);
            setDatosArbol({
              raiz: nuevoArbol.getRaiz(),
              cargando: false,
              error: null,
            });
          } catch (parseError) {
            console.error('Error parsing saved tree:', parseError);
            throw new Error('Error al procesar el árbol guardado');
          }
        } else {
          // Crear árbol nuevo si no existe en ningún lugar
          const nuevoArbol = new ArbolNario('Mi Espacio', usuarioActual.email || 'usuario');
          setArbol(nuevoArbol);
          setDatosArbol({
            raiz: nuevoArbol.getRaiz(),
            cargando: false,
            error: null,
          });
        }
      }
    } catch (error) {
      console.error('Error loading tree:', error);
      setDatosArbol((prev) => ({
        ...prev,
        cargando: false,
        error: error instanceof Error ? error.message : 'Error al cargar el árbol',
      }));
    }
  };

  const obtenerEstadisticas = () => {
    return {
      totalNodos: arbol.obtenerTotalNodos(),
      profundidad: arbol.obtenerProfundidad(),
      totalCarpetas: arbol.obtenerNodosPorTipo('carpeta').length,
      totalArchivos: arbol.obtenerNodosPorTipo('archivo').length,
    };
  };

  const value: ContextoArbolType = {
    datosArbol,
    arbol,
    agregarNodo,
    eliminarNodo,
    renombrarNodo,
    obtenerRuta,
    guardarArbol,
    cargarArbol,
    obtenerEstadisticas,
  };

  return <ContextoArbol.Provider value={value}>{children}</ContextoArbol.Provider>;
}

export function useArbol() {
  const contexto = useContext(ContextoArbol);
  if (!contexto) {
    throw new Error('useArbol debe usarse dentro de ProveedorArbol');
  }
  return contexto;
}
