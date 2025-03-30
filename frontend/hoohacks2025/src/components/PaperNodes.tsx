import { Handle, Position } from "@xyflow/react";
import { PaperType } from "@/api/papers";

function PaperNodes({
  data,
}: {
  data: {
    paper: PaperType;
    handleSelectPaper: () => void;
    setCurrentPaper: (paper: PaperType | null) => void;
  };
}) {
  const truncateTitle = (title: string, maxLength: number = 30) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };

  return (
    <div
      onDoubleClick={() => {
        console.log(data);
        data.setCurrentPaper(data.paper);
        data.handleSelectPaper();
      }}
      style={{
        padding: 10,
        border: "1px solid #777",
        background: "white",
        borderRadius: 5,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div>{truncateTitle(data.paper.title)}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default PaperNodes;
