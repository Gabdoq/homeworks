import { useState } from 'react';
import type { NodoArbol } from '../tipos';
import { useArbol } from '../contextos/ContextoArbol';
import './Nodo.css';

interface NodoProps {
  nodo: NodoArbol;
  nivel: number;
  onSeleccionar?: (nodo: NodoArbol) => void;
  seleccionado?: boolean;
}

export function Nodo({ nodo, nivel, onSeleccionar, seleccionado = false }: NodoProps) {
  const [expandido, setExpandido] = useState(true);
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nodo.nombre);
  const { eliminarNodo, renombrarNodo } = useArbol();

  const tieneHijos = nodo.hijos && nodo.hijos.length > 0;

  const handleEliminar = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de que deseas eliminar "${nodo.nombre}" y todo su contenido?`)) {
      eliminarNodo(nodo.id);
    }
  };

  const handleRenombrar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditando(true);
  };

  const handleGuardarRenombre = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (nuevoNombre.trim()) {
        renombrarNodo(nodo.id, nuevoNombre.trim());
        setEditando(false);
      }
    } else if (e.key === 'Escape') {
      setEditando(false);
      setNuevoNombre(nodo.nombre);
    }
  };

  const handleClick = () => {
    if (onSeleccionar) {
      onSeleccionar(nodo);
    }
  };

  return (
    <div className={`nodo nodo-${nodo.tipo} ${seleccionado ? 'seleccionado' : ''}`} style={{ marginLeft: `${nivel * 20}px` }}>
      <div className="nodo-contenedor" onClick={handleClick}>
        <div className="nodo-header">
          {tieneHijos && (
            <button
              className={`boton-expandir ${expandido ? 'expandido' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setExpandido(!expandido);
              }}
              aria-label={expandido ? 'Contraer' : 'Expandir'}
            >
              ▶
            </button>
          )}
          {!tieneHijos && <span className="espaciador"></span>}

          <span className={`icono icono-${nodo.tipo}`}>
            {nodo.tipo === 'carpeta' ? '[C]' : '[A]'}
          </span>

          {editando ? (
            <input
              type="text"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              onKeyDown={handleGuardarRenombre}
              onClick={(e) => e.stopPropagation()}
              autoFocus
              className="input-renombrar"
            />
          ) : (
            <span className="nombre">{nodo.nombre}</span>
          )}

          <div className="acciones">
            <button className="boton-accion boton-renombrar" onClick={handleRenombrar} title="Renombrar">
              [E]
            </button>
            {nodo.tipo === 'archivo' && (
              <span className="info-creador" title={`Creado por: ${nodo.creadoPor}`}>
                [i]
              </span>
            )}
            <button className="boton-accion boton-eliminar" onClick={handleEliminar} title="Eliminar">
              [X]
            </button>
          </div>
        </div>

        <div className="nodo-info">
          <small className="fecha">Creado: {new Date(nodo.fechaCreacion).toLocaleDateString()}</small>
          {nodo.creadoPor && <small className="creador">Por: {nodo.creadoPor}</small>}
        </div>
      </div>

      {tieneHijos && expandido && (
        <div className="nodo-hijos">
          {nodo.hijos?.map((hijo) => (
            <Nodo
              key={hijo.id}
              nodo={hijo}
              nivel={nivel + 1}
              onSeleccionar={onSeleccionar}
              seleccionado={seleccionado && hijo.id === nodo.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
