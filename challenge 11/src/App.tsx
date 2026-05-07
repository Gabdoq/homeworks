import React, { useState, useMemo } from 'react';
import { SmartSearchEngine } from './estructuras/SmartSearchEngine';
import { Product } from './estructuras/Trie';
import './estilos/App.css';

const App: React.FC = () => {
  const [engine] = useState(() => new SmartSearchEngine());
  const [productName, setProductName] = useState('');
  const [popularity, setPopularity] = useState('50');
  const [searchPrefix, setSearchPrefix] = useState('');
  const [topK, setTopK] = useState('2');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [showStats, setShowStats] = useState(false);

  React.useEffect(() => {
    engine.insert('air max', 90);
    engine.insert('air force', 95);
    engine.insert('air jordan', 85);
    engine.insert('adidas boost', 80);
    engine.insert('nike react', 88);
    engine.insert('adidas ultra', 92);
    engine.insert('air presto', 87);

    setAllProducts(engine.getAllProducts());
  }, [engine]);

  const handleInsertProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (productName.trim() === '' || isNaN(Number(popularity))) {
      alert('Por favor ingresa un nombre válido y popularidad numérica');
      return;
    }

    engine.insert(productName.trim(), Number(popularity));
    setAllProducts([...engine.getAllProducts()]);
    setProductName('');
    setPopularity('50');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchPrefix.trim() === '') {
      setSearchResults([]);
      return;
    }

    if (isNaN(Number(topK)) || Number(topK) <= 0) {
      alert('Por favor ingresa un número válido para K');
      return;
    }

    const results = engine.searchTopK(searchPrefix.trim(), Number(topK));
    setSearchResults(results);
  };

  const stats = useMemo(() => engine.getStats(), [allProducts]);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="panel insert-panel">
          <h2>Agregar Producto</h2>
          <form onSubmit={handleInsertProduct}>
            <div className="form-group">
              <label htmlFor="product-name">Nombre del Producto</label>
              <input
                id="product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="ej: air max"
              />
            </div>

            <div className="form-group">
              <label htmlFor="popularity">Popularidad (0-100)</label>
              <input
                id="popularity"
                type="number"
                min="0"
                max="100"
                value={popularity}
                onChange={(e) => setPopularity(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-circular" title="Insertar">
              +
            </button>
          </form>
        </div>

        <div className="panel search-panel">
          <h2>Buscar Productos</h2>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="search-prefix">Prefijo</label>
              <input
                id="search-prefix"
                type="text"
                value={searchPrefix}
                onChange={(e) => setSearchPrefix(e.target.value)}
                placeholder="ej: air"
              />
            </div>

            <div className="form-group">
              <label htmlFor="top-k">Top K Resultados</label>
              <input
                id="top-k"
                type="number"
                min="1"
                value={topK}
                onChange={(e) => setTopK(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-circular" title="Buscar">
              🔍
            </button>
          </form>
        </div>

        {searchResults.length > 0 && (
          <div className="panel results-panel">
            <h2>Resultados (Top {searchResults.length})</h2>
            <div className="results-list">
              {searchResults.map((product, index) => (
                <div key={index} className="result-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="product-info">
                    <span className="product-name">{product.name}</span>
                    <span className="product-popularity">
                      Popularidad: {product.popularity}
                    </span>
                  </div>
                  <div className="popularity-bar">
                    <div className="popularity-fill" style={{ width: `${product.popularity}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="panel all-products-panel">
          <div className="panel-header">
            <h2>Productos ({allProducts.length})</h2>
            <button className="btn btn-secondary" onClick={() => setShowStats(!showStats)}>
              {showStats ? 'Ocultar' : 'Mostrar'} Estadísticas
            </button>
          </div>

          {showStats && (
            <div className="stats-box">
              <div className="stat">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.totalProducts}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Promedio</span>
                <span className="stat-value">{stats.averagePopularity}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Máximo</span>
                <span className="stat-value">{stats.maxPopularity}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Mínimo</span>
                <span className="stat-value">{stats.minPopularity}</span>
              </div>
            </div>
          )}

          <div className="products-grid">
            {allProducts
              .sort((a, b) => b.popularity - a.popularity)
              .map((product, index) => (
                <div key={index} className="product-card">
                  <h3>{product.name}</h3>
                  <div className="popularity-badge">{product.popularity}</div>
                  <div className="popularity-bar-small">
                    <div className="popularity-fill-small" style={{ width: `${product.popularity}%` }}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;