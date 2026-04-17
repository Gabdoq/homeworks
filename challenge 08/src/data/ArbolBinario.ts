export class NodoArbol {
  valor: number;
  izquierdo: NodoArbol | null = null;
  derecho: NodoArbol | null = null;

  constructor(valor: number) {
    this.valor = valor;
  }
}

export class ArbolBinario {
  raiz: NodoArbol | null = null;

  /**
   * Inserta un valor en el árbol binario de búsqueda
   */
  insertar(valor: number): void {
    if (this.raiz === null) {
      this.raiz = new NodoArbol(valor);
      console.log(`✅ Valor ${valor} insertado como raíz`);
    } else {
      this.insertarRecursivo(this.raiz, valor);
      console.log(`✅ Valor ${valor} insertado en el árbol`);
    }
  }

  private insertarRecursivo(nodo: NodoArbol, valor: number): void {
    if (valor < nodo.valor) {
      if (nodo.izquierdo === null) {
        nodo.izquierdo = new NodoArbol(valor);
      } else {
        this.insertarRecursivo(nodo.izquierdo, valor);
      }
    } else if (valor > nodo.valor) {
      if (nodo.derecho === null) {
        nodo.derecho = new NodoArbol(valor);
      } else {
        this.insertarRecursivo(nodo.derecho, valor);
      }
    }
    // Si valor == nodo.valor, no se inserta (no permitir duplicados)
  }

  /**
   * Busca un valor en el árbol
   */
  buscar(valor: number): boolean {
    const encontrado = this.buscarRecursivo(this.raiz, valor);
    console.log(`🔍 Búsqueda de ${valor}: ${encontrado ? '✓ ENCONTRADO' : '✗ NO ENCONTRADO'}`);
    return encontrado;
  }

  private buscarRecursivo(nodo: NodoArbol | null, valor: number): boolean {
    if (nodo === null) {
      return false;
    }

    if (valor === nodo.valor) {
      return true;
    } else if (valor < nodo.valor) {
      return this.buscarRecursivo(nodo.izquierdo, valor);
    } else {
      return this.buscarRecursivo(nodo.derecho, valor);
    }
  }

  /**
   * Recorrido preorden (Raíz - Izquierda - Derecha)
   */
  preorden(): number[] {
    const resultado: number[] = [];
    this.preordenRecursivo(this.raiz, resultado);
    console.log('🔵 Recorrido PREORDEN (Raíz - Izq - Der):', resultado);
    return resultado;
  }

  private preordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo !== null) {
      resultado.push(nodo.valor);
      this.preordenRecursivo(nodo.izquierdo, resultado);
      this.preordenRecursivo(nodo.derecho, resultado);
    }
  }

  /**
   * Recorrido inorden (Izquierda - Raíz - Derecha)
   */
  inorden(): number[] {
    const resultado: number[] = [];
    this.inordenRecursivo(this.raiz, resultado);
    console.log('🟢 Recorrido INORDEN (Izq - Raíz - Der):', resultado);
    return resultado;
  }

  private inordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo !== null) {
      this.inordenRecursivo(nodo.izquierdo, resultado);
      resultado.push(nodo.valor);
      this.inordenRecursivo(nodo.derecho, resultado);
    }
  }

  /**
   * Recorrido postorden (Izquierda - Derecha - Raíz)
   */
  postorden(): number[] {
    const resultado: number[] = [];
    this.postordenRecursivo(this.raiz, resultado);
    console.log('🔴 Recorrido POSTORDEN (Izq - Der - Raíz):', resultado);
    return resultado;
  }

  private postordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo !== null) {
      this.postordenRecursivo(nodo.izquierdo, resultado);
      this.postordenRecursivo(nodo.derecho, resultado);
      resultado.push(nodo.valor);
    }
  }

  /**
   * Convierte el árbol a una estructura compatible con react-d3-tree
   */
  convertirAEstructuraD3(): any {
    if (this.raiz === null) {
      return null;
    }
    return this.convertirNodoRecursivo(this.raiz);
  }

  private convertirNodoRecursivo(nodo: NodoArbol | null): any {
    if (nodo === null) {
      return null;
    }

    return {
      name: nodo.valor.toString(),
      children: [
        nodo.izquierdo ? this.convertirNodoRecursivo(nodo.izquierdo) : null,
        nodo.derecho ? this.convertirNodoRecursivo(nodo.derecho) : null,
      ].filter((child) => child !== null),
    };
  }

  /**
   * Limpia el árbol
   */
  limpiar(): void {
    this.raiz = null;
  }
}
