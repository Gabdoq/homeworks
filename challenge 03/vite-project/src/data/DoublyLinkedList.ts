// Clase Nodo para la lista doblemente enlazada
class NodoPagina {
  datos: Pagina;
  anterior: NodoPagina | null;
  siguiente: NodoPagina | null;

  constructor(datos: Pagina) {
    this.datos = datos;
    this.anterior = null;
    this.siguiente = null;
  }
}

// Interfaz para una página
export interface Pagina {
  id: number;
  url: string;
  titulo: string;
  visitadaEn: string;
}

// Lista Doblemente Enlazada para navegar en el historial del navegador
export class ListaDoblementeEnlazada {
  private cabeza: NodoPagina | null;
  private cola: NodoPagina | null;
  private actual: NodoPagina | null;
  private tamano: number;

  constructor() {
    this.cabeza = null;
    this.cola = null;
    this.actual = null;
    this.tamano = 0;
  }

  // Agregar una página al historial (al final)
  agregar(pagina: Pagina): void {
    const nuevoNodo = new NodoPagina(pagina);
    
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      if (this.cola) {
        nuevoNodo.anterior = this.cola;
        this.cola.siguiente = nuevoNodo;
        this.cola = nuevoNodo;
      }
    }
    this.tamano++;
  }

  // Visitar una nueva página (va al final, limpia historial adelante si navegamos desde el medio)
  visitar(pagina: Pagina): void {
    const nuevoNodo = new NodoPagina(pagina);
    
    if (!this.actual) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      // Si no estamos al final, eliminar historial adelante
      nuevoNodo.anterior = this.actual;
      this.actual.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
      this.actual = nuevoNodo;
    }
    this.tamano++;
  }

  // Obtener la página actual
  obtenerActual(): Pagina | null {
    return this.actual ? this.actual.datos : null;
  }

  // Ir a la página anterior
  atras(): Pagina | null {
    if (this.actual && this.actual.anterior) {
      this.actual = this.actual.anterior;
      return this.actual.datos;
    }
    return null;
  }

  // Ir a la página siguiente
  adelante(): Pagina | null {
    if (this.actual && this.actual.siguiente) {
      this.actual = this.actual.siguiente;
      return this.actual.datos;
    }
    return null;
  }

  // Verificar si puede ir atrás
  puedeIrAtras(): boolean {
    return this.actual !== null && this.actual.anterior !== null;
  }

  // Verificar si puede ir adelante
  puedeIrAdelante(): boolean {
    return this.actual !== null && this.actual.siguiente !== null;
  }

  // Obtener todas las páginas como array
  aArray(): Pagina[] {
    const paginas: Pagina[] = [];
    let actual = this.cabeza;
    
    while (actual) {
      paginas.push(actual.datos);
      actual = actual.siguiente;
    }
    
    return paginas;
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

  // Ir a la primera página
  irAlInicio(): Pagina | null {
    this.actual = this.cabeza;
    return this.actual ? this.actual.datos : null;
  }

  // Ir a la última página
  irAlFinal(): Pagina | null {
    this.actual = this.cola;
    return this.actual ? this.actual.datos : null;
  }
}

// Datos de ejemplo del historial del navegador
export const paginasEjemplo: Pagina[] = [
  { id: 1, url: "https://www.google.com", titulo: "Google", visitadaEn: "10:00" },
  { id: 2, url: "https://www.github.com", titulo: "GitHub", visitadaEn: "10:05" },
  { id: 3, url: "https://www.stackoverflow.com", titulo: "Stack Overflow", visitadaEn: "10:10" },
  { id: 4, url: "https://www.youtube.com", titulo: "YouTube", visitadaEn: "10:15" },
  { id: 5, url: "https://www.twitter.com", titulo: "Twitter", visitadaEn: "10:20" },
  { id: 6, url: "https://www.reddit.com", titulo: "Reddit", visitadaEn: "10:25" },
  { id: 7, url: "https://www.amazon.com", titulo: "Amazon", visitadaEn: "10:30" },
  { id: 8, url: "https://www.netflix.com", titulo: "Netflix", visitadaEn: "10:35" },
];

// Crear y poblar el historial del navegador
export function crearHistorial(): ListaDoblementeEnlazada {
  const historial = new ListaDoblementeEnlazada();
  paginasEjemplo.forEach(pagina => historial.agregar(pagina));
  return historial;
}
