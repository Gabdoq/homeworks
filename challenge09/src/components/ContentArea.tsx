import React from 'react';
import type { MenuItem } from '../types';
import './ContentArea.css';

interface ContentAreaProps {
  selectedItem: MenuItem | null;
}

export const ContentArea: React.FC<ContentAreaProps> = ({ selectedItem }) => {
  if (!selectedItem) {
    return (
      <div className="content-area">
        <div className="welcome-message">
          <h1>Bienvenido</h1>
          <p>Selecciona un elemento del menú para ver su contenido</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="content-header">
        <h2>{selectedItem.title}</h2>
        <p className="breadcrumb">{selectedItem.link}</p>
      </div>
      <div className="content-body">
        <div className="component-placeholder">
          {selectedItem.component ? (
            <selectedItem.component />
          ) : (
            <div className="default-component">
              <h3>{selectedItem.title}</h3>
              <p>Componente para: {selectedItem.link}</p>
              <p className="menu-id">ID: {selectedItem.id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
