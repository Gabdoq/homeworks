import { Vehiculo } from '../tipos';

export default function VehiculoDestacado({ vehiculo }: { vehiculo: Vehiculo | null }) {
  if (!vehiculo) return <p className="vacio">Cargando...</p>;

  return (
    <div className="destacado">
      <h3>Vehículo Destacado</h3>
      <p className="gris-claro">Rota cada 5 segundos</p>
      <p className="dest-marca">{vehiculo.marca}</p>
      <p className="dest-modelo">{vehiculo.modelo}</p>
      <p className="gris-claro">{vehiculo.tipo}</p>
      <p className="dest-placa">Placa: {vehiculo.placa}</p>
    </div>
  );
}
