import { useState } from 'react';
import type { NodoArbol } from '../tipos';
import { useArbol } from '../contextos/ContextoArbol';
import { Nodo } from './Nodo';
import './VisualizacionArbol.css';

interface VisualizacionArbolProps {
  onSeleccionar?: (nodo: NodoArbol) => void;
}

export function VisualizacionArbol({ onSeleccionar }: VisualizacionArbolProps) {
  const { datosArbol } = useArbol();
  const [nodoSeleccionado, setNodoSeleccionado] = useState<NodoArbol | null>(null);

  const manejarSeleccionar = (nodo: NodoArbol) => {
    setNodoSeleccionado(nodo);
    if (onSeleccionar) {
      onSeleccionar(nodo);
    }
  };

  if (datosArbol.cargando) {
    return <div className="cargando">Cargando estructura...</div>;
  }

  if (datosArbol.error) {
    return <div className="error">{datosArbol.error}</div>;
  }

  return (
    <div className="visualizacion-arbol">
      <div className="arbol-header">
        <h2>Mi Estructura de Archivos</h2>
      </div>

      <div className="arbol-contenedor">
        <Nodo
          nodo={datosArbol.raiz}
          nivel={0}
          onSeleccionar={manejarSeleccionar}
          seleccionado={nodoSeleccionado?.id === datosArbol.raiz.id}
        />
      </div>

      {nodoSeleccionado && (
        <div className="detalles-nodo">
          <h3>Detalles del Nodo Seleccionado</h3>
          <div className="detalle-item">
            <strong>Nombre:</strong> {nodoSeleccionado.nombre}
          </div>
          <div className="detalle-item">
            <strong>Tipo:</strong> {nodoSeleccionado.tipo === 'carpeta' ? 'Carpeta' : 'Archivo'}
          </div>
          <div className="detalle-item">
            <strong>Creado por:</strong> {nodoSeleccionado.creadoPor}
          </div>
          <div className="detalle-item">
            <strong>Fecha de creación:</strong> {new Date(nodoSeleccionado.fechaCreacion).toLocaleString()}
          </div>
          {nodoSeleccionado.hijos && nodoSeleccionado.hijos.length > 0 && (
            <div className="detalle-item">
              <strong>Elementos dentro:</strong> {nodoSeleccionado.hijos.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
