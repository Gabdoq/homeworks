import { ListaEnlazada } from './estructuras/ListaEnlazada';
import { ListaDobleEnlazada } from './estructuras/ListaDobleEnlazada';
import { ListaCircular } from './estructuras/ListaCircular';
import { ListaCircularDoble } from './estructuras/ListaCircularDoble';
import { Vehiculo, Alquiler, Inversionista, generarId } from './tipos';

export class SistemaMovilidad {
  disponibles = new ListaEnlazada<Vehiculo>();
  historial = new ListaDobleEnlazada<Alquiler>();
  destacados = new ListaCircular<Vehiculo>();
  inversionistas = new ListaCircularDoble<Inversionista>();

  agregarVehiculo(tipo: string, marca: string, modelo: string, placa: string) {
    const v: Vehiculo = { id: generarId(), tipo, marca, modelo, placa, estado: 'disponible' };
    this.disponibles.agregar(v);
    return v;
  }

  alquilar(idVehiculo: string, cliente: string, costo: number) {
    const vehiculosAux = this.disponibles.obtenerTodos();
    const vehiculo = vehiculosAux.find(v => v.id === idVehiculo);

    if (!vehiculo) return null;

    this.disponibles.eliminar(vehiculo);

    const alquiler: Alquiler = {
      id: generarId(),
      vehiculo: { ...vehiculo, estado: 'alquilado' },
      nombreCliente: cliente,
      fechaAlquiler: new Date(),
      costo: costo
    };
    this.historial.agregar(alquiler);
    return alquiler;
  }

  devolver(idAlquiler: string) {
    const alquiler = this.historial.obtenerTodos().find(a => a.id === idAlquiler);
    if (!alquiler || alquiler.fechaDevolucion) return null;

    alquiler.fechaDevolucion = new Date();
    alquiler.vehiculo.estado = 'disponible';
    this.disponibles.agregar(alquiler.vehiculo);
    return alquiler;
  }

  agregarInversionista(nombre: string, monto: number) {
    const inv: Inversionista = { id: generarId(), nombre, montoInversion: monto, fechaIngreso: new Date() };
    this.inversionistas.agregar(inv);
    return inv;
  }
}
