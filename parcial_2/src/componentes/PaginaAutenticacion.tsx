import React, { useState } from 'react';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import './PaginaAutenticacion.css';

interface PaginaAutenticacionProps {
  onAutenticado?: () => void;
}

export function PaginaAutenticacion({ onAutenticado }: PaginaAutenticacionProps) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const { login, registro } = useAutenticacion();

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (esRegistro) {
        if (!displayName.trim()) {
          throw new Error('Por favor ingresa tu nombre');
        }
        await registro(email, password, displayName);
      } else {
        await login(email, password);
      }
      onAutenticado?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en autenticación');
    } finally {
      setCargando(false);
    }
  };

  const cambiarModo = () => {
    setError('');
    setEmail('');
    setPassword('');
    setDisplayName('');
    setEsRegistro(!esRegistro);
  };

  return (
    <div className="pagina-autenticacion">
      <div className="contenedor-forma">
        <div className="forma-header">
          <h1>Gestor de Archivos</h1>
          <h2>{esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
        </div>

        {error && <div className="error-mensaje">{error}</div>}

        <form onSubmit={manejarSubmit}>
          {esRegistro && (
            <div className="form-grupo">
              <label htmlFor="displayName">Nombre Completo</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tu nombre"
                disabled={cargando}
                required
              />
            </div>
          )}

          <div className="form-grupo">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              disabled={cargando}
              required
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              disabled={cargando}
              required
            />
          </div>

          <button type="submit" disabled={cargando} className="boton-submit">
            {cargando ? 'Procesando...' : esRegistro ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="cambiar-modo">
          <p>
            {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
            <button type="button" onClick={cambiarModo} disabled={cargando} className="boton-enlace">
              {esRegistro ? 'Inicia sesión' : 'Regístrate'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
