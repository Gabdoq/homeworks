import { Inversionista } from '../tipos';

export default function ListaInversionistas({ inversionistas }: { inversionistas: Inversionista[] }) {
  if (!inversionistas.length) return <p className="vacio">Sin inversionistas</p>;

  const total = inversionistas.reduce((s, i) => s + i.montoInversion, 0);

  return (
    <div>
      <p className="resumen"><strong>Total invertido: ${total.toLocaleString()}</strong></p>
      <div className="lista">
        {inversionistas.map(inv => (
          <div key={inv.id} className="tarjeta">
            <div>
              <p><strong>{inv.nombre}</strong></p>
              <p className="gris">${inv.montoInversion.toLocaleString()} — desde {inv.fechaIngreso.toLocaleDateString()}</p>
            </div>
            <span className="etiqueta dorada">Inversor</span>
          </div>
        ))}
      </div>
    </div>
  );
}
