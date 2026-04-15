import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fechaCreacion: Date;
}

interface TareasContextType {
  tareas: Tarea[];
  agregarTarea: (titulo: string, descripcion: string) => void;
  eliminarTarea: (id: string) => void;
  editarTarea: (id: string, titulo: string, descripcion: string) => void;
  toggleTarea: (id: string) => void;
}

export const TareasContext = createContext<TareasContextType | undefined>(undefined);

export const TareasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = useCallback((titulo: string, descripcion: string) => {
    const nuevaTarea: Tarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      completada: false,
      fechaCreacion: new Date(),
    };
    setTareas((prev) => [...prev, nuevaTarea]);
  }, []);

  const eliminarTarea = useCallback((id: string) => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
  }, []);

  const editarTarea = useCallback((id: string, titulo: string, descripcion: string) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, titulo, descripcion } : tarea
      )
    );
  }, []);

  const toggleTarea = useCallback((id: string) => {
    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  }, []);

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea, eliminarTarea, editarTarea, toggleTarea }}>
      {children}
    </TareasContext.Provider>
  );
};
