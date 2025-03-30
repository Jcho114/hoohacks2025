import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  addEdge,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import PaperNodes from "./PaperNodes";
import { useCallback, useEffect, useState } from "react";
import { GraphDataType, PaperEdgeType, PaperType } from "@/api/papers";
import LoadingSpinner from "@/components/LoadingSpinner";

const nodeTypes = { paperNodes: PaperNodes };

const toNodes = (
  bfs_nodes: PaperType[],
  handleSelectPaper: () => void,
  setCurrentPaper: (paper: PaperType | null) => void
) => {
  return bfs_nodes.map((node: PaperType) => ({
    id: node.doi,
    position: { x: Math.random() * 1000, y: Math.random() * 800 },
    data: { paper: node, handleSelectPaper, setCurrentPaper },
    type: "paperNodes",
  }));
};

const toEdges = (bfs_edges: PaperEdgeType[]) => {
  return bfs_edges.map((edge: PaperEdgeType) => ({
    id: `${edge.src}-${edge.dest}`,
    source: edge.src,
    target: edge.dest,
  }));
};

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 300;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "LR"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

function Graph({
  bfsData,
  isBfsFetching,
  currentPaper,
  setCurrentPaper,
  papersToVisualize,
  setPapersToVisualize,
  refetchBfs,
}: {
  bfsData: GraphDataType;
  isBfsFetching: boolean;
  currentPaper: PaperType | null;
  setCurrentPaper: (paper: PaperType | null) => void;
  setPapersToVisualize: (papers: PaperType[]) => void;
  papersToVisualize: PaperType[];
  refetchBfs: () => void;
}) {
  const handleSelectPaper = useCallback(() => {
    console.log(papersToVisualize);
    if (currentPaper === null) {
      return;
    }

    if (papersToVisualize.some((paper) => paper.doi === currentPaper.doi)) {
      return;
    }

    setPapersToVisualize([currentPaper]);
    refetchBfs();
  }, [currentPaper, papersToVisualize, refetchBfs, setPapersToVisualize]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(
    bfsData === undefined
      ? []
      : toNodes(bfsData.nodes, handleSelectPaper, setCurrentPaper)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    bfsData === undefined ? [] : toEdges(bfsData.edges)
  );
  const [isSelectable, setIsSelectable] = useState("");

  useEffect(() => {
    if (bfsData) {
      const newNodes = toNodes(
        bfsData.nodes,
        handleSelectPaper,
        setCurrentPaper
      );
      const newEdges = toEdges(bfsData.edges);

      const { nodes, edges } = getLayoutedElements(newNodes, newEdges);

      setNodes(nodes);
      setEdges(edges);
    }
  }, [bfsData, setNodes, setEdges, handleSelectPaper, setCurrentPaper]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-50">
      {isBfsFetching ? (
        <LoadingSpinner />
      ) : bfsData === undefined ? (
        <h1>No Paper Selected</h1>
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
          onConnect={onConnect}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          zoomOnDoubleClick={false}
          minZoom={0.1}
          onNodeClick={(_, node) => {
            setIsSelectable(node.id);
            setCurrentPaper(node.data.paper as PaperType);
          }}
          onNodeDrag={(_, node) => {
            setIsSelectable(node.id);
            setCurrentPaper(node.data.paper as PaperType);
          }}
        />
      )}
    </div>
  );
}

export default Graph;
