import type { ElementoMenu, NodoArbolN } from '../tipos';

/**
 * Clase para representar un árbol N-ario (N-ary Tree)
 * Cada nodo puede tener múltiples hijos
 */
export class ArbolN {
  raiz: NodoArbolN;

  constructor(datosRaiz: ElementoMenu) {
    this.raiz = {
      datos: datosRaiz,
      hijos: []
    };
  }

  /**
   * Agrega un nodo hijo a un nodo padre existente
   */
  agregarHijo(idPadre: string, datosHijo: ElementoMenu): boolean {
    const nodoPadre = this.buscarNodo(this.raiz, idPadre);
    if (nodoPadre) {
      nodoPadre.hijos.push({
        datos: datosHijo,
        hijos: []
      });
      return true;
    }
    return false;
  }

  /**
   * Encuentra un nodo por su id
   */
  buscarNodo(nodo: NodoArbolN, id: string): NodoArbolN | null {
    if (nodo.datos.id === id) {
      return nodo;
    }

    for (const hijo of nodo.hijos) {
      const resultado = this.buscarNodo(hijo, id);
      if (resultado) return resultado;
    }

    return null;
  }

  /**
   * Convierte un ElementoMenu (estructura plana con hijos) a un ArbolN
   */
  static desdeElementoMenu(elemento: ElementoMenu): ArbolN {
    const arbol = new ArbolN(elemento);
    arbol.construirDesdeEstructura(elemento, arbol.raiz);
    return arbol;
  }

  private construirDesdeEstructura(elemento: ElementoMenu, nodoArbol: NodoArbolN): void {
    if (elemento.hijos && elemento.hijos.length > 0) {
      elemento.hijos.forEach(hijo => {
        const nodoHijo: NodoArbolN = {
          datos: hijo,
          hijos: []
        };
        nodoArbol.hijos.push(nodoHijo);
        this.construirDesdeEstructura(hijo, nodoHijo);
      });
    }
  }

  /**
   * Recorre el árbol en profundidad (DFS) y ejecuta una función en cada nodo
   */
  recorrer(callback: (nodo: NodoArbolN, nivel: number) => void, nodo: NodoArbolN = this.raiz, nivel: number = 0): void {
    callback(nodo, nivel);
    for (const hijo of nodo.hijos) {
      this.recorrer(callback, hijo, nivel + 1);
    }
  }

  /**
   * Retorna todos los nodos en un arreglo flat con información de nivel
   */
  aArreglo(): Array<{ nodo: NodoArbolN; nivel: number }> {
    const resultado: Array<{ nodo: NodoArbolN; nivel: number }> = [];
    this.recorrer((nodo, nivel) => {
      resultado.push({ nodo, nivel });
    });
    return resultado;
  }

  /**
   * Obtiene la ruta de un nodo desde la raíz
   */
  obtenerRuta(idNodo: string): ElementoMenu[] {
    const ruta: ElementoMenu[] = [];
    
    const buscarYConstruirRuta = (nodo: NodoArbolN): boolean => {
      ruta.push(nodo.datos);
      
      if (nodo.datos.id === idNodo) {
        return true;
      }
      
      for (const hijo of nodo.hijos) {
        if (buscarYConstruirRuta(hijo)) {
          return true;
        }
      }
      
      ruta.pop();
      return false;
    };
    
    buscarYConstruirRuta(this.raiz);
    return ruta;
  }
}
