// Implementación del Árbol N-ario para gestión de carpetas y archivos
import type { NodoArbol } from './tipos';

export class ArbolNario {
  private raiz: NodoArbol;

  constructor(nombre: string = 'raiz', creadoPor: string = 'sistema') {
    this.raiz = {
      id: this.generarId(),
      nombre,
      tipo: 'carpeta',
      creadoPor,
      fechaCreacion: new Date(),
      hijos: [],
    };
  }

  getRaiz(): NodoArbol {
    return this.raiz;
  }

  /**
   * Busca un nodo por su ID en el árbol
   */
  buscarNodoPorId(id: string, nodo: NodoArbol = this.raiz): NodoArbol | null {
    if (nodo.id === id) {
      return nodo;
    }

    if (nodo.hijos && nodo.hijos.length > 0) {
      for (const hijo of nodo.hijos) {
        const resultado = this.buscarNodoPorId(id, hijo);
        if (resultado) {
          return resultado;
        }
      }
    }

    return null;
  }

  /**
   * Busca el padre de un nodo por el ID del hijo
   */
  buscarPadrePorIdHijo(idHijo: string, nodoPadre: NodoArbol = this.raiz): NodoArbol | null {
    if (nodoPadre.hijos) {
      for (const hijo of nodoPadre.hijos) {
        if (hijo.id === idHijo) {
          return nodoPadre;
        }
        const resultado = this.buscarPadrePorIdHijo(idHijo, hijo);
        if (resultado) {
          return resultado;
        }
      }
    }
    return null;
  }

  /**
   * Agrega un hijo a un nodo específico
   */
  agregarHijo(idPadre: string, nombre: string, tipo: 'carpeta' | 'archivo', creadoPor: string): boolean {
    // No se pueden crear hijos en archivos
    const nodoPadre = this.buscarNodoPorId(idPadre);
    if (!nodoPadre) {
      return false;
    }

    if (nodoPadre.tipo === 'archivo') {
      console.error('No se pueden agregar hijos a un archivo');
      return false;
    }

    const nuevoNodo: NodoArbol = {
      id: this.generarId(),
      nombre,
      tipo,
      creadoPor,
      fechaCreacion: new Date(),
      hijos: tipo === 'carpeta' ? [] : undefined,
    };

    if (!nodoPadre.hijos) {
      nodoPadre.hijos = [];
    }

    nodoPadre.hijos.push(nuevoNodo);
    return true;
  }

  /**
   * Elimina un nodo del árbol
   */
  eliminarNodo(idNodo: string): boolean {
    if (idNodo === this.raiz.id) {
      return false; // No se puede eliminar la raíz
    }

    const padre = this.buscarPadrePorIdHijo(idNodo);
    if (padre && padre.hijos) {
      const indice = padre.hijos.findIndex((hijo) => hijo.id === idNodo);
      if (indice !== -1) {
        padre.hijos.splice(indice, 1);
        return true;
      }
    }

    return false;
  }

  /**
   * Renombra un nodo
   */
  renombrarNodo(idNodo: string, nuevoNombre: string): boolean {
    const nodo = this.buscarNodoPorId(idNodo);
    if (nodo) {
      nodo.nombre = nuevoNombre;
      return true;
    }
    return false;
  }

  /**
   * Obtiene la ruta completa de un nodo
   */
  obtenerRuta(idNodo: string, nodo: NodoArbol = this.raiz): string[] {
    if (nodo.id === idNodo) {
      return [nodo.nombre];
    }

    if (nodo.hijos && nodo.hijos.length > 0) {
      for (const hijo of nodo.hijos) {
        const ruta = this.obtenerRuta(idNodo, hijo);
        if (ruta.length > 0) {
          return [nodo.nombre, ...ruta];
        }
      }
    }

    return [];
  }

  /**
   * Convierte el árbol a un objeto serializable (JSON)
   */
  aJSON(): NodoArbol {
    return JSON.parse(JSON.stringify(this.raiz));
  }

  /**
   * Carga un árbol desde un objeto JSON
   */
  cargarDesdeJSON(datos: NodoArbol): void {
    this.raiz = JSON.parse(JSON.stringify(datos));
  }

  /**
   * Genera un ID único
   */
  private generarId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Obtiene todos los nodos de un tipo específico
   */
  obtenerNodosPorTipo(tipo: 'carpeta' | 'archivo', nodo: NodoArbol = this.raiz): NodoArbol[] {
    const resultado: NodoArbol[] = [];

    if (nodo.tipo === tipo) {
      resultado.push(nodo);
    }

    if (nodo.hijos && nodo.hijos.length > 0) {
      for (const hijo of nodo.hijos) {
        resultado.push(...this.obtenerNodosPorTipo(tipo, hijo));
      }
    }

    return resultado;
  }

  /**
   * Obtiene la profundidad del árbol
   */
  obtenerProfundidad(nodo: NodoArbol = this.raiz): number {
    if (!nodo.hijos || nodo.hijos.length === 0) {
      return 1;
    }

    let maxProfundidad = 0;
    for (const hijo of nodo.hijos) {
      const profundidad = this.obtenerProfundidad(hijo);
      maxProfundidad = Math.max(maxProfundidad, profundidad);
    }

    return maxProfundidad + 1;
  }

  /**
   * Obtiene el número total de nodos
   */
  obtenerTotalNodos(nodo: NodoArbol = this.raiz): number {
    let total = 1;

    if (nodo.hijos && nodo.hijos.length > 0) {
      for (const hijo of nodo.hijos) {
        total += this.obtenerTotalNodos(hijo);
      }
    }

    return total;
  }
}
