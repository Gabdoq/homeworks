class NodoCircular<T> {
  dato: T;
  siguiente: NodoCircular<T> | null = null;
  constructor(dato: T) { this.dato = dato; }
}

export class ListaCircular<T> {
  private cabeza: NodoCircular<T> | null = null;
  private cola: NodoCircular<T> | null = null;
  private cantidad = 0;

  agregar(dato: T) {
    const nuevo = new NodoCircular(dato);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      this.cola = nuevo;
      nuevo.siguiente = nuevo;
    } else {
      this.cola!.siguiente = nuevo;
      nuevo.siguiente = this.cabeza;
      this.cola = nuevo;
    }
    this.cantidad++;
  }

  obtenerTodos(): T[] {
    if (!this.cabeza) return [];
    const resultado: T[] = [];
    let actual = this.cabeza;
    for (let i = 0; i < this.cantidad; i++) {
      resultado.push(actual.dato);
      actual = actual.siguiente!;
    }
    return resultado;
  }

  rotar(): T | null {
    if (!this.cabeza) return null;
    const valor = this.cabeza.dato;
    this.cabeza = this.cabeza.siguiente;
    return valor;
  }

  tamaño() { return this.cantidad; }
}
