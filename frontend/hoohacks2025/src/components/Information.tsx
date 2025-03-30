import ArticleDetails from "./ArticleDetails";
import SearchResults from "./SearchResults";
import SelectedArticles from "./SelectedArticles";
import { PaperResultType, SearchResultsType } from "../types/types";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

const Information = ({
  currentPaper,
  setCurrentPaper,
  papersToVisualize,
  setPapersToVisualize,
}: {
  currentPaper: PaperResultType | null;
  setCurrentPaper: (paper: PaperResultType | null) => void;
  papersToVisualize: SearchResultsType;
  setPapersToVisualize: (search_results: SearchResultsType) => void;
}) => {
  const handleSearchSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const query = event.target.value;
  };

  const sampleSearchResults = {
    results: [
      {
        title: "Attention Is All You Need",
        author: "first author",
        DOI: "1",
        related: [],

        date_published: "2024/10/15",
        reference_count: 1,
        summary: "first summary",
      },
      {
        title: "second title",
        author: "second author",
        DOI: "2",
        related: [],

        date_published: "2024/10/15",
        reference_count: 2,
        summary: "second summary",
      },
      {
        title: "third title",
        author: "third author",
        DOI: "3",
        related: [],

        date_published: "2024/10/15",
        reference_count: 3,
        summary: "third summary",
      },
      {
        title: "Fourth paper",
        author: "fourth-author",
        DOI: "4",
        related: [],

        date_published: "2024/10/15",
        reference_count: 4,
        summary: "fourth",
      },
      {
        title: "Fifth paper",
        author: "Fifth-author",
        DOI: "5",
        related: [],

        date_published: "2024/10/15",
        reference_count: 5,
        summary: "Fifth",
      },
    ],
  };

  return (
    <div className="flex flex-col justify-between items-start w-full h-full">
      <div className="flex flex-col flex-3 h-full w-full px-8 py-6 gap-4">
        <p className="text-[1.5rem] font-bold text-black mb-[-0.5rem]">
          Research Wizard
        </p>
        <Input
          className="w-full text-xl p-4 rounded-sm"
          onChange={handleSearchSubmit}
          placeholder="enter keywords, doi, or url..."
        />
        <SearchResults
          search_results={sampleSearchResults}
          setCurrentPaper={setCurrentPaper}
          papersToVisualize={papersToVisualize}
          setPapersToVisualize={setPapersToVisualize}
        />
        <ArticleDetails
          currentPaper={currentPaper}
          papersToVisualize={papersToVisualize}
          setPapersToVisualize={setPapersToVisualize}
        />
      </div>
      <SelectedArticles
        papersToVisualize={papersToVisualize}
        setPapersToVisualize={setPapersToVisualize}
        setCurrentPaper={setCurrentPaper}
      />
    </div>
  );
};

export default Information;
