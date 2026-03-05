class NodoCircularDoble<T> {
  dato: T;
  siguiente: NodoCircularDoble<T> | null = null;
  anterior: NodoCircularDoble<T> | null = null;
  constructor(dato: T) { this.dato = dato; }
}

export class ListaCircularDoble<T> {
  private cabeza: NodoCircularDoble<T> | null = null;
  private cola: NodoCircularDoble<T> | null = null;
  private cantidad = 0;

  agregar(dato: T) {
    const nuevo = new NodoCircularDoble(dato);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      this.cola = nuevo;
      nuevo.siguiente = nuevo;
      nuevo.anterior = nuevo;
    } else {
      this.cola!.siguiente = nuevo;
      nuevo.anterior = this.cola;
      nuevo.siguiente = this.cabeza;
      this.cabeza.anterior = nuevo;
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

  tamaño() { return this.cantidad; }
}
