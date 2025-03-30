import { Card } from "@/components/ui/card";
import Paper from "./Paper";
import { Separator } from "@/components/ui/separator";
import { GraphDataType, PaperType } from "@/api/papers";

const SelectedArticles = ({
  papersToVisualize,
  setPapersToVisualize,
  setCurrentPaper,
  isFetchingBfs,
  bfsData,
}: {
  papersToVisualize: PaperType[];
  setPapersToVisualize: (papers: PaperType[]) => void;
  setCurrentPaper: (paper: PaperType | null) => void;
  isFetchingBfs: boolean;
  bfsData: GraphDataType;
}) => {
  return (
    <Card className="w-1/5 bg-white px-4 py-3 h-fit absolute rounded-sm top-6 right-6 gap-0">
      <h2 className="font-bold">Visualized Graph</h2>
      <Separator className="my-1 bg-black" />
      <div className="flex flex-col gap-1">
        {papersToVisualize.length === 0 ? (
          <h1>No paper selected</h1>
        ) : (
          <>
            {isFetchingBfs ? (
              <h1>- Nodes, - Edges</h1>
            ) : (
              <h1 className="mb-[-3px]">
                {bfsData !== null && bfsData.nodes !== null
                  ? bfsData.nodes.length
                  : 0}{" "}
                Nodes,{" "}
                {bfsData !== null && bfsData.edges !== null
                  ? bfsData.edges.length
                  : 0}{" "}
                Edges
              </h1>
            )}
            {papersToVisualize.map((paper: PaperType, index: number) => (
              <>
                <Paper
                  paper_information={paper}
                  cancel={true}
                  setCurrentPaper={setCurrentPaper}
                  papersToVisualize={papersToVisualize}
                  setPapersToVisualize={setPapersToVisualize}
                  key={index}
                />
                {index < papersToVisualize.length - 1 && (
                  <Separator className="bg-black !my-0" />
                )}
              </>
            ))}
          </>
        )}
      </div>
    </Card>
  );
};

export default SelectedArticles;
