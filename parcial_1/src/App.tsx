import { useState, useEffect } from 'react';
import { SistemaMovilidad } from './SistemaMovilidad';
import { Vehiculo } from './tipos';
import ListaVehiculos from './componentes/ListaVehiculos';
import HistorialAlquileres from './componentes/HistorialAlquileres';
import VehiculoDestacado from './componentes/VehiculoDestacado';
import ListaInversionistas from './componentes/ListaInversionistas';
import FormularioAlquiler from './componentes/FormularioAlquiler';
import './App.css';

function App() {
  const [sistema] = useState(() => {
    const s = new SistemaMovilidad();

    const autos = [
      s.agregarVehiculo('Hypercar', 'Bugatti', 'Chiron', 'BGT-909'),
      s.agregarVehiculo('Coupe', 'McLaren', '720S', 'MCL-777'),
      s.agregarVehiculo('Sedan', 'Toyota', 'Yaris', 'TYA-120'),
      s.agregarVehiculo('Hatchback', 'Kia', 'Rio', 'KIR-011'),
      s.agregarVehiculo('SUV', 'Ford', 'EcoSport', 'FES-456'),
      s.agregarVehiculo('Convertible', 'Mazda', 'MX-5', 'MZM-333'),
    ];

    autos.forEach(v => s.destacados.agregar(v));

    s.agregarInversionista('Jose David', 52000);
    s.agregarInversionista('Gabriel Gil', 78000);
    s.agregarInversionista('Lucía Paredes', 99000);
    s.agregarInversionista('Maria Gomez', 45000);
    s.agregarInversionista('Carlos Rodriguez', 67000);
    s.agregarInversionista('Ana Martinez', 82000);  

    return s;
  });

  const [disponibles, setDisponibles] = useState<Vehiculo[]>([]);
  const [destacado, setDestacado] = useState<Vehiculo | null>(null);
  const [tick, setTick] = useState(0);

  const forceRender = () => setTick(t => t + 1);

  useEffect(() => {
    setDisponibles(sistema.disponibles.obtenerTodos());
    const lista = sistema.destacados.obtenerTodos();
    if (lista.length > 0) setDestacado(lista[0]);
  }, [tick, sistema]);

  useEffect(() => {
    const idInterval = setInterval(() => {
      const sig = sistema.destacados.rotar();
      if (sig) setDestacado(sig);
    }, 5000);
    return () => clearInterval(idInterval);
  }, [sistema]);

  const alquilar = (idVehiculo: string, nombre: string, costo: number) => {
    sistema.alquilar(idVehiculo, nombre, costo);
    forceRender();
  };

  const devolver = (idAlquiler: string) => {
    sistema.devolver(idAlquiler);
    forceRender();
  };

  return (
    <div className="contenedor">
      <div className="encabezado">
        <div className="titulos-seccion">
          <h1 className="titulo">Movilidad Urbana</h1>
          <p className="subtitulo">Panel de Control</p>
        </div>
        <div className="stats-container">
          <div className="stat">
            <span className="stat-num">{sistema.disponibles.tamaño()}</span>
            <span>Disponibles</span>
          </div>
          <div className="stat">
            <span className="stat-num">{sistema.historial.tamaño()}</span>
            <span>Alquileres</span>
          </div>
          <div className="stat">
            <span className="stat-num">{sistema.inversionistas.tamaño()}</span>
            <span>Inversionistas</span>
          </div>
        </div>
      </div>

      <div className="layout-principal">
        <div className="panel destacado">
          <VehiculoDestacado vehiculo={destacado} />
        </div>
        
        <div className="panel">
          <h2 className="panel-titulo">Vehículos Disponibles</h2>
          <ListaVehiculos vehiculos={disponibles} />
        </div>
        
        <div className="panel">
          <h2 className="panel-titulo">Historial de Alquileres</h2>
          <HistorialAlquileres alquileres={sistema.historial.obtenerTodos()} alDevolver={devolver} />
        </div>

        <div className="panel">
          <h2 className="panel-titulo">Alquilar Vehículo</h2>
          <FormularioAlquiler vehiculos={disponibles} alAlquilar={alquilar} />
        </div>

        
        <div className="panel">
          <h2 className="panel-titulo">Inversionistas Activos</h2>
          <ListaInversionistas inversionistas={sistema.inversionistas.obtenerTodos()} />
        </div>
      </div>
    </div>
  );
}

export default App;
