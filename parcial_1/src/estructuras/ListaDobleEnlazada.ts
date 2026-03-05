class NodoDoble<T> {
  dato: T;
  siguiente: NodoDoble<T> | null = null;
  anterior: NodoDoble<T> | null = null;
  constructor(dato: T) { this.dato = dato; }
}

export class ListaDobleEnlazada<T> {
  private cabeza: NodoDoble<T> | null = null;
  private cola: NodoDoble<T> | null = null;

  agregar(dato: T) {
    const nuevo = new NodoDoble(dato);
    if (this.cabeza === null) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      if (this.cola) {
        this.cola.siguiente = nuevo;
        nuevo.anterior = this.cola;
        this.cola = nuevo;
      }
    }
  }

  obtenerTodos(): T[] {
    const resultado: T[] = [];
    let aux = this.cabeza;
    while (aux != null) {
      resultado.push(aux.dato);
      aux = aux.siguiente;
    }
    return resultado;
  }

  tamaño() {
    let c = 0;
    let actual = this.cabeza;
    while(actual){
      c++;
      actual = actual.siguiente;
    }
    return c;
  }
}
