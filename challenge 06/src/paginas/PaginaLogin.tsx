import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';
import { CredencialesLogin } from '../tipos';
import '../css/LoginPage.css';

/**
 * Página de login con validación de credenciales.
 * Proporciona interfaz para autenticación de usuarios.
 */
export default function PaginaLogin() {
  const navigate = useNavigate();
  const { iniciarSesion, cargando, error } = useAutenticacion();
  const [credenciales, setCredenciales] = useState<CredencialesLogin>({
    correo: '',
    contraseña: '',
  });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredenciales(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await iniciarSesion(credenciales);
    navigate('/');
  };

  return (
    <div className="contenedor-login">
      <div className="fondo-gradiente-1"></div>
      <div className="fondo-gradiente-2"></div>

      <div className="tarjeta-login">
        <div className="header-login">
          <h1>Acceso</h1>
          <p className="subtitulo">Sistema de Autenticación Challenge 06</p>
        </div>

        <form onSubmit={manejarSubmit} className="formulario-login">
          <div className="grupo-campo">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              type="email"
              name="correo"
              value={credenciales.correo}
              onChange={manejarCambio}
              placeholder="user@mail.com"
              required
              disabled={cargando}
              className="input-login"
            />
          </div>

          <div className="grupo-campo">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              value={credenciales.contraseña}
              onChange={manejarCambio}
              placeholder="123"
              required
              disabled={cargando}
              className="input-login"
            />
          </div>

          {error && (
            <div className="alerta-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className={`boton-login ${cargando ? 'cargando' : ''}`}
          >
            {cargando ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>

        <div className="credenciales-demo">
          <p className="etiqueta-demo">Credenciales de prueba:</p>
          <code>user@mail.com / 123</code>
        </div>
      </div>
    </div>
  );
}
