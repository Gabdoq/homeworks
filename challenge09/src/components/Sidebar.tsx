import React, { useState } from 'react';
import { NaryTree } from '../data/NaryTree';
import type { MenuItem, NaryTreeNode } from '../types';
import './Sidebar.css';

interface SidebarProps {
  menuTree: NaryTree;
  onMenuItemClick?: (menuItem: MenuItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ menuTree, onMenuItemClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(['root'])
  );

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderMenuNode = (node: NaryTreeNode, level: number): React.ReactElement => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.data.id);
    const isRoot = node.data.id === 'root';

    return (
      <div key={node.data.id} className="menu-item-wrapper">
        <div
          className={`menu-item menu-item-level-${level} ${
            isExpanded ? 'expanded' : ''
          } ${isRoot ? 'menu-root' : ''}`}
          style={{
            paddingLeft: `${level * 16}px`
          }}
        >
          {hasChildren && (
            <button
              className="expand-btn"
              onClick={() => toggleNode(node.data.id)}
              aria-expanded={isExpanded}
            >
              <span className="arrow">{isExpanded ? '▼' : '▶'}</span>
            </button>
          )}
          {!hasChildren && <span className="no-arrow"></span>}

          <a
            href={node.data.link}
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              onMenuItemClick?.(node.data);
            }}
          >
            {node.data.title}
          </a>
        </div>

        {hasChildren && isExpanded && (
          <div className="submenu">
            {node.children.map((child) => renderMenuNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-content">
        {renderMenuNode(menuTree.root, 0)}
      </div>
    </nav>
  );
};
