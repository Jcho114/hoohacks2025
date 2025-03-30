import { ReactFlow, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import nodes from './message.json';
import edges from './message.json';
import PaperNodes from './PaperNodes';
import { PaperResultType } from "../types/types";
import { useState } from "react";

const nodeTypes = { paperNodes: PaperNodes }; 

const initialNodes = nodes.nodes.map(( node : PaperResultType) => ({
  id: node.doi,
  position: { x: Math.random() * 1000, y: Math.random() * 800 },
  data: { paper: node},
  type: 'paperNodes',
}));

const initialEdges = edges.edges.map((edge: { src: string; dest: string }) => ({
  id: `${edge.src}-${edge.dest}`, 
  source: edge.src, // Source node ID
  target: edge.dest, // Target node ID
}));  

function Graph({ setCurrentPaper }: { setCurrentPaper: (paper: PaperResultType | null) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSelectable, setIsSelectable] = useState(0);
  

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          className: node.id === isSelectable ? 'selected-node' : '', // Apply the selected-node class conditionally
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => {
          console.log('Node clicked:', node);
          console.log(isSelectable);
          setIsSelectable(node.id);
          setCurrentPaper(node.data.paper); // Pass the paper data to the parent component
        }}
        onNodeDrag={(event, node) => {
          setIsSelectable(node.id);
          setCurrentPaper(node.data.paper);
        }}
        elementsSelectable={isSelectable}
      />
    </div>
  );
}

export default Graph;
