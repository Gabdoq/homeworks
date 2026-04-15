# Challenge 07 - Task Manager con Firebase

Una aplicación de gestión de tareas construida con React, TypeScript, Firebase y Vite.

## Características

✅ **Autenticación con Firebase**
- Login / Register con email y contraseña
- Logout
- Rutas privadas para usuarios autenticados

✅ **Gestor de Tareas**
- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas

✅ **Contextos Global**
- `ContextoAutenticacion`: Maneja la autenticación del usuario
- `ContextoTareas`: Maneja el estado de las tareas

✅ **Custom Hooks**
- `useAuth()`: Hook para acceder al contexto de autenticación
- `useTareas()`: Hook para acceder al contexto de tareas

✅ **Diseño Limpio**
- CSS sencillo sin frameworks
- Diseño responsivo
- Interfaz intuitiva

## Instalación

1. Clonar o descargar el proyecto
2. Instalar dependencias:
```bash
npm install
```

3. Configurar Firebase:
   - Editar `src/contextos/ContextoAutenticacion.tsx`
   - Reemplazar `firebaseConfig` con tus credenciales de Firebase

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Build para Producción

```bash
npm run build
```

## Estructura del Proyecto

```
src/
├── contextos/
│   ├── ContextoAutenticacion.tsx    # Context de autenticación
│   ├── ContextoTareas.tsx           # Context de tareas
│   └── RoutaPrivada.tsx             # Componente para rutas protegidas
├── hooks/
│   ├── useAuth.ts                   # Hook para autenticación
│   └── useTareas.ts                 # Hook para tareas
├── paginas/
│   ├── LoginPage.tsx                # Página de login
│   ├── RegisterPage.tsx             # Página de registro
│   ├── TasksPage.tsx                # Página principal de tareas
│   ├── LoginPage.css
│   ├── RegisterPage.css
│   └── TasksPage.css
├── App.tsx                          # Componente raíz con router
├── App.css
├── main.tsx                         # Punto de entrada
├── index.css                        # Estilos globales
└── global.d.ts                      # Tipos globales
```

## Cómo Usar

1. **Registrarse**: Ve a `/register` y crea una cuenta
2. **Iniciar Sesión**: Ve a `/login` con tus credenciales
3. **Crear una Tarea**: Completa el formulario en la sección "Nueva Tarea"
4. **Editar una Tarea**: Haz clic en "Editar" en la tarea
5. **Marcar como Completada**: Marca el checkbox de la tarea
6. **Eliminar una Tarea**: Haz clic en "Eliminar"
7. **Cerrar Sesión**: Haz clic en "Cerrar Sesión" en la esquina superior derecha

## Tecnologías Utilizadas

- React 18
- TypeScript
- Firebase 10
- React Router DOM 6
- Vite
- CSS Puro

## Notas

- El contexto de tareas mantiene los datos en memoria (se perderán al recargar)
- Para persistencia, considera usar Firestore o localStorage
- Asegúrate de configurar las reglas de seguridad de Firebase antes de usar en producción
