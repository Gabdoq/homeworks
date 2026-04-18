import type { MenuItem, NaryTreeNode } from '../types';

/**
 * Clase para representar un árbol N-ario (N-ary Tree)
 * Cada nodo puede tener múltiples hijos
 */
export class NaryTree {
  root: NaryTreeNode;

  constructor(rootData: MenuItem) {
    this.root = {
      data: rootData,
      children: []
    };
  }

  /**
   * Agrega un nodo hijo a un nodo padre existente
   */
  addChild(parentId: string, childData: MenuItem): boolean {
    const parentNode = this.findNode(this.root, parentId);
    if (parentNode) {
      parentNode.children.push({
        data: childData,
        children: []
      });
      return true;
    }
    return false;
  }

  /**
   * Encuentra un nodo por su id
   */
  findNode(node: NaryTreeNode, id: string): NaryTreeNode | null {
    if (node.data.id === id) {
      return node;
    }

    for (const child of node.children) {
      const result = this.findNode(child, id);
      if (result) return result;
    }

    return null;
  }

  /**
   * Convierte un MenuItem (estructura plana con children) a un NaryTree
   */
  static fromMenuItem(menuItem: MenuItem): NaryTree {
    const tree = new NaryTree(menuItem);
    tree.buildFromMenuStructure(menuItem, tree.root);
    return tree;
  }

  private buildFromMenuStructure(menuItem: MenuItem, treeNode: NaryTreeNode): void {
    if (menuItem.children && menuItem.children.length > 0) {
      menuItem.children.forEach(child => {
        const childNode: NaryTreeNode = {
          data: child,
          children: []
        };
        treeNode.children.push(childNode);
        this.buildFromMenuStructure(child, childNode);
      });
    }
  }

  /**
   * Recorre el árbol en profundidad (DFS) y ejecuta una función en cada nodo
   */
  traverse(callback: (node: NaryTreeNode, level: number) => void, node: NaryTreeNode = this.root, level: number = 0): void {
    callback(node, level);
    for (const child of node.children) {
      this.traverse(callback, child, level + 1);
    }
  }

  /**
   * Retorna todos los nodos en un arreglo flat con información de nivel
   */
  toArray(): Array<{ node: NaryTreeNode; level: number }> {
    const result: Array<{ node: NaryTreeNode; level: number }> = [];
    this.traverse((node, level) => {
      result.push({ node, level });
    });
    return result;
  }
}
