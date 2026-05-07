export interface Product {
  name: string;
  popularity: number;
}

interface TrieNode {
  children: Map<string, TrieNode>;
  products: Product[];
}

/**
 * Estructura Trie para almacenar productos
 * Permite búsquedas rápidas por prefijo
 */
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      products: [],
    };
  }

  /**
   * Inserta un producto en la Trie
   * @param name - Nombre del producto
   * @param popularity - Popularidad del producto
   */
  insert(name: string, popularity: number): void {
    const lowerName = name.toLowerCase();
    let node = this.root;

    for (const char of lowerName) {
      if (!node.children.has(char)) {
        node.children.set(char, {
          children: new Map(),
          products: [],
        });
      }
      node = node.children.get(char)!;
    }

    node.products.push({ name, popularity });
  }

  /**
   * Busca todos los productos que coinciden con un prefijo
   * @param prefix - Prefijo a buscar
   * @returns Array de productos que coinciden
   */
  searchByPrefix(prefix: string): Product[] {
    const lowerPrefix = prefix.toLowerCase();
    let node = this.root;

    for (const char of lowerPrefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    return this.collectAllProducts(node);
  }

  /**
   * Recolecta todos los productos del nodo actual y sus descendientes
   */
  private collectAllProducts(node: TrieNode): Product[] {
    const products: Product[] = [...node.products];

    for (const child of node.children.values()) {
      products.push(...this.collectAllProducts(child));
    }

    return products;
  }

  /**
   * Obtiene todos los productos almacenados en la Trie
   */
  getAllProducts(): Product[] {
    return this.collectAllProducts(this.root);
  }
}
