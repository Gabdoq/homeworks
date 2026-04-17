import { useState, useCallback, useEffect } from 'react';
import { ArbolBinario } from './data/ArbolBinario';
import './App.css';
import TreeVisualization from './components/TreeVisualization';

function App() {
  const [arbol] = useState(() => new ArbolBinario());
  const [inputValue, setInputValue] = useState('');
  const [treeData, setTreeData] = useState<any>(null);
  const [preorden, setPreorden] = useState<number[]>([]);
  const [inorden, setInorden] = useState<number[]>([]);
  const [postorden, setPostorden] = useState<number[]>([]);
  const [buscarValor, setBuscarValor] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState<boolean | null>(
    null
  );
  const [mensaje, setMensaje] = useState('');

  // Cargar árbol inicial con números al montar el componente
  useEffect(() => {
    console.log('🌳 ============================================');
    console.log('🌳 CHALLENGE 08 - ÁRBOL BINARIO DE BÚSQUEDA');
    console.log('🌳 ============================================');
    
    const numerosIniciales = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 65];
    console.log(`\n📝 Insertando números iniciales: ${numerosIniciales.join(', ')}`);
    
    numerosIniciales.forEach((num) => arbol.insertar(num));
    
    setTreeData(arbol.convertirAEstructuraD3());
    setPreorden(arbol.preorden());
    setInorden(arbol.inorden());
    setPostorden(arbol.postorden());
    
    console.log('\n✅ Árbol inicial cargado correctamente\n');
  }, [arbol]);

  const actualizarVisualización = useCallback(() => {
    setTreeData(arbol.convertirAEstructuraD3());
    setPreorden(arbol.preorden());
    setInorden(arbol.inorden());
    setPostorden(arbol.postorden());
    setResultadoBusqueda(null);
  }, [arbol]);

  const handleInsertar = () => {
    const valor = parseInt(inputValue);
    if (isNaN(valor)) {
      setMensaje('❌ Por favor ingresa un número válido');
      setTimeout(() => setMensaje(''), 2000);
      return;
    }

    if (inputValue.trim() === '') {
      setMensaje('❌ El campo no puede estar vacío');
      setTimeout(() => setMensaje(''), 2000);
      return;
    }

    arbol.insertar(valor);
    setMensaje(`✅ Número ${valor} insertado correctamente`);
    setInputValue('');
    actualizarVisualización();

    setTimeout(() => setMensaje(''), 2000);
  };

  const handleBuscar = () => {
    if (buscarValor.trim() === '') {
      setMensaje('❌ Por favor ingresa un número para buscar');
      setTimeout(() => setMensaje(''), 2000);
      return;
    }

    const valor = parseInt(buscarValor);
    if (isNaN(valor)) {
      setMensaje('❌ Por favor ingresa un número válido para buscar');
      setTimeout(() => setMensaje(''), 2000);
      return;
    }

    const encontrado = arbol.buscar(valor);
    setResultadoBusqueda(encontrado);
  };

  const handleLimpiar = () => {
    arbol.limpiar();
    setTreeData(null);
    setPreorden([]);
    setInorden([]);
    setPostorden([]);
    setBuscarValor('');
    setResultadoBusqueda(null);
    setInputValue('');
    setMensaje('🗑️ Árbol limpiado correctamente');
    setTimeout(() => setMensaje(''), 2000);
  };

  const handleInsertarNumeros = () => {
    const numeros = [15, 55, 85, 5, 27];
    console.log(`\n📝 Insertando nuevos números: ${numeros.join(', ')}`);
    
    numeros.forEach((num) => arbol.insertar(num));
    setMensaje(`✅ Nuevos números agregados: ${numeros.join(', ')}`);
    actualizarVisualización();
    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div className="container">
      <h1>Challenge 08 - Árbol Binario de Búsqueda</h1>

      <div className="controls">
        <div className="input-group">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ingresa un número"
            onKeyPress={(e) => e.key === 'Enter' && handleInsertar()}
          />
          <button onClick={handleInsertar}>Insertar</button>
        </div>

        <div className="input-group">
          <input
            type="number"
            value={buscarValor}
            onChange={(e) => setBuscarValor(e.target.value)}
            placeholder="Número a buscar"
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
          />
          <button onClick={handleBuscar}>Buscar</button>
        </div>
      </div>

      {mensaje && <div className="mensaje">{mensaje}</div>}

      {resultadoBusqueda !== null && (
        <div className={`resultado-busqueda ${resultadoBusqueda ? 'encontrado' : 'no-encontrado'}`}>
          {resultadoBusqueda ? '✓ Valor encontrado' : '✗ Valor no encontrado'}
        </div>
      )}

      <div className="content">
        <div className="tree-section">
          <h2>Visualización del Árbol</h2>
          {treeData ? (
            <TreeVisualization data={treeData} />
          ) : (
            <div className="empty-tree">El árbol está vacío. Ingresa números para continuar</div>
          )}
        </div>

        <div className="traversals-section">
          <div className="traversal">
            <h3>Preorden (Raíz - Izq - Der)</h3>
            <div className="traversal-result">
              {preorden.length > 0 ? preorden.join(' → ') : 'Vacío'}
            </div>
          </div>

          <div className="traversal">
            <h3>Inorden (Izq - Raíz - Der)</h3>
            <div className="traversal-result">
              {inorden.length > 0 ? inorden.join(' → ') : 'Vacío'}
            </div>
          </div>

          <div className="traversal">
            <h3>Postorden (Izq - Der - Raíz)</h3>
            <div className="traversal-result">
              {postorden.length > 0 ? postorden.join(' → ') : 'Vacío'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
