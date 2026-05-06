import type { Persona, Ciudad, DatosGrafo, NodoGrafo, AristaGrafo } from '../tipos';

export class Grafo {
  private personas: Map<string, Persona> = new Map();
  private ciudades: Map<string, Ciudad> = new Map();
  private amistades: Set<string> = new Set();

  agregarCiudad(id: string, nombre: string): boolean {
    if (this.ciudades.has(id)) return false;
    this.ciudades.set(id, { id, nombre });
    return true;
  }

  agregarPersona(id: string, nombre: string, edad: number, ciudadId: string): boolean {
    if (this.personas.has(id) || !this.ciudades.has(ciudadId)) return false;
    this.personas.set(id, { id, nombre, edad, ciudadId });
    return true;
  }

  conectarAmigos(idPersona1: string, idPersona2: string): boolean {
    if (!this.personas.has(idPersona1) || !this.personas.has(idPersona2)) return false;
    const clave = [idPersona1, idPersona2].sort().join('-');
    if (this.amistades.has(clave)) return false;
    this.amistades.add(clave);
    return true;
  }

  obtenerPersonasPorCiudad(ciudadId: string): Persona[] {
    return Array.from(this.personas.values()).filter(p => p.ciudadId === ciudadId);
  }

  aFormatoGrafo(): DatosGrafo {
    const nodos: NodoGrafo[] = [];
    const aristas: AristaGrafo[] = [];

    this.ciudades.forEach((ciudad) => {
      nodos.push({ id: ciudad.id, label: ciudad.nombre, tipo: 'ciudad' });
    });

    this.personas.forEach((persona) => {
      nodos.push({ id: persona.id, label: persona.nombre, tipo: 'persona', edad: persona.edad });
      aristas.push({ source: persona.id, target: persona.ciudadId, tipo: 'residencia' });
    });

    this.amistades.forEach((amistad) => {
      const [id1, id2] = amistad.split('-');
      aristas.push({ source: id1, target: id2, tipo: 'amistad' });
    });

    return { nodes: nodos, links: aristas };
  }

  obtenerEstadisticas(): void {
    console.log('\nEstadisticas del grafo:');
    console.log(`Ciudades: ${this.ciudades.size}`);
    console.log(`Personas: ${this.personas.size}`);
    console.log(`Amistades: ${this.amistades.size}`);
  }

  obtenerTodasPersonas(): Persona[] {
    return Array.from(this.personas.values());
  }
}
