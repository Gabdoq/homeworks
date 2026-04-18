// Tipo para cada elemento del menú
export interface ElementoMenu {
  id: string;
  titulo: string;
  enlace: string;
  componente?: React.ComponentType<any>;
  hijos?: ElementoMenu[];
}

// Nodo del árbol N-ario
export interface NodoArbolN {
  datos: ElementoMenu;
  hijos: NodoArbolN[];
}
