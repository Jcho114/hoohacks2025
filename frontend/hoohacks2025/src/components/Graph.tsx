import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PaperNodes from "./PaperNodes";
import { useEffect, useState } from "react";
import { GraphDataType, PaperEdgeType, PaperType } from "@/api/papers";
import LoadingSpinner from "@/components/LoadingSpinner";

const nodeTypes = { paperNodes: PaperNodes };

const toNodes = (bfs_nodes: PaperType[]) => {
  console.log(bfs_nodes);
  return bfs_nodes.map((node: PaperType) => ({
    id: node.doi,
    position: { x: Math.random() * 1000, y: Math.random() * 800 },
    data: { paper: node },
    type: "paperNodes",
  }));
};

const toEdges = (bfs_edges: PaperEdgeType[]) => {
  console.log(bfs_edges);
  return bfs_edges.map((edge: PaperEdgeType) => ({
    id: `${edge.src}-${edge.dest}`,
    source: edge.src,
    target: edge.dest,
  }));
};

function Graph({
  bfsData,
  isBfsFetching,
  setCurrentPaper,
}: {
  bfsData: GraphDataType;
  isBfsFetching: boolean;
  setCurrentPaper: (paper: PaperType | null) => void;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    bfsData === undefined ? [] : toNodes(bfsData.nodes)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    bfsData === undefined ? [] : toEdges(bfsData.edges)
  );
  const [isSelectable, setIsSelectable] = useState("");

  useEffect(() => {
    if (bfsData) {
      const newNodes = toNodes(bfsData.nodes);
      const newEdges = toEdges(bfsData.edges);

      const positionedNodes = layoutNodes(newNodes, newEdges);

      setNodes(positionedNodes);
      setEdges(newEdges);
    }
  }, [bfsData, setNodes, setEdges]);

  const layoutNodes = (nodes: Node[], edges: Edge[]) => {
    const nodeMap: { [key: string]: Node } = {};
    nodes.forEach((node) => (nodeMap[node.id] = node));

    const incomingEdges: { [key: string]: string[] } = {};
    edges.forEach((edge) => {
      if (!incomingEdges[edge.target]) {
        incomingEdges[edge.target] = [];
      }
      incomingEdges[edge.target].push(edge.source);
    });

    const rootNodes = nodes.filter((node) => !incomingEdges[node.id]);

    const layers: { [key: number]: Node[] } = {};
    const nodeDepths: { [key: string]: number } = {};

    const assignDepth = (node: Node, depth: number) => {
      if (nodeDepths[node.id] !== undefined && nodeDepths[node.id] <= depth) {
        return;
      }
      nodeDepths[node.id] = depth;
      if (!layers[depth]) {
        layers[depth] = [];
      }
      layers[depth].push(node);

      edges.forEach((edge) => {
        if (edge.source === node.id) {
          assignDepth(nodeMap[edge.target], depth + 1);
        }
      });
    };

    rootNodes.forEach((node) => assignDepth(node, 0));

    const layerHeight = 200;
    const nodeWidth = 200;

    Object.values(layers).forEach((layer, layerIndex) => {
      layer.forEach((node, nodeIndex) => {
        nodeMap[node.id].position = {
          x: (nodeIndex - layer.length / 2) * nodeWidth,
          y: layerIndex * layerHeight,
        };
      });
    });

    return Object.values(nodeMap);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {bfsData === undefined ? (
        <h1>No Paper Selected</h1>
      ) : isBfsFetching ? (
        <LoadingSpinner />
      ) : (
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            className: node.id === isSelectable ? "selected-node" : "",
          }))}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onNodeClick={(event, node) => {
            setIsSelectable(node.id);
            setCurrentPaper(node.data.paper as PaperType);
          }}
          onNodeDrag={(event, node) => {
            setIsSelectable(node.id);
            setCurrentPaper(node.data.paper as PaperType);
          }}
        />
      )}
    </div>
  );
}

export default Graph;
