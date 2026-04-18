// Tipo para cada elemento del menú
export interface MenuItem {
  id: string;
  title: string;
  link: string;
  component?: React.ComponentType<any>;
  children?: MenuItem[];
}

// Nodo del árbol N-ario
export interface NaryTreeNode {
  data: MenuItem;
  children: NaryTreeNode[];
}
