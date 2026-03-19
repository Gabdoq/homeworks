/**
 * Tipos y interfaces para el sistema de autenticación
 */

export interface CredencialesLogin {
  correo: string;
  contraseña: string;
}

export interface UsuarioAutenticado {
  id: number;
  nombre: string;
  correo: string;
  rolDescripcion?: string;
}

export interface EstadoAutenticacion {
  estaAutenticado: boolean;
  usuario: UsuarioAutenticado | null;
  cargando: boolean;
  error: string | null;
}
