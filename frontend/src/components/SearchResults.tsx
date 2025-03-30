import Paper from "./Paper";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaperType } from "@/api/papers";
import LoadingSpinner from "@/components/LoadingSpinner";

const SearchResults = ({
  isSuggestionFetching,
  search_results,
  currentPaper,
  setCurrentPaper,
  papersToVisualize,
  isFetchingBfs,
  setPapersToVisualize,
  refetchBfs,
}: {
  isSuggestionFetching: boolean;
  search_results: PaperType[];
  currentPaper: PaperType | null;
  setCurrentPaper: (paper: PaperType | null) => void;
  papersToVisualize: PaperType[];
  isFetchingBfs: boolean;
  setPapersToVisualize: (papers: PaperType[]) => void;
  refetchBfs: () => void;
}) => {
  const handleSelectPaper = () => {
    if (currentPaper === null) {
      return;
    }

    if (papersToVisualize.some((paper) => paper.doi === currentPaper.doi)) {
      return;
    }

    setPapersToVisualize([currentPaper]);
    refetchBfs();
  };

  return (
    <Card
      onDoubleClick={handleSelectPaper}
      className="flex flex-col w-full px-4 py-4 !gap-3 my-0 flex-2 overflow-scroll rounded-sm"
    >
      {isSuggestionFetching ? (
        <div className="flex w-full h-full justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : search_results.length === 0 ? (
        <div className="flex w-full h-full justify-center items-center">
          <h1>No Entries Provided</h1>
        </div>
      ) : (
        search_results.map((paper: PaperType, index: number) => (
          <>
            <Paper
              paper_information={paper}
              cancel={false}
              setCurrentPaper={setCurrentPaper}
              papersToVisualize={papersToVisualize}
              isFetchingBfs={isFetchingBfs}
              setPapersToVisualize={setPapersToVisualize}
              key={index}
            />
            {index < search_results.length - 1 && (
              <Separator className="bg-black !my-0" />
            )}
          </>
        ))
      )}
    </Card>
  );
};

export default SearchResults;
