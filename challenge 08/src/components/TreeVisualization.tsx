import { useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import '../styles/TreeVisualization.css';

interface TreeVisualizationProps {
  data: any;
}

const TreeVisualization = ({ data }: TreeVisualizationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular la altura dinámicamente basada en la profundidad del árbol
  const calculateDepth = (node: any): number => {
    if (!node || !node.children || node.children.length === 0) {
      return 1;
    }
    return 1 + Math.max(...node.children.map((child: any) => calculateDepth(child)));
  };

  const treeDepth = data ? calculateDepth(data) : 0;
  const dynamicHeight = Math.max(600, treeDepth * 150);

  return (
    <div ref={containerRef} className="tree-container" style={{ height: `${dynamicHeight}px` }}>
      {data && (
        <Tree
          data={data}
          orientation="vertical"
          pathFunc="elbow"
          nodeSvgShape={{
            shape: 'circle',
            shapeProps: {
              r: 25,
              fill: '#00b4db',
              stroke: '#0083b0',
              strokeWidth: 2,
            },
          }}
          foreignObjectProps={{
            width: 50,
            height: 50,
            x: -25,
            y: -25,
          }}
          textLayout={{
            textAnchor: 'middle',
            y: 5,
          }}
          initialDepth={10}
          depthFactor={120}
          separation={{ siblings: 1.5, nonSiblings: 2.5 }}
          collapsible={false}
          renderCustomNodeElement={({
            nodeDatum,
            toggleNode,
            foreignObjectProps,
          }: any) => (
            <g>
              <circle
                cx={0}
                cy={0}
                r={25}
                fill="#00b4db"
                stroke="#0083b0"
                strokeWidth={2}
              />
              <text
                x={0}
                y={0}
                textAnchor="middle"
                dy=".3em"
                fontSize={16}
                fontWeight="bold"
                fill="white"
              >
                {nodeDatum.name}
              </text>
            </g>
          )}
        />
      )}
    </div>
  );
};

export default TreeVisualization;
