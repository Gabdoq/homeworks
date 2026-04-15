import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface RoutaPrivadaProps {
  children: React.ReactNode;
}

export const RoutaPrivada: React.FC<RoutaPrivadaProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};
