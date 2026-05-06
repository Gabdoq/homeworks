/**
 * Tipos e interfaces para el sistema de grafo de amigos y ciudades
 */

export interface Persona {
  id: string;
  nombre: string;
  edad: number;
  ciudadId: string;
}

export interface Ciudad {
  id: string;
  nombre: string;
}

export interface Relacion {
  origen: string;
  destino: string;
  tipo: 'amistad' | 'ciudad';
}

export interface NodoGrafo {
  id: string;
  label: string;
  tipo: 'persona' | 'ciudad';
  edad?: number;
}

export interface AristaGrafo {
  source: string;
  target: string;
  tipo: 'amistad' | 'residencia';
}

export interface DatosGrafo {
  nodes: NodoGrafo[];
  links: AristaGrafo[];
}
