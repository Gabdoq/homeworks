import { useState } from 'react';
import type { NodoArbol } from '../tipos';
import { useArbol } from '../contextos/ContextoArbol';
import './FormularioCrear.css';

interface FormularioCrearProps {
  nodoSeleccionado: NodoArbol | null;
}

export function FormularioCrear({ nodoSeleccionado }: FormularioCrearProps) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState<'carpeta' | 'archivo'>('carpeta');
  const { agregarNodo, datosArbol } = useArbol();

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nodoSeleccionado) {
      alert('Por favor selecciona una carpeta padre');
      return;
    }

    if (nodoSeleccionado.tipo === 'archivo') {
      alert('No se pueden agregar elementos dentro de un archivo');
      return;
    }

    if (!nombre.trim()) {
      alert('Por favor ingresa un nombre');
      return;
    }

    const resultado = agregarNodo(nodoSeleccionado.id, nombre.trim(), tipo);

    if (resultado) {
      setNombre('');
      setTipo('carpeta');
    }
  };

  return (
    <div className="formulario-crear">
      <h3>Crear nuevo elemento</h3>

      {datosArbol.error && <div className="error-mensaje">{datosArbol.error}</div>}

      {!nodoSeleccionado ? (
        <div className="advertencia">Selecciona una carpeta para crear un nuevo elemento</div>
      ) : nodoSeleccionado.tipo === 'archivo' ? (
        <div className="error-mensaje">Los archivos no pueden contener elementos</div>
      ) : (
        <form onSubmit={manejarSubmit}>
          <div className="form-grupo">
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del archivo o carpeta"
              disabled={datosArbol.cargando}
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'carpeta' | 'archivo')}
              disabled={datosArbol.cargando}
            >
              <option value="carpeta">Carpeta</option>
              <option value="archivo">Archivo</option>
            </select>
          </div>

          <button type="submit" disabled={datosArbol.cargando}>
            {datosArbol.cargando ? 'Creando...' : 'Crear'}
          </button>
        </form>
      )}

      {nodoSeleccionado && (
        <div className="info-seleccionado">
          <p>
            <strong>Ubicación actual:</strong> {nodoSeleccionado.nombre}
          </p>
          <p className="tipo">
            <strong>Tipo:</strong> {nodoSeleccionado.tipo === 'carpeta' ? 'Carpeta' : 'Archivo'}
          </p>
        </div>
      )}
    </div>
  );
}
