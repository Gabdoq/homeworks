export interface Persona {
  id: string;
  nombre: string;
  montoRetiro: number;
  fechaLlegada: Date;
}

export function generarId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function fechaAleatoria(): Date {
  const ahora = Date.now();
  const offsetMs = Math.floor(Math.random() * 60 * 60 * 1000);
  return new Date(ahora - offsetMs);
}

export const datosIniciales: Omit<Persona, 'id'>[] = [
  { nombre: 'Carlos Mendoza',   montoRetiro: 200,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Laura Ríos',       montoRetiro: 450,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Andrés Castillo',  montoRetiro: 100,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Valentina Torres', montoRetiro: 300,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Miguel Herrera',   montoRetiro: 750,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Sofía Vargas',     montoRetiro: 500,  fechaLlegada: fechaAleatoria() },
  { nombre: 'Diego Morales',    montoRetiro: 125,  fechaLlegada: fechaAleatoria() },
];
