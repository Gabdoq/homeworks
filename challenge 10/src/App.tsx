import { useState, useRef, useMemo } from 'react';
import { Grafo } from './estructuras/Grafo';
import VisualizadorGrafo from './componentes/VisualizadorGrafo';
import type { DatosGrafo } from './tipos';
// @ts-ignore
import './App.css';

function App() {
  function inicializarDatos(): Grafo {
    const nuevoGrafo = new Grafo();

    nuevoGrafo.agregarCiudad('bogota', 'Bogota');
    nuevoGrafo.agregarCiudad('medellin', 'Medellin');
    nuevoGrafo.agregarCiudad('cali', 'Cali');
    nuevoGrafo.agregarCiudad('barranquilla', 'Barranquilla');
    nuevoGrafo.agregarCiudad('cartagena', 'Cartagena');
    nuevoGrafo.agregarCiudad('santa_marta', 'Santa Marta');
    nuevoGrafo.agregarCiudad('bucaramanga', 'Bucaramanga');

    nuevoGrafo.agregarPersona('p1', 'Jose', 22, 'bogota');
    nuevoGrafo.agregarPersona('p2', 'Gabriel', 21, 'bogota');
    nuevoGrafo.agregarPersona('p3', 'Camelas', 23, 'medellin');
    nuevoGrafo.agregarPersona('p4', 'Pepito', 20, 'medellin');
    nuevoGrafo.agregarPersona('p5', 'Benito', 24, 'cali');
    nuevoGrafo.agregarPersona('p6', 'Laura', 22, 'cali');
    nuevoGrafo.agregarPersona('p7', 'Diego', 23, 'barranquilla');
    nuevoGrafo.agregarPersona('p8', 'Ana', 21, 'barranquilla');
    nuevoGrafo.agregarPersona('p9', 'Luis', 25, 'cartagena');
    nuevoGrafo.agregarPersona('p10', 'Patricia', 20, 'cartagena');
    nuevoGrafo.agregarPersona('p11', 'Miguel', 23, 'santa_marta');
    nuevoGrafo.agregarPersona('p12', 'Valentina', 22, 'santa_marta');
    nuevoGrafo.agregarPersona('p13', 'Felipe', 24, 'bucaramanga');
    nuevoGrafo.agregarPersona('p14', 'Camila', 21, 'bucaramanga');

    nuevoGrafo.conectarAmigos('p1', 'p2');
    nuevoGrafo.conectarAmigos('p3', 'p4');
    nuevoGrafo.conectarAmigos('p5', 'p6');
    nuevoGrafo.conectarAmigos('p7', 'p8');
    nuevoGrafo.conectarAmigos('p9', 'p10');
    nuevoGrafo.conectarAmigos('p11', 'p12');
    nuevoGrafo.conectarAmigos('p13', 'p14');
    
    nuevoGrafo.conectarAmigos('p1', 'p3');
    nuevoGrafo.conectarAmigos('p2', 'p4');
    nuevoGrafo.conectarAmigos('p3', 'p5');
    nuevoGrafo.conectarAmigos('p4', 'p6');
    nuevoGrafo.conectarAmigos('p5', 'p7');
    nuevoGrafo.conectarAmigos('p6', 'p8');
    nuevoGrafo.conectarAmigos('p7', 'p9');
    nuevoGrafo.conectarAmigos('p8', 'p10');
    nuevoGrafo.conectarAmigos('p1', 'p5');
    nuevoGrafo.conectarAmigos('p2', 'p6');
    nuevoGrafo.conectarAmigos('p3', 'p7');
    nuevoGrafo.conectarAmigos('p4', 'p8');
    nuevoGrafo.conectarAmigos('p1', 'p9');
    nuevoGrafo.conectarAmigos('p2', 'p10');
    nuevoGrafo.conectarAmigos('p5', 'p11');
    nuevoGrafo.conectarAmigos('p6', 'p12');
    nuevoGrafo.conectarAmigos('p7', 'p13');
    nuevoGrafo.conectarAmigos('p8', 'p14');

    nuevoGrafo.obtenerEstadisticas();
    return nuevoGrafo;
  }

  const grafoRef = useRef(inicializarDatos());
  const [datosGrafo, setDatosGrafo] = useState<DatosGrafo>(() => grafoRef.current.aFormatoGrafo());

  const [nuevaCiudadId, setNuevaCiudadId] = useState('');
  const [nuevaCiudadNombre, setNuevaCiudadNombre] = useState('');
  const [nuevaPersonaNombre, setNuevaPersonaNombre] = useState('');
  const [nuevaPersonaEdad, setNuevaPersonaEdad] = useState('');
  const [nuevaPersonaCiudad, setNuevaPersonaCiudad] = useState('');
  const [mostrarFormCiudad, setMostrarFormCiudad] = useState(false);
  const [mostrarFormPersona, setMostrarFormPersona] = useState(false);

  const manejadorAgregarCiudad = () => {
    if (nuevaCiudadId.trim() && nuevaCiudadNombre.trim()) {
      grafoRef.current.agregarCiudad(
        nuevaCiudadId.toLowerCase().replace(/\s+/g, '_'),
        nuevaCiudadNombre
      );
      setDatosGrafo(grafoRef.current.aFormatoGrafo());
      setNuevaCiudadId('');
      setNuevaCiudadNombre('');
      setMostrarFormCiudad(false);
    }
  };

  const manejadorAgregarPersona = () => {
    if (nuevaPersonaNombre.trim() && nuevaPersonaEdad.trim() && nuevaPersonaCiudad.trim()) {
      const personaId = 'p' + Math.random().toString(36).substr(2, 9);
      grafoRef.current.agregarPersona(
        personaId,
        nuevaPersonaNombre,
        parseInt(nuevaPersonaEdad),
        nuevaPersonaCiudad
      );
      setDatosGrafo(grafoRef.current.aFormatoGrafo());
      setNuevaPersonaNombre('');
      setNuevaPersonaEdad('');
      setNuevaPersonaCiudad('');
      setMostrarFormPersona(false);
    }
  };

  const ciudades = useMemo(() => 
    datosGrafo.nodes
      .filter((nodo) => nodo.tipo === 'ciudad')
      .map((nodo) => ({ id: nodo.id, nombre: nodo.label })),
    [datosGrafo]
  );

  const ciudadesConPersonas = useMemo(() => {
    const personas = grafoRef.current.obtenerTodasPersonas();
    const resultado: { [key: string]: { id: string; nombre: string; edad: number; ciudad: string }[] } = {};
    
    ciudades.forEach(ciudad => {
      resultado[ciudad.id] = [];
    });
    
    personas.forEach(persona => {
      const ciudadNombre = ciudades.find(c => c.id === persona.ciudadId)?.nombre || 'Desconocida';
      if (resultado[persona.ciudadId]) {
        resultado[persona.ciudadId].push({
          id: persona.id,
          nombre: persona.nombre,
          edad: persona.edad,
          ciudad: ciudadNombre
        });
      }
    });
    
    return Object.entries(resultado)
      .map(([ciudadId, personasList]) => {
        const ciudadNombre = ciudades.find(c => c.id === ciudadId)?.nombre || '';
        return { id: ciudadId, nombre: ciudadNombre, personas: personasList };
      })
      .sort((a, b) => b.personas.length - a.personas.length);
  }, [datosGrafo, ciudades]);

  return (
    <div className="aplicacion">
      <header className="panel-superior">
        <div className="formularios-container">
          <div className="formulario-agregar">
            <button
              className="boton-toggle"
              onClick={() => setMostrarFormCiudad(!mostrarFormCiudad)}
            >
              {mostrarFormCiudad ? 'Cerrar' : 'Agregar Ciudad'}
            </button>
            {mostrarFormCiudad && (
              <div className="formulario-contenido">
                <h4>Nueva Ciudad</h4>
                <input
                  type="text"
                  placeholder="ID de ciudad (ej: santa_rosa)"
                  value={nuevaCiudadId}
                  onChange={(e) => setNuevaCiudadId(e.target.value)}
                  className="input-form"
                />
                <input
                  type="text"
                  placeholder="Nombre de ciudad (ej: Santa Rosa)"
                  value={nuevaCiudadNombre}
                  onChange={(e) => setNuevaCiudadNombre(e.target.value)}
                  className="input-form"
                />
                <button onClick={manejadorAgregarCiudad} className="boton-agregar">
                  Agregar
                </button>
              </div>
            )}
          </div>

          <div className="formulario-agregar">
            <button
              className="boton-toggle"
              onClick={() => setMostrarFormPersona(!mostrarFormPersona)}
            >
              {mostrarFormPersona ? 'Cerrar' : 'Agregar Persona'}
            </button>
            {mostrarFormPersona && (
              <div className="formulario-contenido">
                <h4>Nueva Persona</h4>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nuevaPersonaNombre}
                  onChange={(e) => setNuevaPersonaNombre(e.target.value)}
                  className="input-form"
                />
                <input
                  type="number"
                  placeholder="Edad"
                  value={nuevaPersonaEdad}
                  onChange={(e) => setNuevaPersonaEdad(e.target.value)}
                  className="input-form"
                />
                <select
                  value={nuevaPersonaCiudad}
                  onChange={(e) => setNuevaPersonaCiudad(e.target.value)}
                  className="input-form"
                >
                  <option value="">-- Selecciona ciudad --</option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.id}>
                      {ciudad.nombre}
                    </option>
                  ))}
                </select>
                <button onClick={manejadorAgregarPersona} className="boton-agregar">
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="contenedor-principal">
        <aside className="sidebar">
          <div className="sidebar-content">
            <h3>Organización</h3>
            
            {ciudadesConPersonas.map((ciudad) => (
              <div key={ciudad.id} className="ciudad-seccion">
                <div className="ciudad-header">
                  <span className="ciudad-nombre">{ciudad.nombre}</span>
                  <span className="ciudad-count">({ciudad.personas.length})</span>
                </div>
                {ciudad.personas.length > 0 && (
                  <ul className="personas-por-ciudad">
                    {ciudad.personas.map((persona) => (
                      <li key={persona.id} className="persona-item">
                        {persona.nombre} • {persona.edad} años
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </aside>

        <main className="area-grafo">
          <VisualizadorGrafo datos={datosGrafo} />
        </main>
      </div>
    </div>
  );
}

export default App;
