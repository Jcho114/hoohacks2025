import { Handle, Position } from "@xyflow/react";
import { PaperType } from "@/api/papers";

function PaperNodes({ data }: { data: { paper: PaperType } }) {
  const truncateTitle = (title: string, maxLength: number = 30) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div style={{ padding: 10, border: "1px solid #777", borderRadius: 5 }}>
      <Handle type="target" position={Position.Left} />
      <div>{truncateTitle(data.paper.title)}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default PaperNodes;
