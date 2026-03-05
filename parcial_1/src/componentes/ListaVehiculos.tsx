import { Vehiculo } from '../tipos';

export default function ListaVehiculos({ vehiculos }: { vehiculos: Vehiculo[] }) {
  if (!vehiculos.length) return <p className="vacio">No hay vehículos disponibles</p>;

  return (
    <div className="lista">
      {vehiculos.map(v => (
        <div key={v.id} className="tarjeta">
          <div>
            <p><strong>{v.marca} {v.modelo}</strong></p>
            <p className="gris">{v.tipo} — {v.placa}</p>
          </div>

        </div>
      ))}
    </div>
  );
}
