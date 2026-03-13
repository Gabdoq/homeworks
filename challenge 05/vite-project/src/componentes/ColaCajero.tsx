import type { Persona } from '../tipos';

interface Props {
  personas: Persona[];
}

export default function ColaCajero({ personas }: Props) {
  if (personas.length === 0) {
    return <p className="vacio">La cola está vacía</p>;
  }

  return (
    <div className="cola-lista">
      {personas.map((p, index) => (
        <div key={p.id} className={`tarjeta ${index === 0 ? 'tarjeta-frente' : ''}`}>
          <div className="tarjeta-posicion">{index + 1}</div>
          <div className="tarjeta-info">
            <p className="tarjeta-nombre">{p.nombre}</p>
            <p className="tarjeta-detalle">${p.montoRetiro.toLocaleString()} — llegó a las {p.fechaLlegada.toLocaleTimeString()}</p>
          </div>
          {index === 0 && <span className="etiqueta-frente">En turno</span>}
        </div>
      ))}
    </div>
  );
}
