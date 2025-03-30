import { useState } from "react";
import { PaperType } from "@/api/papers";
import Graph from "./components/Graph";
import Information from "./components/Information";
import { useBfsGraphData } from "@/hooks/papers";

const App = () => {
  const [currentPaper, setCurrentPaper] = useState<PaperType | null>(null);
  const { bfsData, isBfsFetching, refetchBfs, bfsError } = useBfsGraphData(
    currentPaper === null ? null : currentPaper.doi
  );
  const [papersToVisualize, setPapersToVisualize] = useState<PaperType[]>([]);

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="z-10 w-1/4 h-full border-r-1 border-black border-solid shadow-lg">
        <Information
          refetchBfs={refetchBfs}
          currentPaper={currentPaper}
          setCurrentPaper={setCurrentPaper}
          papersToVisualize={papersToVisualize}
          setPapersToVisualize={setPapersToVisualize}
        />
      </div>
      <div className="z-0 w-3/4 h-full">
        <Graph
          bfsData={bfsData}
          isBfsFetching={isBfsFetching}
          currentPaper={currentPaper}
          setCurrentPaper={setCurrentPaper}
        />
      </div>
    </div>
  );
};

export default App;
