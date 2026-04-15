import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contextos/ContextoAutenticacion';
import { TareasProvider } from './contextos/ContextoTareas';
import { RoutaPrivada } from './contextos/RoutaPrivada';
import { LoginPage } from './paginas/PaginaLogin';
import { RegisterPage } from './paginas/PaginaRegistro';
import { TasksPage } from './paginas/PaginaTareas';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TareasProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <RoutaPrivada>
                  <TasksPage />
                </RoutaPrivada>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </TareasProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
