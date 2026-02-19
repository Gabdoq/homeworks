// Clase Nodo para la lista enlazada simple
class NodoCancion {
  datos: Cancion;
  siguiente: NodoCancion | null;

  constructor(datos: Cancion) {
    this.datos = datos;
    this.siguiente = null;
  }
}

// Interfaz para una canción
export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  duracion: string;
}

// Lista Enlazada Simple para reproducir canciones en orden
export class ListaEnlazada {
  private cabeza: NodoCancion | null;
  private cola: NodoCancion | null;
  private actual: NodoCancion | null;
  private tamano: number;

  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.actual = null;
    this.tamano = 0;
  }

  // Agregar una canción al final de la playlist
  agregar(cancion: Cancion): void {
    const nuevoNodo = new NodoCancion(cancion);
    
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      if (this.cola) {
        this.cola.siguiente = nuevoNodo;
        this.cola = nuevoNodo;
      }
    }
    this.tamano++;
  }

  // Obtener la canción actual
  obtenerActual(): Cancion | null {
    return this.actual ? this.actual.datos : null;
  }

  // Avanzar a la siguiente canción
  siguiente(): Cancion | null {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return this.actual.datos;
    }
    return null;
  }

  // Reiniciar a la primera canción
  reiniciar(): Cancion | null {
    this.actual = this.cabeza;
    return this.actual ? this.actual.datos : null;
  }

  // Verificar si hay una siguiente canción
  haySiguiente(): boolean {
    return this.actual !== null && this.actual.siguiente !== null;
  }

  // Obtener la playlist como array
  aArray(): Cancion[] {
    const canciones: Cancion[] = [];
    let actual = this.cabeza;
    
    while (actual) {
      canciones.push(actual.datos);
      actual = actual.siguiente;
    }
    
    return canciones;
  }

  // Obtener el índice actual
  obtenerIndiceActual(): number {
    let indice = 0;
    let actual = this.cabeza;
    
    while (actual && actual !== this.actual) {
      indice++;
      actual = actual.siguiente;
    }
    
    return actual ? indice : -1;
  }

  // Obtener tamaño
  obtenerTamano(): number {
    return this.tamano;
  }
}

// Datos de canciones de ejemplo
export const cancionesEjemplo: Cancion[] = [
  { id: 1, titulo: "Bohemian Rhapsody", artista: "Queen", duracion: "5:55" },
  { id: 2, titulo: "Stairway to Heaven", artista: "Led Zeppelin", duracion: "8:02" },
  { id: 3, titulo: "Hotel California", artista: "Eagles", duracion: "6:30" },
  { id: 4, titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", duracion: "5:56" },
  { id: 5, titulo: "Comfortably Numb", artista: "Pink Floyd", duracion: "6:21" },
  { id: 6, titulo: "November Rain", artista: "Guns N' Roses", duracion: "8:57" },
  { id: 7, titulo: "Imagine", artista: "John Lennon", duracion: "3:07" },
  { id: 8, titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: "5:01" },
];

// Crear y poblar la lista enlazada
export function crearPlaylist(): ListaEnlazada {
  const playlist = new ListaEnlazada();
  cancionesEjemplo.forEach(cancion => playlist.agregar(cancion));
  return playlist;
}
