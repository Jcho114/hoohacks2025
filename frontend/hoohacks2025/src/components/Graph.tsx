import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import nodes from './message.json';
import edges from './message.json';
import PaperNodes from './PaperNodes';

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


function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => console.log('Node clicked:', node)}
      />
    </div>
  );
}

export default Graph;
