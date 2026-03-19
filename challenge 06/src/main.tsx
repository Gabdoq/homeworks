import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './contextos/ContextoAutenticacion';
import { RoutaPrivada } from './contextos/RoutaPrivada';
import PaginaLogin from './paginas/PaginaLogin';
import PaginaInicio from './paginas/PaginaInicio';
import PaginaEjercicio1 from './paginas/PaginaEjercicio1';
import PaginaEjercicio2 from './paginas/PaginaEjercicio2';
import './css/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProveedorAutenticacion>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<PaginaLogin />} />

          {/* Rutas privadas */}
          <Route
            path="/"
            element={
              <RoutaPrivada>
                <PaginaInicio />
              </RoutaPrivada>
            }
          />
          <Route
            path="/ejercicio1"
            element={
              <RoutaPrivada>
                <PaginaEjercicio1 />
              </RoutaPrivada>
            }
          />
          <Route
            path="/ejercicio2"
            element={
              <RoutaPrivada>
                <PaginaEjercicio2 />
              </RoutaPrivada>
            }
          />

          {/* Fallback: redirigir a login si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ProveedorAutenticacion>
  </React.StrictMode>,
);
