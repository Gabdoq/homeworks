import { useState, useMemo } from 'react';
import { Navegador } from './componentes/Navegador';
import { TarjetasMenu } from './componentes/TarjetasMenu';
import { AreaContenido } from './componentes/AreaContenido';
import { ArbolN } from './datos/ArbolN';
import { datosMenu } from './datos/datosMenu';
import type { ElementoMenu } from './tipos';
import './App.css';

function App() {
  // Crear el árbol N-ario a partir de los datos de menú
  const arbolMenu = useMemo(() => {
    return ArbolN.desdeElementoMenu(datosMenu);
  }, []);

  // Estado para el elemento de menú seleccionado
  const [elementoSeleccionado, setElementoSeleccionado] = useState<ElementoMenu | null>(null);

  // Obtener la ruta actual
  const rutaActual = useMemo(() => {
    if (!elementoSeleccionado) {
      return [datosMenu];
    }
    return arbolMenu.obtenerRuta(elementoSeleccionado.id);
  }, [elementoSeleccionado, arbolMenu]);

  const manejarSeleccionMenu = (elemento: ElementoMenu) => {
    setElementoSeleccionado(elemento);
  };

  const manejarClic = (elemento: ElementoMenu) => {
    if (elemento.id !== 'raiz') {
      setElementoSeleccionado(elemento);
    } else {
      setElementoSeleccionado(null);
    }
  };

  return (
    <div className="aplicacion">
      <Navegador ruta={rutaActual} alHacerClic={manejarClic} />
      <div className="contenedor-principal">
        <div className="panel-menu">
          <TarjetasMenu
            arbolMenu={arbolMenu}
            elementoSeleccionado={elementoSeleccionado}
            alSeleccionar={manejarSeleccionMenu}
          />
        </div>
        <AreaContenido elementoSeleccionado={elementoSeleccionado} />
      </div>
    </div>
  );
}

export default App;
