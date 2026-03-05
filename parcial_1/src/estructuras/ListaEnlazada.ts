class Nodo<T> {
  dato: T;
  siguiente: Nodo<T> | null = null;
  constructor(dato: T) { this.dato = dato; }
}

export class ListaEnlazada<T> {
  private cabeza: Nodo<T> | null = null;
  private cola: Nodo<T> | null = null;

  agregar(dato: T) {
    const nuevo = new Nodo(dato);
    if (!this.cabeza) {
      this.cabeza = nuevo;
      this.cola = nuevo;
    } else {
      this.cola!.siguiente = nuevo;
      this.cola = nuevo;
    }
  }

  eliminar(dato: T): boolean {
    if (!this.cabeza) return false;

    if (this.cabeza.dato === dato) {
      this.cabeza = this.cabeza.siguiente;
      return true;
    }

    let aux = this.cabeza;
    while (aux.siguiente) {
      if (aux.siguiente.dato === dato) {
        aux.siguiente = aux.siguiente.siguiente;
        if (!aux.siguiente) this.cola = aux;
        return true;
      }
      aux = aux.siguiente;
    }
    return false;
  }

  obtenerTodos(): T[] {
    const resultado: T[] = [];
    let aux = this.cabeza;
    while (aux) {
      resultado.push(aux.dato);
      aux = aux.siguiente;
    }
    return resultado;
  }

  tamaño() {
    let count = 0;
    let aux = this.cabeza;
    while(aux != null){
      count++;
      aux = aux.siguiente;
    }
    return count;
  }
}
