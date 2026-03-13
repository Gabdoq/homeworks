class NodoCola<T> {
  dato: T;
  siguiente: NodoCola<T> | null = null;
  constructor(dato: T) { this.dato = dato; }
}

export class Cola<T> {
  private frente: NodoCola<T> | null = null;
  private fin: NodoCola<T> | null = null;
  private cantidad = 0;

  encolar(dato: T) {
    const nuevo = new NodoCola(dato);
    if (!this.fin) {
      this.frente = nuevo;
      this.fin = nuevo;
    } else {
      this.fin.siguiente = nuevo;
      this.fin = nuevo;
    }
    this.cantidad++;
  }

  desencolar(): T | null {
    if (!this.frente) return null;
    const valor = this.frente.dato;
    this.frente = this.frente.siguiente;
    if (!this.frente) this.fin = null;
    this.cantidad--;
    return valor;
  }

  verFrente(): T | null {
    return this.frente ? this.frente.dato : null;
  }

  obtenerTodos(): T[] {
    const resultado: T[] = [];
    let actual = this.frente;
    while (actual) {
      resultado.push(actual.dato);
      actual = actual.siguiente;
    }
    return resultado;
  }

  tamaño(): number { return this.cantidad; }

  estaVacia(): boolean { return this.cantidad === 0; }
}
