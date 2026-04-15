import { useContext } from 'react';
import { TareasContext } from '../contextos/ContextoTareas';

export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error('useTareas debe ser utilizado dentro de TareasProvider');
  }
  return context;
};
