export interface Vehiculo {
  id: string;
  tipo: string;
  marca: string;
  modelo: string;
  placa: string;
  estado: 'disponible' | 'alquilado';
}

export interface Alquiler {
  id: string;
  vehiculo: Vehiculo;
  nombreCliente: string;
  fechaAlquiler: Date;
  fechaDevolucion?: Date;
  costo: number;
}

export interface Inversionista {
  id: string;
  nombre: string;
  montoInversion: number;
  fechaIngreso: Date;
}

export function generarId(): string {
  return Math.random().toString(36).substring(2, 15);
}
