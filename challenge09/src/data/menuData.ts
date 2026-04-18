import type { MenuItem } from '../types';

// Datos del menú en estructura de árbol N-ario
export const menuData: MenuItem = {
  id: 'root',
  title: 'Menu',
  link: '/',
  children: [
    {
      id: 'perfil',
      title: 'Perfil',
      link: '/perfil',
      children: [
        {
          id: 'mensajes',
          title: 'Mensajes',
          link: '/perfil/mensajes',
          children: [
            {
              id: 'mensajes-entrada',
              title: 'Entrada',
              link: '/perfil/mensajes/entrada'
            },
            {
              id: 'mensajes-salida',
              title: 'Salida',
              link: '/perfil/mensajes/salida'
            }
          ]
        },
        {
          id: 'configuracion',
          title: 'Configuración',
          link: '/perfil/configuracion',
          children: [
            {
              id: 'config-cuenta',
              title: 'Cuenta',
              link: '/perfil/configuracion/cuenta'
            },
            {
              id: 'config-privacidad',
              title: 'Privacidad & Seguridad',
              link: '/perfil/configuracion/privacidad'
            }
          ]
        }
      ]
    },
    {
      id: 'notificaciones',
      title: 'Notificaciones',
      link: '/notificaciones',
      children: [
        {
          id: 'notificaciones-nuevas',
          title: 'Nuevas',
          link: '/notificaciones/nuevas'
        },
        {
          id: 'notificaciones-leidas',
          title: 'Leídas',
          link: '/notificaciones/leidas'
        }
      ]
    },
    {
      id: 'ayuda',
      title: 'Ayuda',
      link: '/ayuda',
      children: [
        {
          id: 'faq',
          title: 'Preguntas Frecuentes',
          link: '/ayuda/faq'
        },
        {
          id: 'soporte',
          title: 'Soporte',
          link: '/ayuda/soporte'
        },
        {
          id: 'manual',
          title: 'Manual',
          link: '/ayuda/manual'
        }
      ]
    },
    {
      id: 'logout',
      title: 'Logout',
      link: '/logout'
    }
  ]
};
