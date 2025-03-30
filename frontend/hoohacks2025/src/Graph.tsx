import React, {useCallback } from 'react';

import {
  ReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import PaperNodes from './PaperNodes';
import nodes from './message.json';
import edges from './message.json';

const nodeTypes = { paperNodes: PaperNodes }; 

const initialNodes = nodes.nodes.map((node: { doi: string; title: string; publisher: string }) => ({
  id: node.doi,
  position: { x: Math.random() * 1000, y: Math.random() * 800 },
  data: { title: node.title , publisher: node.publisher},
  type: 'paperNodes',
}));

const initialEdges = edges.edges.map((edge: { src: string; dest: string }) => ({
  id: `${edge.src}-${edge.dest}`, 
  source: edge.src, // Source node ID
  target: edge.dest, // Target node ID
}));  

console.log(initialNodes.forEach((node) => console.log(node.id)));
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(event, node) => console.log('Node clicked:', node)}
        nodeTypes={nodeTypes}
      />
    
    </div>
  );
}
