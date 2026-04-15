import { useContext } from 'react';
import { AuthContext } from '../contextos/ContextoAutenticacion';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};
