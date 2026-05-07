import { Trie, Product } from './Trie';
import { MinHeap } from './Heap';

export class SmartSearchEngine {
  private trie: Trie;

  constructor() {
    this.trie = new Trie();
  }

  insert(name: string, popularity: number): void {
    this.trie.insert(name, popularity);
  }

  searchTopK(prefix: string, k: number): Product[] {
    const matchingProducts = this.trie.searchByPrefix(prefix);

    if (matchingProducts.length === 0) {
      return [];
    }

    if (matchingProducts.length <= k) {
      return matchingProducts.sort((a, b) => b.popularity - a.popularity);
    }

    const heap = new MinHeap();

    for (const product of matchingProducts) {
      if (heap.size() < k) {
        heap.push(product);
      } else {
        const minProduct = heap.peek()!;
        if (product.popularity > minProduct.popularity) {
          heap.pop();
          heap.push(product);
        }
      }
    }

    const results: Product[] = [];
    while (!heap.isEmpty()) {
      results.unshift(heap.pop()!);
    }

    return results;
  }

  getAllProducts(): Product[] {
    return this.trie.getAllProducts();
  }

  getStats(): {
    totalProducts: number;
    averagePopularity: number;
    maxPopularity: number;
    minPopularity: number;
  } {
    const allProducts = this.trie.getAllProducts();

    if (allProducts.length === 0) {
      return {
        totalProducts: 0,
        averagePopularity: 0,
        maxPopularity: 0,
        minPopularity: 0,
      };
    }

    const popularities = allProducts.map((p) => p.popularity);
    const sum = popularities.reduce((a, b) => a + b, 0);

    return {
      totalProducts: allProducts.length,
      averagePopularity: Math.round(sum / allProducts.length),
      maxPopularity: Math.max(...popularities),
      minPopularity: Math.min(...popularities),
    };
  }
}
