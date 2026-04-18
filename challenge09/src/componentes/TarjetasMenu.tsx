import React, { useState } from 'react';
import type { ElementoMenu, NodoArbolN } from '../tipos';
import { ArbolN } from '../datos/ArbolN';
import './TarjetasMenu.css';

interface TarjetasMenuProps {
  arbolMenu: ArbolN;
  elementoSeleccionado: ElementoMenu | null;
  alSeleccionar?: (elemento: ElementoMenu) => void;
}

export const TarjetasMenu: React.FC<TarjetasMenuProps> = ({
  arbolMenu,
  elementoSeleccionado,
  alSeleccionar
}) => {
  const [nodosExpandidos, setNodosExpandidos] = useState<Set<string>>(
    new Set(['raiz'])
  );

  const alternarNodo = (idNodo: string) => {
    const nuevosExpandidos = new Set(nodosExpandidos);
    if (nuevosExpandidos.has(idNodo)) {
      nuevosExpandidos.delete(idNodo);
    } else {
      nuevosExpandidos.add(idNodo);
    }
    setNodosExpandidos(nuevosExpandidos);
  };

  const renderizarTarjeta = (nodo: NodoArbolN): JSX.Element => {
    const tienehijos = nodo.hijos.length > 0;
    const estaExpandido = nodosExpandidos.has(nodo.datos.id);
    const esRaiz = nodo.datos.id === 'raiz';
    const esSeleccionado = elementoSeleccionado?.id === nodo.datos.id;

    return (
      <div key={nodo.datos.id} className="contenedor-tarjeta">
        <div
          className={`tarjeta-menu ${estaExpandido ? 'expandida' : ''} ${
            esSeleccionado ? 'seleccionada' : ''
          } ${esRaiz ? 'tarjeta-raiz' : ''}`}
        >
          <div className="encabezado-tarjeta">
            {tienehijos && (
              <button
                className="boton-expandir"
                onClick={() => alternarNodo(nodo.datos.id)}
                aria-expanded={estaExpandido}
                title={estaExpandido ? 'Contraer' : 'Expandir'}
              >
                <span className="icono-flecha">{estaExpandido ? '▼' : '▶'}</span>
              </button>
            )}
            {!tienehijos && <span className="espacio-flecha"></span>}

            <button
              className="boton-contenido-tarjeta"
              onClick={() => alSeleccionar?.(nodo.datos)}
            >
              <span className="titulo-tarjeta">{nodo.datos.titulo}</span>
              {tienehijos && <span className="contador-hijos">{nodo.hijos.length}</span>}
            </button>
          </div>

          {tienehijos && estaExpandido && (
            <div className="contenedor-subjetos">
              {nodo.hijos.map((hijo) => renderizarTarjeta(hijo))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="tarjetas-menu">
      {renderizarTarjeta(arbolMenu.raiz)}
    </div>
  );
};
