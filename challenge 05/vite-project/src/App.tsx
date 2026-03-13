import { useState } from 'react';
import { Cola } from './estructuras/Cola';
import type { Persona } from './tipos';
import { datosIniciales, generarId } from './tipos';
import FormularioPersona from './componentes/FormularioPersona';
import ColaCajero from './componentes/ColaCajero';
import './App.css';

function construirColaInicial(): Cola<Persona> {
  const cola = new Cola<Persona>();
  const ordenados = [...datosIniciales]
    .map(d => ({ ...d, id: generarId() }))
    .sort((a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime());
  ordenados.forEach(p => cola.encolar(p));
  return cola;
}

function App() {
  const [cola] = useState<Cola<Persona>>(construirColaInicial);
  const [personas, setPersonas] = useState<Persona[]>(() => cola.obtenerTodos());

  function sincronizar() {
    setPersonas([...cola.obtenerTodos()]);
  }

  function agregarPersona(nombre: string, monto: number) {
    const nueva: Persona = {
      id: generarId(),
      nombre,
      montoRetiro: monto,
      fechaLlegada: new Date(),
    };

    // Insertar en la posición correcta según fechaLlegada
    const todos = cola.obtenerTodos();
    const colaTemp = new Cola<Persona>();

    let insertada = false;
    for (const p of todos) {
      if (!insertada && nueva.fechaLlegada <= p.fechaLlegada) {
        colaTemp.encolar(nueva);
        insertada = true;
      }
      colaTemp.encolar(p);
    }
    if (!insertada) colaTemp.encolar(nueva);

    // Vaciar y reconstruir la cola interna
    while (!cola.estaVacia()) cola.desencolar();
    colaTemp.obtenerTodos().forEach(p => cola.encolar(p));

    sincronizar();
  }

  function atenderPrimero() {
    cola.desencolar();
    sincronizar();
  }

  return (
    <div className="contenedor">
      <header className="encabezado">
        <h1 className="titulo">Cola ATM</h1>
        <p className="subtitulo">Gestión de turnos en cajero automático</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-num">{personas.length}</span>
            <span>En cola</span>
          </div>
          {personas[0] && (
            <div className="stat">
              <span className="stat-num">{personas[0].nombre.split(' ')[0]}</span>
              <span>En turno</span>
            </div>
          )}
        </div>
      </header>

      <div className="layout">
        <section className="panel">
          <FormularioPersona alAgregar={agregarPersona} />
          {!cola.estaVacia() && (
            <button onClick={atenderPrimero} className="boton secundario">
              Atender siguiente
            </button>
          )}
        </section>

        <section className="panel">
          <h2 className="panel-titulo">Cola ordenada por llegada</h2>
          <ColaCajero personas={personas} />
        </section>
      </div>
    </div>
  );
}

export default App;
