# Challenge 04 — Sistema de Turnos

Aplicación React 19 + TypeScript con Vite que simula un sistema de turnos circular (para banco, clínica, etc.) con estética profesional y minimalista.

## 🎨 Paleta de Colores Premium

- **Primario:** #2563EB (Azul)
- **Secundario:** #7C3AED (Púrpura)
- **Éxito:** #10B981 (Verde)
- **Error:** #EF4444 (Rojo)
- **Fondo:** #F9FAFB (Gris claro)

## ✅ Características Implementadas

- ✅ Agregar nuevos turnos a la lista (componente hijo `AddTurnForm` con props)
- ✅ Botón "Siguiente" avanza el turno con comportamiento circular
- ✅ `useEffect` muestra mensajes breves cuando la cola cambia
- ✅ Interfaz premium minimalista con gradientes y animaciones suaves
- ✅ Sistema de diseño con variables CSS y escala tipográfica profesional
- ✅ Comentarios en español en todo el código
- ✅ Estructura modular con carpetas: `components/`, `pages/`, `assets/`
- ✅ Configuración TypeScript avanzada (tsconfig.app.json + tsconfig.node.json)
- ✅ ESLint completo con reglas de React y TypeScript
- ✅ Responsive design (móvil, tablet, desktop)
- ✅ Accesibilidad mejorada

## 📁 Estructura del Proyecto

```
challenge 04/vite-project/
├── src/
│   ├── components/
│   │   ├── AddTurnForm.tsx     # Formulario para agregar turnos
│   │   └── Turner.tsx           # Componente principal del sistema
│   ├── pages/
│   │   └── TurnerPage.tsx       # Página del sistema de turnos
│   ├── assets/                  # Recursos estáticos
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales (paleta CSS)
├── public/                      # Archivos públicos estáticos
├── index.html
├── package.json
├── tsconfig.json               # Referencias a tsconfig.app y tsconfig.node
├── tsconfig.app.json           # Config para código de app
├── tsconfig.node.json          # Config para Vite y herramientas
├── vite.config.ts
├── eslint.config.js
├── .gitignore
└── README.md
```

## 🚀 Inicio Rápido

```bash
cd "challenge 04/vite-project"
npm install
npm run dev
```

Abre **http://localhost:5173** en tu navegador.

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo con HMR
npm run build    # Compila y construye para producción
npm run lint     # Ejecuta ESLint
npm run preview  # Previewiza la build de producción
```

## 🎯 Características del Sistema

1. **Agregar Turnos:** Input + botón "Agregar"
2. **Avanzar Turnos:** Botón "Siguiente" con comportamiento circular
3. **Turnos Actuales:** Display de quién tiene el turno (destacado)
4. **Mensajes:** useEffect notifica cambios en la cola
5. **Eliminar Turnos:** Botón "Eliminar" por turno

---

**Desarrollado con:** React 19 • TypeScript 5.9 • Vite 7 • ESLint 9
