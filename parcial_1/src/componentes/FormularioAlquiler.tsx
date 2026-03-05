import { useState } from 'react';
import { Vehiculo } from '../tipos';

interface Props {
  vehiculos: Vehiculo[];
  alAlquilar: (id: string, nombre: string, costo: number) => void;
}

export default function FormularioAlquiler({ vehiculos, alAlquilar }: Props) {
  const [idV, setIdV] = useState('');
  const [nombre, setNombre] = useState('');
  const [costo, setCosto] = useState('');

  function enviar(e: React.FormEvent) {
    e.preventDefault();

    if (idV === '' || nombre === '' || costo === '') {
      alert('Llena todos los campos por favor');
      return;
    }

    let costoNum = parseFloat(costo);
    alAlquilar(idV, nombre, costoNum);

    setIdV('');
    setNombre('');
    setCosto('');
  }

  if (vehiculos.length === 0) {
     return <p className="vacio">No hay vehículos para alquilar</p>;
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <label>Vehículo:</label>
      <select value={idV} onChange={e => setIdV(e.target.value)} className="entrada">
        <option value="">-- Elige --</option>
        {vehiculos.map(v => (
          <option key={v.id} value={v.id}>{v.marca} {v.modelo} ({v.placa})</option>
        ))}
      </select>

      <label>Cliente:</label>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Juan" className="entrada" />

      <label>Costo ($):</label>
      <input type="number" value={costo} onChange={e => setCosto(e.target.value)} placeholder="150" className="entrada" min="0" />

      <button type="submit" className="boton principal">Alquilar</button>
    </form>
  );
}
