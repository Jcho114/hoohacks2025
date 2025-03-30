import { Card } from "@/components/ui/card";
import Paper from "./Paper";
import { Separator } from "@/components/ui/separator";
import { PaperType } from "@/api/papers";

const SelectedArticles = ({
  papersToVisualize,
  setPapersToVisualize,
  setCurrentPaper,
}: {
  papersToVisualize: PaperType[];
  setPapersToVisualize: (papers: PaperType[]) => void;
  setCurrentPaper: (paper: PaperType | null) => void;
}) => {
  return (
    <Card className="w-1/5 bg-white px-4 py-3 h-fit absolute rounded-sm top-6 right-6 gap-0">
      <h2 className="font-bold">Visualized Paper</h2>
      <Separator className="my-1 bg-black" />
      <div className="flex flex-col gap-1">
        {papersToVisualize.length === 0 ? (
          <h1>No paper selected</h1>
        ) : (
          papersToVisualize.map((paper: PaperType, index: number) => (
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
          ))
        )}
      </div>
    </Card>
  );
};

export default SelectedArticles;
