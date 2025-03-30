import ArticleDetails from "./ArticleDetails";
import SearchResults from "./SearchResults";
import SelectedArticles from "./SelectedArticles";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { PaperType } from "@/api/papers";
import { usePaperSuggestion } from "@/hooks/papers";
import { IoMdPaperPlane } from "react-icons/io";

const Information = ({
  currentPaper,
  refetchBfs,
  setCurrentPaper,
  papersToVisualize,
  setPapersToVisualize,
}: {
  currentPaper: PaperType | null;
  refetchBfs: () => void;
  setCurrentPaper: (paper: PaperType | null) => void;
  papersToVisualize: PaperType[];
  setPapersToVisualize: (search_results: PaperType[]) => void;
}) => {
  const [query, setQuery] = useState<string | null>(null);
  const suggestionQuery = usePaperSuggestion(query);

  const handleSuggestionSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query === "") {
      return;
    }
    suggestionQuery.refetchSuggestion();
  };

  return (
    <div className="flex flex-col justify-between items-start w-full h-full">
      <div className="flex flex-col flex-3 h-full w-full px-8 py-6 gap-4">
        <div className="flex flex-row gap-2 justify-center items-center">
          <p className="text-[1.5rem] font-bold text-black mb-[-0.5rem]">
            Paper Trail
          </p>
          <IoMdPaperPlane className="mt-2 w-6 h-6" />
        </div>
        <form onSubmit={handleSuggestionSubmit}>
          <Input
            className="w-full text-xl p-4 rounded-sm focus-visible:ring-1"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter keywords, doi, or url..."
          />
        </form>
        <SearchResults
          isSuggestionFetching={suggestionQuery.isSuggestionFetching}
          search_results={suggestionQuery.suggestionData || []}
          currentPaper={currentPaper}
          setCurrentPaper={setCurrentPaper}
          papersToVisualize={papersToVisualize}
          setPapersToVisualize={setPapersToVisualize}
          refetchBfs={refetchBfs}
        />
      </div>
      <ArticleDetails
        refetchBfs={refetchBfs}
        currentPaper={currentPaper}
        papersToVisualize={papersToVisualize}
        setPapersToVisualize={setPapersToVisualize}
      />
      <SelectedArticles
        papersToVisualize={papersToVisualize}
        setPapersToVisualize={setPapersToVisualize}
        setCurrentPaper={setCurrentPaper}
      />
    </div>
  );
};

export default Information;
