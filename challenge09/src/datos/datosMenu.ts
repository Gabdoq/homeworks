import type { ElementoMenu } from '../tipos';

// Datos del menú en estructura de árbol N-ario
export const datosMenu: ElementoMenu = {
  id: 'raiz',
  titulo: 'Menú Principal',
  enlace: '/',
  hijos: [
    {
      id: 'perfil',
      titulo: 'Perfil',
      enlace: '/perfil',
      hijos: [
        {
          id: 'mensajes',
          titulo: 'Mensajes',
          enlace: '/perfil/mensajes',
          hijos: [
            {
              id: 'mensajes-entrada',
              titulo: 'Entrada',
              enlace: '/perfil/mensajes/entrada'
            },
            {
              id: 'mensajes-salida',
              titulo: 'Salida',
              enlace: '/perfil/mensajes/salida'
            }
          ]
        },
        {
          id: 'configuracion',
          titulo: 'Configuración',
          enlace: '/perfil/configuracion',
          hijos: [
            {
              id: 'config-cuenta',
              titulo: 'Cuenta',
              enlace: '/perfil/configuracion/cuenta'
            },
            {
              id: 'config-privacidad',
              titulo: 'Privacidad & Seguridad',
              enlace: '/perfil/configuracion/privacidad'
            }
          ]
        }
      ]
    },
    {
      id: 'notificaciones',
      titulo: 'Notificaciones',
      enlace: '/notificaciones',
      hijos: [
        {
          id: 'notificaciones-nuevas',
          titulo: 'Nuevas',
          enlace: '/notificaciones/nuevas'
        },
        {
          id: 'notificaciones-leidas',
          titulo: 'Leídas',
          enlace: '/notificaciones/leidas'
        }
      ]
    },
    {
      id: 'ayuda',
      titulo: 'Ayuda',
      enlace: '/ayuda',
      hijos: [
        {
          id: 'faq',
          titulo: 'Preguntas Frecuentes',
          enlace: '/ayuda/faq'
        },
        {
          id: 'soporte',
          titulo: 'Soporte',
          enlace: '/ayuda/soporte'
        },
        {
          id: 'manual',
          titulo: 'Manual',
          enlace: '/ayuda/manual'
        }
      ]
    },
    {
      id: 'logout',
      titulo: 'Cerrar Sesión',
      enlace: '/logout'
    }
  ]
};
