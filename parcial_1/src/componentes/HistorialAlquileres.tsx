import { Alquiler } from '../tipos';

interface Props {
  alquileres: Alquiler[];
  alDevolver: (id: string) => void;
}

export default function HistorialAlquileres({ alquileres, alDevolver }: Props) {
  if (!alquileres.length) return <p className="vacio">Sin alquileres aún</p>;

  return (
    <div className="lista">
      {alquileres.map(a => (
        <div key={a.id} className="tarjeta">
          <div>
            <p><strong>{a.vehiculo.marca} {a.vehiculo.modelo}</strong></p>
            <p className="gris">{a.vehiculo.placa} — {a.nombreCliente}</p>
            <p className="gris">{a.fechaAlquiler.toLocaleDateString()} — ${a.costo.toFixed(2)}</p>
            {a.fechaDevolucion && <p className="gris">Devuelto: {a.fechaDevolucion.toLocaleDateString()}</p>}
          </div>
          {!a.fechaDevolucion
            ? <button onClick={() => alDevolver(a.id)} className="boton verde chico">Devolver</button>
            : <span className="etiqueta azul">Devuelto</span>
          }
        </div>
      ))}
    </div>
  );
}
