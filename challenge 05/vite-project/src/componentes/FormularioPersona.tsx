import { useState } from 'react';

interface Props {
  alAgregar: (nombre: string, monto: number) => void;
}

export default function FormularioPersona({ alAgregar }: Props) {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !monto) {
      alert('Completa todos los campos');
      return;
    }
    const montoNum = parseFloat(monto);
    if (montoNum <= 0) {
      alert('El monto debe ser mayor a 0');
      return;
    }
    alAgregar(nombre.trim(), montoNum);
    setNombre('');
    setMonto('');
  }

  return (
    <form onSubmit={enviar} className="formulario">
      <h2 className="form-titulo">Agregar persona a la cola</h2>

      <label>Nombre:</label>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Ej: Juan Pérez"
        className="entrada"
      />

      <label>Monto a retirar ($):</label>
      <input
        type="number"
        value={monto}
        onChange={e => setMonto(e.target.value)}
        placeholder="Ej: 300"
        className="entrada"
        min="1"
      />

      <button type="submit" className="boton">Unirse a la cola</button>
    </form>
  );
}
