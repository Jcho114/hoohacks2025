import { Card } from "@/components/ui/card";
import { PaperResultType, SearchResultsType } from "../types/types";
import Paper from "./Paper";
import { Separator } from "@/components/ui/separator";

const SelectedArticles = ({
  papersToVisualize,
  setPapersToVisualize,
  setCurrentPaper,
}: {
  papersToVisualize: SearchResultsType;
  setPapersToVisualize: (papers: SearchResultsType) => void;
  setCurrentPaper: (paper: PaperResultType | null) => void;
}) => {
  return (
    <Card className="w-1/5 bg-white px-4 py-3 h-fit absolute rounded-sm bottom-6 right-6 gap-0">
      <h2 className="font-bold">Selected Papers</h2>
      <Separator className="my-1 bg-black" />
      <div className="flex flex-col gap-1">
        {papersToVisualize["results"].length === 0 ? (
          <h1>No paper selected</h1>
        ) : (
          papersToVisualize["results"].map(
            (paper: PaperResultType, index: number) => (
              <>
                <Paper
                  paper_information={paper}
                  cancel={true}
                  setCurrentPaper={setCurrentPaper}
                  papersToVisualize={papersToVisualize}
                  setPapersToVisualize={setPapersToVisualize}
                  key={index}
                />
                {index < papersToVisualize["results"].length - 1 && (
                  <Separator className="bg-black !my-0" />
                )}
              </>
            )
          )
        )}
      </div>
    </Card>
  );
};

export default SelectedArticles;
