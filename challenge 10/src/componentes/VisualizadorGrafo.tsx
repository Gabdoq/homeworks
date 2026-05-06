import { useEffect, useRef } from 'react';
// @ts-ignore
import * as d3 from 'd3';
import type { DatosGrafo } from '../tipos';
// @ts-ignore
import '../estilos/VisualizadorGrafo.css';

const VisualizadorGrafo = ({ datos }: { datos: DatosGrafo }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !datos.nodes.length) return;

    const width = window.innerWidth - 340;
    const height = window.innerHeight - 100;

    d3.select(svgRef.current).selectAll('*').remove();

    const simulation = d3.forceSimulation(datos.nodes as any)
      .force('link', d3.forceLink(datos.links as any)
        .id((d: any) => d.id)
        .distance(150)
        .strength(0.5))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(80));

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g');

    const links = g.selectAll('line')
      .data(datos.links)
      .enter()
      .append('line')
      .attr('class', 'enlace')
      .attr('stroke', (d: any) => d.tipo === 'amistad' ? '#333' : '#666')
      .attr('stroke-width', (d: any) => d.tipo === 'amistad' ? 2 : 1.5)
      .attr('stroke-dasharray', (d: any) => d.tipo === 'residencia' ? '5,3' : '0')
      .attr('opacity', (d: any) => d.tipo === 'residencia' ? 0.6 : 0.7);

    const nodes = g.selectAll('circle')
      .data(datos.nodes)
      .enter()
      .append('circle')
      .attr('class', 'nodo')
      .attr('r', (d: any) => d.tipo === 'ciudad' ? 26 : 20)
      .attr('fill', (d: any) => d.tipo === 'ciudad' ? '#666' : '#999')
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

    const labels = g.selectAll('text.label')
      .data(datos.nodes)
      .enter()
      .append('text')
      .attr('class', 'etiqueta-permanente')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('font-size', (d: any) => d.tipo === 'ciudad' ? '10px' : '8px')
      .attr('font-weight', 'normal')
      .attr('fill', '#fff')
      .text((d: any) => {
        const label = d.label;
        return label.length > 10 ? label.substring(0, 10) + '...' : label;
      });

    simulation.on('tick', () => {
      links
        .attr('x1', (d: any) => Math.max(50, Math.min(width - 50, d.source.x)))
        .attr('y1', (d: any) => Math.max(50, Math.min(height - 50, d.source.y)))
        .attr('x2', (d: any) => Math.max(50, Math.min(width - 50, d.target.x)))
        .attr('y2', (d: any) => Math.max(50, Math.min(height - 50, d.target.y)));

      nodes
        .attr('cx', (d: any) => Math.max(50, Math.min(width - 50, d.x)))
        .attr('cy', (d: any) => Math.max(50, Math.min(height - 50, d.y)));

      labels
        .attr('x', (d: any) => Math.max(50, Math.min(width - 50, d.x)))
        .attr('y', (d: any) => Math.max(50, Math.min(height - 50, d.y)) + 45);
    });

    nodes.on('mouseenter', function (this: any, _event: any, d: any) {
      d3.select(this)
        .attr('r', (d: any) => d.tipo === 'ciudad' ? 30 : 24);
      d3.select(this).attr('stroke-width', 2);
      
      const texto = d.tipo === 'persona' 
        ? `${d.label} (${d.edad}a)`
        : d.label;
      
      const tooltipGroup = g.append('g').attr('class', 'tooltip-group');
      
      const textElement = tooltipGroup.append('text')
        .attr('x', d.x)
        .attr('y', d.y - 40)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#fff')
        .attr('font-weight', 'normal')
        .attr('pointer-events', 'none')
        .text(texto);
      
      const bbox = (textElement.node() as any).getBBox();
      const paddingX = 8;
      const paddingY = 4;
      
      tooltipGroup.insert('rect', ':first-child')
        .attr('x', bbox.x - paddingX)
        .attr('y', bbox.y - paddingY)
        .attr('width', bbox.width + paddingX * 2)
        .attr('height', bbox.height + paddingY * 2)
        .attr('rx', 0)
        .attr('fill', '#333')
        .attr('opacity', 0.8);
      
      links.attr('opacity', (link: any) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return sourceId === d.id || targetId === d.id ? 1 : 0.2;
      });
    })
    .on('mouseleave', function (this: any, _event: any, _d: any) {
      d3.select(this)
        .attr('r', (d: any) => d.tipo === 'ciudad' ? 26 : 20);
      d3.select(this).attr('stroke-width', 1);
      
      g.selectAll('.tooltip-group').remove();
      
      links.attr('opacity', (d: any) => d.tipo === 'residencia' ? 0.6 : 0.7);
    });

    const zoom = d3.zoom().on('zoom', (event: any) => {
      g.attr('transform', event.transform);
    });

    svg.call(zoom as any);

    return () => {
      simulation.stop();
    };
  }, [datos]);

  return (
    <div className="contenedor-grafo">
      <svg ref={svgRef} className="svg-grafo"></svg>
      <div className="leyenda">
        <div className="item-leyenda">
          <div className="circulo-leyenda" style={{ backgroundColor: '#666' }}></div>
          <span>Ciudades</span>
        </div>
        <div className="item-leyenda">
          <div className="circulo-leyenda" style={{ backgroundColor: '#999' }}></div>
          <span>Personas</span>
        </div>
        <div className="item-leyenda">
          <div style={{ width: '20px', height: '1px', backgroundColor: '#333' }}></div>
          <span>Amistad</span>
        </div>
      </div>
    </div>
  );
};

export default VisualizadorGrafo;
