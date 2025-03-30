import Paper from "./Paper";
import { PaperResultType, SearchResultsType } from "../types/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SearchResults = ({
  search_results,
  setCurrentPaper,
  papersToVisualize,
  setPapersToVisualize,
}: {
  search_results: SearchResultsType;
  setCurrentPaper: (paper: PaperResultType | null) => void;
  papersToVisualize: SearchResultsType;
  setPapersToVisualize: (papers: SearchResultsType) => void;
}) => {
  return (
    <Card className="flex flex-col w-full px-4 py-4 !gap-3 my-0 flex-2 overflow-scroll rounded-sm">
      {search_results["results"].map(
        (paper: PaperResultType, index: number) => (
          <>
            <Paper
              paper_information={paper}
              cancel={false}
              setCurrentPaper={setCurrentPaper}
              papersToVisualize={papersToVisualize}
              setPapersToVisualize={setPapersToVisualize}
              key={index}
            />
            {index < search_results["results"].length - 1 && (
              <Separator className="bg-black !my-0" />
            )}
          </>
        )
      )}
    </Card>
  );
};

export default SearchResults;
