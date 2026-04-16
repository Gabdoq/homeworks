// Tipos para el sistema de carpetas y archivos

export interface NodoArbol {
  id: string;
  nombre: string;
  tipo: 'carpeta' | 'archivo';
  creadoPor: string;
  fechaCreacion: Date;
  hijos?: NodoArbol[];
  metadata?: Record<string, any>;
}

export interface UsuarioAutenticado {
  uid: string;
  email: string;
  displayName?: string;
}

export interface DatosAutenticacion {
  usuario: UsuarioAutenticado | null;
  cargando: boolean;
  error: string | null;
}

export interface DatosArbol {
  raiz: NodoArbol;
  cargando: boolean;
  error: string | null;
}
