import React from 'react';
import type { ElementoMenu } from '../tipos';
import './AreaContenido.css';

interface AreaContenidoProps {
  elementoSeleccionado: ElementoMenu | null;
}

export const AreaContenido: React.FC<AreaContenidoProps> = ({ elementoSeleccionado }) => {
  if (!elementoSeleccionado || elementoSeleccionado.id === 'raiz') {
    return (
      <div className="area-contenido">
        <div className="mensaje-bienvenida">
          <h1>Bienvenido</h1>
          <p>Selecciona un elemento del menú para ver su contenido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="area-contenido">
      <div className="encabezado-contenido">
        <h2>{elementoSeleccionado.titulo}</h2>
        <p className="ruta-contenido">{elementoSeleccionado.enlace}</p>
      </div>
      <div className="cuerpo-contenido">
        <div className="marcador-componente">
          {elementoSeleccionado.componente ? (
            <elementoSeleccionado.componente />
          ) : (
            <div className="componente-predeterminado">
              <h3>{elementoSeleccionado.titulo}</h3>
              <p>Contenido para: <code>{elementoSeleccionado.enlace}</code></p>
              <p className="id-menu">ID: <strong>{elementoSeleccionado.id}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
