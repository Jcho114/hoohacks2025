import { useState } from "react";
import { PaperResultType, SearchResultsType } from "./types/types";
import Graph from "./components/Graph";
import Information from "./components/Information";

const App = () => {
  const [currentPaper, setCurrentPaper] = useState<PaperResultType | null>(
    null
  );
  const [papersToVisualize, setPapersToVisualize] = useState<SearchResultsType>(
    { results: [] }
  );

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="z-10 w-1/4 h-full">
        <Information
          currentPaper={currentPaper}
          setCurrentPaper={setCurrentPaper}
          papersToVisualize={papersToVisualize}
          setPapersToVisualize={setPapersToVisualize}
        />
      </div>
      <div className="z-0 w-3/4 h-full">
        <Graph />
      </div>
    </div>
  );
};

export default App;
