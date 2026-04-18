import React from 'react';
import type { ElementoMenu } from '../tipos';
import './Navegador.css';

interface NavegadorProps {
  ruta: ElementoMenu[];
  alHacerClic?: (elemento: ElementoMenu) => void;
}

export const Navegador: React.FC<NavegadorProps> = ({ ruta, alHacerClic }) => {
  return (
    <nav className="navegador">
      <div className="contenedor-navegador">
        {ruta.map((elemento, indice) => (
          <React.Fragment key={elemento.id}>
            <button
              className={`boton-navegador ${indice === ruta.length - 1 ? 'activo' : ''}`}
              onClick={() => alHacerClic?.(elemento)}
            >
              {elemento.titulo}
            </button>
            {indice < ruta.length - 1 && <span className="separador">/</span>}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};
